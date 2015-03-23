var preload = function(game){}

preload.prototype = {
    preload: function(){
        var loadingBar = this.add.sprite(330,520,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
        this.game.load.image("egg", "images/egg.png");
        this.game.load.image("logo", "images/chicken.png");
        this.game.load.image("play", "images/play.png");
        this.game.load.image("background", "images/background.jpg");
    },
    create: function(){
        this.game.state.start("GameTitle");
    }
}