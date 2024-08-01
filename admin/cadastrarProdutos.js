document.getElementById('produtoForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('https://cosmback.vercel.app/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = "cadastrook.html";
        } else {
            document.getElementById('respo').textContent = 'Erro ao realizar o cadastro.';
        }
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        document.getElementById('respo').textContent = 'Erro ao realizar o cadastro.';
    }
});