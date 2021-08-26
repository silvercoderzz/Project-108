prediction_1 = "";
prediction_2 = "";
//Webcam properties to trigger it
Webcam.set({
    width: 350,
    height: 350,
    image_format: 'jpeg',
    png_quality: 100
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7ctJv07SX/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model is Loaded');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "You are showing either "+ prediction_1;
    speak_data_2 = "or  "+ prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
    
function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Thumbs up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Beautiful")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Wave")
        {
            document.getElementById("update_emoji").innerHTML = "&#128075;";
        }
        if(results[1].label == "Thumbs up")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128077;";
        }
        if(results[1].label == "Beautiful")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128076;";
        }
        if(results[1].label == "Wave")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128075;";
        }
    }
}   

    
