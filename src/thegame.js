var theGame = function(game){}

theGame.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 250;
        this.game.input.onDown.add(this.addEgg, this);
    },

    addEgg: function(pointer){
    var bodyClicked = this.game.physics.p2.hitTest(pointer.position);
        if(bodyClicked.length==0){
          var egg = this.game.add.sprite(pointer.position.x, pointer.position.y, "egg");
            this.game.physics.p2.enable(egg);
        }
        else{
            bodyClicked[0].parent.sprite.kill();
        }
    }
}