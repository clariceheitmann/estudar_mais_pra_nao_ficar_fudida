const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Produto = require('../models/Produto')
const Fornecedor = require('../models/Fornecedor')

const cadastrar = async(req,res) =>{
    const valores = req.body 

    if(!valores.descricao || !valores.categoria || !valores.quantidadeEstoque || !valores.codigoLote || !valores.idFornecedor){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{

        const fornecedor = await Fornecedor.findByPk(valores.idFornecedor)

        if (!fornecedor) {
            return res.status(404).json({ message: 'Fornecedor não encontrado!' })
        }

        const codigoLoteCriptografado = CryptoJS.AES.encrypt(valores.codigoLote, CHAVE_SECRETA).toString()

        await Produto.create({
            descricao: valores.descricao,
            categoria: valores.categoria,
            quantidadeEstoque: valores.quantidadeEstoque,
            codigoLote: codigoLoteCriptografado,
            idFornecedor: valores.idFornecedor,
        })

        return res.status(200).json({message: 'Produto cadastrado com sucesso!'
            
        })
    }catch(err){
        console.error('Erro ao cadastrar Produto!',err)
        return res.status(500).json({message: 'Erro ao cadastrar Produto!'})
    }
}

const atualizar = async(req,res) =>{
    const valores = req.body 
    const id = req.params.id 

    try{
        const produto = await Produto.findByPk(id)

        if(!produto){
            return res.status(404).json({message: 'Produto não encontrado!'})
        }

        const dadosAtualizados = {...valores}

        if(dadosAtualizados.codigoLote){
            dadosAtualizados.codigoLote = CryptoJS.AES.encrypt(valores.codigoLote, CHAVE_SECRETA).toString()
        }

        await Produto.update(dadosAtualizados, {where: {codProduto: id}})

        return res.status(200).json({message: 'Produto atualizado com sucesso!'})
    }catch(err){
        console.error('Erro ao atualizar produto!',err)
        return res.status(500).json({message: 'Erro ao atualizar produto!'})
    }
}

module.exports = {cadastrar, atualizar}