Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/mybooks' => 'static_pages#mybooks'
  get '/mybooks/add' => 'static_pages#add'
  get '/book/:id' => 'static_pages#book'

end
