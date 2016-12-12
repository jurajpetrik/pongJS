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


function getFullCanvas() {
        var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

        // resize the canvas to fill browser window dynamically
        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
        }
        resizeCanvas();

        return canvas;
}

var	game = new Game(getFullCanvas());

game.entities = [
	new Background(),
	game.ball = new Ball(),
	game.player = new Player(),
	game.bot = new Bot()
];

game.start();
canvas.focus();
