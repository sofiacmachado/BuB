module Api
  class OrdersController < ApplicationController
    before_action :ensure_logged_in

    def create
      books = @user.session.cart.books
      total_price = 0

      books.each do |book| 
        total_price += book.price
        if !book.order_id.nil?
          return render json: {
            error: 'book %d is no longer available' % [book.id],
            book: book.id,
          }, status: :gone
        end
      end

      @order = Order.create({ user_id: @user.id, books: books, currency: 'usd', amount: total_price })
      #books.each do |book| 
      #  book.order_id = @order.id
      #  book.save!
      #end

      render 'api/orders/create', status: :created
    end

    def show
      @order = Order.find_by(id: params[:id])
      return render json: {error: 'cannot find order'}, status: :not_found if !@order
      @orders = cart.orders
      render 'api/orders/show', status: :ok
    end

    def index
      @orders = @user.orders
      render 'api/orders/index', status: :ok
    end

    def byuser
      carts = Cart.where(user_id: session.user.id)
      return render json: {error: 'no books ordered'}, status: :not_found if !carts
      
      @orders = Order.where(cart: carts)
      return render json: {error: 'cart does not have any books'}, status: :not_found if !@orders

      render 'api/orders/byuser'
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