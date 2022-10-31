module Api
    class BooksController < ApplicationController

      protect_from_forgery with: :null_session
      skip_before_action :verify_authenticity_token

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
        token = cookies.signed[:bub_session_token]
        session = Session.find_by(token: token)
        return render json: { error: 'user is not logged in'}, status: :unauthorized if !session

        @books = Book.where(user_id: session.user.id).where.not(order_id: nil)
        return render json: {error: 'no books found'}, status: :not_found if !@books
        @books = Book.order(created_at: :desc).page(0).per(6)

        render 'api/books/sales', status: :ok
      end

      def add 
        token = cookies.signed[:bub_session_token]
        session = Session.find_by(token: token)
        return render json: { error: 'user is not logged in'}, status: :unauthorized if !session
        
        begin
          puts params[:book][:title]
            @book = Book.create!({user_id: session.user.id, title: params[:book][:title], author: params[:book][:author], isbn: params[:book][:isbn], genre: params[:book][:genre], rating: params[:book][:rating], summary: params[:book][:summary], condition: params[:book][:condition], description: params[:book][:description], price: params[:book][:price], image: params[:book][:image] })
          
            render 'api/books/add', status: :created
        rescue ArgumentError => e
            render json: {error: e.message}, status: :bad_request 
        end
    end

    def update 
        token = cookies.signed[:bub_session_token]
        session = Session.find_by(token: token)
        
        return render json: { error: 'user is not logged in'}, status: :unauthorized if !session
        
        begin
            user = session.user
            @book = user.books.find_by(id: params[:id])
            
            return render 'not_found', status: :not_found if not @book
            return render 'bad_request', status: :bad_request if not @book.update(book_params)
            render 'api/book/show', status: :ok
        rescue ArgumentError => e
            render json: {error: e.message}, status: :bad_request 
        end
    end

    def book_params
      params.require(:book).permit(:title, :author, :isbn, :genre, :rating, :summary, :condition, :description, :price, :image)
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

      private

    end
  end