const respoNome = document.getElementById('textoNome');


let emailRecupera = JSON.parse(localStorage.getItem('emailRecupera'));


respoNome.innerHTML = `Olá ${emailRecupera.nome}, sua senha registrada é : <stong>${emailRecupera.pass}<strong><br><br>Para acessar o sistema, clique no botão abaixo  `;

localStorage.removeItem('emailRecupera');
