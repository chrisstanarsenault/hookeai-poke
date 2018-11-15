exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu', function (table) {
    table.increments('id').primary().unsigned();
    table.string('name').notNullable();
    table.integer('price').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu');
};



