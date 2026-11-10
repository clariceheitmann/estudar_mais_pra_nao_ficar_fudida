const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const valores = {
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        quantidadeEstoque: document.getElementById('quantidadeEstoque').value,
        codigoLote: document.getElementById('codigoLote').value,
        idFornecedor: document.getElementById('idFornecedor').value,
    }

    fetch(`http://localhost:3000/produto`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token
        },
        body: JSON.stringify(valores)
    })
    .then(res => {
        if(res.status === 401){
            localStorage.clear()
            alert('Sessão expirada!')
            location.href = '../index.html'
            throw new Error('Sessão expirada!')
        }
        return res.json()
    })
    .then(dados =>{
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar produto!',err)
        resposta.innerHTML = '<p>Erro ao cadastrar produto!</p>'
    })
})