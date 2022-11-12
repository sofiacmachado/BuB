json.order do
  json.id @order.id
  json.books do
    json.array! @order.books do |book|
      json.id book.id
      json.title book.title
      json.author book.author
      json.isbn book.isbn
      json.image book.image
      json.seller do
        json.id book.user_id
        json.username book.user.username
      end
      json.price book.price
      json.order_status book.order_status
      if book.image.attached?
        json.image_url book.image.blob.service_url
      else
        json.image_url book.image_url
      end
    end
  end
  json.user do
    json.username @order.user.username
  end
  json.timestamp @order.created_at
end
