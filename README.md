# README

This project uses rbenv to manage its Ruby version.

## SSL setup

Set the bash variables `BRAGI_KEY`, `BRAGI_CERT` and `BRAGI_CA` to the paths of those files on your system

## Ruby setup

1. Run `bundle install` to get the Ruby dependencies for this project
2. Run the `ssl_thin.sh` bash script to start Thin using the certs you set up previously

## Javascript Setup

1. Run `yarn` to install Javascript dependencies for this project
2. Run `bin/webpack-dev-server` to run the development server for Webpack