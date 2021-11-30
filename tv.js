img="";
var status="";
objects=[];

function preload(){
    img=loadImage("tv3.jpg");
}
function setup(){
    canvas= createCanvas(400,400);
    canvas.position(480,225);
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("tv_status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status= true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results);
        objects= results;
    }
}
function draw(){
    if(status!=undefined){
        image(img,0,0,400,400);
        for(i=0;i<objects.length;i++){
            document.getElementById("tv_status").innerHTML="Status: Detected Objects";
            document.getElementById("question_paragraph").innerHTML="There are more than five objects, cocossd only detected two.";
            fill("#876661");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#876661");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}