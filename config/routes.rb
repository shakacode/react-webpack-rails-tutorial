Rails.application.routes.draw do
  root "pages#index"

  get "simple", to: "pages#simple"
  get "no-router", to: "pages#no_router"

  # React Router needs a wildcard
  get "react-router(/*all)", to: "pages#index"

  resources :comments
end
