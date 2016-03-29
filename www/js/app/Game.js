define(
    [
     'jquery',
     './objects/Player',
     './objects/Arena'
    ],
function (
    jquery,
    Player,
    Arena
) {
    "use strict";

    /**
     * Game object
     *
     * - initializes other objects: player, pot, deers
     * - initializes the movement (rendering)
     */
    function Game() {
        // Check that constructor was called properly with new keyword
        if (!(this instanceof Game)) {
            throw new TypeError('Constructor cannot be called as a function. Use "new"');
        }

        this.lastUpdate = 0; // time variable for requestAnimationFrame
        this.player;
        this.arena;

        /**
         * Main method to start the game
         *
         * @returns {undefined}
         */
        this.start = function() {
            this.arena  = new Arena();
            this.player = new Player(this.arena);
            
            this.setKeyboardControl(this.player);

            // start to move everything
            this.renderAnimation = this.renderAnimation.bind(this); // bind this to be able to use this in the renderAnimation properly
            requestAnimationFrame(this.renderAnimation);
        };

        // method which is regularly called by Window.requestAnimationFrame()
        this.renderAnimation = function(time) {
            // prepare time difference
            var t = time - this.lastUpdate;
            this.lastUpdate = time;

            // update objects
            this.player.update(t);

            // make to call this method again
            requestAnimationFrame(this.renderAnimation);
        };

        /**
         * Handle keydown and keyup events
         *
         * @param {Player} player
         * @returns {undefined}
         */
        this.setKeyboardControl = function (player) {

            jquery(document).keydown(function(event) {
                var event = event || window.event; // deal with IE
                // This code converts the keyCode (a number) from the event to an uppercase
                // letter to make the switch statement easier to read.
                switch(String.fromCharCode(event.keyCode).toUpperCase()) {
                    case 'A':
                        player.moveLeft(true);
                        break;
                    case 'D':
                        player.moveRight(true);
                        break;
                    case 'W':
                        player.moveUp(true);
                        break;
                    case 'S':
                        player.moveDown(true);
                        break;
                };
                
                return false; // do not propagate any keystroke (keyboard will not work in browser)
            });

            jquery(document).keyup(function(event) {
                var event = event || window.event; // deal with IE

                // This code converts the keyCode (a number) from the event to an uppercase
                // letter to make the switch statement easier to read.
                switch(String.fromCharCode(event.keyCode).toUpperCase()) {
                    case 'A':
                        player.moveLeft(false);
                        break;
                    case 'D':
                        player.moveRight(false);
                        break;
                    case 'W':
                        player.moveUp(false);
                        break;
                    case 'S':
                        player.moveDown(false);
                        break;
                };

                return false; // do not propagate any keyup (keyboard will not work in browser)
            });

        };
    };

    return Game;
});
