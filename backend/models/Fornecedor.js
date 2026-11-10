const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Fornecedor = db.define('Fornecedor',{
    codFornecedor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cnpj:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
},{
    timestamps: false,
    tableName: 'fornecedores'
})

module.exports = Fornecedor