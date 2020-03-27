//Importar o knex
const knex = require('knex');

//importar arquivo de config do knex
const configuration = require('../../knexfile');

//definir conexao
const connection = knex(configuration.development);

module.exports = connection;

