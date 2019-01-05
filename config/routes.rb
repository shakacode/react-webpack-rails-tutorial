Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  root "pages#index"

  get "simple", to: "pages#simple"
  get "no-router", to: "pages#no_router"

  get "bs-react-on-rails", to: "pages#reason_ml"

  # React Router needs a wildcard
  get "react-router(/*all)", to: "pages#index"

  resources :comments
  mount ActionCable.server => "/cable"
end
