exports.up = function(knex, Promise) {
  return knex.schema.table('order', function (table) {
    table.string('timestamp').default(new Date());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('order', function(table){
    table.dropColumn('timestamp');
  });
};
