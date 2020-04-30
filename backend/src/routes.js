const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const GoalController = require('./controllers/GoalController');
const GoalValuesControler = require('./controllers/GoalValuesController');

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/goals', GoalController.index);

routes.post('/goals', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    base_value: Joi.number().required()
  })
}), GoalController.create);

routes.get('/goal_values', GoalValuesControler.index);

routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    week: Joi.number().required(),
    value: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), GoalValuesControler.create);

routes.delete('/goal_values', GoalValuesControler.delete);

module.exports = routes;