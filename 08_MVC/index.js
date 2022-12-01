const express   = require('express');
const exphbs    = require('express-handlebars');
const conn      = require('./db/conn');
const app       = express();

//Configurando Template Engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Models
const Tarefa = require('./models/Tarefa');

//Importando rotas
const tarefasRoutes = require('./routes/tarefasRoutes');
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Midlewares para receber dados do formulário
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Rotas de aplicação
app.use('/tarefas', tarefasRoutes);

conn.sync()
.then(
app.listen(3000)
).catch((erro) => console.log(erro));
