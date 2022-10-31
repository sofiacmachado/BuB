json.order do
    json.id @order.id
    json.paid @order.paid
    json.charges @order.charges
    json.books do
        json.array! @order.books do |book|
            json.id book.id
            json.title book.title
            json.author book.author
            json.isbn book.isbn
            json.image book.image
            json.seller book.user_id
            json.price book.price
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
  end
