exports.seed = function(knex, Promise) {
  return knex('menu').del()
    .then(function () {
      return Promise.all([
        knex('menu').insert({id: 1, name: 'The Aloha Bowl', price: 1199, description: 'ahi tuna, shoyu sesame marinade, nori, greenonions, furikake, fried onions, sriracha aioli', url: 'https://c1.staticflickr.com/5/4770/28327590049_fc7fdc91d3_n.jpg'}),
        knex('menu').insert({id: 2, name: 'Classic Ahi Tuna', price: 1499, description: 'ahi tuna, ponzu sauce, nori, green onions, shallots, sesame, avocado', url: 'https://c1.staticflickr.com/3/2836/33376463823_98925c04bd_n.jpg'}),
        knex('menu').insert({id: 3, name: 'Fresh Shrimp Bowl', price: 1099, description: 'fresh shrimp, lemon citrus sauce, tobiko, sesame, green onions, edamame', url: 'https://i.pinimg.com/originals/85/0f/1d/850f1d7694e5c073081ce0b4f0959e38.png'}),
        knex('menu').insert({id: 4, name: 'Big Wave', price: 1299, description: 'tuna, masago, avocado, cucumber, wasabi mayo, furikake, tangerines', url: 'https://c1.staticflickr.com/1/380/31104214934_8fb0fd752e_n.jpg'}),
        knex('menu').insert({id: 5, name: 'Hookeai Shack Special', price: 1499, description: 'salmon, avocado, pear, honey shoyu sauce, red cabbage, fried onion', url: 'https://c2.staticflickr.com/2/1808/41359732510_ddbff11951_n.jpg'}),
        knex('menu').insert({id: 6, name: 'Crispy Tofu', price: 1099, description: 'crispy tofu, carrot, pear, avocado, fried onions, miso tofu sauce', url: 'https://d3ce0k5v3uorqv.cloudfront.net/uploads/recipe_image/248/image/l_bb19f42e6707c8e76ec9e4db5957925a.jpg'}),
        knex('menu').insert({id: 7, name: 'Spicy Tako', price: 1199, description: 'octopus, kimchi, green onion, red caggae, corn, cucumber, furikake', url: 'https://www.seriouseats.com/images/2016/06/20160608-poke-tuna-hamachi-octopus-salmon-hawaii-recipe-15.jpg'})
      ]);
   });
};
