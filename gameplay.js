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

let $stopPlayingButton = document.getElementById("stopPlaying");

let $audioWin = document.createElement("audio");
$audioWin.setAttribute("src", "sounds/Winning.mp3");

let $audioLose = document.createElement("audio");
$audioLose.setAttribute("src", "sounds/Losing.mp3");

let $resultsTitle= document.querySelector('#results-page>h2')

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

function stopAudio(){
  $audioWin.currentTime = 0;
  $audioWin.pause();
  $audioLose.currentTime = 0;
  $audioLose.pause();
}

function updateScoreLeft(){
  // if click-left AND card.isHip===false > WIN
  // if click-left AND card.isHip===true > LOSE
  currentCard = stackOfCards[currentCardIndex];
  if (currentCard.isHip){
    loseCards.push(currentCard);
    $audioLose.play();
    console.log("LOSE")
    console.log("loseCards array:",loseCards)
  } else {
    winCards.push(currentCard);
    $audioWin.play();
    console.log("WIN")    
    console.log("winCards array:",winCards)
  }
  currentCardIndex++;
}

function updateScoreRight(){
  // if click-right AND card.isHip===true > WIN
  // if click-right AND card.isHip===false > LOSE
  currentCard = stackOfCards[currentCardIndex];
  if (currentCard.isHip){
    winCards.push(currentCard)
    $audioWin.play();
    console.log("WIN")
    console.log("winCards array:",winCards)
  } else {
    loseCards.push(currentCard)
    $audioLose.play();
    console.log("LOSE")
    console.log("loseCards array:",loseCards)
  }
  currentCardIndex++;
}
 
function giveResults(){
if (winCards.length>loseCards.length){
  $resultsTitle.innerHTML="You're quite good at this!"
} else if (loseCards.length>winCards.length){
  $resultsTitle.innerHTML="You're sh*t at this!"
} else {
  $resultsTitle.innerHTML="You're halfway there!"
};
let $resultsPlayedCards = document.createElement("div")
$resultsPlayedCards.innerHTML=`You played ${playedCards.length} cards`
$resultsPage.appendChild($resultsPlayedCards)
let $resultsWinCards = document.createElement("div")
$resultsWinCards.innerHTML=`You guessed ${winCards.length} cards correctly`
$resultsPage.appendChild($resultsWinCards)
let $resultsLoseCards = document.createElement("div")
$resultsLoseCards.innerHTML=`You got ${loseCards.length} cards wrong`
$resultsPage.appendChild($resultsLoseCards)
}


$leftScreen.addEventListener("click", function(e) {
  e.preventDefault;
  stopAudio()
  $topCard.classList.remove("swipeLeft");
  $topCard.classList.remove("swipeRight");
  setTimeout(function() {
    $topCard.classList.add("swipeLeft");
    setTimeout(changeCards, 300)
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
    setTimeout(changeCards,300)
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