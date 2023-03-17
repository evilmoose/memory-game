const gameContainer = document.getElementById("game");

// Declare variables
let cardOne     = null;
let cardTwo     = null;

let isFlipped   = 0;
let notClicked  = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // check if a crad has been clicked
  if (notClicked === true){
    return;
  }
  // check if an element contains "flipped"
  if(event.target.classList.contains("flipped")){
    return;
  }

  let isCurrent = event.target;
  isCurrent.style.backgroundColor = isCurrent.classList[0];

  // Check if card one or card two is equal to 'false'
  if ( cardOne === null || cardTwo === null ){
    isCurrent.classList.add("flipped");
    cardOne = cardOne || isCurrent;
    cardTwo = isCurrent === cardOne ? null : isCurrent;
  }

  // check if card one and card two are true/match
  if ( cardOne != null && cardTwo != null ){ 
    notClicked = true;

    let picOne = cardOne.className;
    let picTwo = cardTwo.className;

    if ( picOne === picTwo){
      isFlipped += 2;

      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);

      cardOne     = null;
      cardTwo     = null;

      notClicked  = false;   
    }
    else{
      setTimeout( () =>{
      cardOne.style.backgroundColor = "";
      cardTwo.style.backgroundColor = "";
    
      cardOne.classList.remove("flipped");
      cardTwo.classList.remove("flipped");

      cardOne = null;
      cardTwo = null;

      notClicked = false;
    }, 750);
  }
  }

  if ( isFlipped === COLORS.length ) alert("Congratulations!!!")
}
  //console.log("you just clicked", event.target);

// when the DOM loads
createDivsForColors(shuffledColors);
