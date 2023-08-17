const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlPattern } = require('../utils/constants');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  editAvatarUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlPattern),
  }),
}), editAvatarUser);

module.exports = router;
