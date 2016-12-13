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
    new Background(canvas),
    game.ball = new Ball(),
    game.player = new Player(),
    game.bot = new Bot()
]

game.start();
