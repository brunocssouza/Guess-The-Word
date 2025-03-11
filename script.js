
let palavra_secreta;
let palavra_secreta_codificada;
let palavra_secreta_string;
let letras_usadas = [];
let dica;

function salvarPalavra() {
    palavra_secreta_string = document.getElementById('input_palavra').value.toUpperCase().trim()
    palavra_secreta = palavra_secreta_string.split("")
    
    dica = document.getElementById('input_dica').value.toUpperCase().trim()


    if ((palavra_secreta.length > 0) && (dica.length > 0)) {
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
    for (let i=0; i < palavra_secreta.length; i++) {
        if (palavra_secreta[i] == " ") {palavra_secreta[i] = "-"}
    }

    // Usando como base a palavra secreta definida, cria-se uma variavel de mesmo tamanho porém com seus elementos substituidos por underscore.
    // com excessão dos elementos onde ficariam hífens.
    palavra_secreta_codificada = []
    for (let i=0; i < palavra_secreta.length; i++) {
        if (palavra_secreta[i] == "-") {palavra_secreta_codificada.push('-')} 
        else {palavra_secreta_codificada.push('_')}
    }

    document.getElementById('palavra_secreta').innerHTML = palavra_secreta_codificada.join(" ")
};

function testarLetra() {

    if ((document.getElementById('perdeu').style.display == 'inline') || (document.getElementById('ganhou').style.display == 'inline')) {
        return
    }

    let inputRecebido = document.getElementById('input_chutarLetra').value.toUpperCase().trim() // value: atributo para se obter dados de um input.

    if (letras_usadas.includes(inputRecebido)) {
        alert('Letra já usada')
        return
    }
    
    // Verifica se a letra recebida faz parte da palavra secreta
    else if (palavra_secreta.includes(inputRecebido) && !palavra_secreta_codificada.includes(inputRecebido)) {
        letras_usadas.push(inputRecebido)
        mostrarResultado('acertou')

        // Substitui todos os underscores que guardam a letra que o usuario enviou
        for (let i=0; i < palavra_secreta.length; i++) {

            if (inputRecebido == palavra_secreta[i]) {
                palavra_secreta_codificada[i] = inputRecebido
                document.getElementById('palavra_secreta').innerHTML = palavra_secreta_codificada.join(" ")
            } 

        }

        // Verifica se a palavra sorteada foi completamente descoberta
        if (palavra_secreta_codificada.join() == palavra_secreta.join()) {
            mostrarResultado('ganhou')
            document.getElementById('palavra_secreta').innerHTML = "A resposta era " + palavra_secreta_string
        }
        
    } else {
        letras_usadas.push(input_chutarLetra)
        mostrarResultado('errou')
        document.getElementById('chances_restantes').innerHTML--

        if (document.getElementById('chances_restantes').innerHTML <= 0) {
            mostrarResultado('perdeu')
            document.getElementById('palavra_secreta').innerHTML = "A resposta era " + palavra_secreta_string
        }
    }

    inputRecebido = document.getElementById('input_chutarLetra').value = ''
    
}

function testarPalavra(palavraRecebida) {

    if ((document.getElementById('perdeu').style.display == 'inline') || (document.getElementById('ganhou').style.display == 'inline')) {
        return
    }

    palavraRecebida = palavraRecebida.toUpperCase().trim() // value: atributo para se obter dados de um input.
    
    // Verifica se a palavra recebida é igual a palavra sorteada.
    if (palavra_secreta_string == palavraRecebida) {
        mostrarResultado('ganhou')
        document.getElementById('palavra_secreta').innerHTML = "A resposta era " + palavra_secreta_string
    } else {
        mostrarResultado('perdeu')
        document.getElementById('palavra_secreta').innerHTML = "A resposta era " + palavra_secreta_string
    }
    document.getElementById('input_chutarPalavra').value = ''
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

