function Ball()
{
  Entity.call(this);

  this.width = 10;
  this.height = 10;

  this.reset();

  this.MAX_SPEED = 16;//more than this gives a bug where the ball goes "through" the paddle
}

Ball.prototype = Object.create(Entity.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function(context)
{
  context.fillStyle = game.fillColor.toHex();

  context.beginPath();
  context.arc(this.x, this.y , this.width, 0, Math.PI*2, true);
  context.closePath();
  context.fill();
}

Ball.prototype.reset = function()
{
  this.x = game.width / 2 - this.width;
  this.y = game.height /2 - this.height;

  this.speed = 10;
  this.yVelocity = Math.random() > 0.5 ? this.speed : -1 * this.speed;
  this.xVelocity = Math.random() > 0.5 ? this.speed : -1 * this.speed;
}


Ball.prototype.update = function() {
  Entity.prototype.update.apply(this, arguments); //super

  if(this.intersect(game.bot))
  {
    var hitter = game.bot;
  }

  else if (this.intersect(game.player))
  {
    var hitter = game.player;
  }

  if(hitter)
  {
    if (Math.abs(this.xVelocity) < this.MAX_SPEED) {
      this.xVelocity *= -1.1;
    }
    else {
      this.xVelocity *= -1;
    }
    game.ballHitPaddle(hitter);
  }

  else {

    if (this.y > game.height - (this.height) || this.y < this.height)
    {
      this.yVelocity *= -1;
      game.ballHitWall();
    }

    if(this.x > (game.width-this.width))
    {
      game.playerWonRound(game.player);
    }

    if(this.x <0)
    {
      game.playerWonRound(game.bot);
    }

  }
}
