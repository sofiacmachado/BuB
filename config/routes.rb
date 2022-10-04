Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/mybooks' => 'static_pages#mybooks'
  get '/mybooks/add' => 'static_pages#add'
  get '/book/:id' => 'static_pages#book'
  get '/about' => 'static_pages#about'
  get '/faqs' => 'static_pages#faqs'
  get '/login' => 'static_pages#login'
  get '/authenticated' => 'sessions#authenticated'
  get '/browse_author' => 'static_pages#browse_author'
  get '/browse_title' => 'static_pages#browse_title'
  get '/orders/:id/success' => 'static_pages#success'

end
