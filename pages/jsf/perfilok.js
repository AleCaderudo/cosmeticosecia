const login = async (email, password) => {
    try {
        const response = await fetch('https://cosmback.vercel.app/clientes');
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const clientes = await response.json();
        const clienteEncontrado = clientes.find(cliente => cliente.email === email && cliente.pass === password);

        if (clienteEncontrado) {
            localStorage.setItem('usuarioLogado', JSON.stringify(clienteEncontrado));
            window.location.href = 'perfilok.html';
        } else {
            document.getElementById('respo').textContent = 'Usuário ou senha inválidos';
        }
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        document.getElementById('respo').textContent = 'Erro ao verificar usuário';
    }
};
