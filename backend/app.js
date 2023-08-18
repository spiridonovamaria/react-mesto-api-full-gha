// подключаем dotenv, чтобы секретный
// ключ из файла .env работал на сервере
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const cors = require('cors')
const { requestLogger, errorLogger } = require('./middlewares/logger');
const signup = require('./routes/signup');
const signin = require('./routes/signin');

const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const NotFound = require('./errors/NotFound');
const CentralErrorHandling = require('./middlewares/CentralErrorHandling');

const URL = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(URL).then(() => {
  console.log('Database connected');
})
  .catch(() => {
    console.log('Database not connected');
  });

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(limiter);
app.use('/', signup);
app.use('/', signin);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errors());
app.use(CentralErrorHandling);
app.use(errorLogger);

app.listen(PORT);
