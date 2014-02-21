function Paddle()
{
	Entity.call(this);

	this.width = 20;
	this.height = 100;
	
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
	
	
	if(game.keyPressed.up)
	{
		this.yVelocity = - this.speed;
	}
	else if(game.keyPressed.down)
	{
		this.yVelocity = this.speed;
	}
	else
	{
		this.yVelocity = 0;
	}
	
	Paddle.prototype.update.apply(this, arguments);
}

function Bot ()
{
	Paddle.call(this);
	this.x = game.width - this.width - 20;
	this.speed = 8;	
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
