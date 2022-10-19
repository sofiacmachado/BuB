json.book do
    json.id @book.id
    json.title @book.title
    json.author @book.author
    json.isbn @book.isbn
    json.genre @book.genre
    json.rating @book.rating
    json.description @book.description
    json.condition @book.condition
    json.condition_description @book.condition_description
    json.price @book.price
    json.image @book.image
    json.user do
      json.id @book.user.id
      json.username @book.user.username
  end
end