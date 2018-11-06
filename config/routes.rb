Rails.application.routes.draw do

  namespace :api do
    resources :users do
      resources :posts, :controller => 'userposts', :only => [:index, :create, :destroy]
    end
    resources :cities do
      resources :posts, :controller => 'cityposts', :only => [:index, :show, :create, :destroy] do
        resources :comments
      end
    end
  end

end
