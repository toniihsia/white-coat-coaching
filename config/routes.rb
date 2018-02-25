Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :residencies, only: [:create, :index, :show, :update, :destroy, :destroy_all] do
      collection do
        delete :destroy_multiple
      end
    end
    resources :signup_emails, only: [:create]
  end

  # React paths. Added here for browserHistory so that React can kick in
  get 'login', to: 'static_pages#root'
  get 'residencyform', to: 'static_pages#root'
  get 'signup', to: 'static_pages#root'
  get 'orthopedic', to: 'static_pages#root'
  get 'earnosethroat', to: 'static_pages#root'
end
