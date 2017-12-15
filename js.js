var img;
var myPiese,bluePiese,greenPiese;
var letLeft,letRight;
function StartGame()
{
	Gamearena.start();
	myPiese = new component("red",60,500,60,60);
	bluePiese=new component("blue",60,-20,60,60);
    greenPiese=new component("green",230,-300,60,60);
    letLeft=new component("#d6be3d",13,500,10,60);
    letRight=new component("#d6be3d",330,500,10,60);
}

Gamearena =
{
	canvas: document.createElement('canvas'),
	start : function()
    {
		this.canvas.width=360;
		this.canvas.height=600;
		this.context=this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.interval=setInterval(update,20);
		window.addEventListener("keydown",function (e) {
            Gamearena.key=e.keyCode;
		});
        window.addEventListener("keyup",function (e) {
            Gamearena.key=false;
        });
	},
	clear: function()
    {
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	},
    stop: function ()
    {
	    clearInterval(this.interval);
    }
	
}
function component(color,x,y,width,height)
{
	this.width=width;
	this.height=height;
	this.x= x;
	this.y=y;
	this.update=function()
    {
        ctx=Gamearena.context;
        ctx.fillStyle=color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
	}
    this.newPosition=function ()
    {
        this.x+=this.speedX;
        this.y+=this.speedY;
    }
        this.crash=function (otherObj) {
            var myLeft=this.x;
            var myRight= this.x+(this.width);
            var myTop=this.y;
            var myBottom= this.y+(this.height);
            var otherObgLeft= otherObj.x;
            var otherObjRight=otherObj.x+(otherObj.width);
            var otherObjTop=otherObj.y;
            var otherObjBottom=otherObj.y+(otherObj.height);
            var crash= true;
            if((myBottom<otherObjTop)||(myTop>otherObjBottom)||(myRight<otherObgLeft)||(myLeft>otherObjRight))
            {
                crash=false;
            }
            return crash;
        }

}
function update(){
     if(myPiese.crash(bluePiese)||myPiese.crash(greenPiese))
     {
         myPiese.stop();
     }
     else
    {
        if (this.Gamearena.canvas.height > bluePiese.y || this.Gamearena.canvas.height > greenPiese.y) {
            Gamearena.clear();
            myPiese.speedX = 0;
            myPiese.speedY = 0;
            bluePiese.speedX = 0;
            bluePiese.speedY = 0;
            greenPiese.speedX = 0;
            greenPiese.speedY = 0;

            if (Gamearena.key && Gamearena.key == 37) {
                myPiese.speedX -= 5;
            }
            if (Gamearena.key && Gamearena.key == 39) {
                myPiese.speedX += 5;
            }
            bluePiese.speedY += 5;
            greenPiese.speedY += 5;
            myPiese.newPosition();
            bluePiese.newPosition();
            greenPiese.newPosition();
            myPiese.update();
            bluePiese.update();
            greenPiese.update();
        }
        else {
            bluePiese.y = -20;
            greenPiese.y = -200;
        }
    }
}//update()
function  stopMove() {
	myPiese.speedX=0;
    myPiese.speedY=0;

}