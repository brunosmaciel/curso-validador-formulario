class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const camposValidos = this.camposSaoValidos()
        const senhasValias = this.senhasSaoValidas()

        if (camposValidos && senhasValias) {
            alert('Formulario Enviado')
            this.formulario.submit()

        }


    }
    senhasSaoValidas() {
        let valid = true
        const senha = this.formulario.querySelector('.senha')
        const repetirSenha = this.formulario.querySelector('.repetir-senha')
        if (senha.value !== repetirSenha.value) {
            valid = false
            this.criaErro(senha, 'Senhas nao coincidem')
            this.criaErro(repetirSenha, 'Senhas nao coincidem')
        }
        if (senha.length < 6 || senha.length > 12) {
            valid = false
            this.criaErro(senha, 'A senha precisa ter entre 6 e 12 caracteres')
        }
        return valid
    }
    camposSaoValidos() {
        let valid = true
        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }
        for (let campo of this.formulario.querySelectorAll('.validar')) {

            if (!campo.value) {
                this.criaErro(campo, `Campo "${campo.name}" nao pode estar em branco`)
                valid = false
            }
            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valid = false
            }
            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false
            }


        }
        return valid

    }


    validaUsuario(campo) {
        const usuario = campo.value
        let valid = true
        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuario precisa ter entre 3 e 12 letras')
            valid = false
        }
        if (!usuario.match(/^[a-za-z0-9]+$/g)) {
            this.criaErro(campo, 'Usuario precisa conter apenas letras e numeros')
            valid = false
        }
        return valid
    }
    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value)
        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF invalido')
            return false
        }
        return true
    }
    criaErro(campo, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }
}

const validaFormulario = new ValidaFormulario()