// global constants
// Sound Synthesis 
const freqMap = {
    1: 261.6,
    2: 329.6,
    3: 392,
    4: 466.2,
    5: 510,
    6: 540,
  }

const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const NUM_LIVES = 3

const TIME_PER_TURN = 15000;
const lengthOfPattern = 8




//Global Variables
// var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
// var pattern = [5,5 ,2, 2, 4,];
var pattern = createPattern();



var clueHoldTime = 1000; //how long to hold each clue's light/sound

var progress = 0; 
var gamePlaying = false;

var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0

var guessCounter = 0;

var mistakes = 0;

var timer = TIME_PER_TURN;
var myTimerVar;


function startGame(){
  var pattern = createPattern();

  //initialize game variables
  progress = 0;
  gamePlaying = true;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  playClueSequence();
  // reset interval thing
  clueHoldTime = 1000

  // initialize mistakes
  mistakes = 0
  document.getElementById("numLives").innerHTML = NUM_LIVES;

  
}

function stopGame(){
  //initialize game variables
  gamePlaying = false;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");

  clearInterval(myTimerVar)
}


// sound stuff



function playTone(btn,len){ 
    context.resume();

  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  context.resume();
  
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}


function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}
function winGame(){
  stopGame();
  alert("Game Over. You WON!");
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  


 
  // if guess was correct
  if( pattern[guessCounter] == btn ){
    // if turn is over
    if( guessCounter == progress ){
        // end timer here, will make new one later
        // todo: end timer
        clearInterval(myTimerVar)

      // if last turn
      if( progress == pattern.length - 1 ){
        // win
        winGame();
      }
      else{
        // pattern correct, play next segment
        progress++;
        playClueSequence();

        // // make new timer variable for next sequence
        // myTimerVar = setInterval(myTimer, 100);
        // timer = TIME_PER_TURN
      }
    }
    else{
      // go to next guess
      guessCounter++;
    }
  }else{
    mistakes++;
    // update html
    document.getElementById("numLives").innerHTML = NUM_LIVES - mistakes;
    if( mistakes >= NUM_LIVES )
    // lose game
        loseGame();
  }
  

}
function myTimer(){
    timer -= 100

    document.getElementById("amtTime").innerHTML = timer / 1000;

    // out of time
    if( timer <= 0 ){
        loseGame()
        // end timer here, will make new one later
        // todo: end timer
        clearInterval(myTimerVar)
        nextClueWaitTime = 1000
    }
    console.log("current time:" + timer + " inseconds: " + (timer/1000))


}




function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}
function playClueSequence(){
  guessCounter = 0;
  
  // decrease amount of time
  clueHoldTime -= (clueHoldTime) / pattern.length * 3;


  if(clueHoldTime <= 200)
    clueHoldTime = 200;
  
  let totalDelay = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue

    
    if( progress === 0 ){
      totalDelay += delay + clueHoldTime + cluePauseTime
      break
    }
    if( i === progress)
        totalDelay += delay + clueHoldTime

    delay += clueHoldTime 
    delay += cluePauseTime;

    

    
  }

  
  // make new timer variable go
  timer = TIME_PER_TURN
  setTimeout(startTimer, totalDelay)
  

}
function startTimer(){

    if(gamePlaying){
        // make new timer variable for next sequence
        myTimerVar = setInterval(myTimer, 100);
        timer = TIME_PER_TURN
    }
}

function createPattern(){
  var numKeys = Object.keys(freqMap).length;
  console.log(freqMap)


  pattern = [];
  for(var i=0; i < lengthOfPattern; i++){
    pattern.push(Math.floor(1 + Math.random() * numKeys))
  }
  return pattern;
}


//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()

o.type = 'sawtooth';


var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

