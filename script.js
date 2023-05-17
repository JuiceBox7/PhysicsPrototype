class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000)
        this.add.text(50,50, "Test your skill in this \
        \nmini platforming test!").setFontSize(25)
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20)
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('level1'))
        });
    }
}

class Level1 extends Phaser.Scene {
    constructor() {
        super('level1')
    }

    preload() {
        this.load.image('dave', 'assets/dave.png')
        this.load.image('arrowKey', 'assets/arrow-key.png')
        this.load.image('diamond', 'assets/diamond.png')
        // load tile map
    }

    collect(dave, diamond) {
        diamond.destroy(diamond.x, diamond.y)
        this.diamondCount += 1
        this.score.setText('Diamonds: ' + this.diamondCount)
        if (this.diamondCount == 1) {
            this.scene.start('summary', {time: this.game.getTime() - this.startTime, score: this.diamondCount, level: 1})
        }
    }

    create() {
        this.cameras.main.setBackgroundColor('#227B96')
        this.startTime = this.game.getTime()
        // add tile map
        this.physics.world.gravity.y = 3000
        this.ground = this.physics.add.sprite(game.config.width/2, game.config.height, 'dave').setScale(0.5)
        this.dave = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'dave').setScale(0.25)
        
        this.diamond = this.physics.add.sprite(550, 250, 'diamond')
            .setScale(0.25)
            .setImmovable(true)
        this.diamond.body.setAllowGravity(false)

        this.diamondCount = 0

        this.score = this.add.text(620, 25, 'Diamonds: ' + this.diamondCount, {
            fontSize: '20px',
            fill: 0xFFFFFF
        })
        this.score.setScrollFactor(0)

        this.ground.setCollideWorldBounds(true)
        this.dave.setCollideWorldBounds(true)
        this.diamond.setCollideWorldBounds(true)
        this.physics.add.collider(this.diamond, this.ground)
        this.physics.add.collider(this.dave, this.ground)
        this.physics.add.overlap(this.dave, this.diamond, this.collect, null, this)

        cursors = this.input.keyboard.createCursorKeys()
        
        // this.physics.add.collider(this.dave, this.ground)

        // arrow keys ui
        this.upKey = this.add.sprite(64, 32, 'arrowKey').setScale(0.06)
		this.leftKey = this.add.sprite(32, 64, 'arrowKey').setScale(0.06)
		this.downKey = this.add.sprite(64, 64, 'arrowKey').setScale(0.06)
		this.rightKey = this.add.sprite(96, 64, 'arrowKey').setScale(0.06)
		this.downKey.rotation = Math.PI/2*3
		this.rightKey.rotation = Math.PI
        this.upKey.rotation = Math.PI/2
    }

    update() {
        if (cursors.left.isDown) {
            this.dave.setVelocityX(-300)
        }

        else if (cursors.right.isDown) {
            this.dave.setVelocityX(300)
        }

        else {
            this.dave.body.velocity.x = 0
            this.leftKey.tint = 0xFFFFFF
            this.rightKey.tint = 0xFFFFFF
        }
        
        if (this.dave.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.dave.body.setVelocityY(-1000)
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

    init(data) {
        this.time = data.time * .001
        this.score = data.score
        this.level = data.level
    }

    preload() {
        this.load.image('background', 'assets/background.png')
    }
    
    create() {
        this.add.image(400, 300, 'background').setScale(0.575)
        this.add.text(game.config.width/3, 25, 'Level ' + `${this.level}`).setFontSize(50)
        this.add.text(game.config.width/3, 75, 'Summary').setFontSize(50)
        this.add.text(game.config.width/3, 150, 'Time: ' + `${this.time}`).setFontSize(25)
        this.add.text(game.config.width/3, 175, 'Score: ' + `${this.score}`).setFontSize(25)
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
    scene: [Intro, Level1, Summary]
};

let game = new Phaser.Game(config);