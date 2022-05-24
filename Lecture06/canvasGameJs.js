var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

class Player
{
    constructor(x,y,color)
    {
        this.x = x;
        this.y = y;       
        this.color = color;       
    }

    draw()
    {
        ctx.beginPath();
        ctx.arc(this.x,this.y,20,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill(); 
        ctx.closePath();
    }

}
class Bullet
{
    constructor(x,y,color)
    {
        this.x = x;
        this.y = y;       
        this.color = color;       
    }

    draw()
    {
        ctx.beginPath();
        ctx.arc(this.x,this.y,10,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill(); 
        ctx.closePath();
    }

}
canvas.onclick = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft; 
    const y = event.clientY - ctx.canvas.offsetTop;

    var b = new Bullet(x,y,'red');
    b.draw();
}
var p = new Player(50,50,'black');
p.draw();
