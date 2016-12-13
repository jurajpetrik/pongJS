function Ball()
{
  Entity.call(this);

  this.width = 20;
  this.height = 20;
  // this.fillColor = '#000000';

  this.reset();

}

Ball.prototype = Object.create(Entity.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function(context)
{

  context.fillStyle = this.fillColor;

  context.beginPath();
  context.arc(this.x, this.y , this.width/2, 0, Math.PI*2, true);
  context.closePath();
  context.fill();
}

Ball.prototype.reset = function()
{
  this.x = game.width / 2 - this.width;
  this.y = game.height /2 - this.height;

  this.yVelocity = 10;
  this.xVelocity = 10
}


Ball.prototype.update = function() {
  if (this.y > game.height- (this.height) || this.y < 0)
  {
    this.yVelocity *= -1;
  }

  if(this.x > (game.width-this.width))
  {
    game.player.score+=1;
    this.reset();
  }
  if(this.x <0)
  {
    game.bot.score+=1;
    this.reset();
  }

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
    this.xVelocity *= -1.1;
    // this.yVelocity *= -1.1;

  }

  Entity.prototype.update.apply(this, arguments); //super
}
