const inserirHTML = `
<header class="cabeçalho">
    <div class="container">
        <div class="hamburger" onclick="toggleSidebar(this)">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <div id="sidebar" class="sidebar">
            <h2></h2><br>
            <ul class="list">
                <a href="../pages/presentes.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Presentes</li></a>
                <a href="../pages/perfumaria.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Perfumaria</li></a>
                <a href="../pages/corpoebanho.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Corpo e Banho</li></a>
                <a href="../pages/make.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Make</li></a>
                <a href="../pages/cabelos.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Cabelos</li></a>
            </ul>
        </div>

        <a href="../index.html"><img src="../img/logo.jpeg" class="container__imagem" title="Cosméticos $ Cia"></a>
        <div class="titulo__alinhado">
            <a href="../index.html" class="container__link" title="Cosméticos $ Cia"><h1 class="container__titulo"><b class="container__titulo--negrito">Cosméticos</b> & Cia</h1></a>
        </div>
    </div>

    <!-- pesquisa 1-->
    <div class="pesquisa__area">
        <form class="form-container" id="search-form" action="../pages/busca.html" method="get">
            <input type="search" id="search-term" name="search-term" placeholder="Digite o que você procura..">
            <button type="submit"><img src="../img/lupa.png" alt="Pesquisar"></button>
        </form>
    </div>
    <div class="container">
        <a class="container__link" href="../pages/favoritos.html" >
            <img src="../img/Favoritos.svg" alt="Meus favoritos" class="container__imagem-transparente" title="Favoritos"><div id="favNum" class="numeroPeqFav"></div>
        </a>
        <a href="../pages/compras.html" id="sacola" class="container__link">
            <img src="../img/Compras.svg" alt="Carrinhos de compras" class="container__imagem" title="Sacola de compras">
            <p class="container__texto">Minhas compras</p>
        </a>&emsp;&emsp;
        <div id="dadosLogin">
            <a href="../pages/perfil.html" class="container__link"><img src="../img/Usuario.svg" alt="Meu perfil" class="container__imagem" title="Meu Perfil"><p class="container__texto">Meu perfil</p></a>
        </div>
    </div>
</header>

<section class="banner">
    <!-- pesquisa 2-->
    <form class="form-container2" id="search-form" action="../pages/busca.html" method="get">
        <input type="search" id="search-term" name="search-term" placeholder="Digite o que você procura..">
        <button type="submit"><img src="../img/lupa.png" alt="Pesquisar"></button>
    </form>
    
    <div class="dropdown">
        <a href="../pages/presentes.html" class="link__banner">Presentes</a>&emsp;
        <a href="../pages/perfumaria.html" class="link__banner">Perfumaria</a>&emsp;
        <a href="../pages/corpoebanho.html" class="link__banner">Corpo e Banho</a>&emsp;
        <a href="../pages/make.html" class="link__banner">Make</a>&emsp;
        <a href="../pages/cabelos.html" class="link__banner">Cabelos</a>&emsp;
        <a id="favNumMenu" href="../pages/favoritos.html" class="link__banner">Meus Favoritos</a>&emsp;
    </div>
</section>
`;

function inserirCodigo() {
    const corpo = document.querySelector('header');
    const inserir = document.createElement('div');
    inserir.innerHTML = inserirHTML;
    corpo.appendChild(inserir);
}

inserirCodigo();

const userNameElement = document.getElementById('user-name');
const userDadosElement = document.getElementById('dadosLogin');
const userSacola = document.getElementById('sacola');
const userFav = document.getElementById('favNum');
const userFavMenu = document.getElementById('favNumMenu')

let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


const numeroCompra = loggedInUser.compras;
const countCompra = numeroCompra.length;
if (countCompra != 0) {
    userSacola.innerHTML = ` <a href="../pages/compras.html" id="sacola" class="container__link">
    <img src="../img/Compras.svg"  alt="Carrinhos de compras" class="container__imagem" title="Sacola de compras"><div class="numeroPeq">${countCompra}</div>
    <p class="container__texto">Minhas compras</p></a> `;
}

const numeroFav = loggedInUser.favoritos;
const countFavoritos = numeroFav.length;
const numeroFavMenu = loggedInUser.favoritos;
const countFavoritosMenu = numeroFavMenu.length;

if (countFavoritosMenu === 1) {
    var plural = '' ;
} else {
    var plural = 's';
};

if (countFavoritos != 0) {
        userFav.innerHTML = ` <div  class="numeroPeq">${countFavoritos}</div> `;
        userFavMenu.innerHTML = ` <a id="favNumMenu" href="../pages/favoritos.html" class="link__banner">Você possui ${countFavoritosMenu} produto${plural} favorito${plural}  </a>`;

}


if (loggedInUser) {
    userDadosElement.innerHTML = `<a class="container__texto-link" href="../pages/perfilok.html">Olá ${loggedInUser.nome} `;    
    userNameElement.innerHTML = `<div class="formulario__container">Olá ${loggedInUser.nome} <br><br> Você esta logado no sistema com o e-mail: ${loggedInUser.email}<br><br>
    Caso não seja você, ou deseja se desconectar do site clique <a class="mensagem__user-log" href="#" id="logout-button">aqui</a><br><br>
    Caso queira editar seus dados clique <a class="mensagem__user-log" href="../pages/editarusuario.html">aqui</a></div>`;
} else {
    userDadosElement.innerHTML = `<div id="dadosLogin"><a href="../pages/perfil.html" class="container__link"><img src="../img/Usuario.svg" alt="Meu perfil" class="container__imagem" title="Meu Perfil"><p class="container__texto">Meu perfil</p></a></div>`;
    userNameElement.innerHTML = `Olá, Você não esta logado no sistema <br><br> Para efetuar o login clique <a class="mensagem__user-log" href="../pages/perfil.html"> aqui</a><br><br>
    Ou caso ainda não tenha um cadastro no site clique <a class="mensagem__user-log" href="../pages/cadastro.html"> aqui</a>`;
}


const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('pedido');
        localStorage.removeItem('contagens');

        window.location.href = '../pages/perfil.html';
    });
};


