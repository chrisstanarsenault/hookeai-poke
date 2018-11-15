exports.seed = function(knex, Promise) {
  return knex('menu').del()
    .then(function () {
      return Promise.all([
        knex('menu').insert({id: 1, name: 'Classic Ahi Tuna', price: 1499, description: 'ahi tuna, shoyu sesame marinade, nori, green onions, shallots, sesame, avocado'}),
        knex('menu').insert({id: 2, name: 'Wasabi Shrimp', price: 1099, description: 'fresh shrimp, shoyu wasabi marinade, tobiko, sesame, green onions, edamame'}),
        knex('menu').insert({id: 3, name: 'Hawaiian Classic', price: 1399, description: 'ahi tuna, sweet soy marinade, shallots, togarashi mayo, edamame'}),
        knex('menu').insert({id: 4, name: 'Big Wave', price: 1299, description: 'salmon, masago, avocado, cucumber, wasabi mayo, furikake, tangerines'}),
        knex('menu').insert({id: 5, name: 'Hookeai Shack Special', price: 1499, description: 'salmon, avocado, pear, honey shoyu sauce, red cabbage, fried onion'}),
        knex('menu').insert({id: 6, name: 'Spicy Salmon', price: 1199, description: 'salmon, spicy mayo, nori, greenonions, furikake, fried onions, sriracha aioli'}),
        knex('menu').insert({id: 7, name: 'Smokey Tofu', price: 1099, description: 'smoked tofu, carrot, pear, avocado, fried onions, miso tofu sauce '}),
        knex('menu').insert({id: 8, name: 'Spicy Scallop', price: 1199, description: 'scallop, spicy mayo, green onion, red caggae, corn, cucumber, furikake'})
      ]);
   });
};
