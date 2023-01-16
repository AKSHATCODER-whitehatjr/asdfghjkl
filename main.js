
prediction1 = ""
prediction2 = ""

Webcam.set({
width : 350,
height : 300,
image_format : "png",
png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snap(){
Webcam.snap(function(data_uri){
document.getElementById("results").innerHTML = '<img id = "capturedimage" src = "'+data_uri+'"/>';
})
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/e3sCfigDQ/model.json", modelloaded);

function modelloaded(){
console.log("Model Loaded!");    
}

function speak(){
var synth = window.speechSynthesis;
speakdata1 = "The First Prediction Is" + prediction1
speakdata2 = "The Second Prediction Is" + prediction2
var utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
synth.speak(utterthis); 
}

function check(){
img = document.getElementById("capturedimage");
classifier.classify(img, gotresults);    
}

function gotresults(error, results){
if(error){
console.error(error);
}
else{
console.log(results);
document.getElementById("p1word").innerHTML = results[0].label;
document.getElementById("p2word").innerHTML = results[1].label;
prediction1 = results[0].label;
prediction2 = results[1].label;
speak();
if(results[0].label == "Victory"){
document.getElementById("p1emoji").innerHTML = "&#9996;"    
}
if(results[0].label == "Best"){
    document.getElementById("p1emoji").innerHTML = "&#128077;"    
    }
    if(results[0].label == "Amazing"){
        document.getElementById("p1emoji").innerHTML = "&#128076;"    
        }
        if(results[1].label == "Victory"){
            document.getElementById("p2emoji").innerHTML = "&#9996;"    
            }
            if(results[1].label == "Best"){
                document.getElementById("p2emoji").innerHTML = "&#128077;"    
                }
                if(results[1].label == "Amazing"){
                    document.getElementById("p2emoji").innerHTML = "&#128076;"    
                    }
}
}