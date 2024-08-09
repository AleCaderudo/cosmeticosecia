
document.addEventListener("DOMContentLoaded", async () => {
    const fetchClientes = async () => {
        try {
            const response = await fetch('https://cosmback.vercel.app/logs');
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            const logs = await response.json();
            const lista = document.getElementById('respo');
            lista.innerHTML = ''; 
  
            logs.forEach(log => {
                const item = document.createElement('div');
                item.classList.add('product-item');
                item.innerHTML = `
                    <strong>Data:</strong> ${log.data} - 
                    <strong>IP:</strong> ${log.ip} - 
                    <strong>Pagina:</strong> ${log.pag} - 

                    <button class="lixeira__compras" title="Clique aqui para remover registro" data-product-id="${log._id}">
                        <img src="lixeira1.svg" alt="Apagar Registro">
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
                fetchClientes(); 
            });
        });
    };
  
    const deleteProduto = async (id) => {
        try {
            const response = await fetch(`https://cosmback.vercel.app/logs/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar o log');
            }
            console.log('Log deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao tentar deletar o Log:', error);
        }
    };
  
    fetchClientes();
  });