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
        this.load.image('dave', 'assets/dave.png')
        // load tile map
    }

    create() {
        this.cameras.main.setBackgroundColor('#227B96')
        // add tile map
        this.physics.world.gravity.y = 1000

        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = tileSize*7; i < game.config.width-tileSize*4; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*5, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = tileSize*2; i < game.config.width-tileSize*13; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*9, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        this.dave = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'dave').setScale(0.5)
        this.dave.setCollideWorldBounds(true)
        this.dave.setMaxVelocity(300, 3000)


        cursors = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(this.dave, this.ground)

        // arrow keys ui
        this.upKey = this.add.sprite(64, 32, 'arrowKey');
		this.leftKey = this.add.sprite(32, 64, 'arrowKey');
		this.downKey = this.add.sprite(64, 64, 'arrowKey');
		this.rightKey = this.add.sprite(96, 64, 'arrowKey');
		this.leftKey.rotation = Math.PI/2*3;
		this.downKey.rotation = Math.PI;
        this.rightKey.rotation = Math.PI/2;
        this.downKey.tint = 0x333333;
    }

    update() {
        if (cursors.left.isDown) {
            this.dave.setVelocityX(-300)
            this.dave.setFlip(true, false)
            this.leftKey.tint = 0xFACADE
        }

        else if (cursors.right.isDown) {
            this.dave.setVelocityX(300)
            this.alien.resetFlip()
            this.rightKey.tint = 0xFACADE
        }

        else {
            this.dave.body.velocity.x = 0
            this.leftKey.tint = 0xFFFFFF
            this.rightKey.tint = 0xFFFFFF
        }
        
        if (this.dave.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.dave.body.setVelocityY(-1000)
            this.upKey.tint = 0xFACADE
        }

        else {
            this.upKey.tint = 0xFFFFFF
        }

        this.physics.world.wrap(this.dave, this.dave.width/2)
    }
}

class Level2 extends Phaser.scene {
    constructor() {
        super('level2')
    }

    preload() {
        this.load.image('dave', 'assets/dave.png')
        // load tile map
    }

    create() {

    }
}

class Level3 extends Phaser.scene {
    constructor() {
        super('level3')
    }

    preload() {
        this.load.image('dave', 'assets/dave.png')
        // load tile map
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
