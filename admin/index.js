const form = document.getElementById('loginForm');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    fetch('userpass.json')
        .then(response => response.json())
        .then(data => {
            const usuarios = data.usuarios;
            let usuarioEncontrado = false;

            usuarios.forEach(user => {
                if (user.usuario === usuario && user.senha === senha) {
                    usuarioEncontrado = true;
                }
            });

            if (usuarioEncontrado) {
                window.location.href = "cadastrarProdutos.html";
                mensagem.textContent = 'Login realizado com sucesso!';                
            } else {
                mensagem.textContent = 'Usuário ou senha inválidos.';
            }
        });
});



