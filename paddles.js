function Paddle()
{
  Entity.call(this);

  this.width = 15;
  this.height = 200;

  this.y = game.height/2 - this.height/2;
  this.x = 20;

  this.score = 0;

}

Paddle.prototype = Object.create(Entity.prototype);
Paddle.prototype.constructor = Paddle;

Paddle.prototype.update = function()
{
  Entity.prototype.update.apply(this, arguments);

  //don't go out of screen
  this.y = Math.min(Math.max(this.y, 0), game.height - this.height);
  this.x = Math.min(Math.max(this.x, 0), game.width - this.width);
}

function Player()
{
  Paddle.call(this);

  this.x = 20;
  this.speed =15;
}


Player.prototype = Object.create(Paddle.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function()
{

  if(game.userInput.moveUp)
  {
    this.yVelocity = - this.speed;
  }
  else if(game.userInput.moveDown)
  {
    this.yVelocity = this.speed;
  }
  else
  {
    this.yVelocity = 0;
  }

  if(game.userInput.moveLeft) {
    this.xVelocity = - this.speed;
  }

  else if(game.userInput.moveRight) {
    this.xVelocity = this.speed;
  }

  else {
    this.xVelocity = 0;
  }

  Paddle.prototype.update.apply(this, arguments);
}

function Bot ()
{
  Paddle.call(this);
  this.x = game.width - this.width - 20;
  this.speed = 7;
}

Bot.prototype = Object.create(Paddle.prototype);
Bot.prototype.constructor = Bot;

Bot.prototype.update = function()
{
  if(this.y < game.ball.y)
  {
    this.yVelocity = this.speed;
  }
  else
  {
    this.yVelocity = - this.speed;
  }
  Paddle.prototype.update.apply(this, arguments);
}

Bot.prototype.wonRound = function(){
  this.goSlower();
}

Bot.prototype.lostRound = function(){
  this.goFaster();
}


Bot.prototype.goFaster = function() {
  this.speed++;
}

Bot.prototype.goSlower = function() {
  this.speed--;
  this.speed = Math.max(0, this.speed);
}
