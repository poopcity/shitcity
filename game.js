const config = {
  type: Phaser.CANVAS,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

let godzilla;
let mario;
let score = 0;
let health = 100;
let roarSound;
let jumpSound;
let backgroundMusic;

function preload() {
  this.load.image('godzilla', 'assets/godzilla.PNG');
  this.load.image('mario', 'assets/mario.PNG');
  this.load.image('background', 'assets/background.png');
  this.load.audio('roar', 'assets/roar.mp3');
  this.load.audio('jump', 'assets/jump.mp3');
  this.load.audio('backgroundMusic', 'assets/backgroundMusic.mp3');
}

function create() {
  this.add.image(0, 0, 'background').setOrigin(0, 0);
  
  godzilla = this.physics.add.sprite(100, 100, 'godzilla');
  godzilla.setCollideWorldBounds(true);
  godzilla.body.setSize(50, 50);
  
  mario = this.physics.add.sprite(300, 100, 'mario');
  mario.setCollideWorldBounds(true);
  mario.body.setSize(20, 20);
  
  this.physics.add.collider(godzilla, mario, () => {
    console.log('Collision detected!');
  });
  
  roarSound = this.sound.add('roar');
  jumpSound = this.sound.add('jump');
  backgroundMusic = this.sound.add('backgroundMusic');
  backgroundMusic.play();
  
  this.input.keyboard.createCursorKeys();
  this.input.keyboard.on('keydown_SPACE', () => {
    console.log('Spacebar pressed!');
  });
  
  this.time.addEvent({
    delay: 1000,
    callback: () => {
      score++;
    },
    loop: true,
  });
  
  this.add.text(10, 10, 'Score: 0', {
    fontSize: '32px',
    fill: '#fff',
  });
  
  this.add.text(10, 50, 'Health: 100', {
    fontSize: '32px',
    fill: '#fff',
  });
}

function update(time, delta) {
  if (this.input.keyboard.isDown(Phaser.Input.Keyboard.LEFT_KEY)) {
    godzilla.body.setVelocityX(-200);
  } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.RIGHT_KEY)) {
    godzilla.body.setVelocityX(200);
  } else {
    godzilla.body.setVelocityX(0);
  }
  
  if (this.input.keyboard.isDown(Phaser.Input.Keyboard.UP_KEY)) {
    godzilla.body.setVelocityY(-200);
  } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.DOWN_KEY)) {
    godzilla.body.setVelocityY(200);
  } else {
    godzilla.body.setVelocityY(0);
  }
  
  if (Phaser.Math.Distance.Between(godzilla.x, godzilla.y, mario.x, mario.y) < 50) {
    health -= 1;
    this.add.text(10, 50, 'Health: ' + health, {
      fontSize: '32px',
      fill: '#fff',
    });
  }
  
  if (health <= 0) {
    this.scene.restart();
  }
}
