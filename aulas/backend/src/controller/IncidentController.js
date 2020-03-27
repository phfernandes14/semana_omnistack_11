//CONTROLLER ESPECIFICAS DAS FUNCOES DA ROTA DE INCIDENTES

//importar conexao com o banco
const connection = require('../database/connection');

module.exports= {
    //METODO CREATE
    async create(request,response){
        //Recebe os dados do corpo da requisicao
        const {title, description, value} = request.body;
        //Recebe o id do usuario pelo headear
        const ong_id = request.headers.authorization;

        //Faz o insert na tabela
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({id})
    },



    //METODO LIST
    async index(request, response){
        
        //Buscar numero total de casos
        const count = await connection('incidents').count()
        console.log(count);
        
        //Buscar numero da pag atraves do queryparams, se for null seta como 1
        const {page = 1} = request.query;
        
        const incidents = await connection('incidents')
        //join para relacionar o incindent com os dados da ong
        .join('ongs','ong_id', '=', 'incidents.ong_id')
        //Limita a 5 resultados
        .limit(5)
        //pular 5 primeiros registros
        .offset((page-1)*5)
        //Select de todos os dados to incidente e respectivos dados da ong
        .select('incidents.*','ongs.name', 'ongs.email', 'ongs.whatsapp','ongs.city','ongs.uf');

        //retornar responsta atraves do header da req
         response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
        
    
    },



    //METODO DELETE
    async delete(request,response){
        //Abstrai o id passado pelo request
        const {id} = request.params;
        //Abstrai o id do usuario logado
        const ong_id = request.headers.authorization; 
        const incident = await connection('incidents')
       //buscar o id for igual ao id passado pelo  params
        .where('id', id)
            //selecionar a coluna alvo
            .select('ong_id')
                //numero de resultados
                .first();
       
        //se o valor do parms vou diferente do ong_id do select        
        if(incident.ong_id != ong_id){
            //Retorna erro de status http
            return response.status(401).json({error:"Operation not permitted"});
        }
        await connection('incidents').where('id',id).delete();
        return response.status(204).send();
    }

}