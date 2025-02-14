let bord; // Canvas do jogo
let boardWidth = 360; // Largura do canvas
let boardHeight = 640; // Altura do canvas
let context; // Contexto para desenhar no canvas
let gameStarted = false; // Indica se o jogo já começou

// Imagem de carregamento do jogo
let onloadingImg;

// Configuração do pássaro
let birdWidth = 34; // Largura do pássaro
let birdHeight = 24; // Altura do pássaro
let birdX = boardWidth / 8; // Posição inicial X
let birdy = boardHeight / 2; // Posição inicial Y

// Sprites do pássaro
let birdUpImg;
let birdMidImg;
let birdDownImg;

// Configuração dos canos
let pipeArray = []; // Array para armazenar os canos
let pipewidth = 64; // Largura do cano
let pipeHeight = 512; // Altura do cano
let pipeX = boardWidth; // Posição inicial X do cano
let pipeY = 0; // Posição inicial Y do cano

// Sprites dos canos
let topPipeImg;
let bottomPipeImg;

// Física do jogo
let velocitX = -2; // Velocidade dos canos para a esquerda
let velocitiY = 0; // Velocidade vertical do pássaro
let gravity = 0.4; // Gravidade aplicada ao pássaro

// Quando a página for totalmente carregada, essa função será executada
// Isso garante que todos os elementos da página estejam prontos antes de iniciar o jogo
window.onload = function () {
  startGame(); // Chama a função que inicia o jogo
};

// Adiciona um evento para detectar quando uma tecla for pressionada
window.addEventListener("keydown", (event) => {
  // Aqui podemos verificar qual tecla foi pressionada
  // Por exemplo, se for a barra de espaço, podemos fazer o pássaro voar
  console.log("Tecla pressionada:", event.code);
});

/**
 * Função que inicia o jogo
 * Aqui podemos configurar o estado inicial, como a posição do pássaro e a criação dos canos
 */
function startGame() {
  console.log("Jogo iniciado!");
}

/**
 * Função responsável por atualizar o jogo continuamente
 * Chamado repetidamente em um intervalo de tempo para atualizar os elementos do jogo
 */
function update() {
  console.log("Atualizando o jogo...");
}
