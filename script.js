class Level1 extends Phaser.scene {
    
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    type: Phaser.AUTO,
    scene: [Intro, FirstFloor, Basement, SecondFloor, ThirdFloor, Balcony, BadEnding, GoodEnding],
    title: "Adventure Game",
});
