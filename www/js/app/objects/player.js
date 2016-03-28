define(['jquery'], function(jquery) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Player() {
        // Check that constructor was called properly with new keyword
        if (!(this instanceof Player)) {
            throw new TypeError('Constructor cannot be called as a function. Use "new"');
        }

        var X = 0;
        var Y = 1;
        
        var element      = jquery('#player');
        var playerWidth  = 60;
        var playerHeight = 90;
        var position     = [0, 0];
        var velocity     = [0, 0]; // speed of the player
        var playerSpeed  = 1;
        var paused       = false;

        // max position of the arena - TODO get from arena object
        var maxLeft = 0;
        var maxRight = innerWidth - playerWidth;
        var maxTop = 0;
        var maxBottom = innerHeight - playerHeight;

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

       // ---------- private functions ---

       /**
        * Method which moves the player by it's velocity
        *
        * @param {Number} t - time from previous movement possible call
        * @returns {undefined}
        */
        this._move = function(t) {
            position[X] += velocity[X] * t;
            position[Y] += velocity[Y] * t;

            // check and fix if player would be out of arena
            if (position[X] < maxLeft) {
                position[X] = maxLeft;
            }

            if ((position[X]) > maxRight) {
                position[X] = maxRight;
            }

            if (position[Y] < maxTop) {
                position[Y] = maxTop;
            }

            if ((position[Y]) > maxBottom) {
                position[Y] = maxBottom;
            }

            // Finally, update the player's position on the page.
            element.css('left', position[0] + 'px');
            element.css('top', position[1] + 'px');
        };
    };

    // Return reference to the constructor function.
    return Player;
});