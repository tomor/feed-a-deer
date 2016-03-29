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
        var TOP = 1;
        var LEFT = 0;
            
        var element      = jquery('#player');
        var playerWidth  = 60;
        var playerHeight = 90;
        var position     = [0, 0]; // top left corner x, y
        var velocity     = [0, 0]; // speed of the player
        var playerSpeed  = 0.35;
        var paused       = false;

        /**
         * Place itself to the middle bottom
         *
         * @returns {undefined}
         */
        this.initPosition = function() {
            position[TOP]  = arena.getMaxPositionBottom(this);
            position[LEFT] = arena.getMaxPositionRight(this)/2-50;

            arena.renderObjectPosition(this);
        };

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
        * Start/stop to move player up by altering TOP velocity
        *
        * @param {Boolean} enable
        * @returns {undefined}
        */
        this.moveUp = function (enable) {
            if (enable) {
                velocity[TOP] = -playerSpeed;
            } else {
                velocity[TOP] = 0;
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
                velocity[TOP] = playerSpeed;
            } else {
                velocity[TOP] = 0;
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
                velocity[LEFT] = -playerSpeed;
            } else {
                velocity[LEFT] = 0;
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
                velocity[LEFT] = playerSpeed;
            } else {
                velocity[LEFT] = 0;
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
            position[LEFT] += velocity[LEFT] * t;
            position[TOP] += velocity[TOP] * t;

            // check and fix if player would be out of arena
            if (position[LEFT] < 0) {
                position[LEFT] = 0;
            }

            if (position[TOP] < 0) {
                position[TOP] = 0;
            }

            if ((position[LEFT]) > arena.getMaxPositionRight(this)) {
                position[LEFT] = arena.getMaxPositionRight(this);
            }

            if ((position[TOP]) > arena.getMaxPositionBottom(this)) {
                position[TOP] = arena.getMaxPositionBottom(this);
            }

            // Finally, update the player's position on the page.
            arena.renderObjectPosition(this);
        };
    };

    // Return reference to the constructor function.
    return Player;
});