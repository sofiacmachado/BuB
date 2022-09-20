Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/mybooks' => 'static_pages#mybooks'
  get '/mybooks/add' => 'static_pages#add'
  get '/book/:id' => 'static_pages#book'
  get '/about' => 'static_pages#about'
  get '/faqs' => 'static_pages#faqs'
  get '/login' => 'static_pages#login'
  get '/authenticated' => 'sessions#authenticated'
  get '/browse' => 'static_pages#browse'

end
