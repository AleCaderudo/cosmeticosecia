document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const pass = document.getElementById('pass').value;
      const respoDiv = document.getElementById('respo');
  
      try {
        const response = await fetch('https://cosmback.vercel.app/clientes');
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const clientes = await response.json();
        const clienteEncontrado = clientes.find(cliente => cliente.email === email);
  
        if (clienteEncontrado) {
          if (clienteEncontrado.pass === pass) {
            localStorage.setItem('loggedInUser', JSON.stringify(clienteEncontrado));
            window.location.href = 'perfilok.html';
          } else {
            respoDiv.innerHTML = '<span class="mensagem-erro">Senha inválida</span>';
          }
        } else {
          respoDiv.innerHTML = '<span class="mensagem-erro">Usuário não registrado</span>';
        }
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        respoDiv.innerHTML = '<span class="mensagem-erro">Erro ao verificar usuário</span>';
      }
    });
  });
  
