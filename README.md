# Starttter

A website boilerplate, with the following features

* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) (from [H5BP initializer](http://www.initializr.com/))
* [GruntJS](http://gruntjs.com/) - with [Sass](http://sass-lang.com/download.html), [Livereload](https://github.com/gruntjs/grunt-contrib-livereload), and [JSHint](http://www.jshint.com/about/) support
* Testing - with [karma](http://karma-runner.github.io/) and [jasmine](http://pivotal.github.io/jasmine/)

## Installation

1. Prerequisites
    * [Node](http://nodejs.org/)
    * [Sass](http://sass-lang.com/download.html)
    * [GruntJS](http://gruntjs.com/)
    * [Bower](http://bower.io/)

2. Install node packages

        npm install

## Development

Start the server

    grunt

View the site at [http://localhost:7770](http://localhost:7770), or your local (internal) ip address (useful for testing on other devices). You can also run

    grunt open

To run the site on another port, use the `port` flag eg, `grunt --port=3000`

To run the site using a different livereload port (default is `35729`), use the `lrp` flag, eg, `grunt --lrp=35720`. Use this to prevent this error: `Fatal error: Port 35729 is already in use by another process.`

## Testing

Uses [karma](http://karma-runner.github.io/) and [jasmine](http://pivotal.github.io/jasmine/).

Karma is run automatically when `grunt` is called. To run it manually

    karma start

## Author

Created by [Tak Tran (ttt)](http://tutaktran.com).