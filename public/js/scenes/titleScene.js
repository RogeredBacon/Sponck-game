class Example1 extends Phaser.Scene {
    
    constructor(){
        super({key: 'Example1'});
    }
    preload(){
        this.load.image('ground','assets/ground.jpg');
    }
    create(){
        this.add.image(400, 200, 'ground');

        this.input.keyboard.on('keyup_D', function(even){
            this.image.x += 10;
        },this);

        this.input.keyboard.on('keyup',function(e){
            if(e.key == '2'){
                this.scene.start('Game');
            }
        },this);
    }
    
    
    
    
    
}  
    
    
    
    
    
    
    
    
    
    
  