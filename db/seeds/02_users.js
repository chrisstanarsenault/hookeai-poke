exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert([
          {id: 1, name: 'Alice', phone: 6471231234},
          {id: 2, name: 'Bob', phone: 6471231234},
          {id: 3, name: 'Charlie', phone: 6471231234}
        ])
      ])
  });
};


