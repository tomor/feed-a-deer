# Feed a deer browser game

For fun project ;)

## Programming design (notes/ideas)


### GameObjects
- Player, Deer, FoodPot
- Game objects live in a boundaries of Arena
- Each object has position and width and height

### Arena
- Arena is a place where game is happening
- Arena contains game objects
- Transforms position of objects from arena dimensions to css position
- think about: Transforms size of objects to css size?..maybe later