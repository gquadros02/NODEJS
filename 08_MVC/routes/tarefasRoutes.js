const express           = require('express'); 
const router            = express.Router();    
const TarefaController  = require('../controllers/TarefaController');

//Rotas responsavel por exibir o formulario todas as tarefas
router.get('/', TarefaController.listarTarefas);
//Rota responsável por exibir o formulario de cadastro de tarefas
router.get('/criar', TarefaController.criarTarefa);
//Rota responsável por salvar os dados da tarefa no banco de dados
router.post('/save', TarefaController.salvarTarefa);

module.exports = router;