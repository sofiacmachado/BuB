module Api
  class OrdersController < ApplicationController
    before_action :ensure_logged_in

    def create
      books = @session.cart.books
      total_price = 0

      books.each do |book|
        total_price += book.price
        unless book.order_id.nil?
          return render json: {
            error: format('book %d is no longer available', book.id),
            book: book.id
          }, status: :gone
        end
      end

      @order = Order.create({ user_id: @user.id, books: books })
      # books.each do |book|
      #  book.order_id = @order.id
      #  book.save!
      # end

      @session.cart.books.delete_all

      render 'api/orders/create', status: :created
    end

    def show
      @order = Order.find_by(id: params[:id])
      return render json: { error: 'cannot find order' }, status: :not_found unless @order

      render 'api/orders/show', status: :ok
    end

    def index
      @orders = @user.orders
      render 'api/orders/index', status: :ok
    end

    def byuser
      carts = Cart.where(user_id: session.user.id)
      return render json: { error: 'no books ordered' }, status: :not_found unless carts

      @orders = Order.where(cart: carts)
      return render json: { error: 'cart does not have any books' }, status: :not_found unless @orders

      render 'api/orders/byuser'
    end

    private

    def order_params
      params.require(:order).permit(:order_id)
    end
  end
end
