# README

This project uses rbenv to manage its Ruby version.

## SSL setup



1. Set up an Apache virtual host to proxy your traffic over SSL
    ```apache
    <VirtualHost *:443>
      ServerAdmin you@yourdomain.org
      DocumentRoot /var/www/htdocs
      ServerName bragi.dev
      ErrorLog /var/log/apache2/bragi.dev-error_log
      CustomLog /var/log/apache2/bragi.dev-access_log common
    
      SSLEngine On
      SSLCertificateFile /path/to/intermediate/certs/bragi.dev.cert.pem
      SSLCertificateKeyFile /path/to/intermediate/key/bragi.dev.key.pem
      SSLCACertificateFile /path/to/intermediate/cert/chain/ca-chain.cert.pem
      SSLProxyEngine On
      SSLProxyCheckPeerCN off
      SSLProxyCheckPeerExpire off
      SSLProxyVerify none
      SSLProxyCheckPeerName off
      ProxyPass  /  https://localhost:3000/
      ProxyPass  /  https://localhost:8080/
    
      <Directory "/">
        Options FollowSymLinks
      </Directory>
    
      LogLevel warn
    </VirtualHost>
    ```
2. Set the bash variables `BRAGI_KEY`, `BRAGI_CERT` and `BRAGI_CA` to the paths of those files on your system

## Ruby setup

1. Run `bundle install` to get the Ruby dependencies for this project
2. Run the `ssl_thin.sh` bash script to start Thin using the certs you set up previously

## Javascript setup

1. Run `yarn` to install Javascript dependencies for this project
2. Run `bin/webpack-dev-server` to run the development server for Webpack

## Javascript testing
1. Run `npm run test` to execute Jest tests
2. Run `npm run test:watch` to execute Jest tests in watch mode
3. Run `npm run test:debug` to execute Jest tests in debug mode (the process will wait for a debugger to attach before executing)

## Code Structure

React components in this project will be written using the Redux approach of "Container" and "Presentational" components (also referred to as "Smart" and "Dumb"). Where possible, container and presentational components will be grouped together in the same file. Additionally, components will be grouped together into directories by domain.

Redux actions and reducers will be grouped together in [Ducks](https://github.com/erikras/ducks-modular-redux) by use case.
