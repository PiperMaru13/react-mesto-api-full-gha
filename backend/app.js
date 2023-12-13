require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/apiLogger');

const { PORT = 3001, MY_DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(cors);
mongoose.connect(MY_DB)
  .then(() => {
    console.log('Connection enabled');
  })
  .catch((err) => {
    console.log(err);
  });
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(router);
app.use((req, res, next) => {
  next(
    new NotFoundError('Страница не найдена'),
  );
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
