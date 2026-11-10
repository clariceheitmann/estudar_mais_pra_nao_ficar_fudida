const Produto = require('../models/Produto')
const Movimento = require('../models/Movimento')

const cadastrar = async(req,res) =>{
    const valores = req.body 

    if(!valores.tipoMovimentacao || !valores.quantidadeMovimentada || !valores.data || !valores.idProduto){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try {
        const produto = await Produto.findByPk(valores.idProduto)

        if(!produto){
            return res.status(404).json({message: 'Produto não encontrado!'})
        }

        let novoEstoque = 0

        if(valores.tipoMovimentacao === 'ENTRADA'){
            novoEstoque = Number(valores.quantidadeMovimentada) + Number(produto.quantidadeEstoque)
        }else if(valores.tipoMovimentacao === 'SAIDA'){
            if(produto.quantidadeEstoque < valores.quantidadeMovimentada){
                return res.status(400).json({message: "Quantidade insuficiente!"})
            }else{
                novoEstoque = produto.quantidadeEstoque - valores.quantidadeMovimentada
            }
        }else{
            return res.status(400).json({message: 'Tipo de movimentação inválido!'})
        }
        
        await Produto.update({quantidadeEstoque: novoEstoque}, {where:{codProduto: valores.idProduto}})

        await Movimento.create({
            tipoMovimentacao: valores.tipoMovimentacao,
            quantidadeMovimentada: valores.quantidadeMovimentada,
            data: valores.data,
            idProduto: valores.idProduto
        })

        return res.status(201).json({message: 'Movimento cadastrado com sucesso!'})

    }catch(err){
        console.error('Erro ao cadastrar movimento!',err)
        return res.status(500).json({message: 'Erro ao cadastrar movimento!'})
    }
}


const listar = async (req, res) => {

    try {

        const dados = await Movimento.findAll({

            include: [
                {
                    model: Produto,
                    as: 'produtoMovimento',
                    attributes: ['codProduto', 'descricao']
                }
            ],

            order: [
                ['data', 'DESC']
            ]
        })

        return res.status(200).json(dados)

    }catch (err) {
        console.error('Erro ao listar movimentações!', err)
        return res.status(500).json({message: 'Erro ao listar movimentações!'})
    }
}

module.exports = {cadastrar, listar}
