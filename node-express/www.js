'use strict'

const { createServer } = require('./app.js')
const option = {
  port: 80
}

const www = async (config = {}) => {
  const server = await createServer(config);
  const port = config.port;
  server.listen(port, () => {
    console.log(`서버 돌아간드아 ::: ${port}`)
  })
}

www(option)