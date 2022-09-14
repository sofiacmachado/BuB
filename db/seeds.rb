# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  { username: 'Tommy', email: 'tommy@test.com', password: 'password', first_name: 'Tommy', last_name: 'Smith', address:'Street X NY', cellphone: 000000001,  },
  { username: 'Bobby', email: 'bobby@test.com', password: 'password', first_name: 'Bobby', last_name: 'Peterson', address:'Street Y ST', cellphone: 000000002, },
  { username: 'Sarah', email: 'sarah@test.com', password: 'password', first_name: 'Sarah', last_name: 'Gardner', address:'Street Z FL', cellphone: 000000003, },
])

books = Book.create([
    {
    title: 'Notes from Underground',
    author: "Fyodor Dostoevsky",
    isbn: '9780679734529',
    description: "Notes from Underground is a novella written in 1864 by Fyodor Dostoevsky, and is considered by many to be one of the first existentialist novels. The novella presents itself as an excerpt from the rambling memoirs of a bitter, isolated, unnamed narrator, who is a retired civil servant living in St. Petersburg.",
    condition: "Like new",
    user_description: 'Book is in perfect conditions',
    genre: 'classic',
    price: 8,
    rating: 4.2/5,
    image_url: 'https://images-na.ssl-images-amazon.com/images/I/41kxGhOH0vL._SX322_BO1,204,203,200_.jpg',
    user: users.first
    }
])