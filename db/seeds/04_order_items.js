
exports.seed = function(knex, Promise) {
  return knex('order_items').del()
    .then(function () {
      return Promise.all([
        knex('order_items').insert({id: 1, quantity: 2, order_id: 1, menu_id: 1}),
        knex('order_items').insert({id: 2, quantity: 5, order_id: 1, menu_id: 3}),
        knex('order_items').insert({id: 3, quantity: 25, order_id: 1, menu_id: 4})
      ]);
    });
};
