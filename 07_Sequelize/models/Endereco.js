const {DataTypes}   =  require('sequelize');
const db            =  require('../db/conn');
const Clube         = require('./Clube');

const Endereco     = db.define('Endereco', {
    
    logradouro: {type:DataTypes.STRING(1000), allowNull: false},
    cep: {type:DataTypes.STRING(8), allowNull: false},
    numero: {type:DataTypes.STRING, allowNull: false},
    complemento: {type:DataTypes.STRING(500), allowNull: true}
});

//Um endereço pertence  a um clube
Endereco.belongsTo(Clube);
//Clube pode ter vários endereço
Clube.hasMany(Endereco);

module.exports = Endereco;