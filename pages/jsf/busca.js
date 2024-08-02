document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search-term').toLowerCase();
    const logDiv = document.getElementById('log');

    const logMessage = (message) => {
        logDiv.innerHTML = message + '\n';
    };

    try {
        const response = await fetch('https://cosmback.vercel.app/produtos');
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const produtos = await response.json();
        const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(searchTerm));
        const respoDiv = document.getElementById('respo');
        const respoTitulo = document.getElementById('respoTitulo');

        respoTitulo.innerHTML = `<h2 class="corpo__titulo" id="presentes">Resultado da Busca por: ${searchTerm}</h2>`;

        let currentPage = 1;
        const itemsPerPage = 4;

        const renderPage = (produtos, page) => {
            respoDiv.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedItems = produtos.slice(start, end);

            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            const favoritos = loggedInUser ? (loggedInUser.favoritos || []) : [];

            paginatedItems.forEach(produto => {
                const isFavorito = favoritos.includes(produto._id);
                const favoritoIcon = isFavorito ? 'FavoritosB.svg' : 'Favoritos.svg';

                respoDiv.innerHTML += `
                    <div class="card">
                        <div class="card__descrição">
                            <div class="card__botões">
                                <button class="botões__item" title="Clique aqui para ${isFavorito ? 'retirar dos favoritos' : 'adicionar aos favoritos'}" data-product-id="${produto._id}" aria-label="${isFavorito ? 'Retirar dos Favoritos' : 'Adicionar aos Favoritos'}">
                                    <img class="favorito-icon" src="../img/${favoritoIcon}" alt="${isFavorito ? 'Retirar dos Favoritos' : 'Adicionar aos Favoritos'}">
                                </button>
                                <div class="descrição__imagem"><img src="../img/produtos/${produto.imagem}" ></div><br>
                                <div class="descrição">
                                    <h3 class="descrição__produto">${produto.nome}</h3>
                                    <h2 class="descrição__produto-01">${produto.descricao}</h2>
                                    <img title="Produto nota ${produto.nota} na avaliação" src="../img/Estrelinhas${produto.nota}.svg" alt="${produto.nota}"><br><br>
                                    <h1 class="preço">R$ ${produto.preco}</h1><br>
                                    <p class="descrição__texto">${produto.informacao}</p><br><br>
                                    <a href="#" class="comprar" data-product-id="${produto._id}">Comprar</a>
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

                            if (favoritosAtuais.includes(productId)) {
                                favoritosAtuais = favoritosAtuais.filter(fav => fav !== productId);
                            } else {
                                favoritosAtuais.push(productId);
                            }

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
                                location.reload();
                                loggedInUser.favoritos = favoritosAtuais;
                                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

                                const imgElement = event.currentTarget.querySelector('img.favorito-icon');
                                if (imgElement) {
                                    imgElement.src = favoritosAtuais.includes(productId) ? '../img/FavoritosB.svg' : '../img/Favoritos.svg';
                                }
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
                                window.location.href = 'compras.html';
                            }
                        } catch (error) {
                        }
                    } else {
                        logMessage('Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a>');
                    }
                });
            });
        };

        const setupPagination = (produtos) => {
            const paginationDiv = document.getElementById('pagination');
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

        renderPage(produtosFiltrados, currentPage);
        setupPagination(produtosFiltrados);
    } catch (error) {
    }
});
