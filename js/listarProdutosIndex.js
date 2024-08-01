document.addEventListener("DOMContentLoaded", async () => {
  const logDiv = document.getElementById('log');

  const logMessage = (message) => {
      logDiv.innerHTML = message + '\n';
  };

  const fetchProdutos = async () => {
      try {
          const response = await fetch('https://cosmback.vercel.app/produtos');
          if (!response.ok) {
              throw new Error('Erro na requisição');
          }
          const produtos = await response.json();

          const renderProdutos = (produtos, containerId) => {
            const lista = document.getElementById(containerId);
            lista.innerHTML = '';
        
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            const favoritos = loggedInUser ? (loggedInUser.favoritos || []) : [];
        
            produtos.forEach(produto => {
                const isFavorito = favoritos.includes(produto._id);
                const favoritoIcon = isFavorito ? 'FavoritosB.svg' : 'Favoritos.svg';
        
                const item = document.createElement('div');
                item.innerHTML = `
                <div class="card">
                    <div class="card__descrição">
                        <div class="card__botões">
                            <button class="botões__item" title="Clique aqui para adicionar/retirar dos favoritos" data-product-id="${produto._id}" aria-label="Favoritar Produto">
                                <img class="favorito-icon" src="../img/${favoritoIcon}" alt="Favoritar Produto">
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
                lista.appendChild(item);
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
                            logMessage('Erro ao atualizar favoritos: ' + error.message);
                        }
                    } else {
                        logMessage('Usuário não logado, para efetuar o login clique <a href="./pages/perfil.html">aqui</a>');
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
                                logMessage('Produto adicionado às compras com sucesso!');
                                loggedInUser.compras = comprasAtuais;
                                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
                                window.location.href = './pages/compras.html';
                            }
                        } catch (error) {
                            logMessage('Erro ao adicionar produto às compras: ' + error.message);
                        }
                    } else {
                        logMessage('Usuário não logado, para efetuar o login clique <a href="./pages/perfil.html">aqui</a>');
                    }
                });
            });
        };
        

          const produtosPorNota = produtos.slice().sort((a, b) => b.nota - a.nota);
          const top4ProdutosNota = produtosPorNota.slice(0, 4);
          renderProdutos(top4ProdutosNota, 'respoNota');

          const produtosPorPrecoAsc = produtos.slice().sort((a, b) => a.preco - b.preco);
          const top4ProdutosPrecoAsc = produtosPorPrecoAsc.slice(0, 4);
          renderProdutos(top4ProdutosPrecoAsc, 'respoPreco');
          
      } catch (error) {
          logMessage('Erro ao buscar produtos: ' + error.message);
      }
  };

  fetchProdutos();
});
