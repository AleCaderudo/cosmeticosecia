# <h2 align="center">Cosmeticosecia</h2>

<p align="center">https://cosmeticosecia.vercel.app/</p>

Site versão final do treinamento Alura e Desenvolve 2024.<br><br>
<strong>Objetivo:</strong> Criar um sistema de loja virtual de cosméticos com responsividade e integração do front-end e back-end.<br><br>
Nele utilizei tecnologia Javascript e banco de dados Mongo Db Atlas, optei por separar a API desse projeto em outro repositório por questão de segurança dos dados nela inseridos. Para acessar a API https://cosmback.vercel.app.<br><br>
Neste projeto procurei dar ênfase a funcionalidade e integração dos componentes, front-end e back-end em detrimento ao design, já que o treinamento é focado nestes aspectos.<br><br>
<strong>Implementações e funcionalidades:</strong><br><br>
<strong>Responsividade:</strong> O design e a posição de alguns componentes mudam de acordo com o tamanho da tela. Como por exemplo o menu hamburguer que some ou aparece e o formulário de procura que muda de forma e posição, os ícones superiores bem como seus enunciados também se modificam.<br><br>
<strong>Interatividade:</strong> Desenvolvi funcionalidades interativas e dinâmicas com JavaScript, como um menu hamburguer, um slide interativo na página inicial e alguns efeitos de mouse no menu principal.<br><br>
<strong>Interatividade Front-end e Back-end:</strong><br><br>
<strong>Avaliação dos produtos:</strong> Mostra a avaliação do produto de acordo com a sua nota.<br> São mostradas “estrelas” e ao passar o mouse também é informado a sua nota de avaliação armazenada no banco de dados, notas essas que vão de 1 a 5.<br><br>
<strong>Procura:</strong> Procura pelo nome do produto cadastrado no banco de dados e exibe na tela com paginação. <br><br>
<strong>Sistema de login e cadastro:</strong> Ao clicar em favoritar produtos, comprar ou clicar no ícone/meus favoritos ou ainda na sacola de compras, é exibido um aviso que o cliente não está logado, com um link levado a área de login.<br><br> 
Na área de login existe 2 campos para autenticação, e-mail e senha. Caso o e-mail do cliente não esteja registrado o sistema vai emitir um aviso de “Usuário não registrado”, Caso e e-mail esteja registrado mas a senha não confira, o sistema vai retornar um aviso de “Senha inválida”. Para efetuar o cadastro, basca clicar em “Clique aqui para se cadastrar”. Após abrirá uma página com formulário de autenticação, com suas respectivas validações, caso o e-mail já esteja registrado, o formulário vai emitir um aviso redirecionando para pagina de recuperar senha.<br><br>
     Após o cadastro o sistema vai confirmar, exibir o nome do usuário e exibir o botão “Acessar” para que o usuário possa inserir os dados cadastrados e acessar o sistema.<br><br> Também vai ser substituído o ícone “meu perfil”, pelo nome do usuário em forma de link que ao clica-lo, acessará uma pagina com o nome do usuário, o seu e-mail, e mais 2 links. O primeiro é a opção de sair do sistema, ao clica-lo, o usuário sai do sistema e reaparece a página de login. No segundo, a opção de editar os dados do cliente, ao acessar abrirá um formulário já preenchido com esses dados, basta trocar qualquer dado e clicar no botão “Atualizar, que o sistema retornará um aviso confirmando a mudança.<br><br>
<strong>Favoritar produtos:</strong> Cada produto possui uma imagem/botão no canto superior esquerdo, que só pode ser acessado após o cliente estar logado no site, ao clicar adiciona o produto ao grupo de produtos favoritos. Após essa adição o botão muda e passa a ficar preenchido, ao clica-lo novamente o produto sai do grupo de favoritos e o botão volta ao normal. Pode-se acessar os favoritos através do link meus favoritos onde serão listados com paginação. <br><br>
<strong>Recuperar senha:</strong> Caso ao tentar efetuar o Login, o cliente tenha esquecido a senha cadastrado, ele pode recupera-la acessando https://cosmeticosecia.vercel.app/pages/recuperarpass.html . Nesta área basta o cliente digitar seu e-mail e CPF, que o sistema lhe retornará sua senha. <br><br>
<strong>Sistema de compras:</strong> Cada produto tem um botão "comprar", que só pode ser acessado após o cliente estar logado no site. Ao clicar sobre ele adiciona o mesmo na sacola de compras, e o cliente é direcionado a área de compras, que também é acessada através do ícone referente na parte superior do site. Pode se adicionar quantos produtos forem necessários. Nesta área são visualizados os produtos de forma resumida com a opção de retirar o produto da lista de compras clicando no ícone da lixeira, é mostrado o valor total dos produtos adicionados.<br><br>
    Ao clicar no botão “Finalizar pedido” é exibido o nome do usuário e um formulário de endereço e formas de pagamento com suas respectivas validações. Por uma questão de arquitetura optei por não gravar esses dados no banco de dados, ficando apenas armazenados na local storage. As formas de pagamento são 3: Pix, Boleto e Cartão. Ao seleciona-las abre-se uma nova área junto ao formulário.<br> Pix: é exibido uma imagem qrcode. <br>Boleto: uma imagem de código de barras.<br> Cartão: novos campos referentes a essa área serão adicionados.<br><br>
     Após preenchimento obrigatório dos campos de endereço, (os campos do cartão preferi que não fossem obrigatórios), pode-se clicar novamente em “Finalizar pedido”, acessando a página final da área de compras. Nesta pagina são exibidos uma mensagem de pedido finalizado, o nome do usuário logado o endereço, a forma de pagamento, os produtos adquiridos e o valor total deles.<br><br>
<strong>Area de administração:</strong> Criei uma área para administrar os produtos do site que pode ser acessada através de um link provisório na página inicial, ou acessando https://cosmeticosecia.vercel.app/admin/ . Ao acessar é exibindo uma área de login e senha (admin , pass), após efetuar o login o administrador é direcionado a uma pagina com opções de “Sair e voltar ao site”, “Listar todos os produtos” e “Restaurar produtos”. Nesta mesma pagina é exibido um formulário para incluir produtos no sistema, com explicações adjuntas do seu funcionamento. Após preencher os campos clicar em “Salvar produto” aparecerá uma nova pagina confirmando e listando os dados do produto cadastrado.<br><br>
	Ao acessar  “Listar todos os produtos” aparecerá uma lista com todos os produtos cadastrados no banco de dados, junto a cada item aparecerá uma figura de uma lixeira, ao clicar nela o produto será apagado do sistema.
Acessando “Restaurar produtos”, o administrador pode restaurar a configuração original dos produtos no sistema clicando em “Restaurar Backup”.<br><br>
## Tecnologias
<div>
  <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/Javascript-239120?&style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-239120?&style=for-the-badge&logo=css3&logoColor=white">
  </div>

# Eu mesmo

[<img loading="lazy" src="https://avatars.githubusercontent.com/u/139296557?v=4" width=115><br><sub>Carlos Alexandre da Motta</sub>](http://www.mhps.com.br)

