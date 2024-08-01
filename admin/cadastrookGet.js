const fetchUltimoProduto = async () => {
    try {
        const response = await fetch('https://cosmback.vercel.app/produtos');
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const produtos = await response.json();
        const ultimoProduto = produtos[produtos.length - 1];
        const respoDiv = document.getElementById('respo');

        respoDiv.innerHTML = `<strong> Dados do produto : </strong> <br><br> <strong> Nome: </strong> ${ultimoProduto.nome}<br>
         <strong> Codigo: </strong> ${ultimoProduto.codigo} <br>
         <strong> Categoria: </strong> ${ultimoProduto.categoria} 
        <br>  <strong> Descrição: </strong> ${ultimoProduto.descricao } <br>
         <strong> Valor: </strong> R$: ${ultimoProduto.preco } <br>
         <strong> Imagem: </strong> <a href="../img/produtos/${ultimoProduto.imagem}" target="_blank">${ultimoProduto.imagem}</a>
          <br>  <strong> Informações: </strong> ${ultimoProduto.informacao} `;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
};

fetchUltimoProduto();

