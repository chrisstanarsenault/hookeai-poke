
exports.up = function(knex, Promise) {
  return knex.schema.table('menu', function (table) {
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('menu', function(table){
    table.dropColumn('description');
  });
};

