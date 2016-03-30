define(['jquery'], function(jquery) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    /**
     * Arena object
     *
     * - creates area in which objects can exist (and move)
     * - objects positions are referenced to this arena 0,0 is top left corner of arena
     * - transforms position of objects to the css position(px)
     */
    function Arena() {
        // Check that constructor was called properly with new keyword
        if (!(this instanceof Arena)) {
            throw new TypeError('Constructor cannot be called as a function. Use "new"');
        }

        var X = 0;
        var Y = 1;

        var element = jquery('#arena');
        var top     = element.offset().top;
        var left    = element.offset().left;
        var width   = element.width();
        var height  = element.height();

        // list of objects currently existing in arena
        this.objects = [];

        /**
         * Return boundary in which can object living in arena move
         *
         * @param {Player} object
         * @returns {Number}
         */
        this.getMaxPositionBottom = function(object) {
            return (height - object.getHeight()); // size of the arena minus object size
        };

        /**
         * Return boundary in which can object living in arena move
         * 
         * @param {Player} object
         * @returns {Number}
         */
        this.getMaxPositionRight = function(object) {
            return (width - object.getWidth()); // size of the arena minus object size
        };
        
        /**
         * Changes css value of position of the object based on it's size
         *
         * @param {Player} object - !todo change type Player to Positionable interface somehow :)!
         * @returns {undefined}
         */
        this.renderObjectPosition = function(object) {
            // duck typing
            if (typeof object.getPosition === 'function') {
                var objectPosition = object.getPosition();

                // translate position in the arena to the global position
                object.getDomElement().css('left', objectPosition[X] + left + 'px');
                object.getDomElement().css('top', objectPosition[Y] + top + 'px');
            } else {
                throw new Error('This object is missing getPosition() method: ' + object.toString());
            }
        };

    };

    // Return reference to the constructor function.
    return Arena;
});