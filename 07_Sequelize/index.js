const express     =  require('express');             //Modulo Express
const exphbs      =  require('express-handlebars');  //Modulo Handlebars
const app         =  express();                      //Classe Express 
const conn        =  require('./db/conn')    


const Clube       = require('./models/Clube');
const Endereco    = require('./models/Endereco');

//Configuração da template engine (Handlebars)
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Configuração de ormulário
app.use(express.urlencoded ({extended: true}));
app.use(express.json());

//Rotas do Clube
app.post('/clube/save', async(req,res) => {
    const nome = req.body.nome;
    let status = req.body.status;

    if (status === 'on'){
        status = true;
    }else{
        status = false;

    }

    await Clube.create({nome, status});

    res.redirect('/clubes');
});

app.get('/clubes', async(req,res) => {

    const clubes = await Clube.findAll({raw: true});

    res.render('clubes', {clubes});
})

app.get('/clube/:id', async(req,res) => {

    const id = req.params.id;

    const clube =  await Clube.findOne({include: Endereco, where: {id: id}});

    res.render('clube', {clube: clube.get({plain: true})});
});

//Excluindo clube
app.get('/clube/delete/:id', async(req,res) => {

    const id = req.params.id;

    await Clube.destroy({where: {id: id}});

    res.redirect('/clubes');

});

//Excluindo clube
app.get('/clube/edit/:id', async(req,res) => {

    const id = req.params.id;

    const clube =  await Clube.findOne({raw: true, where: {id: id}});

    res.render('clube-edit', {clube});
});

app.post('/clube/edit/save', async(req,res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    let status = req.body.status;

    if (status === 'on'){
        status = true;
    }else{
        status = false;

    }

    const clubeAlterado = {id, nome, status}

    await Clube.update(clubeAlterado, {where: {id: id}});
    
    res.redirect('/clubes')
});

//Rotas do Endereço
app.post('/endereco/save', async(req,res) => {
    const id = req.body.ClubeId;
    const logradouro = req.body.logradouro;
    const cep = req.body.cep;
    const numero = req.body.numero;
    const complemento = req.body.complemento;

    const enderecoNovo = {logradouro, cep, numero, complemento, ClubeId: id};

    await Endereco.create(enderecoNovo);
    res.redirect(`/clube/${id}`);
});
 
app.get('/enderecos',async(req,res) => {

    const clubes = await Clube.findAll({raw: true});

    res.render('clubes', {clubes});
});

app.get('/endereco/delete/:idClube/:idEndereco', async(req,res) => {
    const idClube = req.params.idClube;
    const idEndereco = req.params.idEndereco;


    await Endereco.destroy({where: {id: idEndereco}});
    res.redirect(`/clube/${idClube}`);


})

app.get('/', (req,res) => {

    res.render('home');
});

conn
.sync()
// .sync({force: true})
.then(() => {
    app.listen(3000);
}).catch((erro) => {
    console.log(erro);
});

