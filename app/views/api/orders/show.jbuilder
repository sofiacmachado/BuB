json.order do
    json.id @order.id

    json.books do
        json.array! @order.books do |book|
            json.id book.id
            json.title book.title
            json.author book.author
            json.isbn book.isbn
            json.image book.image
            json.seller book.user_id
            json.price book.price
            
        end
    end

    json.paid @order.paid

    json.user do
        json.username @order.user.username
    end
    json.charges @order.charges
  end