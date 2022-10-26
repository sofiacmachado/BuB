class StaticPagesController < ApplicationController
  def home
    render 'home'
  end
  def book
    @data = { book_id: params[:id] }.to_json
    render 'book'
  end
  def login
    render 'login'
  end
  
  def success
    @data = { order_id: params[:id]}.to_json
    render 'success'
  end
end
