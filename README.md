# Feed a deer browser game

For fun project ;)

## Programming design (notes/ideas)

### Current state/result of this fun project can be seen here
- player moving on the grass via ASDF
https://rawgit.com/tomor/feed-a-deer/master/www/index.html

### GameObjects
- Player, Deer, FoodPot
- Game objects live in a boundaries of Arena
- Each object has position and width and height

### Arena
- Arena is a place where game is happening
- Arena contains game objects
- Transforms position of objects from arena dimensions to css position
- think about: Transforms size of objects to css size?..maybe later