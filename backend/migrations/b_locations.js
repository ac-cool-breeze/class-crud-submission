// 20210715100001_migrate.js


exports.up = function(knex) {
    return knex.schema.createTable('b_locations', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.string('name');
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('b_locations');
};