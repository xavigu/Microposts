# Babel Webpack Starter

A starter pack to build JavaScript applications using standards from ES2015, ES2016 & ES2017. It uses webpack, Babel and webpack-dev-server to compile and serve. It is fully compatible with Async/Await as it uses the Babel polyfill.

### Version
1.1.0

## Usage

### Installation

Install the dependencies

```sh
$ npm install
```

### Serve
To serve in the browser  - Runs webpack-dev-server

```sh
$ npm start
```

To run the server side:
```sh
$ npm run json:server
```

### Build
Compile and build

```sh
$ npm run build
```

## More Info

In this case, we have backend that are dealing with an API (db.json) which usually would be something built with noJS, Python, Ruby...
But in this project, we are using JSON Server which mimics a real Rest API.
In a real project, that would have to be on a server, usually a cloud server or VPS(something like Digital Ocean or Heroku where you have your backend API on)

### License

This project is licensed under the MIT License