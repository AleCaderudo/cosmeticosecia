document.getElementById('restore-button').addEventListener('click', async () => {
    try {
        // Fetch backup data
        const response = await fetch('backup.json');
        const backupData = await response.json();

        // Fetch all products to get their IDs
        const productsResponse = await fetch('https://cosmback.vercel.app/produtos');
        const products = await productsResponse.json();

        // Delete all products individually
        await Promise.all(products.map(product => 
            fetch(`https://cosmback.vercel.app/produtos/${product._id}`, {
                method: 'DELETE'
            })
        ));

        // Recreate products from backup
        await Promise.all(backupData.map(product => 
            fetch('https://cosmback.vercel.app/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
        ));

        alert('Backup restaurado com sucesso!');
    } catch (error) {
        console.error('Erro ao restaurar backup:', error);
        alert('Erro ao restaurar backup. Verifique o console para mais detalhes.');
    }
});

