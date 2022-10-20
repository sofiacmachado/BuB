module Api
    class OrdersController < ApplicationController
      def create
        token = cookies.signed[:bub_session_token]
        session = Session.find_by(token: token)
        return render json: { error: 'user not logged in' }, status: :unauthorized if !session
  
        book = Book.find_by(id: params[:order][:book_id])
        return render json: { error: 'cannot find book' }, status: :not_found if !book
  
        begin
          @order = Order.create({ user_id: session.user.id, book_id: book.id})
          render 'api/orders/create', status: :created
        rescue ArgumentError => e
          render json: { error: e.message }, status: :bad_request
        end
      end
  
      def get_book_orders
        book = Book.find_by(id: params[:id])
        return render json: { error: 'cannot find book' }, status: :not_found if !book
  
        @orders = book.orders.where("end_date > ? ", Date.today)
        render 'api/orders/index'
      end
  
      private
  
      def order_params
        params.require(:order).permit(:book_id)
      end
    end
  end