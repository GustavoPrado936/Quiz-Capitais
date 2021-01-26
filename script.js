const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const resultado_box = document.querySelector(".resultado_box");
const lista_opcao = document.querySelector(".lista_opcao");
const linha_tempo = document.querySelector("header .linha_tempo");
const textoTempo = document.querySelector(".cronometro .tempo_restante_txt");
const contagemTempo = document.querySelector(".cronometro .cronometro_sec");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    mostrarPerguntas(0); 
    queContador(1); 
    iniciarContagem(15); 
    contagemLinha(0); 
}

let tempo =  15;
let que_contagem = 0;
let que_num = 1;
let pontuacao = 0;
let contador;
let contadorLinha;
let valorLargura = 0;

const restart_quiz = resultado_box.querySelector(".buttons .restart");
const quit_quiz = resultado_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("Ativa o Quiz"); 
    resultado_box.classList.remove("Ativa o resultado"); 
    tempo = 15; 
    que_contagem = 0;
    que_num = 1;
    pontuacao = 0;
    valorLargura = 0;
    mostrarPerguntas(que_contagem);
    queContador(que_num); 
    clearInterval(contador); 
    clearInterval(contadorLinha); 
    iniciarContagem(tempo); 
    contagemLinha(valorLargura); 
    textoTempo.textContent = "Tempo Restante"; 
    next_btn.classList.remove("show"); 
}

quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_contador = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(que_contagem < questoes.length - 1){ 
        que_contagem++; 
        que_num++; 
        mostrarPerguntas(que_contagem); 
        queContador(que_num); 
        clearInterval(contador); 
        clearInterval(contadorLinha); 
        iniciarContagem(tempo); 
        contadorLinha(valorLargura); 
        textoTempo.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(contador); 
        clearInterval(contadorLinha); 
        showResult(); 
    }
}

function mostrarPerguntas(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questoes[index].num + ". " + questoes[index].questao +'</span>';
    let opcao_tag = '<div class="opcao"><span>'+ questoes[index].opcao[0] +'</span></div>'
    + '<div class="opcao"><span>'+ questoes[index].opcao[1] +'</span></div>'
    + '<div class="opcao"><span>'+ questoes[index].opcao[2] +'</span></div>'
    + '<div class="opcao"><span>'+ questoes[index].opcao[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    lista_opcao.innerHTML = opcao_tag; 
    
    const opcao = lista_opcao.querySelectorAll(".opcao");

    for(i=0; i < opcao.length; i++){
        opcao[i].setAttribute("onclick", "opcaoSelecionada(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function opcaoSelecionada(resposta){
    clearInterval(contador); 
    clearInterval(contadorLinha); 
    let respostaUsuario = resposta.textContent; 
    let respostaCorreta = questoes[que_contagem].resposta; 
    const todasOpcao = lista_opcao.children.length; 
    
    if(respostaUsuario == respostaCorreta){ 
        pontuacao += 1; 
        resposta.classList.add("correta"); 
        resposta.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correta Resposta");
        console.log("Suas resposta correta = " + pontuacao);
    }else{
        resposta.classList.add("incorreta"); 
        resposta.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Resposta Errada");

        for(i=0; i < todasOpcao; i++){
            if(lista_opcao.children[i].textContent == respostaCorreta){ 
                lista_opcao.children[i].setAttribute("class", "opcao correta"); 
                lista_opcao.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Escolha automatica da resposta correta.");
            }
        }
    }
    for(i=0; i < todasOpcao; i++){
        lista_opcao.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    resultado_box.classList.add("activeResult"); 
    const pontuacaoTexto = resultado_box.querySelector(".score_text");
    if (pontuacao > 3){ 
        let pontuacaoTag = '<span>Você Terminou!<p>'+ pontuacao +'</p> out of <p>'+ questoes.length +'</p></span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;  
    }
    else if(pontuacao > 1){ 
        let pontuacaoTag = '<span> Ainda pode melhorar!<p>'+ pontuacao +'</p> out of <p>'+ questoes.length +'</p></span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    }
    else{ 
        let pontuacaoTag = '<span>Tente Novamente! <p>'+ pontuacao +'</p> de <p>'+ questoes.length +'</p></span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    }
}

function iniciarContagem(tempo){
    contador = setInterval(cronometro, 1000);
    function cronometro(){
        contagemTempo.textContent = tempo; 
        tempo--; 
        if(tempo < 9){ 
            let addZero = contagemTempo.textContent; 
            contagemTempo.textContent = "0" + addZero; 
        }
        if(tempo < 0){ 
            clearInterval(contador); 
            textoTempo.textContent = "Acabou o Tempo"; 
            const todasOpcao = lista_opcao.children.length; 
            let respostaCorreta = questoes[que_contagem].resposta; 
            for(i=0; i < todasOpcao; i++){
                if(lista_opcao.children[i].textContent == respostaCorreta){ 
                    lista_opcao.children[i].setAttribute("class", "opcao correta"); 
                    lista_opcao.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Acabou o Tempo: Resposta correta selecionada automaticamente.");
                }
            }
            for(i=0; i < todasOpcao; i++){
                lista_opcao.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}

function contagemLinha(tempo){
    contadorLinha = setInterval(cronometro, 29);
    function cronometro(){
        tempo += 1; 
        linha_tempo.style.width = tempo + "px"; 
        if(tempo > 549){ 
            clearInterval(contadorLinha); 
        }
    }
}

function queContador(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questoes.length +'</p> Questões</span>';
    bottom_ques_contador.innerHTML = totalQueCounTag; 
}
