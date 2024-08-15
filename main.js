status="";
objects=[];

function setup() {
canvas=createCanvas(380,280);
canvas.center();
video=createCapture(VIDEO);
video.hide();
}

function draw() {
image(video,0,0,380,280);
if(status!="") {
    objectDetector.detect(video,gotResult);
    for(i=0;i<objects.length;i++) {
        document.getElementById("status").innerHTML="Status:Object Detected";
        fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        if(objects[i].label==input_text) {
        video.stop()
        objectDetector.detect(gotResult);
document.getElementById("number_of_objects").innerHTML=input_text+"Found";
synth=window.speechSynthesis;
var utterthis=new SpeechSynthesisUtterance(input_text+"Found");
synth.speak(utterthis);
        }
        else{
            document.getElementById("number_of_objects").innerHTML=input_text+"Not Found";
        }
    }
}

}

function start() {
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
input_text=document.getElementById("input_id").value;

}

function modelLoaded() {
console.log("Model Loaded!");
status=true;
}

function gotResult(error,result) {
if(error) {
console.log(error);
}
console.log(result);
objects=results;
}