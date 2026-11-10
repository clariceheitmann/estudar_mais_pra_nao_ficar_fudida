const Funcionario = require('./Funcionario')
const Fornecedor = require('./Fornecedor')
const Produto = require('./Produto')
const Movimento = require('./Movimento')

Fornecedor.hasMany(Produto,{
    foreignKey: 'idFornecedor',
    as: 'produtosFornecedor',
    onDelete: 'CASCADE'
})

Produto.belongsTo(Fornecedor,{
    foreignKey: 'idFornecedor',
    as: 'fornecedorProduto',
    allowNull: false
})

Produto.hasMany(Movimento,{
    foreignKey: 'idProduto',
    as: 'movimentosProduto',
    onDelete: 'CASCADE'
})

Movimento.belongsTo(Produto,{
    foreignKey: 'idProduto',
    as: 'produtoMovimento',
    allowNull: false
})

module.exports = {Funcionario, Fornecedor, Produto, Movimento}