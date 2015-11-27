Rails.application.routes.draw do
  root "pages#index"
  get "react-router(/*all)", to: "pages#index"
  get "simple", to: "pages#simple"
  get "no-router", to: "pages#no_router"

  resources :comments
end
