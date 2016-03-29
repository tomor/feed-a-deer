define(['jquery'], function(jquery) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    /**
     * Food pot object
     *
     * - is placed in the arena
     * - gives the food to the player
     *
     * @param {Arena} arena - place where pot exists
     */
    function FoodPot(arena) {
        // Check that constructor was called properly with new keyword
        if (!(this instanceof FoodPot)) {
            throw new TypeError('Constructor cannot be called as a function. Use "new"');
        }

        // "constants" for access of position array
        var TOP = 1;
        var LEFT = 0;
        
        var element  = jquery('#food-pot');
        var width    = 70;
        var height   = 70;
        var position = [0, 0];

        /**
         * Place itself to the middle bottom
         *
         * @returns {undefined}
         */
        this.initPosition = function() {
            // place itselt to the middle bottom
            position[TOP]  = arena.getMaxPositionBottom(this);
            position[LEFT] = arena.getMaxPositionRight(this)/2;

            arena.renderObjectPosition(this);
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
            return width;
        };

        /**
         * Returns size of the player
         *
         * @returns {Number}
         */
        this.getHeight = function() {
            return height;
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
        

    };

    // Return reference to the constructor function.
    return FoodPot;
});