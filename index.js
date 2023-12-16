function encurtarLink() {

    const linkOriginal = document.getElementById('link-input').value;

    let codigo = linkOriginal.startsWith('http://') ? 'A' : (linkOriginal.startsWith('https://') ? 'B' : '');

    let linkSemWWW = linkOriginal.replace(/(http:\/\/|https:\/\/|www\.)/g, '');

    for (let i = 0; i < linkSemWWW.length; i++) {

        const charCode = linkSemWWW.charCodeAt(i);
        const caractereCriptografado = String.fromCharCode(charCode + 3);
        codigo += caractereCriptografado;

    }

    const linkEncurtado = `https://rodrigocguedes.github.io/MercuryZip/m.html?link=${codigo}`;

    var outputLink = document.getElementById('output-link');

    outputLink.value = linkEncurtado;

}

function copiarLink() {

    var outputLink = document.getElementById('output-link');
    outputLink.select();
    document.execCommand('copy');

    
    alert('Link copiado para a área de transferência!');

}
