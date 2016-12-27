function Background() { this.score = document.getElementById('score');
  this.muteText = document.getElementById('muteText');
  this.muteText.addEventListener("click", this.toggleMute.bind(this), false);
  this.muteText.innerHTML = 'sound on';
  this.hideMuteText();
}

Background.prototype.toggleMute = function(event) {
  event.preventDefault();
  game.muted = !game.muted;
  if (game.muted) {
    this.muteText.innerHTML = 'sound off';
  }
  else {
    this.muteText.innerHTML = 'sound on';
  }
  game.canvas.focus();
}

Background.prototype.draw = function(context)
{
  context.fillStyle = '#000';
  context.fillRect(0,0,game.width, game.height);

  var scoreText = game.player.score+' - '+game.bot.score;
  this.score.innerHTML = scoreText;
  this.score.style.color = game.fillColor.toHex();;
  this.muteText.style.color = game.fillColor.toHex();;
}

Background.prototype.showMuteText = function () {
  this.muteText.style.visibility = 'visible';
}

Background.prototype.hideMuteText = function () {
  this.muteText.style.visibility = 'hidden';
}
