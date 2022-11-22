const { application } = require('express');
const express   = require('express');               //Importando pacote/módulo Express
const exphbs    = require('express-handlebars');    //Importando pacote/módulo Handlebars
const mysql     = require('mysql');

const app       = express(); //Instanciando o método Express

//Configurando Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Midlewares para receber dados do formulário
app.use(
    express.urlencoded({
    extended: true
    })
    );
app.use(express.json());
//Configuração para aceitar CSS
// app.use(express.static('public')); 

app.get('/usuarios', (req,res) => {

const sql = `SELECT id_usuario, nome_usuario, endereco_usuario, email_usuario, data_nascimento_usuario FROM usuario`;

comun.query(sql, (erro, usuarios) => {
if(erro){
    console.log(erro);
    return 
}
res.render('usuarios', {usuarios});
    });
});

//Mostrar detalhes de um usuário
app.get('/usuario/:id', (req, res) => {
const id = req.params.id;

const sql = `select id_usuario, 
                nome_usuario, 
                endereco_usuario, 
                email_usuario, 
                data_nascimento_usuario 
                from usuario
                where id_usuario = ${id}`;

comun.query(sql, (erro, resp) => {
if(erro){
    console.log(erro);
    return 
}
    const usuario = resp[0];
      //console.log(usuario)
    res.render('usuario', {usuario});
  
   
});

});

app.get('/usuario/delete/:id', (req, res) => {
    const id = req.params.id;
    
    const sql = `DELETE FROM usuario WHERE id_usuario = ${id}`;
    
    comun.query(sql, (erro) => {
    if(erro){
        console.log(erro);
        return 
    }
        res.redirect('/usuarios');
  
    });
    
    });

app.get('/usuario/edit/:id', (req, res) => {
    const id = req.params.id;

const sql = `select id_usuario, 
                nome_usuario, 
                endereco_usuario, 
                email_usuario, 
                data_nascimento_usuario 
                from usuario
                where id_usuario = ${id}`;

comun.query(sql, (erro, resp) => {
if(erro){
    console.log(erro);
    return 
}
    const usuario = resp[0];
    res.render('usuario-edit', {usuario});

});

});
app.post('/usuario/edit/save', (req,res) => {
    const id                  =req.body.id_usuario;
    const nome                =req.body.nome;
    const endereco            =req.body.endereco;
    const email               =req.body.email;
    const dataNascimento      =req.body.dataNascimento;

    const sql = `UPDATE usuario 
                SET nome_usuario = '${nome}',
                endereco_usuario = '${endereco}',
                email_usuario = '${email}',
                data_nascimento_usuario = '${dataNascimento}'
                where id_usuario = ${id}`;

comun.query(sql, (erro, resp) => {
    if(erro){
        console.log(erro);
        return 
    }
        res.redirect('/usuarios');
    
    });
    
});

app.post('/usuario/save', (req,res) => {
    const nome                =req.body.nome;
    const endereco            =req.body.endereco;
    const email               =req.body.email;
    const dataNascimento      =req.body.dataNascimento;
    
const sql = `INSERT INTO usuario (nome_usuario,endereco_usuario,email_usuario,data_nascimento_usuario)
VALUES ('${nome}','${endereco}','${email}','${dataNascimento}')`;
comun.query(sql, (erro) => {
if(erro){
    console.log(erro);
    return 
}
    res.redirect('/usuarios');
});

});
app.get('/clientes', (req,res) => {

const sql = `SELECT id_cliente, nome_cliente, endereco_cliente, email_cliente, cidade_cliente, cpf_cliente, data_nascimento_cliente FROM cliente`;

comun.query(sql, (erro, clientes) => {
if(erro){
    console.log(erro);
    return 
}
res.render('clientes', {clientes});
});
});

app.post('/cliente/save', (req,res) => {
    const nome                =req.body.nome;
    const endereco            =req.body.endereco;
    const email               =req.body.email;
    const cidade              =req.body.cidade;
    const cpf                 =req.body.cpf;
    const dataNascimento      =req.body.dataNascimento;
    
const sql = `INSERT INTO cliente (nome_cliente,endereco_cliente,email_cliente,cidade_cliente,cpf_cliente,data_nascimento_cliente)
VALUES ('${nome}','${endereco}','${email}','${cidade}','${cpf}','${dataNascimento}')`;
comun.query(sql, (erro) => {
if(erro){
    console.log(erro);
    return 
}
res.redirect('/cliente');
});
       
});
//Rota principal da aplicação
app.get('/', (req, res) => {
    res.render('home');
});

//Executar o servidor
const comun = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db_comum'
});
//Conectando com o banco de dados
comun.connect((erro) => {
    if (erro) {
        console.log(erro);
        return
    }
    console.log("Conectou no banco db_comum");
    app.listen(3000, () =>{
        console.log("Servidor rodando em porta 3000");
    });
});



