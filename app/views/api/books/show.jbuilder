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
    json.image @book.image
    json.user do
      json.id @book.user.id
      json.username @book.user.username
  end
end