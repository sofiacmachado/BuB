json.total_pages @books.total_pages
json.next_page @books.next_page

json.books do
  json.array! @books do |book|
    json.id book.id
    json.title book.title
    json.author book.author
    json.price book.price
    json.order_status book.order_status
    json.buyer book.order.user.username
    if book.image.attached?
      json.image_url book.image.blob.service_url
    else
      json.image_url book.image_url
    end
  end
end
