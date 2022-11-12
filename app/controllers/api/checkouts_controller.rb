module Api
  class CheckoutsController < ApplicationController
    before_action :ensure_logged_in, except: [:checkout_webhook]
    skip_before_action :verify_authenticity_token, only: [:checkout_webhook]

    def create
      books = @session.cart.books
      return render json: {error: 'the cart is empty'}, status: :bad_request if books.empty?

      amount = 0
      line_items = []

      books.each do |book|
        amount += book.price
        line_items.push({
          name: "BUB Book #{book.id}",
          description: "#{book.title}. #{book.author}",
          amount: (book.price * 100.0).to_i,  # amount in cents
          currency: 'usd',
          quantity: 1
        })

        unless book.order_id.nil?
          # remove unavailable book from cart
          books.delete(book.id)
          # return error status
          return render json: {
            error: format('"%s" is no longer available', book.title),
            book: book.id
          }, status: :gone
        end
      end

      expire_previous_checkout

      # Time limit to complete the checkout
      expires_at = Time.now + 31.minutes

      # {
      #   name: "BUB Order",
      #   description: "Your order of #{books.length} books.",
      #   amount: (amount * 100.0).to_i,  # amount in cents
      #   currency: 'usd',
      #   quantity: 1
      # }
      session = Stripe::Checkout::Session.create(
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: "#{ENV['URL']}/orders/success",
        cancel_url: "#{ENV['URL']}/cart",
        expires_at: expires_at.to_i
      )

      @checkout = @user.create_checkout({
        checkout_session_id: session.id,
        currency: 'usd',
        amount: amount,
        expires_at: expires_at.utc.to_datetime,
        books: books
      })
      return render json: { error: 'checkout could not be created' }, status: :bad_request if not @checkout

      render 'api/checkouts/create', status: :created
    end

    def checkout_webhook
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
        return on_checkout_completed(event)
      end
      # Handle the checkout.session.expired event
      if event['type'] == 'checkout.session.expired'
        return on_checkout_expired(event)
      end
      head :bad_request
    end

    private

    def expire_previous_checkout
      previous = @user.checkout
      unless previous.nil?
        checkout_session_id = previous.checkout_session_id
        previous.destroy
        begin
          # This API call should call our expire webhook,
          # so the webhook function must check if the checkout still exists
          Stripe::Checkout::Session.expire(checkout_session_id)
        rescue Stripe::InvalidRequestError => e
          # Maybe the session is already expired
        end
        return true
      end
      false
    end

    def on_checkout_completed(event)
      session = event['data']['object']
      # Fulfill the purchase, mark related charge as complete
      checkout = Checkout.find_by(checkout_session_id: session.id)
      return head :bad_request unless checkout

      # Replace the checkout with an actual order
      order = checkout.user.orders.create!({ books: checkout.books })
      checkout.destroy
      return head :ok
    end

    def on_checkout_expired(event)
      session = event['data']['object']
      # Destroy the user's checkout
      checkout = Checkout.find_by(checkout_session_id: session.id)
      unless checkout.nil?
        checkout.destroy
      end
      return head :ok
    end
  end
end
