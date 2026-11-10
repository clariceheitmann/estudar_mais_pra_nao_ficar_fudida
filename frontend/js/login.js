const btn_login = document.getElementById('btn_login')
const resposta = document.getElementById('resposta')

btn_login.addEventListener('click', (e)=>{
    e.preventDefault()

    const valores = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
    }

    fetch(`http://localhost:3000/login`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = `<p>${dados.message}</p>`
        if(dados.token){
            localStorage.setItem('token', dados.token)
            localStorage.setItem('nomeFuncionario', dados.nome)
            location.href = '../index.html'
        }
    })
    .catch((err)=>{
        console.error('Erro ao realizar login!',err)
        resposta.innerHTML = '<p>Erro ao realizar login!</p>'
    })
})