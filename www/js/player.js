
Player = function() {

    var orientation;        // will hold the sprite index, for each location
    var cursors;            // records key strokes, will be removed later
    var wolf;               // the player

    // position of basket origin on different locations
    TL = { x: 265, y: 315 };    // for top left
    TR = { x: 695, y: 315 };    // for top right
    BL = { x: 265, y: 465 };    // for bottom left
    BR = { x: 695, y: 465 };    // for bottom right
}

// create and position the wolf
Player.prototype.create = function() {

    this.collected = 0;
    // the point x:370, y:370 is the position of the origin of the sprite
    this.wolf = game.add.sprite(370, 370, 'wolf', this.orientation);
    this.wolf.anchor.setTo(0.5, 0.5);
    this.wolf.bringToTop();

    /*
    we add here a body without a sprite, that will hold the behaviour of the
    basket. we will set the default starting position to bottom left
    this will be used to check collision of the eggs against it
     */
    this.basketPosition = BL;
    this.wolf.position.x = 365;
    this.orientation = 0;
    this.cursors = game.input.keyboard.createCursorKeys();
};

// the following 4 functions will be used for easier call when touch
// input will be implemented

// function to move to bottom left
Player.prototype.pressBL = function () {
    this.wolf.position.x = 365;
    this.basketPosition = BL;
    this.orientation = 0;       // bottom left
};

// function to move to bottom right
Player.prototype.pressBR = function () {
    this.wolf.position.x = 590;
    this.basketPosition = BR;
    this.orientation = 1;       // bottom right
};

// function to move to top left
Player.prototype.pressTL = function () {
    this.wolf.position.x = 365;
    this.basketPosition = TL;
    this.orientation = 2;       // top left
};

// function to move to top right
Player.prototype.pressTR = function () {
    this.wolf.position.x = 590;
    this.basketPosition = TR;
    this.orientation = 3;       // top right
};

// move the wolf around
// now using the freshly implemented moving functions
Player.prototype.update = function() {
    if (this.cursors.left.isDown)
    {
        this.pressBL();
    }
    // right
    else if (this.cursors.right.isDown)
    {
        this.pressBR();
    }
    // up
    if (this.cursors.up.isDown)
    {
        this.pressTL();
    }
    // down
    else if (this.cursors.down.isDown)
    {
        this.pressTR();
    }

    this.wolf.frame = this.orientation;
}