exports.up = function(knex, Promise) {
  return knex.schema.createTable('payment', function (table) {
    table.string('card').notNullable();
    table.string('expiry').notNullable();
    table.integer('ccv').notNullable();
    table.integer('user_id').unsigned().index().references('id').inTable('users');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('credit');
};



