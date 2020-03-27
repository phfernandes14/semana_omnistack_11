//Importar modulos do express;
const express = require('express');

//Desacoplar modulo de rotas;
const routes = express.Router();

//Importar OngController
const OngController = require('./controller/OngController');
//Importar IncidentsController
const IncidentController = require('./controller/IncidentController');
//Importar ProfileController
const ProfileController = require('./controller/ProfileController');
//Importar SessionController
const SessionController = require('./controller/SessionController');

//Definir Rotas
    //Chamar Metodos

//**ONG
//Rota Post (CRIAR) 
routes.post("/ongs", OngController.create);
//Rota Get (LISTAR) 
routes.get("/ongs", OngController.index );

//**INCIDENTS
//Rota Post(CRIAR)
routes.post("/incident", IncidentController.create);
//Rota Get (LISTAR)
routes.get("/incident", IncidentController.index);
//Rota Delete(DELETAR)
//UTILIZAR ROUTE PARAMS
routes.delete("/incident/:id", IncidentController.delete)

//**PROFILE ONGS
//Rota Get(LISTAR)**INCIDENTS DE APENAS UMA ONG
routes.get("/profile/", ProfileController.index)


//**SESSION
routes.post("/sessions", SessionController.create) 



//Exportar Rotas
module.exports = routes;
 