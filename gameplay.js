// VARIABLES DECLARATIONS

let $introPage = document.getElementById("intro-page");
let $tutorialPage = document.getElementById("tutorial-page");
let $mainPage = document.getElementById("main-page");
let $resultsPage = document.getElementById("results-page");

let $leftScreen = document.querySelector('.left-screen-blank');
let $rightScreen = document.querySelector('.right-screen-blank');

let $topCard = document.getElementById("topCard");
let $secondCard = document.getElementById("2ndCard");
let $thirdCard = document.getElementById("3rdCard");
let $fourthCard = document.getElementById("4thCard");

let $feedbackText = document.getElementById("feedback-text");

let $audioWin = document.createElement("audio");
$audioWin.setAttribute("src", "sounds/Winning.mp3");

let $audioLose = document.createElement("audio");
$audioLose.setAttribute("src", "sounds/Losing.mp3");

let $stopPlayingButton = document.getElementById("stopPlaying");

let $resultsTitle = document.querySelector('#results-page h2')
let $resultsBlock = document.querySelector(".results")
let $resultsPlayedCards = document.getElementById("results-played");
let $resultsWinCards = document.getElementById("results-win");
let $resultsLoseCards = document.getElementById("results-lose");

// CARDS FUNCTIONS

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

shuffle(stackOfCards);

$topCard.setAttribute("src",stackOfCards[0].source)
$secondCard.setAttribute("src",stackOfCards[1].source)
$thirdCard.setAttribute("src",stackOfCards[2].source)
$fourthCard.setAttribute("src",stackOfCards[3].source)

let currentCardIndex = 0;
let currentCard = stackOfCards[currentCardIndex];
let nextCardIndex = 3;
let nextCard = stackOfCards[nextCardIndex];

function changeCards(){
    nextCardIndex++;
    nextCard = stackOfCards[nextCardIndex];
    $topCard.setAttribute("src",$secondCard.getAttribute("src"));
    $secondCard.setAttribute("src",$thirdCard.getAttribute("src"));
    $thirdCard.setAttribute("src",$fourthCard.getAttribute("src"));
    $fourthCard.setAttribute("src",nextCard.source);
}

// WIN-LOSE

function stopAudio(){
  $audioWin.currentTime = 0;
  $audioWin.pause();
  $audioLose.currentTime = 0;
  $audioLose.pause();
}

function displayFeedback(array,color){
  
  var num = Math.floor(Math.random() * (array.length));
  $feedbackText.innerHTML=array[num];
  $feedbackText.style.color=color;
  $feedbackText.className="feedback-text"
  setTimeout(function() {
    $feedbackText.className="inactive"
  }, 700);
};

function lose(){
  loseCards.push(currentCard);
  $audioLose.play();
  displayFeedback(feedbackLose, "red");
  console.log("LOSE");
  console.log("loseCards array:",loseCards);
}

function win(){
  winCards.push(currentCard);
  $audioWin.play();
  displayFeedback(feedbackWin, "green");
  console.log("WIN");   
  console.log("winCards array:",winCards);
}

function updateScoreLeft(){
  // if click-left AND card.isHip===false > WIN
  // if click-left AND card.isHip===true > LOSE
  currentCard = stackOfCards[currentCardIndex];
  if (currentCard.isHip){
    setTimeout(function() {
      $leftScreen.classList.add("feedback-lose")
    }, 0);
    lose();
  } else {
    setTimeout(function() {
      $leftScreen.classList.add("feedback-win")
    }, 0);
    win()
  }
  currentCardIndex++;
  setTimeout(function() {
    $leftScreen.classList.remove("feedback-lose");
    $leftScreen.classList.remove("feedback-win");
  }, 800);
}

function updateScoreRight(){
  // if click-right AND card.isHip===true > WIN
  // if click-right AND card.isHip===false > LOSE
  currentCard = stackOfCards[currentCardIndex];
  if (currentCard.isHip){
    setTimeout(function() {
      $rightScreen.classList.add("feedback-win")
    }, 0);
    win()
  } else {
    setTimeout(function() {
      $rightScreen.classList.add("feedback-lose")
    }, 0);
    lose()
  }
  currentCardIndex++;
  setTimeout(function() {
    $rightScreen.classList.remove("feedback-lose");
    $rightScreen.classList.remove("feedback-win");
  }, 800);
}

// RESULTS PAGE
 
function giveResults(){
if (winCards.length>loseCards.length){
  $resultsTitle.innerHTML="You're quite good at this!"
} else if (loseCards.length>winCards.length){
  $resultsTitle.innerHTML="You're sh*t at this!"
} else {
  $resultsTitle.innerHTML="You're halfway there!"
};

$resultsPlayedCards.innerHTML=`You played ${playedCards.length} cards`
$resultsBlock.appendChild($resultsPlayedCards)
$resultsWinCards.innerHTML=`You guessed ${winCards.length} cards correctly`
$resultsBlock.appendChild($resultsWinCards)
$resultsLoseCards.innerHTML=`You got ${loseCards.length} cards wrong`
$resultsBlock.appendChild($resultsLoseCards)
}

// ON-CLICKS GAMEPLAY


$leftScreen.addEventListener("click", function(e) {
  e.preventDefault;
  stopAudio()
  $topCard.classList.remove("swipeLeft");
  $topCard.classList.remove("swipeRight");
  setTimeout(function() {
    $topCard.classList.add("swipeLeft");
    setTimeout(changeCards, 350)
  }, 0);
  playedCards.push(currentCard);
  updateScoreLeft();
}, false);

$rightScreen.addEventListener("click", function(e) {
  stopAudio()
  e.preventDefault;
  $topCard.classList.remove("swipeLeft");
  $topCard.classList.remove("swipeRight");
  setTimeout(function() {
    $topCard.classList.add("swipeRight");
    setTimeout(changeCards,350)
  }, 0);
  playedCards.push(currentCard);
  updateScoreRight();
}, false);

$stopPlayingButton.addEventListener("click", function(e) {
  e.preventDefault;
  stopAudio()
  $mainPage.className="inactive"
  $resultsPage.className="active"
  giveResults()
}, false);