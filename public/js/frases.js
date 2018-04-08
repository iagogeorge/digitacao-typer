$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase)

function fraseAleatoria() {

    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocarFraseAleatoria)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },1500);
    })
    .always(function(){ // novo, escondendo o spinner
        $("#spinner").toggle();
    });
}
function trocarFraseAleatoria(data){
    var frase = $(".frase");
    var numeroAleatorio  = Math.floor(Math.random() * data.length);
    
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase (){
    $("#spinner").toggle(); 
    var fraseId = $("#frase-id").val();
    //criacao do objeto JS que guarda a id
    var dados = {id : fraseId}; 
    
    $.get("http://localhost:3000/frases",dados,trocaFrase)
       .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },1500);
    })
    .always(function(){ // novo, escondendo o spinner
        $("#spinner").toggle();
    });
    
}

function trocaFrase (data) {
    var frase = $(".frase")
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}