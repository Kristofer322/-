var img;
var myPiese,bluePiese,greenPiese,MoveBackground;

function StartGame()
{

    Gamearena.start();
	myPiese = new component("img/Player_car.png",60,400,88,179,"img");
	bluePiese = new component("img/Player_car.png",60,-100,88,179,"img");
    greenPiese = new component("img/Player_car.png",230,-600,88,179,"img");
    MoveBackground = new component ("img/road.jpg",0,0,360,600,"background")

}

Gamearena =
{
	canvas: document.createElement('canvas'),
	start : function()
    {
		this.canvas.width = 360;
		this.canvas.height = 600;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.interval = setInterval(update,20);



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

    },

}
function component(color,x,y,width,height,type)
{
    var ctx=Gamearena.context;
    this.type = type;
    if(this.type == "img" || this.type == "background")
    {
        this.img = new Image();              // "Создаём" изображение
        this.img.src = color;
    }

    this.width=width;
	this.height=height;
	this.x = x;
	this.y = y;
	this.update=function()
    {
        if(this.type == "img"|| this.type == "background") {

            ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        }
            if(this.type == "background")
            {
                ctx.drawImage(this.img,this.x ,this.y - this.height ,this.width,this.height );
            }


	}
    this.newPosition=function ()
    {
        this.x += this.speedX;
        this.y += this.speedY;
    }
        this.crash=function (otherObj) {
            var myLeft = this.x;
            var myRight = this.x + (this.width);
            var myTop = this.y;
            var myBottom = this.y + (this.height);
            var otherObgLeft = otherObj.x;
            var otherObjRight = otherObj.x + (otherObj.width);
            var otherObjTop = otherObj.y;
            var otherObjBottom = otherObj.y + (otherObj.height);
            var crash = true;

            if((myBottom<otherObjTop)||(myTop>otherObjBottom)||(myRight<otherObgLeft)||(myLeft>otherObjRight))
            {
                crash = false;
            }
            return crash;
        }
    this.pos = function () {
        if(this.type == "background")
        {
            if(this.y == this.height){
                this.y = 0;
            }
        }
    }
}

function update(){
     if(myPiese.crash(bluePiese)||myPiese.crash(greenPiese))
     {
         myPiese.stop;
         document.getElementById('button').style.display = "block";
         document.getElementById('home').style.display = "block";
         clearInterval(ScoreTimer.TimerInterval);
         clearInterval(ScoreTimer.ScetInterval);
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
                myPiese.speedX -= 10;
                myPiese.x = Math.max(myPiese.x,10);
            }
            if (Gamearena.key && Gamearena.key == 39) {
                myPiese.speedX += 10;
                myPiese.x = Math.min(myPiese.x,Gamearena.canvas.width - 95);
            }
            bluePiese.speedY += 10;
            greenPiese.speedY += 10;

            myPiese.newPosition();
            bluePiese.newPosition();
            greenPiese.newPosition();

            MoveBackground.y += 5;
            MoveBackground.pos();
            MoveBackground.update();

            myPiese.update();
            bluePiese.update();
            greenPiese.update();

        }
        else if(this.Gamearena.canvas.height < bluePiese.y){
            bluePiese.y = -20;
        }
        else if(this.Gamearena.canvas.height < greenPiese.y){greenPiese.y = -20;}
    }
}//update()
function  stopMove() {
	myPiese.speedX = 0;
    myPiese.speedY = 0;

}
   var text;
   var ctx,timer = 0;
   var score1 = 0;
   function StartScore()
   {
       ScoreTimer.start();
   }

   ScoreTimer =
       {
           canvas2: document.getElementById("score"),
   start: function () {
       this.canvas2.width = 150;
       this.canvas2.height = 600;
       this.context = this.canvas2.getContext("2d");
       Timer();
       this.TimerInterval = setInterval(Timer,1000);
	   scet();
       this.ScetInterval = setInterval(scet,1000);
   }
   }

   function Timer() {

       timer++;
       ScoreTimer.context.clearRect(30,55,200,100);
       ScoreTimer.context.fillStyle = "orange";
       ScoreTimer.context.font = "italic 33pt Arial";
       ScoreTimer.context.fillText("Time", 20, 50);
       ScoreTimer.context.fillText(timer, 53, 90);
       if(timer >= 10 && timer <= 99)
       {
           ScoreTimer.context.clearRect(30,55,100,100);
           ScoreTimer.context.fillText(timer, 45, 90);
       }
       if(timer >= 100)
       {
           ScoreTimer.context.clearRect(30,55,100,100);
           ScoreTimer.context.fillText(timer, 35, 90);
       }

   }
   function scet() {

       if(this.Gamearena.canvas.height < bluePiese.y || this.Gamearena.canvas.height < greenPiese.y){
           score1++;
       }
       ScoreTimer.context.clearRect(60,300,200,200);
       ScoreTimer.context.fillStyle = "orange";
       ScoreTimer.context.font = "italic 33pt Arial";
       ScoreTimer.context.fillText("Score", 20, 310);
       ScoreTimer.context.fillText(score1, 60, 350);
       if(score1 >= 10 && score1 <= 99)
       {
           ScoreTimer.context.clearRect(30,310,100,100);
           ScoreTimer.context.fillText(score1, 50, 350);
       }
        else if(score1 >= 100){
           ScoreTimer.context.clearRect(40,310,100,100);
           ScoreTimer.context.fillText(score1, 45, 350);
       }
   }
