const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'
const conn = require('./db/conn')

require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const fornecedorController = require('./controller/fornecedor.controller')
const produtoController = require('./controller/produto.controller')
const movimentoController = require('./controller/movimento.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req,res) =>{
    return res.status(200).json({message: 'Aplicação rodando!'})
})

app.use(authMiddleware)

app.post('/fornecedor', fornecedorController.cadastrar)
app.get('/fornecedor/buscar/:nome', fornecedorController.consultarNome)
app.put('/fornecedor/:id', fornecedorController.atualizar)
app.delete('/fornecedor/:id', fornecedorController.apagar)

app.post('/produto', produtoController.cadastrar)
app.put('/produto/:id', produtoController.atualizar)

app.post('/movimento', movimentoController.cadastrar)
app.get('/movimentos', movimentoController.listar)

conn.sync()
    .then(()=>{
        app.listen(PORT, hostname, ()=>{
            console.log(`Aplicação rodando em: http://${hostname}:${PORT}`)
        })
    })
.catch((err)=>{
    console.error('Erro ao se conectar com o banco de dados!')
})