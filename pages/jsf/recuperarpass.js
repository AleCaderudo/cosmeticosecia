document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRecupera');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const cpf = document.getElementById('cpf').value;
      const respoDiv = document.getElementById('respo');
  
      try {
        const response = await fetch('https://cosmback.vercel.app/clientes');
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const clientes = await response.json();
        const clienteEncontrado = clientes.find(cliente => cliente.email === email && cliente.cpf === cpf);

        if (clienteEncontrado) {
            localStorage.setItem('emailRecupera', JSON.stringify(clienteEncontrado));
            window.location.href = 'recuperarpassok.html';
        } else {
            const clientePorEmail = clientes.find(cliente => cliente.email === email);
            const clientePorCpf = clientes.find(cliente => cliente.cpf === cpf);

            if (clientePorEmail && !clientePorCpf) {
                respoDiv.innerHTML = '<span class="mensagem-erro">CPF não encontrado. Por favor, verifique o número e tente novamente.</span>';
            } else if (!clientePorEmail && clientePorCpf) {
                respoDiv.innerHTML = '<span class="mensagem-erro">Email não encontrado. Por favor, verifique o endereço de email e tente novamente.</span>';
            } else {
                respoDiv.innerHTML = '<span class="mensagem-erro">Email ou CPF não encontrados ou não correspondem. Por favor verifique os dados e tente novamente.<br><br>Para efetuar um novo cadastro clique <a href="../pages/cadastro.html">aqui</a><br></span>';
            }
        }
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        respoDiv.innerHTML = '<span class="mensagem-erro">Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.</span>';
    }
});
});
  
