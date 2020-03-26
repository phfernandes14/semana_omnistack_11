//importar modulos express para dentro da constante (variavel com todas as funcoes do express);
const express = require('express');

//instanciar a aplicacao;
const app = express();

//definir a rota padrao;
app.get("/", (request, response)=>{
    return response.json({
        msg: 'Hello World',
        evento: 'Semana Omni Stack 11 ',
        aluno: 'Pedro Fernandes'
    });
});

//define a porta que a app vai rodar
app.listen(3333);