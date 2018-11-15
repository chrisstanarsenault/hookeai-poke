
exports.seed = function(knex, Promise) {
  return knex('menu').del()
    .then(function () {
      return Promise.all([
        knex('menu').insert({id: 1, name: 'pkb1', price: 5}),
        knex('menu').insert({id: 2, name: 'pkb2', price: 10}),
        knex('menu').insert({id: 3, name: 'pkb3', price: 8}),
        knex('menu').insert({id: 4, name: 'pkb4', price: 9}),
        knex('menu').insert({id: 5, name: 'pkb5', price: 12})
      ]);
    });
};
