Curo::Application.routes.draw do
  resources :apps, :only => :index
  root :to => 'home#index'
end
