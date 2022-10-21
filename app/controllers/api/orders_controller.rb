module Api
    class OrdersController < ApplicationController
      def create
        token = cookies.signed[:bub_session_token]
        session = Session.find_by(token: token)
        return render json: { error: 'user not logged in' }, status: :unauthorized if !session
  
        cart = Cart.find_by(id: params[:order][:cart_id])
        return render json: { error: 'cannot find cart' }, status: :not_found if !cart
  
        begin
          @order = Order.create({ user_id: session.user.id, cart_id: cart.id})
          render 'api/orders/create', status: :created
        rescue ArgumentError => e
          render json: { error: e.message }, status: :bad_request
        end
      end
  
      def get_cart_orders
        cart = Cart.find_by(id: params[:id])
        return render json: { error: 'cannot find cart' }, status: :not_found if !cart
        render 'api/orders/index'
      end

      def show
        @order = Order.find_by(id: params[:id])
        return render json: {error: 'cannot find order'}, status: :not_found if !@order
        @orders = cart.orders
        render 'api/orders/show', status: :ok
    end

    def index
      token = cookies.signed[:bub_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user is not logged in'}, status: :unauthorized if !session

      @orders = Order.where(user_id: session.user.id)
      return render json: { error: 'not_found'}, status: :not_found if !@orders

      render 'api/orders/index', status: :ok
    end

    def byuser
      token = cookies.signed[:bub_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user is not logged in'}, status: :unauthorized if !session

      carts = Cart.where(user_id: session.user.id)
      return render json: {error: 'no books ordered'}, status: :not_found if !carts
      
      @orders = Order.where(cart: carts)
      return render json: {error: 'cart does not have any books'}, status: :not_found if !@orders

      render 'api/orders/byuser'

    end
  
      private
  
      def order_params
        params.require(:order).permit(:cart_id)
      end
    end
  end