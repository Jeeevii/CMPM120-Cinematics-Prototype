class Intro extends Phaser.Scene {
    constructor() {
        super({key: "Intro"});
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("Logo", "image/logo.png");
    }    

    create() {
        let centerX = this.cameras.main.width / 2;
        this.isAnimationFinished = false;
        
        let Logo = this.add.sprite(centerX, 300, "Logo");
        Logo.alpha = 0;
        this.tweens.add({
          targets: Logo,
          alpha: 1,
          duration: 1000,
        });

        this.tweens.add({
            targets: Logo,
            alpha: 0,
            delay: 2000,  // Delay in milliseconds before starting the fade out animation
            duration: 1000,
          });

        this.time.addEvent({
            delay: 3250,
            callback: () => {
                this.onAnimationComplete();
            },
            callbackScope: this
        });
    
    }

    onAnimationComplete() {
        this.isAnimationFinished = true;
    }

    update() {
        if (this.isAnimationFinished) {
          this.scene.start("Menu");
        }
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super({key: "Menu"});
    }

    preload() {
        this.load.path = "./assets/";
        //this.load.image("title", "image/title.png");
        this.load.image("hand", "image/PokerHandMenu.png");
        this.load.image("bg", "image/bg.png");
        this.load.image("audio", "image/audio.png");
        this.load.audio("bgm", "audio/bgm.mp3");
    }    

    create() {
        this.cameras.main.fadeIn(1000, 255, 255, 255);
        this.cameras.main.setBackgroundColor('#ffffff');
        this.sound.stopAll();
        let bgm = this.sound.add("bgm", {loop : true, autoPlay: true});
        bgm.play();
        bgm.setVolume(1);
        let isPlaying = true;

        // Enable global drag input
        this.input.on('dragstart', function (pointer) {
            // Store the initial drag position
            let initialDragX = pointer.x;
        }, this);

        this.input.on('drag', function (pointer) {
            // Calculate the distance dragged
            const dragDistance = pointer.x - initialDragX;

            // Update the camera scroll based on the drag distance
            this.cameras.main.scrollX -= dragDistance * 0.5; // Adjust the scroll speed as needed

            // Store the new initial drag position for the next drag event
            initialDragX = pointer.x;
        }, this);

        let bg = this.add.image(0, 0, 'bg').setOrigin(0);

        // Set the scale to fit the entire screen
        bg.setScale(game.config.width / bg.width, game.config.height / bg.height);
        
        let audio = this.add.image(desiredWidth * (50/1080), desiredHeight * (50/600), "audio");
        audio.setScale(0.1*(game.config.width / audio.width), 0.1*(game.config.height / audio.height));
        audio.setInteractive();

        audio.on('pointerup', function() {
            if (isPlaying) {
                this.sound.stopAll();
                isPlaying = false;
            }

            else {
                bgm.play();
                bgm.setVolume(1);
                isPlaying = true;
            }
        }, this);
        
        let poker = this.add.image(desiredWidth * (750/1080), this.cameras.main.centerY, "hand");
        poker.setScale(0.5*(game.config.width / poker.width), game.config.height / poker.height);

        let textConfig = {
            fontSize: Math.round(game.config.width * 0.025) + 'px', // Adjust the scaling factor as needed
            color: '#000000'
        };

        let menu = this.add.text(desiredWidth * (735/1080), desiredHeight * (100/600), "EXIT   CREDIT    PLAY", textConfig).setOrigin(0.5);

        //let title = this.add.sprite(desiredWidth * (870/1080), desiredHeight * (95/600), "title");
        //title.setScale(game.config.width / bg.width, game.config.height / bg.height);
        let playRect = this.add.rectangle(desiredWidth * (890/1080), desiredHeight * (110/600), desiredWidth* (185/1080), desiredHeight * (240/600), 0x000000);
        playRect.setAngle(15);
        playRect.setAlpha(0.001);
        playRect.setInteractive(); // Make the rectangle interactive for input events

        playRect.on('pointerup', function() {
          this.scene.start("Menu");
        }, this);

        let setRect = this.add.rectangle(desiredWidth * (740/1080), desiredHeight * (100/600), desiredWidth* (160/1080), desiredHeight * (180/600), 0x000000);
        setRect.setAlpha(0.001);
        setRect.setInteractive(); // Make the rectangle interactive for input events

        setRect.on('pointerup', function() {
          this.scene.start('Credit');
        }, this);

        let exitRect = this.add.rectangle(desiredWidth * (615/1080), desiredHeight * (130/600), desiredWidth* (130/1080), desiredHeight * (160/600), 0x000000);
        exitRect.setAngle(-20);
        exitRect.setAlpha(0.001);
        exitRect.setInteractive(); // Make the rectangle interactive for input events

        exitRect.on('pointerup', function() {
            window.close();
        });
    }
}
