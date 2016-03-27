define([
    './objects/playerFactory',
    'jquery'],
function (
    playerFactory,
    jquery
) {
    // time variable for requestAnimationFrame
    var lastUpdate = 0;

    return {
        start : function () {
            var player;
            var distance = 24;  // The amount to move the player each step.
            
            player = playerFactory.getInstance();
            player.move(0, 0);

            this.setKeyboardControl(player, distance);

//            requestAnimationFrame(this.update);
        },

        // method which is regularly called by Window.requestAnimationFrame()
        update : function (time) {
            var t = time - lastUpdate;
            lastUpdate = time;
//            ball.update(t);
//            ai.update();
            requestAnimationFrame(update);
        },
        
        setKeyboardControl : function (player, distance) {
            jquery(document).keydown(function(event) {
            var event = event || window.event;

            // This code converts the keyCode (a number) from the event to an uppercase
            // letter to make the switch statement easier to read.
            switch(String.fromCharCode(event.keyCode).toUpperCase()) {
                case 'A':
                    player.move(-distance, 0);
                    break;
                case 'D':
                    player.move(distance, 0);
                    break;
                case 'W':
                    player.move(0, -distance);
                    break;
                case 'S':
                    player.move(0, distance);
                    break;
            }
            return false;
        });

        }
    };
    
});
