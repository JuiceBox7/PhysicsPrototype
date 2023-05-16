class Intro extends Phaser.scene {
    constructor() {
        super('intro')
    }

    create() {
        this.add.text(50,50, "Test your skill in this mini platforming test!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('level1'));
        });
    }
}

class Level1 extends Phaser.scene {
    constructor() {
        super('level1')
    }

    preload() {

    }

    create() {

    }
}

class Level2 extends Phaser.scene {
    constructor() {
        super('level2')
    }

    preload() {

    }

    create() {

    }
}

class Level3 extends Phaser.scene {
    constructor() {
        super('level3')
    }

    preload() {

    }

    create() {

    }
}

class Summary extends Phaser.scene {
    constructor() {
        super('summary')
    }
    
    create() {
        
    }
}

class Credits extends Phaser.scene {
    constructor() {
        super('credits');
    }

    create() {
        this.add.text(50, 50, "Thank you for playing!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere if you'd like to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    type: Phaser.AUTO,
    scene: [Intro, Level1, Level2, Level3, Summary, Credits],
    title: "Physics Test",
});
