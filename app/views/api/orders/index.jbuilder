json.orders do
  json.array! @orders do |order|
    json.id order.id
    json.status order.status
    json.buyer order.charge.user.username
    json.book do
      json.id order.book.id
      json.title order.book.title
      json.author order.book.author
      json.isbn order.book.isbn
      json.image order.book.image
      json.price order.book.price
    end
  end
end