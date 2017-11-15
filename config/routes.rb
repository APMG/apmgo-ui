# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'home#show'
  if Rails.env.development?
    get '/add_audio', to: 'home#add_audio'
  end
  mount ApmAccountsComponent::Engine => '/apm_accounts'
end
