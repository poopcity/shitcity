class Mario extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'mario');
  }

  update(time, delta) {
    if (Phaser.Math.Distance.Between(this.x, this.y, godzilla.x, godzilla.y) < 100) {
      this.body.setVelocityX(200);
    } else {
      this.body.setVelocityX(0);
    }

    if (this.body.touching.down) {
      this.body.setVelocityY(-200);
    }

    if (Phaser.Input.Keyboard.isDown(Phaser.Input.Keyboard.SPACE_KEY)) {
      this.body.setVelocityY(-300);
    }
  }
}