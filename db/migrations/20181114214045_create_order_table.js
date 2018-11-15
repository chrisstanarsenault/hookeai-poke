exports.up = function(knex, Promise) {
  return knex.schema.createTable('order', function (table) {
    table.increments('id').primary().unsigned();
    table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order');
};
