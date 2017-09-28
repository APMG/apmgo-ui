# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'home#show'
  get '/add_audio', to: 'home#add_audio'
  mount ApmAccountsComponent::Engine => '/apm_accounts'
end
