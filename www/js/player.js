
Player = function() {

    var orientation = 0;
    var cursors;
    var wolf;
}

// create and position the wolf
Player.prototype.create = function() {

    this.collected = 0;
    this.wolf = game.add.sprite(370, 370, 'wolf', this.orientation);
    this.wolf.anchor.setTo(0.5, 0.5);
    this.wolf.bringToTop();

    this.wolf.position.x = 365;
    this.cursors = game.input.keyboard.createCursorKeys();
};

// move the wolf around
Player.prototype.update = function() {
    //left arrow
    if (this.cursors.left.isDown)
    {
        this.wolf.position.x = 365;
        this.orientation = 0;       // bottom left
    }
    // right arrow
    else if (this.cursors.right.isDown)
    {
        this.wolf.position.x = 590;
        this.orientation = 1;       //bottom right
    }
    // up arrow
    if (this.cursors.up.isDown)
    {
        this.wolf.position.x = 365;
        this.orientation = 2;       // top left
    }
    // down arrow
    else if (this.cursors.down.isDown)
    {
        this.wolf.position.x = 590;
        this.orientation = 3;       //top right
    }

    this.wolf.frame = this.orientation;
}