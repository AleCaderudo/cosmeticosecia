//muda cor link 
  const mouseEfeito = document.querySelectorAll(".link__banner, .comprar");

  mouseEfeito.forEach(cl => {
    cl.addEventListener("mouseover", function() {
      this.style.color = "white";
    });

    cl.addEventListener("mouseout", function() {
      this.style.color = ""; 
    });
  });


//menu hamburguer
function toggleSidebar(hamburger) {
    var sidebarElem = window.document.getElementById("sidebar");
    var mainElem = window.document.getElementsByClassName("main")[0];
    sidebarElem.classList.toggle("open");
    mainElem.classList.toggle("open");
    hamburger.classList.toggle("open")
}

var prevSelection;

function SidebarSelection(item) {
    if(prevSelection) {
        if(prevSelection === item) {
            item.classList.toggle("selected");
            prevSelection = undefined;
        } else {
            prevSelection.classList.toggle("selected");
            item.classList.toggle("selected");
            prevSelection = item;
        }
    } else {
        item.classList.toggle("selected");
        prevSelection = item;
    }
}

    //começo slide
	
      let slideIndex = 0;
      let timeoutId = null;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
      
      showSlides();
      function currentSlide(index) {
           slideIndex = index;
           showSlides();
      }
     function plusSlides(step) {
        
        if(step < 0) {
            slideIndex -= 2;
            
            if(slideIndex < 0) {
              slideIndex = slides.length - 1;
            }
        }
        
        showSlides();
     }
      function showSlides() {
        for(let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
          dots[i].classList.remove('active');
        }
        slideIndex++;
        if(slideIndex > slides.length) {
          slideIndex = 1
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add('active');
         if(timeoutId) {
            clearTimeout(timeoutId);
         }
        timeoutId = setTimeout(showSlides, 5000); // Tempo de troca da imagem 5 segundos
          }

//Stats

const dataAtual = new Date();
const dataISO = dataAtual.toISOString();
const [data, horario] = dataISO.split('T');
const horarioFormatado = horario.split('.')[0];
const dataFormatada = `${data} - ${horarioFormatado}`;

const nomeDaPagina = document.getElementById('page-name').dataset.name;
const logData = {
    data: dataFormatada,
    ip: '',  
    pag: nomeDaPagina

};

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        logData.ip = data.ip;
        enviarLog(logData);
    })
    .catch(error => {
        console.error('Erro ao obter o IP:', error);
        enviarLog(logData); 
    });

function enviarLog(logData) {
    fetch('https://cosmback.vercel.app/logs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Log salvo com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao salvar o log:', error);
    });
}
