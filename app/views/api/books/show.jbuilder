json.book do
  json.id @book.id
  json.title @book.title
  json.author @book.author
  json.isbn @book.isbn
  json.genre @book.genre
  json.rating @book.rating
  json.summary @book.summary
  json.condition @book.condition
  json.description @book.description
  json.price @book.price
  json.order_status @book.order_status
  if @book.image.attached?
    json.image_url @book.image.blob.service_url
  else
    json.image_url @book.image_url
  end
  json.user do
    json.id @book.user.id
    json.username @book.user.username
  end
end
