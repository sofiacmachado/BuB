json.orders do
    json.array! @orders do |order|
      json.id order.id
    end
  end