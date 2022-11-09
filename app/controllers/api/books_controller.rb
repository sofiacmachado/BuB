module Api
  class BooksController < ApplicationController
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    before_action :ensure_logged_in, except: %i[index show ]

    include ActiveStorage::SetCurrent

    def index
      @books = Book.where(order_id: nil).order(created_at: :desc).page(params[:page]).per(5)
      return render json: { error: 'not_found' }, status: :not_found unless @books

      render 'api/books/index', status: :ok
    end

    def show
      @book = Book.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @book

      render 'api/books/show', status: :ok
    end

    def my_sales
      @books = @user.books.where.not(order_id: nil)
      return render json: { error: 'no books found' }, status: :not_found unless @books

      @books = @books.order(created_at: :desc).page(0).per(5)

      render 'api/books/sales', status: :ok
    end

    def my_books
      @books = @user.books.where(order_id: nil)
      return render json: { error: 'no books found' }, status: :not_found unless @books

      render 'api/books/mybooks', status: :ok
    end

    def add
      @book = @user.books.create!(book_params)

      render 'api/books/add', status: :created
    rescue ArgumentError => e
      render json: { error: e.message }, status: :bad_request
    end

    def update
      @book = @user.books.find(params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @book
      return render json: { error: 'unauthorized' }, status: :unauthorized unless @book.order.nil?
      return render json: { error: 'bad_request' }, status: :bad_request unless @book.update(book_params)

      render 'api/books/show', status: :ok
    rescue ArgumentError => e
      render json: { error: e.message }, status: :bad_request
    end
    
    def update_order_status
      @book = @user.books.find(params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @book
      return render json: { error: 'unauthorized' }, status: :unauthorized if @book.order_status_Shipping?
      return render json: { error: 'bad_request' }, status: :bad_request unless @book.update(book_buyer_params)

      render 'api/books/show', status: :ok
    rescue ArgumentError => e
      render json: { error: e.message }, status: :bad_request
    end

    def update_buyer_status
      @book = Book.find(params[:id])

      return render json: { error: 'not_found' }, status: :not_found unless @book

      return render json: { error: 'bad_request' }, status: :bad_request if @book.order.nil?
      return render json: { error: 'unauthorized' }, status: :unauthorized if @book.order.user_id != @user.id
      return render json: { error: 'unauthorized' }, status: :unauthorized unless @book.order_status_Shipping?

      return render json: { error: 'bad_request' }, status: :bad_request unless @book.update(book_buyer_params)

      render 'api/books/show', status: :ok
    end

    def destroy
      book = Book.find_by(id: params[:id])

      if book
        return render json: { error: 'unauthorized' }, status: :unauthorized unless book.order.nil?

        book.destroy
        return render json: { success: true }, status: :ok
      end
      render json: { error: 'not found' }, status: :not_found
    end

    def book_params
      params.require(:book).permit(:title, :author, :isbn, :genre, :rating, :summary, :condition, :description,
                                   :price, :image, :image_url, :order_status)
    end

    def book_buyer_params
      params.require(:book).permit(:order_status)
    end
  end
end
