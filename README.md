# README

This project uses rbenv to manage its Ruby version.

## Ruby setup

1. Run `bundle install` to get the Ruby dependencies for this project

## Javascript setup

1. Run `yarn` to install Javascript dependencies for this project

## Invoker

1. If it's not already installed, you'll need Invoker: `gem install invoker`
2. Run `sudo invoker setup`, which sets up a DNS resolver and firewall rule to allow Invoker to use custom domains and forward to ports 80 and 443.
3. Run `invoker start config/invoker.ini` to start Rails and Webpack.
4. Visit https://bragi.dev and https://bragijs.dev/packs/app.js in your browser to verify that Rails and Webpack assets are being served. You will most likely need to add security exceptions for both domains to trust the SSL certificate.
5. If you're having issues, restarting your machine and upgrading to a newer version of OS X are both possible solutions.

If you'd like to run a process outside of the Invoker stream (for instance, if you'd like to add a pry breakpoint in Rails and use the interactive REPL) you can comment out that application's entry in `config/invoker.ini`. You would then start the app and allow Invoker to handle its network traffic using `add_http`. For Rails, this would look like:

```bash
$ rails s -p 3001
$ invoker add_http rails 3001
```

## Javascript testing
1. Run `npm run test` to execute Jest tests
2. Run `npm run test:watch` to execute Jest tests in watch mode
3. Run `npm run test:debug` to execute Jest tests in debug mode (the process will wait for a debugger to attach before executing)

## Code Structure

React components in this project will be written using the Redux approach of "Container" and "Presentational" components (also referred to as "Smart" and "Dumb"). Where possible, container and presentational components will be grouped together in the same file. Additionally, components will be grouped together into directories by domain.

Redux actions and reducers will be grouped together in [Ducks](https://github.com/erikras/ducks-modular-redux) by use case.
