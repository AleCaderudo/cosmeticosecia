const inserirHTML = `
<h2><a class="rodapé__titulo" href="http://mhps.com.br/" target="_blank" title="Desenvolvido por MHPS">Desenvolvido por MHPS</a></h2>
<br>
<ul class="lista-rodapé">
  <li class="lista-rodapé__titulo">DÚVIDAS</li>
</ul>
`;


function inserirCodigo() {
    const corpo = document.querySelector('footer');
    const inserir = document.createElement('div');
    inserir.innerHTML = inserirHTML;
    corpo.appendChild(inserir);
  }
  
  inserirCodigo();