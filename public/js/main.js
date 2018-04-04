
var tempoInicial = $("#tempo-digitacao").text();
var campo=$(".campo-digitacao");

//nova funcao
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});



function atualizaTamanhoFrase (){
    //recupera a frase
    var frase = $(".frase").text();
    //separa as palavras em um array e pega o legth
    var numPalavras  = frase.split(" ").length;
    //seta o tamanho do array no elemento
    var tamanhoFrase = $("#tamanho-frase").text(numPalavras); 
    
}


function inicializaContadores() {
    campo.on("input",function(){
    //pega o conteudo do textArea
    var conteudo = campo.val();
    //separa as palavras atraves de expressao regular
   var qtdPalavras = conteudo.split(/\s+/).length -1;
    //coloca a quantidade de palavras no elemento
    $("#contador-palavras").text(qtdPalavras);
    //com ajuda de expressao regular remove o bug do espaço ser contado como um caracter
    var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
    //coloca a quantidade de caracteres do elemento correspondente. 
    var qtdCaracteres  = conteudoSemEspaco.length;
    $("#contador-caracteres").text(qtdCaracteres);
});
}

function inicializaCronometro(){
       //pegando tempo de digitacao
    var tempoRestante = $("#tempo-digitacao").text();

    campo.one("focus",function(){
          $("#botao-reiniciar").addClass("disabled");
          $("#botao-reiniciar").addClass("not-active");
         
       var cronometroId  = setInterval(function(){
           tempoRestante--;
           $("#tempo-digitacao").text(tempoRestante);
           if(tempoRestante < 1){
               campo.attr("disabled",true);
               clearInterval(cronometroId);
               finalizaJogo();
               inserePlacar();
               
              }
       },1000);

    }); 
}

    function finalizaJogo (){
         $("#botao-reiniciar").removeClass("disabled");
          $("#botao-reiniciar").removeClass("not-active");
          campo.toggleClass("campo-desativado");
        
    }
    
    function reiniciaJogo(){
        
        campo.attr("disabled",false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        campo.toggleClass("campo-desativado");

        campo.removeClass("borda-vermelha"); //novo
        campo.removeClass("borda-verde"); //novo
    }

    function inicializaMarcadores() {

        var frase = $(".frase").text();
        campo.on("input", function() {
            var digitado = campo.val();
            var comparavel = frase.substr(0 , digitado.length);

            if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
        });
    }

   