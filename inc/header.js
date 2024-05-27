const inserirHTML = `
        		
<header class="cabeçalho">

<div class="container">
    <div class="hamburger" onclick="toggleSidebar(this)">
<div class="bar"></div>
<div class="bar"></div>
<div class="bar"></div>
</div>
<div id="sidebar"class="sidebar">
<h2></h2><br>
<ul class="list">
<a href="../pages/presentes.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Presentes</li></a>
<a href="../pages/perfumaria.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Perfumaria</li></a>
<a href="../pages/corpoebanho.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Corpo e Banho</li></a>
<a href="../pages/make.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Make</li></a>
<a href="../pages/cabelos.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Cabelos</li></a>
<a href="../pages/favoritos.html" class="container__link"><li onclick="SidebarSelection(this)" class="list-item">Meus Favoritos</li></a>
</ul>
</div>


   <a href="../index.html"><img src="../img/logo.jpeg"  class="container__imagem" title="Cosméticos $ Cia"></a>
    <div class="titulo__alinhado" >
    <a href="../index.html" class="container__link" title="Cosméticos $ Cia"><h1 class="container__titulo"><b class="container__titulo--negrito">Cosméticos</b> & Cia</h1></a>
 </div>
</div>

<!-- pesquisa 1-->
<div class="pesquisa__area">
<form class="form-container" action="#">
    <input type="search" id="search-term" name="search-term" placeholder="Digite o que você procura..">
    <button type="submit"><img src="../img/lupa.png" alt="Pesquisar"></button>
</form>
</div>
<div class="container">
    <a href="favoritos.html"><img src="../img/Favoritos.svg" alt="Meus favoritos" class="container__imagem container__imagem-transparente" title="Favoritos"></a>
    <a href="#" class="container__link"><img src="../img/Compras.svg" alt="Carrinhos de compras" class="container__imagem" title="Sacola de compras"><p class="container__texto">Minha sacola</p></a>
    <a href="../pages/perfil.html"class="container__link"><img src="../img/Usuario.svg" alt="Meu perfil" class="container__imagem" title="Meu Perfil"><p class="container__texto">Meu perfil</p></a>
</div>
</header>

<section  class="banner">

       <!-- pesquisa 2-->
               <form class="form-container2" action="#">
                <input type="search" id="search-term" name="search-term" placeholder="Digite o que você procura..">
                <button type="submit"><img src="../img/lupa.png" alt="Pesquisar"></button>
            </form>
    
			<div class="dropdown">
			  
		<a href="../pages/presentes.html" class="link__banner">Presentes</a>&emsp;
		<a href="../pages/perfumaria.html" class="link__banner">Perfumaria</a>&emsp;
		<a href="../pages/corpoebanho.html" class="link__banner">Corpo e Banho</a>&emsp;
		<a href="../pages/make.html" class="link__banner">Make</a>&emsp;
		<a href="../pages/cabelos.html" class="link__banner">Cabelos</a>&emsp;
		<a href="../pages/favoritos.html" class="link__banner">Meus Favoritos</a>&emsp;
		
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