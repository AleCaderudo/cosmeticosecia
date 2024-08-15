document.addEventListener("DOMContentLoaded", async () => {
    const logDiv = document.getElementById('log');
    const favoritosDiv = document.getElementById('favoritos');
    const paginationDiv = document.getElementById('pagination');

    const itemsPerPage = 4; 
    let currentPage = 1; 
    let produtosFavoritos = [];

    const logMessage = (message) => {
        logDiv.style.textDecoration = 'none';
        logDiv.innerHTML += message + '\n';
    };

    const fetchFavoritos = async () => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (loggedInUser && loggedInUser._id) {
            try {
                const responseUser = await fetch(`https://cosmback.vercel.app/clientes/${loggedInUser._id}`);
                if (!responseUser.ok) {
                    throw new Error('');
                }
                const userData = await responseUser.json();
                const favoritos = userData.favoritos || [];

                if (favoritos.length === 0) {
                    logMessage('<p>Você não tem produtos favoritos.</p>') ;
                    
                }

                const responseProdutos = await fetch('https://cosmback.vercel.app/produtos');
                if (!responseProdutos.ok) {
                    throw new Error('Erro na requisição de produtos');
                }
                const produtos = await responseProdutos.json();

                produtosFavoritos = produtos.filter(produto => favoritos.includes(produto._id));
                renderPage(produtosFavoritos, currentPage);
                setupPagination(produtosFavoritos);
            } catch (error) {
            }
        } else {
            logMessage('Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a>');
        }
    };

    const renderPage = (produtos, page) => {
        favoritosDiv.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = produtos.slice(start, end);

        paginatedItems.forEach(produto => {
            favoritosDiv.innerHTML += `
                <div class="card">
                    <div class="card__descrição">
                        <div class="card__botões">
                            <button class="botões__item" title="Clique aqui para retirar dos favoritos" data-product-id="${produto._id}" aria-label="Retirar dos Favoritos">
                                <img  src="../img/FavoritosB.svg" alt="Favoritar Produto">
                            </button>
                            <div class="descrição__imagem"><img src="../img/produtos/${produto.imagem}"></div><br>
                            <div class="descrição">
                                <h3 class="descrição__produto">${produto.nome}</h3>
                                <h2 class="descrição__produto-01">${produto.descricao}</h2>
                                <img title="Produto nota ${produto.nota} na avaliação" src="../img/Estrelinhas${produto.nota}.svg" alt="${produto.nota}"><br><br>
                                <h1 class="preço">R$ ${produto.preco}</h1><br>
                                <p class="descrição__texto">${produto.informacao}</p><br><br>
                                <a href="compras.html" class="comprar" data-product-id="${produto._id}">Comprar</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        document.querySelectorAll('.botões__item').forEach(button => {
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
                        let favoritosAtuais = userData.favoritos || [];

                        favoritosAtuais = favoritosAtuais.filter(fav => fav !== productId);

                        const response = await fetch(`https://cosmback.vercel.app/clientes/${loggedInUser._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                favoritos: favoritosAtuais
                            })
                        });

                        if (response.ok) {
                            loggedInUser.favoritos = favoritosAtuais;
                            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
                            location.reload();
                            fetchFavoritos(); 
                        }
                    } catch (error) {
                    }
                } else {
                    logMessage('Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a>');
                }
            });
        });

        document.querySelectorAll('.comprar').forEach(link => {
            link.addEventListener('click', async (event) => {
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

                        comprasAtuais.push(productId);

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
                            window.location.href = "../pages/compras.html";
                        }
                    } catch (error) {
                        window.location.href = "../pages/compras.html";
                    }
                } else {
                    
                    logMessage('Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a>');
                }
            });
        });
    };

    const setupPagination = (produtos) => {
        paginationDiv.innerHTML = '';

        const pageCount = Math.ceil(produtos.length / itemsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderPage(produtos, currentPage);
            });
            paginationDiv.appendChild(pageButton);
        }
    };

    fetchFavoritos();
});
