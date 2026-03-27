const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 500,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let paddle;
let ball;
let cursors;
let score = 0;
let scoreText;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('ball', 'https://labs.phaser.io/assets/sprites/shinyball.png');
  this.load.image('dog', 'https://cdn-icons-png.flaticon.com/512/616/616408.png');
}

function create() {

  // Pared
  const wall = this.physics.add.staticGroup();
  wall.create(200, 10, null).setDisplaySize(400, 20).refreshBody();

  // Jugador (perro)
  paddle = this.physics.add.image(200, 450, 'dog')
    .setCollideWorldBounds(true)
    .setScale(0.2);

  paddle.setImmovable(true);

  // Pelota
  ball = this.physics.add.image(200, 300, 'ball');
  ball.setCollideWorldBounds(true);
  ball.setBounce(1);
  ball.setVelocity(200, 200);

  // Colisiones
  this.physics.add.collider(ball, paddle);
  this.physics.add.collider(ball, wall, hitWall, null, this);

  // Controles
  cursors = this.input.keyboard.createCursorKeys();

  // Score
  scoreText = this.add.text(10, 10, 'Golpes: 0', {
    fontSize: '16px',
    fill: '#fff'
  });
}

function update() {

  if (cursors.left.isDown) {
    paddle.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    paddle.setVelocityX(300);
  } else {
    paddle.setVelocityX(0);
  }

  // Si cae → reinicio emocional
  if (ball.y > 500) {
    document.getElementById("game-message").innerText =
      "Se quedó solo otra vez… 😢";
    ball.setPosition(200, 300);
    score = 0;
  }
}

function hitWall() {
  score++;
  scoreText.setText('Golpes: ' + score);

  if (score === 5) {
    document.getElementById("game-message").innerText =
      "Le encanta jugar contigo 🐶";
  }

  if (score === 10) {
    document.getElementById("game-message").innerText =
      "Podrías ser su familia ❤️";
  }
}