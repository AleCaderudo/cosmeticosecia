document.addEventListener("DOMContentLoaded", async () => {
    let currentPage = 1; 
    const itemsPerPage = 15;

    const fetchClientes = async () => {
        try {
            const response = await fetch('https://cosmback.vercel.app/logs');
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            const logs = await response.json();
            const lista = document.getElementById('respo');
            lista.innerHTML = ''; 

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            const logsToDisplay = logs.slice(startIndex, endIndex);

            for (const log of logsToDisplay) {
                const localizacao = await obterLocalizacaoGeografica(log.ip);
                
                const item = document.createElement('div');
                item.classList.add('product-item');
                item.innerHTML = `
                    <strong>IP:</strong> ${log.ip} - 
                    <strong>Pagina:</strong> ${log.pag} - 
                    <strong>Data:</strong> ${log.data} - 
                    <strong>Local:</strong> ${localizacao} - 
                    <button class="lixeira__compras" title="Clique aqui para remover registro" data-product-id="${log._id}">
                        <img src="lixeira1.svg" alt="Apagar Registro">
                    </button>
                    <br><br>
                `;
                lista.appendChild(item);
            }

            addDeleteEventListeners();
            updatePagination(logs.length); 
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const obterLocalizacaoGeografica = async (ip) => {
        try {
            const response = await fetch(`http://ip-api.com/json/${ip}?fields=city,region,country`);
            if (!response.ok) {
                throw new Error('Erro ao obter a localização');
            }
            const data = await response.json();
            return `${data.country} - ${data.region} - ${data.city} `;
        } catch (error) {
            console.error('Erro ao obter localização geográfica:', error);
            return 'Localização desconhecida';
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

    const deleteAllVisibleLogs = async () => {
        const items = document.querySelectorAll('.lixeira__compras');
        for (let item of items) {
            const productId = item.getAttribute('data-product-id');
            await deleteProduto(productId);
        }
        fetchClientes(); 
    };

    const updatePagination = (totalItems) => {
        const paginationElement = document.getElementById('pagination');
        paginationElement.innerHTML = '';

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('page-btn');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                fetchClientes();
            });
            paginationElement.appendChild(pageButton);
        }
    };

    document.getElementById('delete-all').addEventListener('click', deleteAllVisibleLogs);

    fetchClientes();
});
