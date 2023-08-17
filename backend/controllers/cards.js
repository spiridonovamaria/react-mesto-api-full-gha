const Card = require('../models/card');

const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

function getInitialCards(_, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function addCard(req, res, next) {
  const { name, link } = req.body;
  const { userId } = req.user;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при создании карточки'),
        );
      } else {
        next(error);
      }
    });
}

function deleteCard(req, res, next) {
  const { id: cardId } = req.params;
  const { userId } = req.user;
  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFound('Запрашиваемая карточка не найдена');
      }

      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) {
        throw new Forbidden('Удаление запрещено');
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((deleted) => {
      if (!deleted) {
        throw new NotFound('Карточка удалена');
      }

      res.send({ data: deleted });
    })
    .catch(next);
}

function addLike(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) return res.send({ data: card });
      throw new NotFound('Запрашиваемая карточка не найдена');
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequest('Некорректные данные'));
      } return next(error);
    });
}

function deleteLike(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) return res.send({ data: card });
      throw new NotFound('Не найдена запрашиваемая карточка');
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequest('Некорректные данные'));
      } return next(error);
    });
}

module.exports = {
  getInitialCards,
  addCard,
  addLike,
  deleteLike,
  deleteCard,
};
