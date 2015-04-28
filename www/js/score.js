/**
 * Created by Tinu on 28/04/2015.
 */

/*
 So we have a structure that will always know how many lives we got left,
 how many eggs we collected and will display on the screen the values for these
 */
Score = function() {
    var livesLeft = 3;
    var score = 0;
    var visible;
    var livesImage;
};

// setter and getter for score
Score.prototype.setScore = function(collectedEggs) {
    this.score = collectedEggs;
};

Score.prototype.getScore = function() {
    return this.score;
}

// setter for lives
Score.prototype.setLives = function (lives) {
    this.livesLeft = lives;
}

// toggle for visibility of the score
// on
Score.prototype.makeVisible = function() {
    this.visible = true;
};

// off
Score.prototype.makeInvisible = function() {
    this.visible = false;
};

Score.prototype.create = function() {
    this.makeVisible();
    this.livesImage = game.add.sprite(420, 60, 'lives', this.livesLeft);
};

// display score
Score.prototype.render = function() {
    if (this.visible) {
        game.debug.text('Score: ' + this.score, 440, 50, 'black');
    };

    this.livesImage.frame = this.livesLeft;
};
