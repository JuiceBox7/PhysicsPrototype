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
        this.load.image('arrowKeys', 'assets/arrow-keys.png')
        this.load.image('diamond', 'assets/diamond.png')
        this.load.image('levelBackground', 'assets/level-background.png')
        this.load.image('block', 'assets/block.png')
        this.load.audio('jump', 'assets/jump.wav')
        this.load.audio('pickup', 'assets/pickup.wav')
        this.load.audio('bgm', 'assets/bgm.wav')
    }

    collect(dave, diamond) {
        diamond.destroy(diamond.x, diamond.y)
        this.pickup.play()
        this.diamondCount += 1
        this.score.setText('Diamonds: ' + this.diamondCount)
        if (this.diamondCount == 1) {
            this.bgm.stop()
            this.scene.start('summary', {time: this.game.getTime() - this.startTime, score: this.diamondCount, level: 1})
        }
    }

    reset() {
        this.dave.disableBody(true, true)
        this.dave.enableBody(true, 1, game.config.height/1.5, true, true)
    }

    create() {
        this.add.image(400, 300, 'levelBackground')
        this.startTime = this.game.getTime()
        this.physics.world.gravity.y = 3000
   
        this.pickup = this.sound.add('pickup').setVolume(0.25)
        this.jump = this.sound.add('jump').setVolume(0.25)
        this.bgm = this.sound.add('bgm').setVolume(0.3)
        this.bgm.play()

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(40, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(120, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(200, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(280, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(360, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(620, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(700, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(780, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(860, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(940, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(1020, 560, 'block').setScale(0.05).refreshBody()

        this.pit = this.physics.add.staticGroup()
        this.pit.create(440, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(520, 639, 'block').setScale(0.05).refreshBody().setVisible(false)

        this.dave = this.physics.add.sprite(1, game.config.height/1.5, 'dave').setScale(0.2)
        
        this.diamond = this.physics.add.sprite(950, 475, 'diamond')
            .setScale(0.075)
            .setImmovable(true)
        this.diamond.body.setAllowGravity(false)

        this.diamondCount = 0

        this.score = this.add.text(820, 25, 'Diamonds: ' + this.diamondCount, {
            fontSize: '20px',
            fill: 0xFFFFFF
        })
        this.score.setScrollFactor(0)

        this.dave.setCollideWorldBounds(true)
        this.diamond.setCollideWorldBounds(true)
        this.physics.add.collider(this.dave, this.platforms)
        this.physics.add.overlap(this.dave, this.diamond, this.collect, null, this)
        this.physics.add.overlap(this.dave, this.pit, this.reset, null, this)

        cursors = this.input.keyboard.createCursorKeys()

        // arrow keys ui
        this.add.sprite(65, 45, 'arrowKeys')
            .setScale(0.25)
            .setTint(0x000000)
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
        }
        
        if (this.dave.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.jump.play()
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
        this.load.image('arrowKeys', 'assets/arrow-keys.png')
        this.load.image('diamond', 'assets/diamond.png')
        this.load.image('levelBackground', 'assets/level-background.png')
        this.load.image('block', 'assets/block.png')
        this.load.audio('jump', 'assets/jump.wav')
        this.load.audio('pickup', 'assets/pickup.wav')
        this.load.audio('bgm', 'assets/bgm.wav')
    }

    collect(dave, diamond) {
        diamond.destroy(diamond.x, diamond.y)
        this.pickup.play()
        this.diamondCount += 1
        this.score.setText('Diamonds: ' + this.diamondCount)
        if (this.diamondCount == 2) {
            this.bgm.stop()
            this.scene.start('summary', {time: this.game.getTime() - this.startTime, score: this.diamondCount, level: 2})
        }
    }

    reset() {
        this.dave.disableBody(true, true)
        this.dave.enableBody(true, 1, game.config.height/1.5, true, true)
    }

    create() {
        this.add.image(400, 300, 'levelBackground')
        this.startTime = this.game.getTime()
        this.physics.world.gravity.y = 3000

        this.pickup = this.sound.add('pickup').setVolume(0.25)
        this.jump = this.sound.add('jump').setVolume(0.25)
        this.bgm = this.sound.add('bgm').setVolume(0.3)
        this.bgm.play()

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(40, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(120, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(300, 400, 'block').setScale(0.05).refreshBody()
        this.platforms.create(530, 550, 'block').setScale(0.025).refreshBody()
        this.platforms.create(750, 500, 'block').setScale(0.025).refreshBody()
        this.platforms.create(940, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(1020, 560, 'block').setScale(0.05).refreshBody()

        this.pit = this.physics.add.staticGroup()
        this.pit.create(200, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(280, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(360, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(440, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(520, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(600, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(680, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(760, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(840, 639, 'block').setScale(0.05).refreshBody().setVisible(false)

        this.dave = this.physics.add.sprite(1, game.config.height/1.5, 'dave').setScale(0.2)
        
        this.diamond = this.physics.add.sprite(950, 475, 'diamond')
            .setScale(0.075)
            .setImmovable(true)
        this.diamond.body.setAllowGravity(false)

        this.diamond2 = this.physics.add.sprite(530, 300, 'diamond')
            .setScale(0.075)
            .setImmovable(true)
        this.diamond2.body.setAllowGravity(false)

        this.diamondCount = 0

        this.score = this.add.text(820, 25, 'Diamonds: ' + this.diamondCount, {
            fontSize: '20px',
            fill: 0xFFFFFF
        })
        this.score.setScrollFactor(0)

        this.dave.setCollideWorldBounds(true)
        this.diamond.setCollideWorldBounds(true)
        this.physics.add.collider(this.dave, this.platforms)
        this.physics.add.overlap(this.dave, this.diamond, this.collect, null, this)
        this.physics.add.overlap(this.dave, this.diamond2, this.collect, null, this)
        this.physics.add.overlap(this.dave, this.pit, this.reset, null, this)

        cursors = this.input.keyboard.createCursorKeys()

        // arrow keys ui
        this.add.sprite(65, 45, 'arrowKeys')
            .setScale(0.25)
            .setTint(0x000000)
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
        }
        
        if (this.dave.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.jump.play()
            this.dave.body.setVelocityY(-1000)
        }

        this.physics.world.wrap(this.dave, this.dave.width/2)
    }
}

class Level3 extends Phaser.Scene {
    constructor() {
        super('level3')
    }

    preload() {
        this.load.image('dave', 'assets/dave.png')
        this.load.image('arrowKeys', 'assets/arrow-keys.png')
        this.load.image('diamond', 'assets/diamond.png')
        this.load.image('levelBackground', 'assets/level-background.png')
        this.load.image('block', 'assets/block.png')
        this.load.audio('jump', 'assets/jump.wav')
        this.load.audio('pickup', 'assets/pickup.wav')
        this.load.audio('bgm', 'assets/bgm.wav')
    }

    collect(dave, diamond) {
        diamond.destroy(diamond.x, diamond.y)
        this.pickup.play()
        this.diamondCount += 1
        this.score.setText('Diamonds: ' + this.diamondCount)
        if (this.diamondCount == 3) {
            this.bgm.stop()
            this.scene.start('summary', {time: this.game.getTime() - this.startTime, score: this.diamondCount, level: 3})
        }
    }

    reset() {
        this.dave.disableBody(true, true)
        this.dave.enableBody(true, 1, game.config.height/1.5, true, true)
    }

    create() {
        this.add.image(400, 300, 'levelBackground')
        this.startTime = this.game.getTime()
        this.physics.world.gravity.y = 3000

        this.pickup = this.sound.add('pickup').setVolume(0.25)
        this.jump = this.sound.add('jump').setVolume(0.25)
        this.bgm = this.sound.add('bgm').setVolume(0.3)
        this.bgm.play()

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(40, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(150, 400, 'block').setScale(0.025).refreshBody()
        this.platforms.create(280, 550, 'block').setScale(0.025).refreshBody()
        this.platforms.create(280, 280, 'block').setScale(0.025).refreshBody()
        this.platforms.create(500, 150, 'block').setScale(0.025).refreshBody()
        this.platforms.create(750, 500, 'block').setScale(0.025).refreshBody()
        this.platforms.create(480, 360, 'block').setScale(0.025).refreshBody()
        this.platforms.create(940, 560, 'block').setScale(0.05).refreshBody()
        this.platforms.create(1020, 560, 'block').setScale(0.05).refreshBody()

        this.pit = this.physics.add.staticGroup()
        this.pit.create(200, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(280, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(360, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(440, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(520, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(600, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(680, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(760, 639, 'block').setScale(0.05).refreshBody().setVisible(false)
        this.pit.create(840, 639, 'block').setScale(0.05).refreshBody().setVisible(false)

        this.dave = this.physics.add.sprite(1, game.config.height/1.5, 'dave').setScale(0.2)
        
        this.diamond = this.physics.add.sprite(950, 475, 'diamond')
            .setScale(0.075)
            .setImmovable(true)
        this.diamond.body.setAllowGravity(false)

        this.diamond2 = this.physics.add.sprite(525, 75, 'diamond')
            .setScale(0.075)
            .setImmovable(true)
        this.diamond2.body.setAllowGravity(false)

        this.diamond3 = this.physics.add.sprite(280, 515, 'diamond')
            .setScale(0.075)
            .setImmovable(true)
        this.diamond3.body.setAllowGravity(false)

        this.diamondCount = 0

        this.score = this.add.text(820, 25, 'Diamonds: ' + this.diamondCount, {
            fontSize: '20px',
            fill: 0xFFFFFF
        })
        this.score.setScrollFactor(0)

        this.dave.setCollideWorldBounds(true)
        this.diamond.setCollideWorldBounds(true)
        this.physics.add.collider(this.dave, this.platforms)
        this.physics.add.overlap(this.dave, this.diamond, this.collect, null, this)
        this.physics.add.overlap(this.dave, this.diamond2, this.collect, null, this)
        this.physics.add.overlap(this.dave, this.diamond3, this.collect, null, this)
        this.physics.add.overlap(this.dave, this.pit, this.reset, null, this)

        cursors = this.input.keyboard.createCursorKeys()

        // arrow keys ui
        this.add.sprite(65, 45, 'arrowKeys')
            .setScale(0.25)
            .setTint(0x000000)
    }

    update() {
        if (cursors.left.isDown) {
            this.dave.body.setAccelerationX(-500)

        }

        else if (cursors.right.isDown) {
            this.dave.body.setAccelerationX(500)
        }

        else {
            this.dave.body.setAccelerationX(0)
            this.dave.body.setDragX(200)
        }
        
        if (this.dave.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.jump.play()
            this.dave.body.setVelocityY(-1000)
        }

        this.physics.world.wrap(this.dave, this.dave.width/2)
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
        this.load.image('summaryBackground', 'assets/summary-background.png')
        this.load.audio('fanfare', 'assets/fanfare.wav')
    }
    
    create() {
        this.fanfare = this.sound.add('fanfare').setVolume(0.3)
        this.fanfare.play()
        this.add.image(500, 300, 'summaryBackground').setScale(0.575)
        this.add.text(game.config.width/3, 25, 'Level ' + `${this.level}`).setFontSize(50)
        this.add.text(game.config.width/3, 75, 'Summary').setFontSize(50)
        this.add.text(game.config.width/3.5, 150, 'Time: ' + `${this.time}`).setFontSize(25)
        this.add.text(game.config.width/3.5, 175, 'Score: ' + `${this.score}`).setFontSize(25)
        this.add.text(game.config.width/3.5, 275, 'Click anywhere to continue').setFontSize(25)
        
        this.input.on('pointerdown', () => {
            this.fanfare.stop()
            if (this.level == 1) {
                this.scene.start('level2')
            }
            else if (this.level == 2) {
                this.scene.start('level3')
            }
            else {
                this.scene.start('credits')
            }
        });
    }
}

class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    preload() {
        this.load.image('summaryBackground', 'assets/summary-background.png')
    }
    
    create() {
        this.add.image(500, 300, 'summaryBackground').setScale(0.575)
        this.add.text(50, 50, "Thank you for playing!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere if you'd like to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('level1'));
    }
}

let cursors;

let config = {
    type: Phaser.WEBGL,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x:0,
                y: 0
            }
        }
    },
    scene: [Intro, Level1, Level2, Level3, Summary, Credits]
};

let game = new Phaser.Game(config);