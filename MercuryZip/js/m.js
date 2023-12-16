// Função para obter uma imagem aleatória do array
function obterImagemAleatoria() {
    const imagens = ["14762985.png", "21467985.png", "29547486.png", "45921486.png", "45926847.png", "48626547.png", "74562684.png", "74592987.png", "92458146.png", "94761285.png"];
    const indiceAleatorio = Math.floor(Math.random() * imagens.length);
    return imagens[indiceAleatorio];
}
document.addEventListener('DOMContentLoaded', function () {
    const imagemVerification = document.getElementById('verification-image');
    imagemVerification.src = `/MercuryZip/images/num/${obterImagemAleatoria()}`;
});

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
        const caractereOriginal = String.fromCharCode(charCode - 1);
        urlOriginal += caractereOriginal;
    }

    // Reconstruir o URL original
    return protocolo + 'www.' + urlOriginal;
}

document.addEventListener('DOMContentLoaded', function () {
    const imagemVerification = document.getElementById('verification-image');
    const textoInput = document.getElementById('texto-input');
    const contadorTentativas = document.getElementById('tentativas-contador').querySelector('span');
    let tentativasRestantes = 3;

    function verificarCorrespondencia(event) {
        if (event.key === 'Enter') {
            const numeroImagem = imagemVerification.src.match(/\/(\d+)\.png$/)[1];
            const textoDigitado = textoInput.value;

            if (textoDigitado === numeroImagem) {
                alert('Correto! O número corresponde à imagem.');
                tentativasRestantes--;

                if (tentativasRestantes === 0) {
                    window.location.href = descriptografarCodigo(window.location.href);
                } else {
                    // Atualizar a imagem para a próxima tentativa
                    imagemVerification.src = `/MercuryZip/images/num/${obterImagemAleatoria()}`;
                }
            } else {
                alert('Incorreto! Tente novamente.');
                tentativasRestantes--;

                if (tentativasRestantes === 0) {
                    alert('Você excedeu o número de tentativas.');
                    location.reload();
                }
            }

            // Atualizar o contador de tentativas
            contadorTentativas.textContent = tentativasRestantes;

            // Limpar o conteúdo da caixa de texto após a verificação
            textoInput.value = '';
        }
    }

    textoInput.addEventListener('keypress', verificarCorrespondencia);
});