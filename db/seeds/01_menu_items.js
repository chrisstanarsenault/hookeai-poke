exports.seed = function(knex, Promise) {
  return knex('order').del()
    .then(function () {
      return Promise.all([
        knex('menu').insert({id: 1, name: 'Poke Bowl 1', price: 5, description: 'This is Poke Bowl 1'}),
        knex('menu').insert({id: 2, name: 'Poke Bowl 2', price: 10, description: 'This is Poke Bowl 2'}),
        knex('menu').insert({id: 3, name: 'Poke Bowl 3', price: 8, description: 'This is Poke Bowl 3'}),
        knex('menu').insert({id: 4, name: 'Poke Bowl 4', price: 9, description: 'This is Poke Bowl 4'}),
        knex('menu').insert({id: 5, name: 'Poke Bowl 5', price: 12, description: 'This is Poke Bowl 5'})
      ]);
   });
};
