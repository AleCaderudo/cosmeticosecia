const formE1 = document.getElementById('formCadastro');

formE1.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const formData = new FormData(formE1);

  // Send data to API using fetch
  fetch('http://localhost:3000/clientes', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json()) // Assuming the API returns JSON
    .then(responseData => {
      console.log('API Response:', responseData);
    })
    .catch(error => console.error('API Error:', error));
});

