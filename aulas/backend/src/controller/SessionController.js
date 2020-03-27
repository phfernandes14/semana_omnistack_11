//Importar conexao com o banco
const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        //Abstrai id no corpo da requisicao
        const {id} = request.body
        
        const ong = await connection('ongs').where('id', id)
        .select('name')
        .first();

        if(!ong){
            return response.status(400).json({
                error:"Not ong found with this ID"
            })
        };
        return response.json(ong);
    }
}