const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']
    console.log(token)

    if(!token){
        return res.status(401).json({message: 'Token não fornecido!'})
    }

    try{
        const bytes = CryptoJS.AES.decrypt(token, CHAVE_SECRETA)
        const dadosDescriptografados = bytes.toString(CryptoJS.enc.Utf8)

        if(!dadosDescriptografados){
            return res.status(401).json({message: 'Token inválido!'})
        }

        const payload = JSON.parse(dadosDescriptografados)

        if(Date.now() > payload.expiraEm){
            return res.status(401).json({message: 'Sessão expirada!'})
        }

        req.usuario = payload
        next()
    }catch(err){
        console.error('Erro na autenticação!',err)
    }
}

module.exports = authMiddleware