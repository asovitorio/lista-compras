// #################logica Formulário de Cadastro####################

const nome = document.getElementById('nome')
const usuario = document.getElementById('usuario')
const form = document.getElementById('form')
const senha = document.getElementById('senha')
const msg = document.getElementById('msg')
const confirmaSenha = document.getElementById('confirma-senha')
const submit = document.getElementById('submit')
console.log(msg)
submit.addEventListener('click', e => {
    if (nome.value == '') {
        e.preventDefault()
        nome.style.border = '1px solid red'
        senha.style.border = '1px solid  #207ce5'
        usuario.style.border = '1px solid #207ce5'
        confirmaSenha.style.border = '1px solid #207ce5'
        msg.style.display = 'block'
        msg.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Campo em branco!</strong> Digite seu nome completo
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>`

    } else if (usuario.value == '') {
        e.preventDefault()
        usuario.style.border = '1px solid red'
        senha.style.border = '1px solid #207ce5'
        nome.style.border = '1px solid #207ce5'
        confirmaSenha.style.border = '1px solid #207ce5'
        msg.style.display = 'block'
        msg.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Campo em branco!</strong> Digite o nome do usuário
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>`
    } else if (senha.value == '') {
        e.preventDefault()
        senha.style.border = '1px solid red'
        usuario.style.border = '1px solid #207ce5'
        nome.style.border = '1px solid #207ce5'
        confirmaSenha.style.border = '1px solid #207ce5'
        msg.style.display = 'block'
        msg.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Campo em branco!</strong> Digite uma senha
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>`
    } else if (confirmaSenha.value == '') {
        e.preventDefault()
        msg.style.display = 'none'
        confirmaSenha.style.border = '1px solid red'
        usuario.style.border = '1px solid #207ce5'
        senha.style.border = '1px solid  #207ce5'
        nome.style.border = '1px solid #207ce5'
        msg.style.display = 'block'
        msg.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Campo em branco!</strong> Confirme a senha digitada
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>`
    } else if (confirmaSenha.value != senha.value) {
        e.preventDefault()
        msg.style.display = 'none'
        confirmaSenha.style.border = '1px solid red'
        usuario.style.border = '1px solid #207ce5'
        senha.style.border = '1px solid  #207ce5'
        nome.style.border = '1px solid #207ce5'
        msg.style.display = 'block'
        msg.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>A senhas não conferem!</strong> tente novamente
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>`
    } else {

        msg.style.display = 'none'
        form.submit()

    }

})

// ################# logica Menu aside####################

let toogle = document.getElementById('toogle')
let menu = document.getElementById('menu')
toogle.addEventListener('click', (e) => {
    if (menu.className === 'menu-lateral') {
        toogle.innerHTML = `<i class='fas fa-angle-right' style='font-size:24px'></i>`
        menu.className = 'menu-lateral fechar'
    } else {
        toogle.innerHTML = `<i class='fas fa-angle-left' style='font-size:24px'></i>`
        menu.className = 'menu-lateral'
    }
})


// ################## Logica Cadastro de produtos ##########