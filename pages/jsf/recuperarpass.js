document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRecupera');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const respoDiv = document.getElementById('respo');
  
      try {
        const response = await fetch('https://cosmback.vercel.app/clientes');
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const clientes = await response.json();
        const clienteEncontrado = clientes.find(cliente => cliente.email === email);
  
        if (clienteEncontrado) {
          if (clienteEncontrado.email === email) {
            localStorage.setItem('loggedInUser', JSON.stringify(clienteEncontrado));
            window.location.href = 'recuperarpassok.html';
          } 
        } else {
          respoDiv.innerHTML = '<span class="mensagem-erro">E-mail não registrado no sistema.<br>Para efetuar seu cadastro clique <a href="../pages/cadastro.html">aqui</a><br>Ou insira um novo E-mail abaixo:<br></span>';
        }
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        respoDiv.innerHTML = '<span class="mensagem-erro">Erro ao verificar usuário</span>';
      }
    });
  });
  
