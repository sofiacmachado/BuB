json.orders do
  json.array! @orders do |order|
    json.id order.id
    json.currency order.currency
    json.amount order.amount

    json.books do
      json.array! order.books do |book|
        json.id book.id
        json.title book.title
        json.author book.author
        json.isbn book.isbn
        json.image book.image
        json.seller book.user_id
        json.price book.price
      end
    end
  end
end