document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const email = data.email;

    try {
        const responseVerificacao = await fetch('https://cosmback.vercel.app/clientes');
        if (!responseVerificacao.ok) {
            throw new Error('Erro na requisição de verificação');
        }
        const clientes = await responseVerificacao.json();
        const emailJaCadastrado = clientes.some(cliente => cliente.email === email);

        if (emailJaCadastrado) {
            document.getElementById('respo').innerHTML = '<span class="mensagem-erro">E-mail já cadastrado, caso tenha esquecido a senha clique <a href="recuperarpass.html">Aqui</a></span>';
            return;
        }

        const responseCadastro = await fetch('https://cosmback.vercel.app/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (responseCadastro.ok) {
            window.location.href = "cadastrook.html";
        } else {
            document.getElementById('respo').textContent = 'Erro ao realizar o cadastro.';
        }
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        document.getElementById('respo').textContent = 'Erro ao realizar o cadastro.';
    }
});
