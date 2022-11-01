module Api
    class BooksController < ApplicationController

      protect_from_forgery with: :null_session
      skip_before_action :verify_authenticity_token
      before_action :ensure_logged_in, except: [:index, :show, :book_buyer_params, :book_params]

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

      def my_sales
        @books = Book.where(user_id: @user.id).where.not(order_id: nil)
        return render json: {error: 'no books found'}, status: :not_found if !@books
        @books = @books.order(created_at: :desc).page(0).per(6)

        render 'api/books/sales', status: :ok
      end

      def my_books
        @books = Book.where(user_id: @user.id).where(order_id: nil)
        return render json: {error: 'no books found'}, status: :not_found if !@books

        render 'api/books/mybooks', status: :ok
      end


      def add
        begin
          puts params[:book][:title]
            @book = Book.create!({user_id: @user.id, title: params[:book][:title], author: params[:book][:author], isbn: params[:book][:isbn], genre: params[:book][:genre], rating: params[:book][:rating], summary: params[:book][:summary], condition: params[:book][:condition], description: params[:book][:description], price: params[:book][:price], image: params[:book][:image] })
          
            render 'api/books/add', status: :created
        rescue ArgumentError => e
            render json: {error: e.message}, status: :bad_request 
        end
      end

      def update 
        begin
          @book = @user.books.find(params[:id])
          return render json: { error: 'not_found' }, status: :not_found if not @book
          return render json: { error: 'unauthorized' }, status: :unauthorized if not @book.order.nil?
          return render json: { error: 'bad_request' }, status: :bad_request if not @book.update(book_params)
          
          render 'api/books/show', status: :ok
        rescue ArgumentError => e
            render json: {error: e.message}, status: :bad_request 
        end
      end

      def update_buyer_status
        @book = Book.find(params[:id])

        return render json: { error: 'not_found' }, status: :not_found if not @book

        if @book.order.nil?
          return render json: { error: 'bad_request' }, status: :bad_request
        end
        if @book.order.user_id != @user.id
          return render json: { error: 'unauthorized' }, status: :unauthorized
        end
        if @book.order_status != :Shipping
          return render json: { error: 'unauthorized' }, status: :unauthorized
        end

        return render json: { error: 'bad_request' }, status: :bad_request if not @book.update(book_buyer_params)
        render 'api/books/show', status: :ok

      end

      def book_buyer_params
        params.require(:book).permit(:order_status)
      end

      def book_params
        params.require(:book).permit(:title, :author, :isbn, :genre, :rating, :summary, :condition, :description, :price, :image, :order_status)
      end

      def destroy
        book = Book.find_by(id: params[:id])
  
        if book
          if !book.order.nil?
            return render json: { error: 'unauthorized' }, status: :unauthorized
          end
          book.destroy
          return render json: { success: true }, status: :ok
        end
        render json: { error: 'not found' }, status: :not_found
      end

      private

      def ensure_logged_in
        token = cookies.signed[:bub_session_token]
        @session = Session.find_by(token: token)
  
        if @session
          @user = @session.user
        else
          render json: { error: 'user not logged in' }, status: :unauthorized
        end
      end

    end
  end