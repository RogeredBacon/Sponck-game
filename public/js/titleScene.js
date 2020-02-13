
class TitleScene extends Phaser.Scene {
    
    constructor(){
        super({key: 'TitleScene'});
    }

    


    preload(){
        this.load.image('ground','assets/ground.jpg');
    }
    create(){
        let backgrund = this.add.sprite(0,0,'ground');
        backgrund.setOrigin(0,0);

        // this.add.image(400, 200, 'ground');

        // this.input.keyboard.on('keyup_D', function(even){
        //     this.image.x += 10;
        // },this);

        this.input.keyboard.on('keyup',function(e){
            if(e.key == '2'){
                console.log("hi")
                this.scene.start('SponckGame');
            }
        },this);
    }
    
    
    
    
    
}

export default TitleScene;
    
    
    
    
    
    
    
    
    
    
  