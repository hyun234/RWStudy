const canvas = document.querySelector('canvas') 
const c = canvas.getContext('2d')
//너비,높이 자동 설정
canvas.width = innerWidth
canvas.height = innerHeight
//플레이어 클래스 생성-x,y위치, 반지름, 색 //  함수: 그리기
class Player{
    constructor(x,y,radius,color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,2*Math.PI)
        c.fillStyle = this.color
        c.fill()
    }
}
//발사체 클래스 생성- x,y위치, 반지름, 색, 발사체 가는 방향? // 함수:그리기 s
class Projectile{
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,2*Math.PI)
        c.fillStyle = this.color
        c.fill()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}
//Enemy 적 생성
class Enemy{
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,2*Math.PI)
        c.fillStyle = this.color
        c.fill()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

//컨버스 중앙 위치값
const x = canvas.width/2
const y = canvas.height/2

const player = new Player(x,y,15,'white')
/*
//배열 projecties에 새롭게 객체화한 projectie를 넣어서 애니메이션화한다.
const projectile = new Projectile(canvas.width/2,canvas.height/2,5,'red',{x :1,y:1}) 
const projectile2 = new Projectile(canvas.width/2,canvas.height/2,5,'green',{x :-1,y:-1}) 
const projectiles = [projectile,projectile2]
function animate(){
    requestAnimationFrame(animate)
    projectiles.forEach(function(projectile){
        projectile.update()
    })
}
*/
//총알, 적 배열 생성
const projectiles = []
const enemies = []

//일정한 시간동안 반복을 위해 setInterval실행 -> 적을 만든다.
function spawnEnemies(){
    setInterval(function(kk){
        //적 반지름 생성
        const radius = Math.random() * 30 + 30  
        // let 변수를 선언한뒤 값을 변경 가능
        let x
        let y

        //2분의 1확률로 이용하여 좌표 설정(x좌표가 0 또는 캔버스 끝에 일때 y좌표는 랜덤)
        if(Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0 : canvas.width
            y = Math.random() * canvas.height
        }
        else{
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 : canvas.height
        }
        //enemy 색 바꾸기
        const color = 'hsl('+Math.random()*360+', 50%, 50%)'
        //const color = 'hsl(${Math.random()*360}, 50%, 50%)' 위에와 동일
        const angle = Math.atan2(canvas.height/2 - y, canvas.width/2-x)
        const ran = (Math.random()+1)*2
        const velocity ={x: Math.cos(angle)*ran,y : Math.sin(angle)*ran}
        enemies.push(new Enemy(x,y,radius,color,velocity))

    },1000)
}

let animationId
//requestAnimationFrame(animate) ->무한 반복  forEach(function(){}) or forEach(()=>{}) 배열의 원소를 각각 확인
function animate(){
    c.fillStyle = 'rgb(0,0,0,0.08)'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.draw()
    animationId = requestAnimationFrame(animate)
    projectiles.forEach(function(projectile,projectileIndex){
        projectile.update()

        //캔버스 범위에 나가면 발사체 삭제
        if(projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 || 
            projectile.y - projectile.radius > canvas.height 
            ){
            setTimeout(()=>{
                projectiles.splice(projectileIndex,1)
            },0)
        }
    })
    enemies.forEach((enemy, enemyIndex)=>{
        enemy.update()
        //적과 플레이어 거리
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if(dist - player.radius - enemy.radius < 1){
            cancelAnimationFrame(animationId)
        }

        //발사체와 적의 거리 (Math.hypot이용)  // x제곱 더하기 y제곱의 루트
        projectiles.forEach((projectile,projectieIndex)=>{
            const dist = Math.hypot(projectile.x - enemy.x,projectile.y-enemy.y)
            //splice를 이용해 해당 인덱스 삭제
            //다음 프레임까지 기다리면 끊기는 효과가 온다. 
            if(dist - projectile.radius - enemy.radius < 1){

                if(enemy.radius -10 > 10){
                    enemy.radius -= 10
                    setTimeout(()=>{
                        projectiles.splice(projectieIndex,1)
                    })
                }else{
                    setTimeout(()=>{
                        enemies.splice(enemyIndex,1)
                        projectiles.splice(projectieIndex,1)
                    },0)
                }
                
            }
        })
    })
}

//클릭시 atan2로 이용해 각을 구하고 x,y는 각각 cos,sin으로 속도(x,y좌표)를 구하고 push를 통해 배열에 각각 넣어줌
canvas.addEventListener('click',function(event){
    console.log(projectiles)
    const angle = Math.atan2(event.clientY-canvas.height/2,event.clientX-canvas.width/2)
    const velocity = {
        x: Math.cos(angle)*6,y: Math.sin(angle)*6
    }
    projectiles.push(new Projectile(canvas.width/2,canvas.height/2,5,'white', velocity))
})

animate()
spawnEnemies()

//setTimeout : 코드를 기다리지 않고 일정한 시간 간격으로 실행
//setInterval : 주기적으로 업데이트 해야되는 상황 일정한 시간 간격으로 실행