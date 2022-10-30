module Api
    class BooksController < ApplicationController

      include ActiveStorage::SetCurrent

      def index
        @books = Book.order(created_at: :desc).page(params[:page]).per(6)
        return render json: { error: 'not_found' }, status: :not_found if !@books
  
        render 'api/books/index', status: :ok
      end
  
      def show
        @book = Book.find_by(id: params[:id])
        return render json: { error: 'not_found' }, status: :not_found if !@book
  
        render 'api/books/show', status: :ok
      end

      def destroy
        token = cookies.signed[:bub_session_token]
        book = Book.find_by(id: params[:id])
  
        if book
          orders = Order.where(book_id:book.id)
          orders.each do |b|
            Charge.where(order_id:b.id).destroy_all
            b.destroy
          end
          book.destroy
          render json: { success: true }, status: :ok
        end
      end

    end
  end