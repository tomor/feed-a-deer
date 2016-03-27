define(['jquery'], function(jquery) {
    return {
        getInstance : function () {
            var playerWidth  = 90;
            var playerHeight = 60;
            var position     = [0, 0];
            var element      = jquery('#player');

            var move = function(x, y) {
                // Adjust the player's position.
                position[0] += x;
                position[1] += y;

                // If the player is off the edge of the screen, move it back.
                if (position[1] <= 0)  {
                    position[1] = 0;
                }

                if (position[0] <= 0)  {
                    position[0] = 0;
                }

                // The height of the player is X pixels, so stop it before any
                // part of the player extends off the screen.
                if (position[1] >= innerHeight - playerHeight) {
                    position[1] = innerHeight - playerHeight;
                }

                // The width of the player is X pixels, so stop it before any
                // part of the player extends off the screen.
                if (position[0] >= innerWidth - playerWidth) {
                    position[0] = innerWidth - playerWidth;
                }

                // Finally, update the player's position on the page.
                element.css('left', position[0] + 'px');
                element.css('top', position[1] + 'px');
            };

            return {
              move:         move,
              getPosition:  function()  { return position; },
              getWidth:     function()  { return playerWidth; },
              getHeight:    function()  { return playerHeight; }
            };
        }
    };
});