document.addEventListener('DOMContentLoaded', function() {
    const usuarioNome = document.getElementById('usuarioNome');
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        usuarioNome.innerHTML = `Olá, ${user.nome}, preencha o endereço para envio da encomenda e escolha a forma de pagamento.<br><br> `;
    } else {
        usuarioNome.innerHTML = 'Usuário não logado, para efetuar o login clique <a href="perfil.html">aqui</a><br><br>';
    }

    document.getElementById('formaPagamento').addEventListener('change', function () {
        var valor = this.value;
        document.getElementById('camposCartao').style.display = valor === 'cartao' ? 'block' : 'none';
        document.getElementById('areaPix').style.display = valor === 'pix' ? 'block' : 'none';
        document.getElementById('areaBoleto').style.display = valor === 'boleto' ? 'block' : 'none';
    });

    document.getElementById('formFinalizarPedido').addEventListener('submit', function(event) {
        event.preventDefault();

        const formDados = {
            "endereco": document.getElementById('endereco').value,
            "cidade": document.getElementById('cidade').value,
            "estado": document.getElementById('estado').value,
            "cep": document.getElementById('cep').value,
            "formaPagamento": document.getElementById('formaPagamento').value,
            "numeroCartao": document.getElementById('numeroCartao')?.value,
            "nomeCartao": document.getElementById('nomeCartao')?.value,
            "validadeCartao": document.getElementById('validadeCartao')?.value,
            "cvvCartao": document.getElementById('cvvCartao')?.value,
        };

        let user = loggedInUser ? JSON.parse(loggedInUser) : {};
        const pedidoCompleto = {...user, ...formDados};

        localStorage.setItem("pedido", JSON.stringify(pedidoCompleto));
        window.location.href = 'pedidofinalizado.html';
    });
});
