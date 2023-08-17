const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/autherror');

const { Schema } = mongoose;

const { urlPattern } = require('../utils/constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },

    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },

    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => urlPattern.test(url),
        message: 'Неверный URL',
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Неправильный формат почты',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },

  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password).then((matched) => {
                if (matched) return user;

                return Promise.reject(
                  new Unauthorized('Неправильные почта или пароль'),
                );
              });
            }

            return Promise.reject(
              new Unauthorized('Неправильные почта или пароль'),
            );
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
