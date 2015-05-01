/**
 * Created by Tinu on 29/04/2015.
 */

Input = function(player, game) {
    // objects that will hold information about the buttons
    var buttonTL;   // top left
    var buttonTR;   // top right
    var buttonBL;   // bottom left
    var buttonBR;   // bottom right
    // reference to the player, will be used to wrap player movement
    this.player = player;
    this.game = game;
};

// abstraction for player movement in different directions
// towards top left
function moveTopLeft() {
    this.player.pressTL();
};
// towards top right
function moveTopRight() {
    this.player.pressTR();
};
// towards bottom left
function moveBottomLeft() {
    this.player.pressBL();
};
//towards bottom right
function moveBottomRight() {
    this.player.pressBR();
}

/*
    visibility toggle for buttons, these should be invisible for example
    when we are in a different state than the game playing state
*/
Input.prototype.showButtons = function(trueOrFalse) {
    this.buttonTL.visible = trueOrFalse;
    this.buttonTR.visible = trueOrFalse;
    this.buttonBL.visible = trueOrFalse;
    this.buttonBR.visible = trueOrFalse;
};

// creator for input
Input.prototype.create = function() {
    this.buttonTL = this.game.add.button(0,29, 'button_topLeft', moveTopLeft, this, 1, 2, 0, 2);
    this.buttonTR = this.game.add.button(760,29, 'button_topRight', moveTopRight, this, 1, 2, 0, 2);
    this.buttonBL = this.game.add.button(0,238, 'button_bottomLeft', moveBottomLeft, this, 1, 2, 0, 2);
    this.buttonBR = this.game.add.button(760,237, 'button_bottomRightLeft', moveBottomRight, this, 1, 2, 0, 2);

    this.showButtons(false);
}