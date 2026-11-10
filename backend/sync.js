const {Funcionario, Fornecedor, Produto, Movimento} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase(){
    try{
        await conn.sync()
        console.log('Tabelas criadas e sincronizadas!')
    }catch(err){
        console.error('Erro ao criar e sincronizar tabelas!',err)
    }finally{
        await conn.close()
        console.log('Fechanco conexão com o banco de dados!')
    }
}

syncDataBase()