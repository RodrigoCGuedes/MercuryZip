document.addEventListener('DOMContentLoaded', function () {
    
    function obterImagemAleatoria() {

        const imagens = ["14762985.png", "21467985.png", "29547486.png", "45921486.png", "45926847.png", "48626547.png", "74562684.png", "74592987.png", "92458146.png", "94761285.png"];
        const indiceAleatorio = Math.floor(Math.random() * imagens.length);
        return imagens[indiceAleatorio];

    }

    function descriptografarUrl(codigo) {

        const padraoInicial = codigo.charAt(0);

        let protocolo;
        if (padraoInicial === 'A') {

            protocolo = 'http://';

        } else if (padraoInicial === 'B') {

            protocolo = 'https://';

        } else {

            return null;

        }

        const codigoRestante = codigo.slice(1);

        let urlOriginal = '';
        for (let i = 0; i < codigoRestante.length; i++) {

            const charCode = codigoRestante.charCodeAt(i);
            const caractereOriginal = String.fromCharCode(charCode - 3);
            urlOriginal += caractereOriginal;

        }

        return protocolo + 'www.' + urlOriginal;

    }

    let tentativasRestantes = localStorage.getItem('tentativasRestantes');

    if (tentativasRestantes === null || tentativasRestantes < 1) {

        tentativasRestantes = 3;
        localStorage.setItem('tentativasRestantes', tentativasRestantes);

    } else {

        tentativasRestantes = parseInt(tentativasRestantes);

    }

    const contadorTentativas = document.getElementById('tentativas-contador').querySelector('span');
    contadorTentativas.textContent = tentativasRestantes;

    const imagemVerification = document.getElementById('verification-image');
    imagemVerification.src = `${obterImagemAleatoria()}`;

    const textoInput = document.getElementById('texto-input');

    textoInput.addEventListener('keypress', function (event) {

        if (event.key === 'Enter') {

            const numeroImagem = imagemVerification.src.match(/\/(\d+)\.png$/)[1];
            const textoDigitado = textoInput.value;

            if (textoDigitado === numeroImagem) {
                tentativasRestantes--;
            } else {
                tentativasRestantes--;
            }

            localStorage.setItem('tentativasRestantes', tentativasRestantes);

            contadorTentativas.textContent = tentativasRestantes;

            if (tentativasRestantes === 0) {

                tentativasRestantes = 3;
                const parametrosURL = new URLSearchParams(window.location.search);
                const codigo = parametrosURL.get('link');
                window.location.href = descriptografarUrl(codigo);
                
            } else {
    
                location.reload();
    
            }
            
        }

    });

});
