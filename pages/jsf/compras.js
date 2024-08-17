document.addEventListener("DOMContentLoaded", async () => {
    const comprasContainer = document.getElementById('compras-container');
    const totalContainer = document.getElementById('total-container'); 
    const logDiv = document.getElementById('log');

    const logMessage = (message) => {
        logDiv.innerHTML += message + '<br>';
    };

    const fetchCompras = async () => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedInUser || !loggedInUser._id) {
            logMessage('Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a>');
            return;
        }

        try {
            const responseUser = await fetch(`https://cosmback.vercel.app/clientes/${loggedInUser._id}`);
            if (!responseUser.ok) {
                throw new Error('Erro ao buscar dados do usuário');
            }
            const userData = await responseUser.json();
            const compras = userData.compras || [];

            if (compras.length === 0) {
                logMessage('Nenhuma compra encontrada.');
                return;
            }

            const responseProdutos = await fetch('https://cosmback.vercel.app/produtos');
            if (!responseProdutos.ok) {
                throw new Error('Erro na requisição de produtos');
            }
            const produtos = await responseProdutos.json();

            // Contar quantas vezes cada produto aparece na lista de compras
            const contagemProdutos = compras.reduce((acc, produtoId) => {
                acc[produtoId] = (acc[produtoId] || 0) + 1;
                return acc;
            }, {});

            const produtosComprados = produtos.filter(produto => compras.includes(produto._id));

            if (produtosComprados.length === 0) {
                logMessage('Nenhum produto correspondente encontrado.');
                return;
            }

            renderCompras(produtosComprados, contagemProdutos);
            calcularTotal(produtosComprados, contagemProdutos);
        } catch (error) {
            logMessage('Ocorreu um erro ao buscar as compras: ' + error.message);
        }
    };

    const renderCompras = (produtos, contagemProdutos) => {
        comprasContainer.innerHTML = '';
        produtos.forEach(produto => {
            const quantidade = contagemProdutos[produto._id] || 1; 
            const somaquantidade = quantidade * produto.preco;
            comprasContainer.innerHTML += `
                <div class="centralizar_compras">
                    <div class="card__compras">
                        <img class="img__compras" src="../img/produtos/${produto.imagem}" alt="${produto.nome}">
                        <div class="fonte__compras">
                            <strong>Nome:</strong> ${produto.nome} - <strong>Quantidade:</strong> ${quantidade} - 
                            <strong>Preço:</strong> R$ ${somaquantidade.toFixed(2)} 
                        </div>
                        <button class="lixeira__compras" title="Clique aqui para remover produto" data-product-id="${produto._id}">
                            <img src="../img/lixeira.svg" alt="Apagar Produto">
                        </button>
                    </div>
                </div><br><br>
            `;
        });
        addDeleteEventListeners();
    };

    const addDeleteEventListeners = () => {
        document.querySelectorAll('.lixeira__compras').forEach(button => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                const productId = event.currentTarget.getAttribute('data-product-id');
                const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

                if (loggedInUser && loggedInUser._id) {
                    try {
                        const responseUser = await fetch(`https://cosmback.vercel.app/clientes/${loggedInUser._id}`);
                        if (!responseUser.ok) {
                            throw new Error('Erro ao buscar dados do usuário');
                        }
                        const userData = await responseUser.json();
                        let comprasAtuais = userData.compras || [];

                        // Remove apenas uma ocorrência do produto
                        const index = comprasAtuais.indexOf(productId);
                        if (index !== -1) {
                            comprasAtuais.splice(index, 1);
                        }

                        const response = await fetch(`https://cosmback.vercel.app/clientes/${loggedInUser._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ compras: comprasAtuais })
                        });

                        if (response.ok) {
                            loggedInUser.compras = comprasAtuais;
                            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
                            location.reload();
                            fetchCompras(); 

                        }
                    } catch (error) {
                        logMessage('Ocorreu um erro ao remover o produto: ' + error.message);
                    }
                } else {
                    logMessage('Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a>');
                }
            });
        });
    };

    const calcularTotal = (produtos, contagemProdutos) => {
        const total = produtos.reduce((acc, produto) => acc + (produto.preco * (contagemProdutos[produto._id] || 1)), 0);
        totalContainer.innerHTML = `
            <div class="mensagem_aviso">
                Obs: como se tratam de produtos fictícios, e também de um projeto de aprendizado,
                não implementei o cálculo do frete. Imagina-se que os produtos tenham o frete grátis ou agregados ao valor dos mesmos.
            </div><br>
            Total: R$ ${total.toFixed(2)}
            <button type="submit" class="formulario__botao" id="enviar" title="Clique aqui para finalizar o pedido">Finalizar pedido</button>
        `;

        document.getElementById('enviar').addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'finalizarpedido.html';
        });
    };

    fetchCompras();
});
