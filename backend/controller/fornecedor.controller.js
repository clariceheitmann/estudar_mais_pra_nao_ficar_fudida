const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Fornecedor = require('../models/Fornecedor')

const cadastrar = async(req,res) =>{
    const valores = req.body 

    if(!valores.nome || !valores.cpf || !valores.cnpj){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'O CPF deve conter 11 dígitos!'})
    }

    try{
        const cpfCriptografado = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        const cnpjCriptografado = CryptoJS.AES.encrypt(valores.cnpj, CHAVE_SECRETA).toString()

        await Fornecedor.create({
            nome: valores.nome,
            cpf: cpfCriptografado,
            cnpj: cnpjCriptografado
        })

        return res.status(200).json({message: 'Fornecedor cadastrado com sucesso!'
            
        })
    }catch(err){
        console.error('Erro ao cadastrar fornecedor!',err)
        return res.status(500).json({message: 'Erro ao cadastrar fornecedor!'})
    }
}

const consultarNome = async(req,res) =>{
    const nome = req.params.nome

    try{
        const fornecedor = await Fornecedor.findOne({where: {nome: nome}})

        if(!fornecedor){
            return res.status(404).json({message: 'Fornecedor não encontrado!'})
        }

        const bytesCPF = CryptoJS.AES.decrypt(fornecedor.cpf, CHAVE_SECRETA)
        const cpfDescriptografado = bytesCPF.toString(CryptoJS.enc.Utf8)

        const bytesCNPJ = CryptoJS.AES.decrypt(fornecedor.cnpj, CHAVE_SECRETA)
        const cnpjDescriptografado = bytesCNPJ.toString(CryptoJS.enc.Utf8)

        return res.status(200).json({
            codFornecedor: fornecedor.codFornecedor,
            nome: fornecedor.nome,
            cpf: cpfDescriptografado,
            cnpj: cnpjDescriptografado
        })
    }catch(err){
        console.error('Erro ao consultar fornecedor!',err)
        return res.status(500).json({message: 'Erro ao consultar fornecedor!'})
    }
}

const atualizar = async(req,res) =>{
    const valores = req.body 
    const id = req.params.id 

    try{
        const fornecedor = await Fornecedor.findByPk(id)

        if(!fornecedor){
            return res.status(404).json({message: 'Fornecedor não encontrado!'})
        }

        const dadosAtualizados = {...valores}

        if(valores.cpf){
            if(valores.cpf.length !== 11){
            return res.status(400).json({message: 'O CPF deve conter 11 dígitos!'})
           }
           dadosAtualizados.cpf = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        }

        if(dadosAtualizados.cnpj){
            dadosAtualizados.cnpj = CryptoJS.AES.encrypt(valores.cnpj, CHAVE_SECRETA).toString()
        }

        await Fornecedor.update(dadosAtualizados, {where: {codFornecedor: id}})

        return res.status(200).json({message: 'Fornecedor atualizado com sucesso!'})
    }catch(err){
        console.error('Erro ao atualizar fornecedor!',err)
        return res.status(500).json({message: 'Erro ao atualizar fornecedor!'})
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const fornecedor = await Fornecedor.findByPk(id)

        if (!fornecedor) {
            return res.status(404).json({ message: 'Fornecedor não encontrado!' })
        }

        await Fornecedor.destroy({ where: { codFornecedor: id } })

        return res.status(200).json({ message: 'Fornecedor apagado com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar fornecedor!', err)
        return res.status(500).json({ message: 'Erro ao apagar fornecedor!' })
    }
}

module.exports = {cadastrar, consultarNome, atualizar, apagar}