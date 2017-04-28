Rails.application.routes.draw do
  root to: 'home#show'
  mount ApmAccountsComponent::Engine => '/apm_accounts'
end
