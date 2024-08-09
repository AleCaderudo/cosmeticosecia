document.addEventListener("DOMContentLoaded", function() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser && loggedInUser._id) {
      fetch(`https://cosmback.vercel.app/clientes/${loggedInUser._id}`)
          .then(response => response.json())
          .then(data => {
              document.getElementById("userId").value = loggedInUser._id;
              document.getElementById("email").value = data.email;
              document.getElementById("nome").value = data.nome;
              document.getElementById("pass").value = data.pass;
              document.getElementById("celular").value = data.celular;
              document.getElementById("cpf").value = data.cpf;
              document.getElementById("data").value = data.data;
          })
          .catch(error => console.error("Erro ao carregar dados do usuário:", error));
  }
});

document.getElementById('formCadastro').addEventListener('submit', async (event) => {
  event.preventDefault();

  const userId = document.getElementById("userId").value;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
      const responseAtualizacao = await fetch(`https://cosmback.vercel.app/clientes/${loggedInUser._id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (responseAtualizacao.ok) {
          document.getElementById('respo').textContent = 'Dados atualizados com sucesso!';

          const updatedUser = {
              _id: userId,
              email: data.email,
              nome: data.nome,
              pass: data.pass,
              celular: data.celular,
              cpf: data.cpf,
              data: data.data
          };
          localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
          document.getElementById('respo').textContent = 'Dados atualizados com sucesso';

      } else {
          document.getElementById('respo').textContent = 'Erro ao atualizar os dados.';
      }
  } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
      document.getElementById('respo').textContent = 'Erro ao atualizar os dados.';
  }
});






  