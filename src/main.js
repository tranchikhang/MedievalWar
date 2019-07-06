var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    parent: 'main-game',
    scene: [MainScene, UIScene]
};

var game = new Phaser.Game(config);