function Background() {
  this.textDiv = document.getElementById('overlay');
}

Background.prototype.draw = function(context)
{
  context.fillStyle = '#000';
  context.fillRect(0,0,game.width, game.height);

  var scoreText = game.player.score+' - '+game.bot.score;
  this.textDiv.innerHTML = scoreText;
  this.textDiv.style.color = game.fillColor.toHex();;

}

