const fetchUltimoCliente = async () => {
    try {
        const response = await fetch('https://cosmback.vercel.app/clientes');
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const clientes = await response.json();
        const ultimoCliente = clientes[clientes.length - 1];
        const respoDiv = document.getElementById('respo');

        respoDiv.innerHTML = `Olá ${ultimoCliente.nome}, seu cadastro foi efetuado com sucesso,<br> para continuar efetue o login clicando abaixo `;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
};

fetchUltimoCliente();

