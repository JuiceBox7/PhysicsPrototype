class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000)
        this.add.text(50,50, "Test your skill in this \
        \nmini platforming test!").setFontSize(25);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('level1'));
        });
    }
}

class Level1 extends Phaser.Scene {
    constructor() {
        super('level1')
    }

    preload() {
        this.load.image('dave', 'assets/dave.png')
        // load tile map
        this.load.image('arrowKey', 'assets/arrow-key.png')
    }

    create() {
        this.cameras.main.setBackgroundColor('#227B96')
        // add tile map
        this.physics.world.gravity.y = 1000


        this.dave = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'dave').setScale(0.25)
        this.dave.setCollideWorldBounds(true)
        this.dave.setMaxVelocity(300, 3000)

        cursors = this.input.keyboard.createCursorKeys()

        // this.physics.add.collider(this.dave, this.ground)

        // arrow keys ui
        this.upKey = this.add.sprite(64, 32, 'arrowKey').setScale(0.05);
		this.leftKey = this.add.sprite(32, 64, 'arrowKey').setScale(0.05);
		this.downKey = this.add.sprite(64, 64, 'arrowKey').setScale(0.05);
		this.rightKey = this.add.sprite(96, 64, 'arrowKey').setScale(0.05);
		this.downKey.rotation = Math.PI/2*3;
		this.rightKey.rotation = Math.PI;
        this.upKey.rotation = Math.PI/2;
        this.downKey.tint = 0x333333;
    }

    update() {
        if (cursors.left.isDown) {
            this.dave.setVelocityX(-300)
            this.leftKey.tint = 0x000000
        }

        else if (cursors.right.isDown) {
            this.dave.setVelocityX(300)
            this.rightKey.tint = 0x000000
        }

        else {
            this.dave.body.velocity.x = 0
            this.leftKey.tint = 0xFFFFFF
            this.rightKey.tint = 0xFFFFFF
        }
        
        if (this.dave.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.dave.body.setVelocityY(-1000)
            this.upKey.tint = 0x000000
        }

        else {
            this.upKey.tint = 0xFFFFFF
        }

        this.physics.world.wrap(this.dave, this.dave.width/2)
    }
}

class Level2 extends Phaser.Scene {
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

class Level3 extends Phaser.Scene {
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

class Summary extends Phaser.Scene {
    constructor() {
        super('summary')
    }
    
    create() {
        
    }
}

class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    create() {
        this.add.text(50, 50, "Thank you for playing!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere if you'd like to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

let cursors;

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x:0,
                y: 0
            }
        }
    },
    scene: [Intro, Level1]
};

let game = new Phaser.Game(config);