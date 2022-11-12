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

    def success
      order_id = @session.success_order_id
      return render json: { error: 'there is no order to show' }, status: :not_found unless order_id

      @order = Order.find(order_id)
      return render json: { error: 'cannot find order' }, status: :not_found unless @order

      render 'api/orders/show', status: :ok
    end
  end
end
