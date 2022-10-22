json.authenticated true
json.username @user.username
json.cart do
    json.array! @cart.books do |book|
        json.id book.id
        json.title book.title
        json.author book.author
        json.price book.price
        json.image book.image
    end
end