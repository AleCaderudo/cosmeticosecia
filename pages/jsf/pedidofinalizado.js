document.addEventListener('DOMContentLoaded', async function () {
    const detalhesPedido = document.getElementById('detalhesPedido');
    const pedido = JSON.parse(localStorage.getItem('pedido'));
    const dadosUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (pedido) {
        const {
            nome,
            endereco,
            cidade,
            estado,
            cep,
            formaPagamento,
            compras
        } = pedido;

        let detalhesHtml = `
            <div class="tabela__compras__finalizadas">
                <div class="fonte__compras">
                    <p>Caro ${nome}, seu pedido foi processado e assim que confirmarmos o pagamento ele será enviado para:</p><br>
                    <p><strong>Endereço:</strong> ${endereco}</p>
                    <p><strong>Cidade:</strong> ${cidade}</p>
                    <p><strong>Estado:</strong> ${estado}</p>
                    <p><strong>CEP:</strong> ${cep}</p><br><br>
                    <p><strong>Forma de Pagamento escolhida:</strong> ${formaPagamento}</p><br>
                </div>    
            </div>    
        `;

        if (formaPagamento === 'cartao') {
            detalhesHtml += `
                <div class="tabela__compras__finalizadas">
                    <div class="fonte__compras">
                    </div>    
                </div>
            `;
        } else if (formaPagamento === 'pix') {
            detalhesHtml += `
                <div class="tabela__compras__finalizadas">
                    <div class="fonte__compras">
                    </div>
                </div>    
            `;
        } else if (formaPagamento === 'boleto') {
            detalhesHtml += `
                <div class="tabela__compras__finalizadas">
                    <div class="fonte__compras">
                    </div>
                </div>    
            `;
        }

        if (compras && compras.length > 0) {
            try {
                const produtos = await Promise.all(compras.map(id => fetch(`https://cosmback.vercel.app/produtos/${id}`).then(response => response.json())));
                let total = 0;

                detalhesHtml += `
                    <div class="tabela__compras__finalizadas">
                        <div class="fonte__compras">
                            <h3>Itens Comprados</h3>
                            <ul>
                `;

                produtos.forEach(produto => {
                    total += produto.preco * 1;
                    detalhesHtml += `
                        <div class="card__compras">
                            <img class="img__compras" src="../img/produtos/${produto.imagem}">
                            <div class="fonte__compras"><strong>Nome:</strong> ${produto.nome} - <strong> Preço:</strong> R$ ${produto.preco}</div>
                        </div><br><br>
                    `;
                });

                detalhesHtml += `
                            </ul>
                            <p><strong>Valor Total da compra:</strong> R$ ${total.toFixed(2)}</p>
                        </div>    
                    </div>    
                `;
                detalhesPedido.innerHTML = detalhesHtml;

                deletaPedido();
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                detalhesHtml += `
                    <div class="tabela__compras__finalizadas">
                        <div class="fonte__compras">
                            <p>Erro ao carregar os detalhes das compras.</p>
                        </div>    
                    </div>    
                `;
                detalhesPedido.innerHTML = detalhesHtml;
            }
        } else {
            detalhesHtml += `
                <div class="tabela__compras__finalizadas">
                    <div class="fonte__compras">
                        <p>Nenhuma compra efetuada.</p>
                    </div>    
                </div>    
            `;
            detalhesPedido.innerHTML = detalhesHtml;
        }

        async function deletaPedido() {
            try {
                const response = await fetch(`https://cosmback.vercel.app/clientes/${dadosUser._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        compras: []
                    })
                });

                if (response.ok) {
                    console.log('Compras deletadas com sucesso.');
                    dadosUser.compras = [];
                    localStorage.setItem('loggedInUser', JSON.stringify(dadosUser));
                    localStorage.removeItem('pedido');
                                        
                } else {
                    console.error('Erro ao deletar compras:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao deletar compras:', error);
            }
        }
    } else {
        detalhesPedido.innerHTML = '<p>Nenhum pedido encontrado.</p>';
    }
});
