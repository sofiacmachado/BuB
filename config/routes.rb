Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/mybooks' => 'static_pages#mybooks'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
