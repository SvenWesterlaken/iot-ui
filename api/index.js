const express = require('express');
const parser = require('body-parser');
const passport = require('passport');

const config = require('./config/env');
const middleware = require('./config/middleware');

const api_v1 = require('./routes/v1');
const basic = require('./controllers/basic');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(middleware.protectionHeaders);
app.use(middleware.preflightHandler);

app.set('SECRET_KEY', config.secretkey);
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(passport.initialize());

app.use('/api/v1', api_v1);

app.use(middleware.errorHandler);
app.all('*', basic.notFound);

server.listen(config.port, () => {
  console.log(`Running on port: ${config.port}`);
  console.log(`If run locally: http://localhost:${config.port}`)
});

const moment = require('moment');

const getRandomValue = () => {
    return {
      date: moment.now(),
      sensor1: Math.random(),
      sensor2: Math.random()
    }
}

io.on('connection', (socket) => {

  console.log('Client connected!');
  setInterval(() => {
    socket.emit("sensors", getRandomValue());
  }, 1000)

})

module.exports = app;
