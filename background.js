function Background() {}

Background.prototype.draw = function(context)
{
  context.fillStyle = '#000';
  context.fillRect(0,0,game.width, game.height);

  context.fillStyle = '#00cc00';
  context.font = '40px monospace';

  var scoreText = game.player.score+' : '+game.bot.score;
  context.fillText(scoreText, game.width/2,game.height/2);

}

