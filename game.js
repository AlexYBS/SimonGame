var initialText = $("#level-title").text();
var showInstructions = false;

$("#Instructions").click(function(){
    showInstructions = !showInstructions;

    if (showInstructions) {
        $("#level-title").text("Repetă secvența apăsând butoanele colorate, avansând cu fiecare răspuns corect; primești un mesaj Game Over pentru greșeli, apasă orice tastă pentru a reîncepe.")
            .css({
                "font-family": "Nova Square, sans-serif",
                "color": "#161A30"
            });
    } else {
         $("#level-title").text(initialText)
            .css({
                "color": "#FEF2BF"
            });
    }
});




var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function flashRed() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

$(document).ready(function () {
    $(".btn").click(function () {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        console.log("Button clicked:", userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        } else {
            checkAnswer(userClickedPattern.length - 1);
        }
    });
});

$(document).keypress(function (event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            console.log("User finished sequence. Next sequence will start after 1000 milliseconds.");
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("Wrong!");
        playSound("wrong");
        flashRed();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}


