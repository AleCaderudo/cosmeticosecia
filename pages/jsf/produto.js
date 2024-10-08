document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoTitulo = decodeURIComponent(urlParams.get('titulo')); 
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
        const produto = produtos.find(item => item.nome === produtoTitulo);

        if (produto) {
            const container = document.getElementById('produto-container');
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            const favoritos = loggedInUser ? (loggedInUser.favoritos || []) : [];
            const isFavorito = favoritos.includes(produto._id);
            const favoritoIcon = isFavorito ? 'FavoritosB.svg' : 'Favoritos.svg';

            container.innerHTML = `
                    <div class="card_prod">
                        <div class="card__descrição_prod">
                            <div class="card__botões">
                            <div class="container_botao_prod">
                                <button class="botões__item" title="Clique aqui para ${isFavorito ? 'retirar dos favoritos' : 'adicionar aos favoritos'}" data-product-id="${produto._id}" aria-label="${isFavorito ? 'Retirar dos Favoritos' : 'Adicionar aos Favoritos'}">
                                    <img  src="../img/${favoritoIcon}" alt="${isFavorito ? 'Retirar dos Favoritos' : 'Adicionar aos Favoritos'}">
                                </button>
                             </div>   
                             <h3 class="corpo__titulo_prod">${produto.nome}</h3>

                             

                                <div class="descrição_prod">
                                <div class="descrição__imagem_prod"><img src="../img/produtos/${produto.imagem}" class="descrição__imagem_prod_tamanho"></div><br>
                                   <div class="conteiner_conteudo">  
                                    <h1 class="descrição__produto-01_prod">${produto.descricao}</h1><br>
                                    <h3 class="titulo_avalia__produto">Avaliação do produto: <br>
                                    <img title="Produto nota ${produto.nota} na avaliação" src="../img/Estrelinhas${produto.nota}.svg" alt="${produto.nota}" style="  width: 200px; height: 50px;"></h3><br><br>
                                    <h1 class="preço">Preço : R$ ${produto.preco}</h1><br>
                                    <p class="descrição__texto_prod">${produto.informacao}</p><br><br>
                                   </div> 
                                </div>
                                    <div class="comprar_prod" title="Clique aqui para comprar"><a href="#" class="comprar" data-product-id="${produto._id}">Comprar</a></div>
                                
                            </div>
                        </div>
                    </div>
            `;

            document.querySelector('.botões__item').addEventListener('click', async (event) => {
                event.preventDefault();
                const productId = event.currentTarget.getAttribute('data-product-id');

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
                            body: JSON.stringify({ favoritos: favoritosAtuais })
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
                        logMessage('Erro ao atualizar favoritos.');
                    }
                } else {
                    logMessage('Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a>');
                }
            });

            document.querySelector('.comprar').addEventListener('click', async (event) => {
                event.preventDefault();
                const productId = event.currentTarget.getAttribute('data-product-id');

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
                            body: JSON.stringify({ compras: comprasAtuais })
                        });

                        if (response.ok) {
                            loggedInUser.compras = comprasAtuais;
                            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
                            window.location.href = 'compras.html';
                        }
                    } catch (error) {
                        logMessage('Erro ao processar a compra.');
                    }
                } else {
                    logMessage('Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a>');
                }
            });
        } else {
            document.getElementById('produto-container').innerHTML = '<p>Produto não encontrado.</p>';
        }
    } catch (error) {
        logMessage('Erro ao buscar os produtos.');
    }
});
