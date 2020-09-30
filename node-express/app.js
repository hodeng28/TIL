'use strict'

const http = require('http'); // http서버를 사용할 수 있게 도와주는 패키지
const express = require('express');  // express의 모든 기능을 사용할 수 있게 해주는 패키지
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const helmet = require('helmet')

const mainRouter = require('./router/mainRouter')
const userRouter = require('./router/userRouter')
const excelRouter = require('./router/excelRouter')

const db = require('./model/db')

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
    this.set()
    this.middleWare();
    this.router()
    this.dbConnection()
    return this
  }

  set() {
    this.app.engine('html', require('ejs').renderFile);
    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'html');
  }

  middleWare() {
    this.app.use(helmet())
    this.app.use(bodyParser())
    this.app.use(cookieParser())
    this.app.use('/public', express.static(__dirname + '/public'));
  }

  router() {
    this.app.use('/', mainRouter);
    this.app.use('/user', userRouter);
    this.app.use('/excel', excelRouter);

    this.app.use((req, res, next) => {
      res.status(404)
      res.send("잘못된 경로입니다")
    })
  }
  dbConnection() {
    db.sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        return db.sequelize.sync({ force: false })
      })
      .then(() => {
        console.log('DB Sync complete.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });

  }
}

const createServer = (config = {}) => {
  const server = new AppServer(config);
  return server.start();
}

exports.createServer = createServer