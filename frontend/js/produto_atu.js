const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', (e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    const valores = {
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        quantidadeEstoque: document.getElementById('quantidadeEstoque').value,
        codigoLote: document.getElementById('codigoLote').value,
        idFornecedor: document.getElementById('idFornecedor').value,
    }

    fetch(`http://localhost:3000/produto/${id}`,{
        method: 'PUT',
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
        console.error('Erro ao atualizar produto!',err)
        resposta.innerHTML = '<p>Erro ao atualizar produto!</p>'
    })
})