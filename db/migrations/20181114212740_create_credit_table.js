exports.up = function(knex, Promise) {
  return knex.schema.createTable('credit', function (table) {
    table.integer('card').notNullable();
    table.string('expiry').notNullable();
    table.integer('ccv').notNullable();
    table.integer('user_id').unsigned().index().references('id').inTable('users');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('credit');
};



// table.bigInteger('AddressId').unsigned().index().references('id').inTable('Address')
