const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

  async index(request, response) {
    const goals = await connection('goals').select('*');
  
    return response.json(goals);
  },

  async create(request, response) {
    const {name, base_value} = request.body;

    const id = generateUniqueId();

    await connection('goals').insert({ 
      id,
      name,
      base_value
    });

    return response.json({ id })
  }
}