//CONTROLER ESPECIFICAR PARA FUNCOES DAS ONGS

//importa o crypto
const crypto = require('crypto');

//importar conexao com o banco
const connection = require('../database/connection');

//controller vai exportar os metodos
module.exports = {
    //METODO CREATE
    async create(request, response){
    //Abstrair dados do corpo da requisicao
    const {name, email, whatsapp,city,uf} = request.body
    
    //**Processo para gerar o id com o crypto
        //Gerar numeral com 4 bytes e converter em hexadecimal
    const id = crypto.randomBytes(4).toString('HEX')

    //Conexao com o banco
        //Conection+Tabela+Colunas - Await para esperar a funcao terminar para passar para a proxima linha
    await connection('ongs').insert({
        id, name, email, whatsapp,city, uf
    })

    return response.json({id});
    },


    //METODO LISTAR
    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    }
}