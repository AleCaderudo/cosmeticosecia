document.addEventListener("DOMContentLoaded", async () => {
  const fetchClientes = async () => {
      try {
          const response = await fetch('https://cosmback.vercel.app/produtos');
          if (!response.ok) {
              throw new Error('Erro na requisição');
          }
          const produtos = await response.json();
          const lista = document.getElementById('respo');
          lista.innerHTML = ''; // Limpa a lista antes de adicionar novos produtos

          produtos.forEach(produto => {
              const item = document.createElement('div');
              item.classList.add('product-item');
              item.innerHTML = `
                  <strong>Código:</strong> ${produto.codigo} 
                  <strong>Nome:</strong> ${produto.nome}
                  <strong>Categoria:</strong> ${produto.categoria} 
                  <strong>Avaliação:</strong> ${produto.nota} 
                  <strong>Descrição:</strong> ${produto.descricao} 
                  <strong>Preço:</strong> R$ ${produto.preco} 
                  <strong>Imagem:</strong> <a href="../img/produtos/${produto.imagem}" target="_blank">${produto.imagem}</a>
                  <strong>Info:</strong> ${produto.informacao}
                  <button class="lixeira__compras" title="Clique aqui para remover produto" data-product-id="${produto._id}">
                      <img src="../img/lixeira1.svg" alt="Apagar Produto">
                  </button>
                  <br><br>
              `;
              lista.appendChild(item);
          });

          addDeleteEventListeners();
      } catch (error) {
          console.error('Erro ao buscar produtos:', error);
      }
  };

  const addDeleteEventListeners = () => {
      document.querySelectorAll('.lixeira__compras').forEach(button => {
          button.addEventListener('click', async (event) => {
              event.preventDefault();
              const productId = event.currentTarget.getAttribute('data-product-id');
              await deleteProduto(productId);
              fetchClientes(); // Recarrega a lista após a exclusão
          });
      });
  };

  const deleteProduto = async (id) => {
      try {
          const response = await fetch(`https://cosmback.vercel.app/produtos/${id}`, {
              method: 'DELETE',
          });
          if (!response.ok) {
              throw new Error('Erro ao deletar o produto');
          }
          console.log('Produto deletado com sucesso!');
      } catch (error) {
          console.error('Erro ao tentar deletar o produto:', error);
      }
  };

  fetchClientes();
});