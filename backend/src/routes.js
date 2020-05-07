const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const GoalController = require('./controllers/GoalController');
const GoalValuesController = require('./controllers/GoalValuesController');

const routes = express.Router();

//Route for search the goals registered
routes.get('/goals', GoalController.index);

//Route for create a ner goal
routes.post('/goals', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    base_value: Joi.number().required()
  })
}), GoalController.create);

//Route for delete goals
routes.delete('/goals', GoalController.delete);

//Route for list the values of on goal
routes.get('/goal_values', GoalValuesController.index);

//Route for create a list of values for one goal
routes.post('/goal_values', celebrate({
  [Segments.BODY]: Joi.object().keys({
    week: Joi.number().required(),
    value: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), GoalValuesController.create);

//Route for delete the values of one goal
routes.delete('/goal_values', GoalValuesController.delete);

module.exports = routes;