/**
 * Created by Tinu on 29/04/2015.
 */

var game = new Phaser.Game(960,600, Phaser.AUTO, 'phaser-example',
    { preload: preload, create: create, update: update, render: render });

function preload () {
    game.load.image('logo','img/ntgames.png');
    game.load.image('backgroundImage','img/background.png');
    game.load.spritesheet('wolf','img/player.png', 335, 325, 4);
    game.load.image('egg','img/egg.png');
    game.load.image('splash','img/splash.png');
    game.load.spritesheet('lives','img/lives.png', 128,32,5);
    game.load.spritesheet('button_topLeft','img/topLeft.png', 150, 120,3);
    game.load.spritesheet('button_topRight','img/topRight.png',150, 120,3);
    game.load.spritesheet('button_bottomLeft','img/bottomLeft.png',150, 120,3);
    game.load.spritesheet('button_bottomRightLeft','img/bottomRight.png',150, 120,3);
    game.load.image('gameOver','img/gameover.png');

};

var background;
var logo;
var gameRunning = false;
var player = new Player();
var maximumNumberOfEggs = 1;    // maximum number of active eggs
var eggs = [];                  // array holding all the eggs
var score = new Score();        // class that will hold the score and lives
var input = new Input(player,game);// class that handles the touch input
var delay;                      // variable used to create eggs at random intervals
                                // before this all (maxeNumberOfEggs) eggs were created at once
var uri = "http://mcm-highscores-hrd.appspot.com/score?";
var gameOver;

// the create function for phaser
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    background = game.add.sprite(0, 0, 'backgroundImage');
    player.create();
    logo = game.add.sprite(0, 0, 'logo');
    game.input.onDown.add(removeLogo, this);
    score.create();
    input.create();
    input.showButtons(false);
};

// simple function that removes the logo, it is used on first click/touch event
// and starts the game
function removeLogo() {
    logo.kill();
    gameRunning = true;
    input.showButtons(true);
};

// function that returns the name of the Player to be used in highscore
function nameRequest() {
    var name = prompt("Please set your name to register your score", "Player");
    return name;
};

// obviously these functions are those suggested from the feedback form
function submitScore(game, name, email, score) {
    var url = uri + "score?&game={0}&nickname={1}&email={2}&score={3}&func=?";
    url = url.replace('{0}', game);
    url = url.replace('{1}', name);
    url = url.replace('{2}', email);
    url = url.replace('{3}', score);

    // uncomment next line if you want to display in a div the url

    //document.getElementById('url').innerText = url;

    $.ajax({
        type:  "GET",
        url:   url,
        async: true,
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (json) {
            $("#result").text(json.result);
        },
        error: function (e) {
            window.alert(e.message);
        }
    });
};

// this is the function that causes problems
function showScoreTable(obj) {
    var s = "", i;
    for (i = 0; i < obj.scores.length; i += 1) {
        s += obj.scores[i].name + ' : ' + obj.scores[i].score + '\n';
    }
    document.getElementById("scoretable").innerHTML = s;
};

function getTable() {
    var url = "http://www.mcm-highscores-hrd.appspot.com/scoresjson?game=EggDrop&func=?";

    // uncomment next line if you want to display in a div the url

    //document.getElementById('url').innerText = url;
    $.ajax({
        type: "GET",
        url: url,
        async: true,
        // Note, instead of this we could have a success function...
        jsonpCallback: 'showScoreTable',
        contentType: 'application/json',
        dataType: 'jsonp',
        error: function (e) {
            window.alert(e.message);
        }

    });
};

// the update function for phaser
function update() {
    if (player.getLives() === 0) gameRunning = false;
    if (gameRunning) {
        player.update();

        if (eggs.length < maximumNumberOfEggs) {
            // delay will start at 50; with each collected egg the
            // delay will decrease to 0
            // if it`s smaller than a random value between 25 and 50
            // basically nothing happens, so the creation of the eggs
            // will be delayed until delay reaches 0
            // eventually the delay will be smaller than the interval and
            // that is when we check if we can increase the maximum number of eggs
            // or if we can add a bonus life
            if (delay > 0) {
                delay--;
                if (delay < game.rnd.integerInRange(25, 50)) {
                    // when it`s smaller than some random value
                    // increase the maximum number of eggs as necessary
                    switch (player.getCollectedEggs()) {
                        case 5: maximumNumberOfEggs = 2; break;
                        case 10: maximumNumberOfEggs = 3; break;
                        case 20: maximumNumberOfEggs = 4; break;
                        case 50: maximumNumberOfEggs = 5; break;
                        case 100: maximumNumberOfEggs = 6; break;
                        case 150: maximumNumberOfEggs = 8; break;
                        case 200: maximumNumberOfEggs = 10; break;
                        case 250: maximumNumberOfEggs = 15; break;
                        case 300: maximumNumberOfEggs = 20; break;
                        case 350: maximumNumberOfEggs = 30; break;
                        case 400: maximumNumberOfEggs = 50; break;
                        default : break;
                    }
                }
            }
            // at this point (when delay is 0) we can add an egg
            // and get a new random value for the delay to decrease
            // meanwhile some updates occurred;
            // so to sum up:
            // if there is a delay, for a period just waste time and then
            // check if we can increase the maximumNumberOfEggs
            // if there`s no delay, create the egg, and create delay
            else {
                eggs.push(new Egg(game, player));
                // to reduce chances of egg creation, increase the range over 50
                delay += game.rnd.integerInRange(10, 50);
                // need to check with every collected egg if we can add a bonus live
                switch  (player.getCollectedEggs()) {
                    case 50: player.increaseLives(); break;
                    case 100: player.increaseLives(); break;
                    case 150: player.increaseLives(); break;
                    case 200: player.increaseLives(); break;
                    default : break;
                }
            }
        }
        /*
         for all the active eggs, update them
         the other ones, remove them
         */
        for (var i = 0; i < eggs.length; i++) {
            if (eggs[i].active) {
                eggs[i].update();
            }
            else {
                eggs.splice(i, 1);
                delay = 50-player.getCollectedEggs();
            }
        }
        score.setLives(player.getLives());
        score.setScore(player.getCollectedEggs())
        if (gameRunning) {
            if (player.getLives()=== 0)
            {
                gameOver = game.add.sprite(0,0,'gameOver');
                maximumNumberOfEggs = 0;
                name = nameRequest();
                var email = 'Richardson.daniel@hotmail.co.uk';
                var gamename = 'EggDrop';
                submitScore(gamename, name, email, score.getScore());
                getTable();
                showScoreTable();
                gameRunning = false;
            }
        }
    }
};

// the render function for phaser
function render() {
    score.render();
};