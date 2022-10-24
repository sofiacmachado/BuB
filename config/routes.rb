Rails.application.routes.draw do

  root to: 'static_pages#home'

  get '/login' => 'static_pages#login'
  get '/mybooks' => 'static_pages#mybooks'
  get '/mybooks/add' => 'static_pages#add'
  get '/book/:id' => 'static_pages#book'
  get 'mybooks/edit/:id' => 'static_pages#edit'
  get '/about' => 'static_pages#about'
  get '/faqs' => 'static_pages#faqs'
  
  get '/orders/:id/success' => 'static_pages#success'
  get '/sales' => 'static_pages#sales'
  get '/orders' => 'static_pages#orders'
  get '/cart' => 'static_pages#cart'
  
  get '/browse_author' => 'static_pages#browse_author'
  get '/browse_title' => 'static_pages#browse_title'
  
  namespace :api do    
    resources :users, only: [:create]
    resources :sessions, only: [:create]
    resources :books, only: [:index, :show]
    resources :orders, only: [:create, :index, :show]
    resources :charges, only: [:create]

    get '/authenticated' => 'sessions#authenticated'
    delete '/session' => 'sessions#destroy'

    get '/books/:id/orders' => 'orders#get_book_orders'

    get '/cart' => 'carts#show'
    get '/cart/details' => 'carts#show_detailed'
    post '/cart/:id' => 'carts#add_book'
    delete '/cart/:id' => 'carts#remove_book'
    delete '/cart' => 'carts#destroy'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end
end
