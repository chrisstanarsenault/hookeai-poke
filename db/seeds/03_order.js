exports.seed = function(knex, Promise) {
  return knex('order').del()
    .then(function () {
      return Promise.all([
        knex('order').insert({id: 1, user_id: 1}),
      ]);
  });
};
