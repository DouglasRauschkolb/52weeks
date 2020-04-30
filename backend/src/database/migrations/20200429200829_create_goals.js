exports.up = function(knex) {
  return knex.schema.createTable('goals', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.decimal('base_value').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('goals');
};
