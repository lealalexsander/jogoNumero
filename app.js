let numeroMaximo = 50;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:0.9});
}

function exibirMensagemInicial(){
    exibirTextoNaTela(tag='h1', texto='Jogo do Número Secreto');
    exibirTextoNaTela(tag='p', texto='Escolha um número entre 1 e ' + numeroMaximo);
}

exibirMensagemInicial();

function verificarChute() {
    let numeroEscolhido = document.querySelector('input').value;
    let palavraTentativas = tentativas > 1 ? 'Tentativas' : 'Tentativa';
    let mensagem = `Descobriu o número secreto: ${numeroSecreto} ${palavraTentativas}: ${tentativas}!`;

    if (numeroEscolhido == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        exibirTextoNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroEscolhido > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que: ${numeroEscolhido}, \n ${palavraTentativas}: ${tentativas}`); 
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que: ${numeroEscolhido} \n ${palavraTentativas}: ${tentativas}`);
        }
    }
    tentativas++;
    limparCampo();
} 

function gerarNumeroAleatorio(){
    let numeroAleatorio = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

function limparCampo(){
    numeroEscolhido = document.querySelector('input');
    numeroEscolhido.value = '';
}


function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').removeAttribute('abled');
    exibirMensagemInicial();
}