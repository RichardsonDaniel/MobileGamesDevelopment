var gameTitle = function(game){}

gameTitle.prototype = {
    create: function(){
        this.game.add.tileSprite(0, 0, 640, 1136, 'background');
        var gameTitle = this.game.add.sprite(300,300,"logo");
        gameTitle.anchor.setTo(0.5,0.5);
        var playButton = this.game.add.button(330,520,"play",this.playTheGame,this);
        playButton.anchor.setTo(0.5,0.5);
    },
    playTheGame: function(){
        this.game.state.start("TheGame");
    }
}