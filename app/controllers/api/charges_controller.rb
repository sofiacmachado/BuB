module Api
    class ChargesController < ApplicationController
      before_action :ensure_logged_in
      skip_before_action :verify_authenticity_token, only: [:mark_complete]

      def create
        order = Order.find_by(id: params[:order_id])
        return render json: { error: 'cannot find order' }, status: :not_found if !order
  
        amount = order.books.reduce((prev, book) => prev + book.price, 0)
  
        session = Stripe::Checkout::Session.create(
          payment_method_types: ['card'],
          line_items: [{
            name: "BUB Order #{order.id}",
            description: "Your order of #{order.books.length} books.",
            amount: (amount * 100.0).to_i,  # amount in cents
            currency: "usd",
            quantity: 1,
          }],
          mode: "payment",
          success_url: "#{ENV['URL']}/orders/#{order.id}/success",
          cancel_url: "#{ENV['URL']}#{params[:cancel_url]}",
        )
  
        @charge = order.charges.new({
          checkout_session_id: session.id,
          currency: 'usd',
          amount: amount
        })
  
        if @charge.save
          render 'api/charges/create', status: :created
        else
          render json: { error: 'charge could not be created' }, status: :bad_request
        end
      end

      def mark_complete
        # You can find your endpoint's secret in your webhook settings
        endpoint_secret = ENV['STRIPE_MARK_COMPLETE_WEBHOOK_SIGNING_SECRET']
        event = nil
        # Verify webhook signature and extract the event
        # See https://stripe.com/docs/webhooks/signatures for more information.
        begin
          sig_header = request.env['HTTP_STRIPE_SIGNATURE']
          payload = request.body.read
          event = Stripe::Webhook.construct_event(
            payload, sig_header, endpoint_secret
          )
        rescue JSON::ParserError => e
          # Invalid payload
          return head :bad_request
        rescue Stripe::SignatureVerificationError => e
          # Invalid signature
          return head :bad_request
        end
  
        # Handle the checkout.session.completed event
        if event['type'] == 'checkout.session.completed'
          session = event['data']['object']
          # Fulfill the purchase, mark related charge as complete
          charge = Charge.find_by(checkout_session_id: session.id)
          return head :bad_request if !charge
          charge.update({ complete: true })
          return head :ok
        end
        return head :bad_request
      end

      private

      def ensure_logged_in
        token = cookies.signed[:bub_session_token]
        session = Session.find_by(token: token)
  
        if session
          @user = session.user
        else
          render json: { error: 'user not logged in' }, status: :unauthorized
        end
      end
    end
  end