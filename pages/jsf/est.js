const dataAtual = new Date();
const dataFormatada = dataAtual.toString();

const nomeDaPagina = document.getElementById('page-name').dataset.name;

const logData = {
    data: dataFormatada,
    ip: '',  
    pag: nomeDaPagina,
    nav: ''  
};

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        logData.ip = data.ip;
        
        return fetch(`http://ip-api.com/json/${logData.ip}?fields=city,region,country`);
    })
    .then(response => response.json())
    .then(data => {
        logData.nav = `${data.city}, ${data.region}, ${data.country}`;
        enviarLog(logData);
    })
    .catch(error => {
        console.error('Erro ao obter a localização geográfica:', error);
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

