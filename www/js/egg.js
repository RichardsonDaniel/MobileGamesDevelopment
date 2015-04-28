/**
 * Created by Tinu on 27/04/2015.
 */

Egg = function(game, player) {

    // reference for the player and the game
    this.player = player;
    this.game = game;
    this.resetPosition();
    this.Egg = game.add.sprite(this.x, this.y, 'egg');
    this.Egg.anchor.set(0.5);

    // Using physics only to set the velocity of the Egg`s body
    game.physics.enable(this.Egg, Phaser.Physics.ARCADE);

};

    /*
    this function will randomly position an active egg to one of the
    4 predefined locations (topLeft, topRight, bottomLeft, bottomRight)
    */
Egg.prototype.resetPosition = function() {
    this.active = true;
    // create a random location
    var location = game.rnd.integerInRange(0,3);

    /*
    this will record the randomized position, will actually hold
    the x and y of the random location
    */
    var position;

    /*
    starting positions for eggs on all 4 locations
    edit here to adjust the position of the egg when created
    */
    topLeft         = { x: 80, y: 220 };
    topRight        = { x: 880, y: 220 };
    bottomLeft      = { x: 80, y: 350 };
    bottomRight     = { x: 880, y: 350 };

    /*
    based on the randomized location, set the position and the
    right direction (left to right or right to left)
    also set the source where it came from, so we only check collision
    with the basket positioned close to the source
     */
    switch (location) {
        case 0: position = bottomLeft;
            this.direction = 1;
            this.source = 0;
            break;
        case 1: position = bottomRight;
            this.direction = -1;
            this.source = 1;
            break;
        case 2: position = topLeft;
            this.direction = 1;
            this.source = 2;
            break;
        case 3: position = topRight;
            this.direction = -1;
            this.source = 3;
            break;
        default: break;
    }

    this.x = position.x;
    this.y = position.y;
};

/*
 collision check against the position of the basket
 first we create the boundaries from the origin of the basket
 */
Egg.prototype.contacts = function(x, y) {

    // based on a 108 by 90 collision body for the basket
    left = x - 54;
    right = x + 54;
    top = y - 45;
    bottom = y + 45;

    // next we check if it is outside and return false if so
    if (this.Egg.x < left) return false;
    if (this.Egg.x > right) return false;
    if (this.Egg.y > bottom) return false;
    if (this.Egg.y < top) return false;

    // otherwise if we arrive here, at this point we have a collision
    return true;
};

Egg.prototype.update = function() {
    /*
    the ramp is inclined by 30 degrees this means that during one update
    using a speed of 1 pixel per update, it will actually travel one pixel
    in the left/right direction and half a pixel in the down direction
    (sin 30 = 1/2)

     if is on the ramp, set the velocity according to the right direction
    */
    if (this.Egg.x < 226 || this.Egg.x > 740)
    {
        this.Egg.body.velocity.x += 1 * this.direction;
        this.Egg.body.velocity.y += 0.5;
    }
    /*
    otherwise don`t move on x axis and apply only an arcade gravity
    of 10 pixels per update (normally it would have been 1)
    basically when off the ramp, fall faster
    */
    else
    {
        this.Egg.body.velocity.x = 0;
        this.Egg.body.velocity.y += 10;
    }

    /*
    if the egg has hit the ground, deactivate it, and stick it there,
    later a transformation will occur
     */
    if (this.Egg.y > 540) {
        this.active = false;
        this.Egg.body.velocity.y = 0;
        this.Egg.loadTexture('splash');
        this.player.decreaseLives();
    }

    /*
    if there`s contact with the basket
    deactivate the egg and get it out of the screen until it gets deleted
     */
    if (this.source === this.player.orientation) {
        if (this.contacts(this.player.basketPosition.x, this.player.basketPosition.y)) {
            this.active = false;
            this.Egg.y = 1000;
            this.Egg.x = 500;
            this.Egg.body.velocity.y = 0;
            this.Egg.body.velocity.x = 0;
            this.player.collect();
        }
    }

};

