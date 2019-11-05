
let $leftScreen = document.querySelector('.left-screen-blank');
let $rightScreen = document.querySelector('.right-screen-blank');

let $topCard = document.getElementById("topCard");
let $secondCard = document.getElementById("2ndCard");
let $thirdCard = document.getElementById("3rdCard");
let $fourthCard = document.getElementById("4thCard");

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


// j'ai essayé d'updater les images soit en changeant la source soit en changeant la classe (donc le z index)
let cardIndex = 3;
function changeCards(){
    cardIndex++;
    let card = stackOfCards[cardIndex];
   // $topCard.setAttribute("src",$secondCard.getAttribute("src"));
   // $secondCard.setAttribute("src",$thirdCard.getAttribute("src"));
  //  $thirdCard.setAttribute("src",$fourthCard.getAttribute("src"));
    $topCard.className="fourthCard";
    $secondCard.className="firstCard";
    $thirdCard.className="secondCard";
    $fourthCard.className="thirdCard";
    $fourthCard.setAttribute("src",card.source);

}

$leftScreen.addEventListener("click", function(e) {
    e.preventDefault;
    $topCard.classList.remove("swipeLeft");
    $topCard.classList.remove("swipeRight");
    $secondCard.className="secondCard";
    $thirdCard.className="thirdCard";
    $fourthCard.className="fourthCard";
    void $topCard.offsetWidth;
    void $secondCard.offsetWidth;
    void $thirdCard.offsetWidth;
    void $fourthCard.offsetWidth;
    $topCard.classList.add("swipeLeft");
    setTimeout(changeCards,300)
  }, false);

  $rightScreen.addEventListener("click", function(e) {
    e.preventDefault;
    $topCard.classList.remove("swipeLeft");
    $topCard.classList.remove("swipeRight");
    void $topCard.offsetWidth;
    $topCard.classList.add("swipeRight");
    setTimeout(changeCards,300)
  }, false);

/*
$leftScreen.onclick = function left(event) {
    //$topCard.className ='swipeLeft';
    $topCard.classList.add("swipeLeft");
    $topCard.setAttribute("src",$secondCard.getAttribute("src"));
    $secondCard.setAttribute("src",$thirdCard.getAttribute("src"));
    $thirdCard.setAttribute("src",$fourthCard.getAttribute("src"));
    cardIndex++;
    $fourthCard.setAttribute("src",card.source);
   // let $endCardLeft = document.querySelector('.swipeLeft');
    //setTimeout($endCardLeft.className='firstCard',300);
    setTimeout($topCard.classList.remove("swipeLeft"),300);
      };
$rightScreen.onclick = function right(event) {
$firstCard.className ='swipeRight';
   $firstCard=$secondCard;
   $secondCard=$thirdCard;
   $thirdCard=$fourthCard;
   $fourthCard.setAttribute("src",nextCard.source)
     };
      */