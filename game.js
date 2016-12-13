function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.paused = false;

  // Keep track of key states

  this.userInput = {};

  var self = this;
  $(canvas).on('keydown keyup', function(e) {
    //Convert key code to key name
    var keyName = Game.keys[e.which];

    //if keyState was changed
    if(keyName)
    {
      self.userInput[keyName] = e.type === 'keydown';
      e.preventDefault();

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
  74: 'moveDown',
  75: 'moveUp',
}

Game.prototype.start = function() {
  canvas.focus();
  var self = this,
    fps = 60,
    interval = 1000/fps;

  setInterval(function() {
      self.update();
      self.draw();
  }
    ,interval);
};

Game.prototype.togglePause = function() {
  this.paused = !this.paused;
}

Game.prototype.update = function() {
  if (this.userInput.togglePause) {
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
