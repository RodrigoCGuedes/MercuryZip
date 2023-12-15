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
