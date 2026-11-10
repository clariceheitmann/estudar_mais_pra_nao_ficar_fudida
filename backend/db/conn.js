const {Sequelize} = require('sequelize')

const db = new Sequelize('treino8', 'root', 'senai',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = db