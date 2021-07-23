const environment = process.env.NODE_ENV || 'production';   
const configuration = require('./knexfile')[environment];   
const db = require('knex')(configuration);
module.exports = db