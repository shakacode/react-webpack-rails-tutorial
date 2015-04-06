Rails.application.routes.draw do
  root "pages#index"

  resources :comments
end
