'use strict'

const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const helmet = require('helmet')

const mainRouter = require('./router/mainRouter')
const userRouter = require('./router/userRouter')

require('express-async-errors');

class AppServer extends http.Server {
  constructor(config) {
    const app = express();
    super(app)
    this.config = config;
    this.app = app;
    this.currentConns = new Set();
    this.busy = new WeakSet();
    this.stop = false
  }
  start() {
    this.app.engine('html', require('ejs').renderFile);
    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'html');

    this.app.use('/public', express.static(__dirname + '/public'));

    this.app.use(helmet())
    this.app.use(bodyParser())
    this.app.use(cookieParser())
    this.app.use((req, res, next) => {
      console.log("나 먼저 지나간다~ 그다음 라우터 실행")
      next()
    })

    this.app.use('/', mainRouter);
    this.app.use('/user', userRouter);

    return this

  }
}

const createServer = (config = {}) => {
  const server = new AppServer();
  return server.start();
}