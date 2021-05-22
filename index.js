const canvas=document.querySelector("canvas")

const ctx=canvas.getContext("2d")

canvas.width=innerWidth

canvas.height=innerHeight

const pt=document.querySelector("#pt")
const start=document.querySelector("#start")
const action=document.querySelector("#action")
const end=document.querySelector("#end")

const x=canvas.width/2
const y=canvas.height/2

const audioObj = new Audio("/SOUND.mp3");

audioObj.play();


const img=new Image()
img.src="https://www.seekpng.com/png/full/212-2121402_demon-cat-tattoo-devon-rex-black.png";
img.onload =function ()
{
    ctx.drawImage(img,x,y,100,120)
}



class Player
{
    constructor(x,y)
    {

        this.x=x
        this.y=y
        
    }
}




class Bullet
{
    constructor(x,y,vel)
    {
        this.x = x;
        this.y = y;
        this.vel=vel;
        this.width = 40
        this.height = 40
        this.image = new Image()
        this.image.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/49a43b46-9b08-4aa8-87d6-544556033f3c/de92cnd-86afbee7-80e0-43c0-99cf-fe02cd01f888.png/v1/fill/w_320,h_320,strp/happy_mushroom_by_classylittlecar_de92cnd-fullview.png"
    }

    draw()
    {
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    update()
    {
        this.draw()
        this.x=this.x+this.vel.x
        this.y=this.y+this.vel.y
        
    }
}
class Enemy
{
    constructor(x,y,vel)
    {
        this.x = x;
        this.y = y;
        this.vel=vel;
        this.width = Math.floor(Math.random()*(55-30)+30)
        this.height = Math.floor(Math.random()*(55-30)+30)
        this.image = new Image()
        this.image.src = "https://gallery.yopriceville.com/downloadfullsize/send/3250"
    }

    draw()
    {
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    update()
    {
        this.draw()
        this.x=this.x+this.vel.x
        this.y=this.y+this.vel.y
        
    }
}

let bullet=new Bullet(canvas.width/2,canvas.height/2,{x:100,y:100})

let bullets=[]
let enemies=[]

function restart()
{
    bullets=[]
    enemies=[]
    score=0
    pt.innerHTML=score
    end.innerHTML=score
}

function spawn()
{
    setInterval(()=>
    {
        let rand=30
        let x
        let y
        if (Math.random()<.5)
        {
            x=Math.random()<0.5?0-rand:canvas.width+rand
            y=Math.random()*canvas.height
            
        }
        else
        {
            x=Math.random()*canvas.width
            y=Math.random()<0.5?0-rand:canvas.height+rand

        }

        
        let angle=Math.atan2(canvas.height/2-y,canvas.width/2-x)
        let vel={x:Math.cos(angle),y:Math.sin(angle)}
        enemies.push(new Enemy(x,y,vel))},1000)
}
    
let moveid
let score=0

function move()
{
    moveid=requestAnimationFrame(move)

    
    let my_gradient=ctx.createLinearGradient(0, 0,1500, 0);
    my_gradient.addColorStop(0, "rgba(0,0,0,.02)");
    my_gradient.addColorStop(1, "#8419E3");
    ctx.fillStyle=my_gradient
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(img,x,y,100,120)

    
    
    bullets.forEach((bullet,b)=>{bullet.update()})

    if (bullet.x-bullet.width<0||bullet.y-bullet.height<0)
    {
        setTimeout(() => 
        {
            bullet.splice(b,1)
            
        }, 0);
    }


    enemies.forEach((enemy,index)=>{enemy.update()
    bullets.forEach((bullet,pindex)=>{const dist=Math.hypot(bullet.x-enemy.x,bullet.y-enemy.y)
        
        

        if (dist-enemy.width-bullet.width<1)
        {
            
            setTimeout(() => 
            {
                enemies.splice(index,1)  
                bullets.splice(pindex,1)
                score+=50
                pt.innerHTML=score
            
                
            }, 0);
          
        }
        const dist2=Math.hypot(canvas.width/2-enemy.x,canvas.height/2-enemy.y)
        
        if (dist2<.5)
        {
            cancelAnimationFrame(moveid)
            action.style.display="flex"
            end.innerHTML=score
        }
    
        })
    })
}




addEventListener("click",(event)=>
{
    let angle=Math.atan2(event.clientY-canvas.height/2,event.clientX-canvas.width/2)
    let vel=
    {
       x:Math.cos(angle)*5,
       y:Math.sin(angle)*5 
    }

    bullets.push(new Bullet(canvas.width/2,canvas.height/2,vel))

})
start.addEventListener("click",()=>{
    restart()
    spawn()
    move()
    action.style.display="none"
})



