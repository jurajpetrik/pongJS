function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.width = window.innerWidth;
  this.height = window.innerHeight;

  this.paused = false;
  this.fillColor = new Color(173, 216, 230);
  this.bumpSound = new Audio("./bumpsound.wav"); // buffers automatically when created
  this.missSound = new Audio("./missSound.wav"); // buffers automatically when created

  // Keep track of key states

  this.userInput = {};
  this.userInterrupt = {};

  var self = this;
  $(canvas).on('keydown keyup', function(e) {
    //Convert key code to key name
    var keyName = Game.keys[e.which];

    if (e.type === 'keydown') {
      self.userInterrupt[keyName] = true;
    }
    //if keyState was changed
    if(keyName)
    {
      e.preventDefault();
      self.userInput[keyName] = e.type === 'keydown';
    }
  });
}

//Key codes mapping
Game.keys = {
  32: 'togglePause',
  37: 'moveLeft',
  38: 'moveUp',
  39: 'moveRight',
  40: 'moveDown',
  72: 'moveLeft',
  74: 'moveDown',
  75: 'moveUp',
  76: 'moveRight',
}

Game.prototype.start = function() {
  canvas.focus();
  var self = this,
    fps = 60,
    interval = 1000/fps;

  setInterval(function() {
    self.draw();
    self.update();
    self.userInterrupt = {};
  }
    ,interval);
};

Game.prototype.togglePause = function() {
  this.paused = !this.paused;
}

Game.prototype.update = function() {
  if (this.userInterrupt.togglePause) {
    this.togglePause();
  }
  if (this.paused) return;
  this.entities.forEach(function(entity) {
    if (entity.update)
    {
      entity.update();
    }
  });
}

Game.prototype.draw = function() {
  if (this.paused) return;
  var self = this;

  this.entities.forEach(function(entity) {
    if (entity.draw)
    {
      entity.draw(self.context);
    }
  });
}

Game.prototype.ballHitWall = function(paddle) {
  this.bumpSound.play();
}

Game.prototype.ballHitPaddle = function(paddle) {
  this.fillColor = randColor();
  this.bumpSound.play();
}

Game.prototype.playerWonRound = function(player) {

  //if bot wins make him slower if loses make him faster
  if (player === this.bot) {
    this.bot.wonRound();
  }
  else {
    this.bot.lostRound();
  }
  player.score++;
  this.ball.reset();
  this.missSound.play();
}

function randColor() {
  mix = new Color(173, 216, 230);

  var red = randomInt(255);
  var green = randomInt(255);
  var blue = randomInt(255);

  red = Math.floor((mix.red + red) / 2);
  green = Math.floor((mix.green + green) / 2);
  blue = Math.floor((mix.blue + blue) / 2);
  return new Color(red, green, blue);
}

function randomInt(n) {
  return Math.floor(Math.random() * n) + 1;
}
