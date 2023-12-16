document.addEventListener('DOMContentLoaded', function () {
    // Função para obter uma imagem aleatória do array
    function obterImagemAleatoria() {
        const imagens = ["14762985.png", "21467985.png", "29547486.png", "45921486.png", "45926847.png", "48626547.png", "74562684.png", "74592987.png", "92458146.png", "94761285.png"];
        const indiceAleatorio = Math.floor(Math.random() * imagens.length);
        return imagens[indiceAleatorio];
    }

    // Função para descriptografar o código e obter o URL original
    function descriptografarUrl(codigo) {
        // Extrair o padrão inicial (A ou B)
        const padraoInicial = codigo.charAt(0);

        // Determinar o protocolo com base no padrão inicial
        let protocolo;
        if (padraoInicial === 'A') {
            protocolo = 'http://';
        } else if (padraoInicial === 'B') {
            protocolo = 'https://';
        } else {
            // Padrão desconhecido, retornar erro ou tratar conforme necessário
            return null;
        }

        // Remover o padrão inicial do código
        const codigoRestante = codigo.slice(1);

        // Decodificar os caracteres restantes
        let urlOriginal = '';
        for (let i = 0; i < codigoRestante.length; i++) {
            const charCode = codigoRestante.charCodeAt(i);
            const caractereOriginal = String.fromCharCode(charCode - 3);
            urlOriginal += caractereOriginal;
        }

        // Reconstruir o URL original
        return protocolo + 'www.' + urlOriginal;
    }

    // Verificar se já existem tentativas armazenadas no localStorage
    let tentativasRestantes = localStorage.getItem('tentativasRestantes');

    // Se não houver ou for menor que 1, iniciar com 3 tentativas
    if (tentativasRestantes === null || tentativasRestantes < 0) {
        tentativasRestantes = 3;
        localStorage.setItem('tentativasRestantes', tentativasRestantes);
    } else {
        tentativasRestantes = parseInt(tentativasRestantes);
    }

    // Atualizar o contador de tentativas
    const contadorTentativas = document.getElementById('tentativas-contador').querySelector('span');
    contadorTentativas.textContent = tentativasRestantes;

    // Inicializar a imagem de verificação
    const imagemVerification = document.getElementById('verification-image');
    imagemVerification.src = `./${obterImagemAleatoria()}`;

    // Função para redirecionar após as tentativas
    function redirecionarAposTentativas() {
        if (tentativasRestantes === 0) {

            setTimeout(function () {
                window.location.href = descriptografarUrl(URLSearchParams(window.location.search));
            }, 1000);
            
        } else {
            // Adiar o recarregamento por 1 segundo
            setTimeout(function () {
                location.reload();
            }, 1000);
        }
    }

    // Adicionar evento de escuta à caixa de texto (keypress em vez de input)
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

            // Atualizar o localStorage com o novo número de tentativas
            localStorage.setItem('tentativasRestantes', tentativasRestantes);

            // Atualizar o contador de tentativas
            contadorTentativas.textContent = tentativasRestantes;

            // Redirecionar após as tentativas
            redirecionarAposTentativas();
        }
    });
});
