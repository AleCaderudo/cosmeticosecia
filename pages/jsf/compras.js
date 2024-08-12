document.addEventListener("DOMContentLoaded", async () => {
    const comprasContainer = document.getElementById('compras-container');
    const totalContainer = document.getElementById('total-container'); 
    const logDiv = document.getElementById('log');


    const logMessage = (message) => {
        logDiv.innerHTML += message + '\n';
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
            const favoritos = userData.favoritos || [];

            if (compras.length === 0) {
                logMessage('Nenhuma compra encontrada.');
                return;
            }

            const responseProdutos = await fetch('https://cosmback.vercel.app/produtos');
            if (!responseProdutos.ok) {
                throw new Error('Erro na requisição de produtos');
            }
            const produtos = await responseProdutos.json();
            const produtosComprados = produtos.filter(produto => compras.includes(produto._id));

            renderCompras(produtosComprados);
            calcularTotal(produtosComprados);
        } catch (error) {
        }
    };

    const renderCompras = (produtos) => {
        comprasContainer.innerHTML = '';
        produtos.forEach(produto => {
            comprasContainer.innerHTML += `
                <div class="card__compras">
                    <img class="img__compras" src="../img/produtos/${produto.imagem}">
                    <div class="fonte__compras"><strong>Nome:</strong> ${produto.nome} - <strong> Preço:</strong> R$ ${produto.preco}</div>
                    <button class="lixeira__compras" title="Clique aqui para remover produto" data-product-id="${produto._id}"><img src="../img/lixeira.svg" alt="Apagar Produto"></button>
                </div>
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
                        let favoritosAtuais = userData.favoritos || [];

                        comprasAtuais = comprasAtuais.filter(compra => compra !== productId);

                        const response = await fetch(`https://cosmback.vercel.app/clientes/${loggedInUser._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                compras: comprasAtuais
                            })
                        });

                        if (response.ok) {
                            loggedInUser.compras = comprasAtuais;
                            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
                            location.reload();
                            fetchCompras(); 
                        }
                    } catch (error) {
                    }
                } else {
                    logMessage('Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a>');
                }
            });
        });
    };

    const calcularTotal = (produtos) => {
        const total = produtos.reduce((acc, produto) => acc + produto.preco, 0);
        totalContainer.innerHTML = `
        <div style="color: red;">Obs: como se tratam de produtos fictícios, e também de um projeto de aprendizado,
        não implementei o cálculo do frete. Imagina-se que os produtos tenham o frete grátis ou agregados ao valor dos mesmos.</div>
        Total: R$ ${total.toFixed(2)}
        <button type="submit" class="formulario__botao" id="enviar" >Finalizar pedido</button>
        `;

        document.getElementById('enviar').addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'finalizarpedido.html';
        });
    };

    fetchCompras();
});
