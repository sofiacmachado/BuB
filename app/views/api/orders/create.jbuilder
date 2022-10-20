json.order do
    json.id @order.id
    json.state @order.id

    json.book do
      json.id @order.book.id
      json.title @order.book.title
    end
  end