define(['jquery'], function(jquery) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    /**
     * Player object
     * 
     * - moves in the arena
     * - grabs the food (todo)
     * - feeds the deer (todo)
     *
     * @param {Arena} arena - place where player exists
     */
    function Player(arena) {
        // Check that constructor was called properly with new keyword
        if (!(this instanceof Player)) {
            throw new TypeError('Constructor cannot be called as a function. Use "new"');
        }

        // "constants" for access of position and velocity arrays
        var X = 0;
        var Y = 1;
        
        var element      = jquery('#player');
        var playerWidth  = 60;
        var playerHeight = 90;
        var position     = [0, 0]; // top left corner x, y
        var velocity     = [0, 0]; // speed of the player
        var playerSpeed  = 0.35;
        var paused       = false;

        /**
         * Public function - updates status of the player
         * - currently it updates it's position when any key which should move the player
         *   is down
         *
         * @param {Number} t - time from previous update call
         * @returns {undefined}
         */
        this.update = function(t) {
            // First the motion of the ball is handled
            if(!paused) {
                this._move(t);
            }
        };

       /**
        * Start/stop to move player up by altering Y velocity
        *
        * @param {Boolean} enable
        * @returns {undefined}
        */
        this.moveUp = function (enable) {
            if (enable) {
                velocity[Y] = -playerSpeed;
            } else {
                velocity[Y] = 0;
            }
        };

       /**
        * Start/stop to move player down by altering velocity
        *
        * @param {Boolean} enable
        * @returns {undefined}
        */
        this.moveDown = function(enable) {
            if (enable) {
                velocity[Y] = playerSpeed;
            } else {
                velocity[Y] = 0;
            }
        };

       /**
        * Start/stop to move player left by altering velocity
        *
        * @param {Boolean} enable
        * @returns {undefined}
        */
        this.moveLeft = function(enable) {
            if (enable) {
                velocity[X] = -playerSpeed;
            } else {
                velocity[X] = 0;
            }
        };

       /**
        * Start/stop to move player rigth by altering velocity
        *
        * @param {Boolean} enable
        * @returns {undefined}
        */
        this.moveRight = function(enable) {
            if (enable) {
                velocity[X] = playerSpeed;
            } else {
                velocity[X] = 0;
            }
        };

        /**
         * Returns position of the object - from the top left corner
         * 
         * @returns {Array}
         */
        this.getPosition = function() {
            return position;
        };

        /**
         * Returns size of the player
         *
         * @returns {Number}
         */
        this.getWidth = function() {
            return playerWidth;
        };

        /**
         * Returns size of the player
         *
         * @returns {Number}
         */
        this.getHeight = function() {
            return playerHeight;
        };

        /**
         * Returns DOM element
         * 
         * @returns {Element}
         */
        this.getDomElement = function() {
            return element;
        };

       // ---------- private methods ---

       /**
        * Moves the player by it's velocity
        *
        * @param {Number} t - time from previous movement possible call
        * @returns {undefined}
        */
        this._move = function(t) {
            position[X] += velocity[X] * t;
            position[Y] += velocity[Y] * t;

            // check and fix if player would be out of arena
            if (position[X] < 0) {
                position[X] = 0;
            }

            if (position[Y] < 0) {
                position[Y] = 0;
            }

            if ((position[X]) > arena.getMaxPositionRight(this)) {
                position[X] = arena.getMaxPositionRight(this);
            }

            if ((position[Y]) > arena.getMaxPositionBottom(this)) {
                position[Y] = arena.getMaxPositionBottom(this);
            }

            // Finally, update the player's position on the page.
            arena.renderObjectPosition(this);
        };
    };

    // Return reference to the constructor function.
    return Player;
});