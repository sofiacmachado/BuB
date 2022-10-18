module Api
    class BooksController < ApplicationController
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
    end
  end