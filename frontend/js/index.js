const verificar_log = document.getElementById('verificar_log')
const token = localStorage.setItem('token')
const nome = localStorage.setItem('nomeFuncionario')

if(token){
    verificar_log.innerHTML = `
    <span class="titulo_menu>Olá, ${nome}!</span>
    <a href="#" id="btn_logout">Logout</a>
    `

    const btn_logout = document.getElementById('btn_logout')

    btn_logout.addEventListener('click', ()=>{
        localStorage.clear()
        location.reload()
    })
}else{
    verificar_log.innerHTML = `<a href="./html/login.html">Login</a>`
}