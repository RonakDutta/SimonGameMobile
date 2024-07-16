var buttonColors = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

var gamePattern = [];

$("button").click(function(){
    if(started == false){
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var userChosenColor = this.attributes.id.textContent;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})


function nextSequence() {
    var n = Math.random();
    var randomNumber = Math.floor(n*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level = level + 1;
    $("h1").text("Level "+level);
}

function playSound(val) {
    var audio = new Audio("./sounds/"+val+".mp3");
    audio.play();
}

function animatePress(val) {
    $("#"+val).addClass("pressed");
    
    setTimeout(function(){
        $("#"+val).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000)
        }
    }

    else {
        playSound("wrong");
        $("h1").text("Game Over, Press the button to Restart")
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        } ,200)

        startOver();
    }
}

function startOver(){
    started = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}



