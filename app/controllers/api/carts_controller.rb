module Api
  class CartsController < ApplicationController
    protect_from_forgery with: :exception
    before_action :ensure_cart

    def show
      render 'api/carts/show', status: :ok
    end

    def show_detailed
      @user = @cart.session.user
      render 'api/carts/detailed', status: :ok
    end

    def add_book
      unless @cart.books.exists?(params[:id])
        book = Book.find(params[:id])
        @cart.books << book if !book.nil? && (book.user_id != @cart.session.user.id)
      end
      render 'api/carts/show', status: :ok
    end

    def remove_book
      @cart.books.delete(params[:id])
      render 'api/carts/show', status: :ok
    end

    def destroy
      @cart.books.delete_all
      render 'api/carts/show', status: :ok
    end

    private

    def ensure_cart
      token = cookies.signed[:bub_session_token]
      session = Session.find_by(token: token)

      if session
        session.create_cart(books: []) if session.cart.nil?
        @cart = session.cart
      else
        render json: { cart: [] }, status: :ok
      end
    end
  end
end
