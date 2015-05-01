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
    var highScoreData;
    var ranksObtained = false;
};

// function to store locally the highscore data from the web server
Score.prototype.setHighScoreData = function(obj) {
    this.highScoreData = obj;
};

// setter and getter for score
Score.prototype.setScore = function(collectedEggs) {
    this.score = collectedEggs;
};

// mark ranks as obtained
Score.prototype.getRank = function() {
    this.ranksObtained = true;
}

// getter for score
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

// function to render highscore
Score.prototype.showHighScore = function() {

    if (this.ranksObtained) {
        /*
         max represents the maximum number of results to display
         if we have less than 10 results stored online, show them all
         else show only 10
         */
        var max, i;
        if (this.highScoreData !== undefined) {
            if (this.highScoreData.scores.length < 11) max = this.highScoreData.scores.length;
            else max = 10;
            game.debug.text('LEADERBOARD', 300, 180, 'yellow', '50px Fixedsys');
            for (i = 0; i < max; i++) {
                game.debug.text(this.highScoreData.scores[i].name, 300, 210 + i * 35, 'yellow', '16px Fixedsys');
                game.debug.text(this.highScoreData.scores[i].score, 650, 210 + i * 35, 'yellow', '16px Fixedsys');
            }
        }
    }
}

// display score
Score.prototype.render = function() {
    if (this.visible) {
        game.debug.text('Score: ' + this.score, 440, 50, 'black');
    };

    this.livesImage.frame = this.livesLeft;
};
