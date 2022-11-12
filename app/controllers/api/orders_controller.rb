module Api
  class OrdersController < ApplicationController
    before_action :ensure_logged_in

    def show
      @order = Order.find(params[:id])
      return render json: { error: 'cannot find order' }, status: :not_found unless @order

      render 'api/orders/show', status: :ok
    end

    def index
      @orders = @user.orders
      render 'api/orders/index', status: :ok
    end
  end
end
