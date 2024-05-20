import ehUmCPF from "./valida-cpf.js";

const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "email": e.target.elements["email"].value,
        "nome": e.target.elements["nome"].value,
        "celular": e.target.elements["celular"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    window.location.href = "perfil-resposta.html";
})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    celular: {
        valueMissing: "O campo celular não pode estar vazio.",
        tooShort: "Por favor, preencha com um numero válido."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }

    tiposDeErro.forEach(erro => { if (campo.validity[erro]) {mensagem = mensagens[campo.name][erro]; console.log(mensagem); }})

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}