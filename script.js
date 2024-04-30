const html = document.querySelector("html")
const buttonFoco = document.querySelector(".app__card-button--foco")
const buttonCurto = document.querySelector(".app__card-button--curto")
const buttonLongo = document.querySelector(".app__card-button--longo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const buttons = document.querySelectorAll(".app__card-button")
const buttonStar = document.querySelector("#start-pause")
const buttonIniciarPausar = document.querySelector("#start-pause span")
const tempoNaTela = document.querySelector("#timer")
const iconeTemporizador = document.querySelector('.app__card-primary-butto-icon')
const buttonResetar = document.querySelector("#reset")

const musicaInput = document.querySelector("#alternar-musica")
const musica = new Audio("/sons/luna-rise-part-one.mp3")
const audioPlay = new Audio('/sons/play.wav'); 
const audioPausa = new Audio('/sons/pause.mp3'); 
const audioTempoFinalizado = new Audio('./sons/beep.mp3') 

let tempoDecorridoSegundos = 1500
let intervaloId = null

musica.loop = true

musicaInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
})

buttonFoco.addEventListener("click", () => {
  tempoDecorridoSegundos = 1500
  alterarContexto("foco");
  buttonFoco.classList.add("active");
})

buttonCurto.addEventListener("click", () => {
  tempoDecorridoSegundos = 300
  alterarContexto("descanso-curto");
  buttonCurto.classList.add("active");
})

buttonLongo.addEventListener("click", () => {
  tempoDecorridoSegundos = 900
  alterarContexto("descanso-longo");
  buttonLongo.classList.add("active");
})

buttonResetar.addEventListener("click", () => {
  location.reload()
})

//funcao geral para alterar o contexto da pagina
function alterarContexto(contexto) {
  //remove classe active antes de la ser ativa pois ela fica depois da function alterarContexto
  mostrarTempo()
  buttons.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
        Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
        Que tal dar uma respirada?
        <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície. <br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
    default:
      break;
  }
}

//funcao temportizador
const contagemRegressiva = () =>{
  if (tempoDecorridoSegundos <= 0) {
      audioPlay.play()
      alert('Tempo Finalizado')    
      zerar()
      return
  }
  tempoDecorridoSegundos -= 1
  mostrarTempo()
}

buttonStar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
  if(intervaloId){
    iconeTemporizador.setAttribute("src",`/imagens/play_arrow.png`)
    audioPausa.play()
    zerar()
    return//early return  -- circuit breaker
  } 
  audioPlay.play()
  intervaloId = setInterval(contagemRegressiva, 1000)
  buttonIniciarPausar.textContent = "Pausar"
  iconeTemporizador.setAttribute("src",`/imagens/pause.png`)
}

function zerar(){
  clearInterval(intervaloId)
  buttonIniciarPausar.textContent = "Começar"
  intervaloId = null
}

//mostrar temporalizador na tela
function mostrarTempo(){
  const tempo = new Date(tempoDecorridoSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}


mostrarTempo()