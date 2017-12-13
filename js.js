var img;
var myPiese;
function StartGame(){
    Gamearena.start();
    myPiese = new component("http://habrahabr.ru/i/nocopypast.png",20,20,88,160);
}


Gamearena ={
    canvas: document.createElement('canvas'),
    start : function(){
        this.canvas.width=360;
        this.canvas.height=600;
        this.context=this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    }

}
function component(img,x,y,width,height)
{
    this.width=width;
    this.height=height;
    this.x= x;
    this.y=y;
    var  pic     = new Image();
    pic.src=img;
    this.context.drawImage(pic,this.x,this.y,this.width,this.height);




}