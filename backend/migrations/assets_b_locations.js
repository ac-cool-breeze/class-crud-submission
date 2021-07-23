// 20210715100002_migrate.js


exports.up = function(knex) {
    return knex.schema.createTable('assets_b_locations', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.integer('assets_id');
      table.integer('locations_id');
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('assets_b_locations');
};