const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Movimento = db.define('Movimento',{
    codMovimento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoMovimentacao:{
        type: DataTypes.ENUM('ENTRADA','SAIDA'),
        allowNull: false
    },
    quantidadeMovimentada:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    idProduto:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codProduto',
            model: 'produtos'
        }
    },
},{
    timestamps: false,
    tableName: 'movimentos'
})

module.exports = Movimento