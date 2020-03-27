//importar modulos express para dentro da constante (variavel com todas as funcoes do express);
const express = require('express');

//importar modulo de rotas feito no routes.js
const routes = require('./routes')

//importar modulo cors
const cors = require('cors');




//instanciar a aplicacao;
const app = express();

//Instaciar cors na app
app.use(cors());

//setar json para o corpo das requisicoes
app.use(express.json());

app.use(routes);

//define a porta que a app vai rodar
app.listen(3333);


