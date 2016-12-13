function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.width = window.innerWidth;
  this.height = window.innerHeight;

  // Keep track of key states

  this.keyPressed = {};

  var self = this;
  $(canvas).on('keydown keyup', function(e) {
    //Convert key code to key name
    var keyName = Game.keys[e.which];

    //if keyState was changed
    if(keyName)
    {
      self.keyPressed[keyName] = e.type === 'keydown';
      e.preventDefault();

    }
  });
}

//Key codes mapping
Game.keys = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  74: 'down',
  75: 'up',
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

Game.prototype.update = function() {
  this.entities.forEach(function(entity) {
    if (entity.update)
    {
      entity.update();
    }
  });
}

Game.prototype.draw = function() {
  var self = this;

  this.entities.forEach(function(entity) {
    if (entity.draw)
    {
      entity.draw(self.context);
    }
  });
}
