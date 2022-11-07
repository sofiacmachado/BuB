json.authenticated true
json.username @user.username
json.cart do
  json.array! @cart.books do |book|
    json.id book.id
    json.title book.title
    json.author book.author
    json.price book.price
    if book.image.attached?
      json.image_url book.image.blob.service_url
    else
      json.image_url book.image_url
    end
  end
end
