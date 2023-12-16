function encurtarLink() {
    const linkOriginal = document.getElementById('link-input').value;

    // Padrões iniciais
    let codigo = linkOriginal.startsWith('http://') ? 'A' : (linkOriginal.startsWith('https://') ? 'B' : '');

    // Ignorar "www."
    let linkSemWWW = linkOriginal.replace(/(http:\/\/|https:\/\/|www\.)/g, '');

    // Pseudocriptografar caracteres restantes
    for (let i = 0; i < linkSemWWW.length; i++) {
        const charCode = linkSemWWW.charCodeAt(i);
        // Adiciona um valor fixo (por exemplo, 10) a cada caractere
        const caractereCriptografado = String.fromCharCode(charCode + 3);
        codigo += caractereCriptografado;
    }

    // Construa a URL encurtada
    const linkEncurtado = `http://www.mercuryzip.com/m/${codigo}`;

    var outputLink = document.getElementById('output-link');

    outputLink.value = linkEncurtado;
}

function copiarLink() {
    var outputLink = document.getElementById('output-link');
    outputLink.select();
    document.execCommand('copy');

    // Feedback para o usuário
    alert('Link copiado para a área de transferência!');
}