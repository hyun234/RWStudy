//const canvas = document.querySelector('canvas');
const canvas = document.getElementById('main_canvas');
var context = canvas.getContext('2d');
//classes
class player{
    constructor(x,y,radius,color){
        this.pos_x = x;
        this.pos_y = y;
        this.radius = radius;
        this.color = color;
    }
    draw(){
        context.beginPath();
        
        context.arc(this.pos_x,this.pos_y,this.radius,0,2*Math.PI)
        context.fillStyle = this.color;
        context.fill()

        context.closePath();        
    }
}

class bullet{
    constructor(position_x,position_y, destination_x, destination_y, radius,color, speed){
        this.position_x = position_x;
        this.position_y = position_y;
        this.destination_x = destination_x / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.destination_y = destination_y / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }
    update(){
        this.position_x += this.destination_x * this.speed;
        this.position_y += this.destination_y * this.speed;
    }
    draw(){
        context.beginPath();
        context.arc(this.position_x, this.position_y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}

class Enemy{
    constructor(position_x,position_y, destination_x, destination_y, radius,color, speed){
        this.position_x = position_x;
        this.position_y = position_y;
        this.destination_x = destination_x / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.destination_y = destination_y / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }
    update(){
        this.position_x += this.destination_x * this.speed;
        this.position_y += this.destination_y * this.speed;
    }
    draw(){
        context.beginPath();
        context.arc(this.position_x, this.position_y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}

class GameManager{
    constructor(){
        this.score = 0;
        this.fps = 60;
        this.bulletArr = [];
        this.EnemyArr = [];
        this.Player = new player(canvas.width/2, canvas.height/2, 20, 'skyblue');
    }  
    Render(){
        context.fillStyle = "rgb(0,0,0,0.2)"
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.Player.draw();

        this.bulletArr.forEach(function(bullet){
            bullet.update();
            bullet.draw();
        })
        this.EnemyArr.forEach((enemy,enemyIndex) =>{
            enemy.update();
            enemy.draw();
            const dist = Math.hypot(this.Player.pos_x - enemy.position_x, this.Player.pos_y - enemy.position_y);
            if(dist - this.Player.radius - enemy.radius < 0.5){
                clearInterval(animation);
                clearInterval(animation2);
            }
            this.bulletArr.forEach((bullet,bulletIndex)=>{
                const dist2 = Math.hypot(bullet.position_x - enemy.position_x,bullet.position_y - enemy.position_y);
                if(dist2 - bullet.radius - enemy.radius < 0.5){

                    if(enemy.radius -20 > 10){
                        enemy.radius -=10;
                        setTimeout(()=>{
                            this.bulletArr.splice(bulletIndex,1);
                        },0)
                    }
                    else
                    {
                        setTimeout(() => {
                            this.bulletArr.splice(bulletIndex,1);
                            this.EnemyArr.splice(enemyIndex,1);    
                        }, 0);
                        
                    }
                }
            })
        })
    }
    SpawnBullet(event) {
        let clickpos_x = event.clientX -context.canvas.offsetLeft;
        let clickpos_y = event.clientY -context.canvas.offsetTop;
        let des_x = clickpos_x - this.Player.pos_x;
        let des_y = clickpos_y - this.Player.pos_y;
        this.bulletArr.push(new bullet(this.Player.pos_x,this.Player.pos_y,des_x,des_y,5,'red',5));
    }
    SpawnEnemy(){
        let enemy_x;
        let enemy_y;
        if(Math.random() < 0.5){
            enemy_x = Math.random() < 0.5 ? 0 : canvas.width;
            enemy_y = Math.random() * canvas.height;
        }
        else{
            enemy_x = Math.random() * canvas.width;
            enemy_y = Math.random() < 0.5 ? 0 : canvas.height; 
        }
        const radius = Math.random()*30 + 30; 
        const color = "hsl("+Math.random()*360+",50%,50%)";
        const speed = (Math.random()+1)*2;
        let des_x = canvas.width/2 - enemy_x;
        let des_y = canvas.height/2 - enemy_y;
        this.EnemyArr.push(new Enemy(enemy_x,enemy_y,des_x,des_y,radius,color,speed));
    }
}

var gm = new GameManager();
const animation = setInterval(rend,1000/gm.fps);
const animation2 = setInterval(rend2,70000/gm.fps);

function rend(){
    gm.Render();
}
function rend2(){
    gm.SpawnEnemy();
}

canvas.onclick = function(event){    
    gm.SpawnBullet(event);
}
