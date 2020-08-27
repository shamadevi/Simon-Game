var buttonarrays=["red","green","yellow","blue"];
var gamepattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$("h1").click(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }

});
$(".btn").click(function(){
var userChosencolor=$(this).attr("id");
userClickedPattern.push(userChosencolor);
  playSound(userChosencolor);
  animatePress(userChosencolor);
  checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var n=Math.floor(Math.random()*4);
  var chosencolor=buttonarrays[n];
  gamepattern.push(chosencolor);
  $("#"+chosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(chosencolor);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function(){$("#"+currentcolor).removeClass("pressed");},100);
}

function startover(){
  level=0;
  started=false;
  gamepattern=[];
}
function checkAnswer(currentLevel){
  if (gamepattern[currentLevel]===userClickedPattern[currentLevel]){
  if(gamepattern.length===userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
} else{
   var music=new Audio("sounds/wrong.mp3");
   music.play();
   $("body").addClass("game-over");
   $("h1").text("Game Over, Click on the Game over to Restart");
   setTimeout(function(){$("body").removeClass("game-over");},200);
   startover();
}

}
