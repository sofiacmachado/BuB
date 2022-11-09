# README

## Table of contents

* [About BUB](#about-bub)

* [Technologies](#technologies)

* [Setup](#setup)


# About BUB

Before Used Books is an app were the user can buy and sell second-hand books.

![image](https://user-images.githubusercontent.com/85806152/200883161-6434a48e-54c2-4800-89dd-3c2d7febbd7f.png)



# Technologies

The project was created with the following:

- Ruby 3.0.0

- Rails 6.1.5

- Node.js ~16.14

- React ^18.2.0

- AWS S3

- Stripe API

- Google Books API



## Setup

To run this project:


```
$ cd ../BuB
```
  1. Install GEMS
```    
$ bundle install
```
   2. Install NPM packages
 ```   
$ yarn
```
   3. Start rails server
```
$ rails s
```
   4. Go to "localhost:3000" on browser.

   You have to enter your own API Keys for: 

   - Stripe to process the payments;
   - AWS S3 so that you can upload your own images.



## Step By Step

  - The user should sign in/log in;
  - Browse through the books that are for sale (there are already some books seeded in the database);
  - Add books to the cart and proceed to checkout;
  - After the order is placed the user can see how it is in the "orders" tab;
  - The user can also add books of his own, either by manually inserting every parameter or by searching in the Google Books database;
  - Once the user adds any book, he can edit some of the parameters or delete it;
  - If the user sells any book he can change the state of the order on the "sales" tab.
  
  
## User Stories 

The user of this app is someone who is passionate about books and/or wants to contribute to a more sustainable planet.
This app will give the user the possibility to save and/or make some money out of books that are collecting dust on bookshelves.
Also, because this app is only for book selling, it is a niche plataform and that ensures the user that the community that uses it is more respectful and less deceitful.


## Wireframes

![wireframes](https://user-images.githubusercontent.com/85806152/200905634-da669174-ce05-4589-a325-89c49d06f924.jpg)


## Difficulties
One of the major hurdle during the development of this project, and of rails/react projects in general, was setting up a functional environment. Managing versions of different tools is cumbersome and does not always work as expected. Online resources are vast in number but not in depth, and are oftentimes outdated. So, in the end, one ends up spending a lot of development time fixing environment, rather than actually developing the project.


  This project is done for [Altcademy](https://www.altcademy.com/)
