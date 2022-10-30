json.orders do 
    json.array! @orders do |order|
        json.id order.id
        json.id @order.book.id
        json.title @order.book.title
        json.author @order.book.author
        json.isbn @order.book.isbn
        json.image @order.book.image
        json.seller @order.book.user_id
        json.price @order.book.price
        if @order.book.image.attached?
            json.image_url @order.book.image.blob.service_url
          else
            json.image_url @order.book.image_url
        end
    end

end