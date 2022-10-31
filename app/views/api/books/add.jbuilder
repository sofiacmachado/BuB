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
    json.image_url @book.image.blob.service_url
end