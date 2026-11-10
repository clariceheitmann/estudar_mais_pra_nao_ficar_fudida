const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const valores = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        cnpj: document.getElementById('cnpj').value,
    }

    fetch(`http://localhost:3000/fornecedor`,{
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
        console.error('Erro ao cadastrar fornecedor!',err)
        resposta.innerHTML = '<p>Erro ao cadastrar fornecedor!</p>'
    })
})