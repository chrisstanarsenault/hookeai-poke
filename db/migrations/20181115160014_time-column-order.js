exports.up = function(knex, Promise) {
  return knex.schema.table('order', function (table) {
    table.dateTime('timestamp').default(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('order', function(table){
    table.dropColumn('timestamp');
  });
};
