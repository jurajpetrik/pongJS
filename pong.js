function getFullCanvas() {
  var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  return canvas;
}

var canvas = getFullCanvas();
var game = new Game(canvas);

game.entities = [
    game.background = new Background(canvas),
    game.ball = new Ball(),
    game.player = new Player(),
    game.bot = new Bot()
]

game.start();

function Color(red, green, blue) {
  this.red = red;
  this.green = green;
  this.blue = blue;
}

Color.prototype.toHex = function() {
  return "#" + this.red.toString(16) + this.green.toString(16) + this.blue.toString(16);
}
