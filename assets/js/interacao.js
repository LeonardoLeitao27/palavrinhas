const btn = document.querySelector(".button_grande");
btn.addEventListener("click", function () {
    btn.style.display = "none";
    chamaJogo();
});

var div_jogo = document.querySelector(".div_game");

//pontos
var pontuacao = document.querySelector(".pontuacao");

var pontos=0;

var h1pontos = document.createElement('h1');
h1pontos.classList.add("h1pontos");
h1pontos.innerHTML = pontos;
pontuacao.appendChild(h1pontos);


//record
var melhorPontuacao = document.querySelector(".melhor-pontuacao");

var record =0;

var h1record = document.createElement('h1');
h1record.classList.add("h1pontos");
h1record.innerHTML = record;
melhorPontuacao.appendChild(h1record);


function chamaJogo(){
    //carregando os dados do json
    fetch('./assets/json/facil.json') 
    .then(resposta => resposta.json())
    .then(json => jogo(json));
}

//numero aleatorio
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function isEquivalent(a, b) {

    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);


    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}


var temp;
//timer
function tempinho(palavra, palavra_quebrada){
    if(temp===5){
        //cria o timer
        let tTimer = document.createElement('h1');
        tTimer.classList.add("timer");
        tTimer.innerHTML = temp;
        div_jogo.appendChild(tTimer);
    }

    if(temp===-1){
        try{
            var tTimer = document.querySelector(".timer");
            div_jogo.removeChild(tTimer);
        }catch{

        };
        depoisDoTimer(palavra, palavra_quebrada);
        
    }
    
    if(temp>-1){
        document.querySelector(".timer").innerHTML = temp;
        console.log(temp);
        temp--;
    }

}


function jogo(json) 
{   
    //pega a palavra do json
    const pos = getRandomInt(0, 20);
    const palavra = json[pos].palavra;
    const palavra_quebrada = json[pos].palavra_escondida;
    console.log(palavra);

    //palavra aleatoria
    const t1 = document.createElement('h1');
    t1.classList.add("palavrinha");
    t1.innerHTML = palavra;

    div_jogo.appendChild(t1);

    //timer
    temp = 5;
    const tempob = (temp*1000)+2000;
    const a = setInterval(function (){
        tempinho(palavra, palavra_quebrada, temp);
    },1000);

    const b = setTimeout(function (){
        clearInterval(a);
    }, tempob);
    
};

function depoisDoTimer(palavra, palavra_quebrada){


    let t1 = document.querySelector('.palavrinha');
    t1.innerHTML = palavra_quebrada;

    let resposta = document.createElement('input');
    resposta.classList.add("resposta");
    div_jogo.appendChild(resposta);

    let pronto = document.createElement('button');
    pronto.innerHTML = "Pronto";
    pronto.classList.add("pronto");
    div_jogo.appendChild(pronto);
    

    const btnP = document.querySelector(".pronto");
    
    btnP.addEventListener("click", function () {
    //esconde 2parte
    try {
        div_jogo.removeChild(t1);
        div_jogo.removeChild(btnP);
        div_jogo.removeChild(resposta);
    } catch {
        
    }
    
        let valorResposta = resposta.value;

         if(isEquivalent(valorResposta,palavra)){
            //mensagem acerto
            let t3 = document.createElement('h1');
            t3.classList.add("acerto");
            t3.innerHTML = "Você acertou";
            div_jogo.appendChild(t3);

            let imgAcerto = document.createElement('img');
            imgAcerto.classList.add("imgAcerto");
            imgAcerto.src = "./assets/img/bongo-cat.gif"
            div_jogo.appendChild(imgAcerto);

            let btnProx = document.createElement('button');
            btnProx.innerHTML = "Próxima";
            btnProx.classList.add("btnProxima");

            div_jogo.appendChild(btnProx);

            pontos++;
            h1pontos.innerHTML = pontos;

            const btnPP = document.querySelector(".btnProxima");

            btnPP.addEventListener("click", function () {
                try{
                    div_jogo.removeChild(imgAcerto);
                    div_jogo.removeChild(t3);
                    div_jogo.removeChild(btnPP);
                    
                    
                    chamaJogo();
                }catch{

                }
            })

            
        }else{
            let t3 = document.createElement('h1');
            t3.classList.add("acerto");
            t3.innerHTML = "Você errou";
            div_jogo.appendChild(t3);

            let imgAcerto = document.createElement('img');
            imgAcerto.classList.add("imgAcerto");
            imgAcerto.src = "./assets/img/erro.gif"
            div_jogo.appendChild(imgAcerto);

            let btnProx = document.createElement('button');
            btnProx.innerHTML = "Tentar novamente";
            btnProx.classList.add("btnProxima");

            div_jogo.appendChild(btnProx);

            if(pontos>record){
                h1record.innerHTML = pontos;
            }
            pontos = 0;
            h1pontos.innerHTML = pontos;
            const btnPP = document.querySelector(".btnProxima");

            btnPP.addEventListener("click", function () {
                try{
                    div_jogo.removeChild(imgAcerto);
                    div_jogo.removeChild(t3);
                    div_jogo.removeChild(btnPP);
                    chamaJogo();
                }catch{

                }
            })
        } 
        
    
    })
}


