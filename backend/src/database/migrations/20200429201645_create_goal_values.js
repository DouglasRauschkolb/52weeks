exports.up = function(knex) {
  return knex.schema.createTable('goal_values', function(table){
  
    table.string('goal_id').notNullable();
    table.integer('week').notNullable();
    table.decimal('value').notNullable();
    table.boolean('saved').notNullable();
    
    table.primary(['goal_id', 'week']);
    table.foreign('goal_id').references('id').inTable('goals');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('goal_values');
};
