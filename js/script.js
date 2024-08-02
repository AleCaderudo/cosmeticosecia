import ehUmCPF from "./valida-cpf.js";

const camposDoFormulario = document.querySelectorAll('[required]');
        const formulario = document.querySelector('.formulario__campo');

        formulario.addEventListener("submit", (e) => {
            e.preventDefault();

            const listaRespostas = {
                "email": e.target.elements["email"].value,
                "nome": e.target.elements["nome"].value,
                "pass": e.target.elements["pass"].value,
                "celular": e.target.elements["celular"].value,
                "cpf": e.target.elements["cpf"].value,
                "data": e.target.elements["data"].value,
                "endereco": e.target.elements["endereco"].value,
                "cidade": e.target.elements["cidade"].value,
                "estado": e.target.elements["estado"].value,
                "cep": e.target.elements["cep"].value,
                "formaPagamento": e.target.elements["formaPagamento"].value,
                "numeroCartao": e.target.elements["numeroCartao"]?.value,
                "nomeCartao": e.target.elements["nomeCartao"]?.value,
                "validadeCartao": e.target.elements["validadeCartao"]?.value,
                "cvvCartao": e.target.elements["cvvCartao"]?.value,
            };

            localStorage.setItem("pedido", JSON.stringify(listaRespostas));
            window.location.href = "../pages/pedidofinalizado.html";
        });

        camposDoFormulario.forEach((campo) => {
            campo.addEventListener("blur", () => verificaCampo(campo));
            campo.addEventListener("invalid", evento => evento.preventDefault());
        });

        const tiposDeErro = [
            'valueMissing',
            'typeMismatch',
            'patternMismatch',
            'tooShort',
            'customError'
        ];

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
            pass: {
                valueMissing: "O campo senha não pode estar vazio.",
                tooShort: "A senha deve ter no mínimo 8 caracteres.",
            },
            endereco: {
                valueMissing: "O campo endereço não pode estar vazio.",
                tooShort: "Por favor, preencha com um endereço válido."
            },
            cidade: {
                valueMissing: "O campo cidade não pode estar vazio.",
                tooShort: "Por favor, preencha com uma cidade válida."
            },
            estado: {
                valueMissing: "Por favor, selecione com um estado.",
            },
            cep: {
                valueMissing: "O campo CEP não pode estar vazio.",
            },
            formaPagamento: {
                valueMissing: "Por favor, selecione uma forma de pagamento."
            },
            numeroCartao: {
                valueMissing: "O campo numero do cartão não pode estar vazio.",
                tooShort: "Por favor, preencha com um numero válido."
            },
            nomeCartao: {
                valueMissing: "O campo nome do cartão não pode estar vazio.",
                tooShort: "Por favor, preencha com um nome válido."
            },
            validadeCartao: {
                valueMissing: "O campo validade não pode estar vazio.",
                tooShort: "Por favor, preencha com um numero válido."
            },
            cvvCartao: {
                valueMissing: "O campo CCV não pode estar vazio.",
                tooShort: "Por favor, preencha com um CCV cidade válido."
            },
            celular: {
                valueMissing: "O campo celular não pode estar vazio.",
                tooShort: "Por favor, preencha com um número válido."
            },
            cpf: {
                valueMissing: 'O campo de CPF não pode estar vazio.',
                patternMismatch: "Por favor, preencha um CPF válido.",
                customError: "O CPF digitado não existe.",
                tooShort: "O campo de CPF não tem caracteres suficientes."
            },
            data: {
                valueMissing: 'O campo de data de nascimento não pode estar vazio.',
            },
            termos: {
                valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
            }
        };

        function verificaCampo(campo) {
            let mensagem = "";
            campo.setCustomValidity('');
            if (campo.name == "cpf" && campo.value.length >= 11) {
                ehUmCPF(campo);
            }

            tiposDeErro.forEach(erro => {
                if (campo.validity[erro]) {
                    mensagem = mensagens[campo.name][erro];
                    console.log(mensagem);
                }
            });

            const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
            const validadorDeInput = campo.checkValidity();

            if (!validadorDeInput) {
                mensagemErro.textContent = mensagem;
            } else {
                mensagemErro.textContent = "";
            }
        }

        const formFinalizarPedido = document.getElementById('formFinalizarPedido');
        formFinalizarPedido.addEventListener('submit', function(event) {
            let formValid = true;

            // Valida endereço
            const endereco = document.getElementById('endereco');
            if (!endereco.value.trim()) {
                formValid = false;
                document.getElementById('erroEndereco').textContent = 'Endereço é obrigatório.';
            }

            // Valida cidade
            const cidade = document.getElementById('cidade');
            if (!cidade.value.trim()) {
                formValid = false;
                document.getElementById('erroCidade').textContent = 'Cidade é obrigatória.';
            }

            // Valida estado
            const estado = document.getElementById('estado');
            if (!estado.value.trim()) {
                formValid = false;
                document.getElementById('erroEstado').textContent = 'Estado é obrigatório.';
            }

            // Valida CEP
            const cep = document.getElementById('cep');
            const cepPattern = /^\d{5}-?\d{3}$/;
            if (!cepPattern.test(cep.value)) {
                formValid = false;
                document.getElementById('erroCep').textContent = 'CEP inválido.';
            }

            // Valida forma de pagamento
            const formaPagamento = document.getElementById('formaPagamento').value;
            if (!formaPagamento) {
                formValid = false;
                document.getElementById('erroFormaPagamento').textContent = 'Selecione uma forma de pagamento.';
            }

            // Valida campos do cartão
            if (formaPagamento === 'cartao') {
                const numeroCartao = document.getElementById('numeroCartao');
                if (!/^\d{16}$/.test(numeroCartao.value)) {
                    formValid = false;
                    document.getElementById('erroNumeroCartao').textContent = 'Número do cartão inválido.';
                }

                const nomeCartao = document.getElementById('nomeCartao');
                if (!nomeCartao.value.trim()) {
                    formValid = false;
                    document.getElementById('erroNomeCartao').textContent = 'Nome no cartão é obrigatório.';
                }

                const validadeCartao = document.getElementById('validadeCartao');
                if (!/^\d{2}\/\d{2}$/.test(validadeCartao.value)) {
                    formValid = false;
                    document.getElementById('erroValidadeCartao').textContent = 'Validade do cartão inválida.';
                }

                const cvvCartao = document.getElementById('cvvCartao');
                if (!/^\d{3}$/.test(cvvCartao.value)) {
                    formValid = false;
                    document.getElementById('erroCvvCartao').textContent = 'CVV do cartão inválido.';
                }
            }

            if (!formValid) {
                event.preventDefault(); 
                document.getElementById('erroGeral').textContent = 'Por favor, corrija os erros acima e tente novamente.';
            }
        });