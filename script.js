
let palavra_sorteada;
let palavra_sorteada_codificada;
let letras_usadas = [];
let dica;

function salvarPalavra() {
    palavra_sorteada = document.getElementById('input_palavra').value.toUpperCase().trim().split("")
    dica = document.getElementById('input_dica').value.toUpperCase().trim()


    if ((palavra_sorteada.length > 0) && (dica.length > 0)) {
        document.getElementById('tela_inicial').style.display = 'none'
        document.getElementById('tela_principal').style.display = 'inline'
        iniciarJogo()
        
    } else {
        document.getElementById('mensagem').innerHTML = 'Preencha ambos campos!'
        document.getElementById('mensagem').style.color = 'red'
    }
    
}

function iniciarJogo() {
    
    document.getElementById('dica_recebida').innerText = dica

    
    // Chances restantes iniciais
    document.getElementById('chances_restantes').innerHTML = 5;

    // Esconde todos os elementos-resultados 
    const resultados = ['acertou', 'ganhou', 'errou', 'perdeu']
    for (let i=0; i < resultados.length; i++) {
        document.getElementById(resultados[i]).style.display = 'none'

    }
    

    // Define a palavra secreta da vez e a formata de um jeito em que todos os Espaços virem Hífens.
    for (let i=0; i < palavra_sorteada.length; i++) {
        if (palavra_sorteada[i] == " ") {palavra_sorteada[i] = "-"}
    }

    // Usando como base a palavra secreta definida, cria-se uma variavel de mesmo tamanho porém com seus elementos substituidos por underscore.
    // com excessão dos elementos onde ficariam hífens.
    palavra_sorteada_codificada = []
    for (let i=0; i < palavra_sorteada.length; i++) {
        if (palavra_sorteada[i] == "-") {palavra_sorteada_codificada.push('-')} 
        else {palavra_sorteada_codificada.push('_')}
    }

    document.getElementById('palavra_secreta').innerHTML = palavra_sorteada_codificada.join(" ")
};

function testarLetra() {

    if ((document.getElementById('perdeu').style.display == 'inline') || (document.getElementById('ganhou').style.display == 'inline')) {
        return
    }

    let inputRecebido = document.getElementById('input_letra').value.toUpperCase().trim() // value: atributo para se obter dados de um input.

    if (letras_usadas.includes(inputRecebido)) {
        console.warn('Letra já usada')
        return
    }
    
    // Verifica se a letra recebida faz parte da palavra secreta
    else if (palavra_sorteada.includes(inputRecebido) && !palavra_sorteada_codificada.includes(inputRecebido)) {
        letras_usadas.push(inputRecebido)
        mostrarResultado('acertou')

        // Substitui todos os underscores que guardam a letra que o usuario enviou
        for (let i=0; i < palavra_sorteada.length; i++) {

            if (inputRecebido == palavra_sorteada[i]) {
                palavra_sorteada_codificada[i] = inputRecebido
                document.getElementById('palavra_secreta').innerHTML = palavra_sorteada_codificada.join(" ")
            } 

        }

        // Verifica se a palavra sorteada foi completamente descoberta
        if (palavra_sorteada_codificada.join() == palavra_sorteada.join()) {
            mostrarResultado('ganhou')
        }
        
    } else {
        letras_usadas.push(input_letra)
        mostrarResultado('errou')
        document.getElementById('chances_restantes').innerHTML--

        if (document.getElementById('chances_restantes').innerHTML <= 0) {
            mostrarResultado('perdeu')
            document.getElementById('palavra_secreta').innerHTML = "O animal era " + palavra_sorteada.join("")
        }
    }

    inputRecebido = document.getElementById('input_letra').value = ''
    
}

// Armazena os possiveis desfechos para cada tentativa e mostra/esconde esses elementos-resultado conforme o parametro recebido. 
function mostrarResultado(resultadoRecebido) {

    const resultados = ['acertou', 'ganhou', 'errou', 'perdeu']
    for (let i=0; i < resultados.length; i++) {
        if (resultados[i] == resultadoRecebido) {
            document.getElementById(resultados[i]).style.display = 'inline'
        } else {
            document.getElementById(resultados[i]).style.display = 'none'
        }
    }
    
}

function reiniciarJogo() {
    document.getElementById('tela_inicial').style.display = 'inline'
    document.getElementById('tela_principal').style.display = 'none'
    document.getElementById('input_palavra').value = ''
    document.getElementById('input_dica').value = ''
    letras_usadas = []
}

