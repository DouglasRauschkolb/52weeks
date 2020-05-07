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
  },

  async delete(request, response) {

    const id = request.headers.authorization;

    console.log(id);

    const goals = await connection('goals')
      .where('id', id)
      .select('id')
      .first()

    console.log(goals);

    if(goals.id !== id){
      return response.status(401).json({ erro: 'Operation not permitted' });
    }

    await connection('goals').where('id', id).delete();

    return response.status(204).send();

  }

}