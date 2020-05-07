const connection = require('../database/connection');

module.exports = {

  async index(request, response) {

    const [count] = await connection('goal_values').count();

    const goal_values = await connection('goal_values')
      .join('goals', 'goals.id', "=", "goal_values.goal_id")
      .select([
        'goal_values.*', 
        'goals.name', 
        'goals.base_value'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(goal_values);
  },

  async create(request, response) {
    const { week, value } = request.body;
    const goal_id = request.headers.authorization;
    const saved = false;

    //Check if exist the value for not duplicate value insert
    const goal_values = await connection('goal_values')
      .where({'goal_id': goal_id, 'week': week})
      .count('* as count')

    if(goal_values[0].count > 0){
      return response.status(401).json({ erro: 'Operation not permitted' });
    }

    await connection('goal_values').insert({ 
      goal_id,
      week,
      value,
      saved
    });

    return response.json({ goal_id, week, value });

  },

  async delete(request, response) {

    const goal_id = request.headers.authorization;

    const goal_values = await connection('goal_values')
      .where('goal_id', goal_id)
      .select('goal_id')
      .first()

    if(goal_values.goal_id !== goal_id){
      return response.status(401).json({ erro: 'Operation not permitted' });
    }

    await connection('goal_values').where('goal_id', goal_id).delete();

    return response.status(204).send();

  }
}