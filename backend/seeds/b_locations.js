exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('b_locations').del()
      .then(function () {
        // Inserts seed entries
        return knex('b_locations').insert(
          {name: 'no location'}
        );
      });
  };