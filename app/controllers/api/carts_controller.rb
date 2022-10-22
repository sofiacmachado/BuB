module Api
    class CartsController < ApplicationController
      protect_from_forgery with: :exception
      before_action :ensure_cart

      def show
        render 'api/carts/show', status: :ok
      end

      def add_book
        #current_book = @cart.books.find(params[:id])
        #if !current_book
        #  cart.books << Book.find(params[:id])
        #end
        cart.books << Book.find(params[:id])
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
          @cart = session.cart
        else
          render json: {
            cart: [], status: :bad_request
          }
        end
      end
    end
  end