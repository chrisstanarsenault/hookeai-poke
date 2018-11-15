exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_items', function (table) {
    table.increments('id').primary().unsigned();
    table.integer('quantity').notNullable();
    table.integer('order_id').unsigned().index().references('id').inTable('order').onDelete('cascade');
    table.integer('menu_id').unsigned().index().references('id').inTable('menu');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_items');
};
