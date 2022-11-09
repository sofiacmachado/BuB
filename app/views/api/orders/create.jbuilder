json.order do
  json.id @order.id

  json.books do
    json.array! @order.books do |book|
      json.id book.id
      json.title book.title
      json.author book.author
      json.isbn book.isbn
      json.image_url book.image_url
      json.seller book.user_id
      json.price book.price
      json.order_status book.order_status
    end
  end
end
