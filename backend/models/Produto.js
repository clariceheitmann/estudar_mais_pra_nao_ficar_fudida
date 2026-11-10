const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('Produto',{
    codProduto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    categoria:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quantidadeEstoque:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigoLote:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idFornecedor:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codFornecedor',
            model: 'fornecedores'
        }
    },
},{
    timestamps: false,
    tableName: 'produtos'
})

module.exports = Produto