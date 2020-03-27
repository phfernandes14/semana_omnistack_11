//CONTROLER QUE EH RESPONSAVEL PELOS CASOS ESPECIFICOS DE APENAS UMA ONG

//importar conexao com o banco
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
        .where('ong_id',ong_id)
        .select('*')
        return response.json(incidents)
    }
}