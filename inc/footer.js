const inserirfHTML = `

<footer class="rodapé">

<h2><a  class="rodapé__titulo" href="http://mhps.com.br/" target="_blank" title="Desenvolvido por MHPS">Desenvolvido por MHPS</a></h2><br>
        <ul class="lista-rodapé">
            <li class="lista-rodapé__titulo">DÚVIDAS</li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Perguntas Frequentes</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Formas de Pagamento</a>
            </li>
			<li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Frete e Entrega</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Mapa do Site</a>
            </li>
        </ul>

        <ul class="lista-rodapé">
            <li class="lista-rodapé__titulo">INSTITUCIONAL</li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Nossa História</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Trabalhe Conosco</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Seja um revendedor</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Onde comprar</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Blog</a>
            </li>
            
        </ul>

        <ul class="lista-rodapé">
            <li class="lista-rodapé__titulo">LINKS ÚTEIS</li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Política de Privacidade</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Proteja-se Contra Fraudes</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Preferências de Cookies</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="https://www.planalto.gov.br/ccivil_03/leis/l8078.htm" class="lista-rodapé__link">Código de Defesa do Consumidor</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Termos de Uso</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Alerta Sobre Segurança</a>
            </li>
            <li class="lista-rodapé__item">
                <a href="#" class="lista-rodapé__link">Regulamento de Compras</a>
            </li>
        </ul>
        </footer>
`;


function inserirCodigoF() {
    const corpof = document.querySelector('footer');
    const inserirf = document.createElement('div');
    inserirf.innerHTML = inserirfHTML;
    corpof.appendChild(inserirf);
  }
  
  inserirCodigoF();