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
end
