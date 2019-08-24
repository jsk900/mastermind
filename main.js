window.onload = () => start(); //Initialize game

//Get DOM Elements
const colours = document.querySelector('.colours');
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');
const purple = document.querySelector('.purple');
const white = document.querySelector('.white');
const info = document.querySelector('.info p');
const [...one] = document.querySelectorAll('#one, #two, #three, #four');
const [...two] = document.querySelectorAll('#five, #six, #seven, #eight');
const [...three] = document.querySelectorAll('#nine, #ten, #eleven, #twelve');
const [...four] = document.querySelectorAll(
  '#thirteen, #fourteen, #fifteen, #sixteen'
);
const [...five] = document.querySelectorAll(
  '#seventeen, #eighteen, #nineteen, #twenty'
);
const [...six] = document.querySelectorAll(
  '#twentyone, #twentytwo, #twentythree, #twentyfour'
);
const [...seven] = document.querySelectorAll(
  '#twentyfive, #twentysix, #twentyseven, #twentyeight'
);
const [...eight] = document.querySelectorAll(
  '#twentynine, #thirty, #thirtyone, #thirtytwo'
);
const [...nine] = document.querySelectorAll(
  '#thirtythree, #thirtyfour, #thirtyfive, #thirtysix'
);
const [...ten] = document.querySelectorAll(
  '#thirtyseven, #thirtyeight, #thirtynine, #forty'
);

const [...resultOne] = document.querySelectorAll('.resultOne .miniCircle');
const [...resultTwo] = document.querySelectorAll('.resultTwo .miniCircle');
const [...resultThree] = document.querySelectorAll('.resultThree .miniCircle');
const [...resultFour] = document.querySelectorAll('.resultFour .miniCircle');
const [...resultFive] = document.querySelectorAll('.resultFive .miniCircle');
const [...resultSix] = document.querySelectorAll('.resultSix .miniCircle');
const [...resultSeven] = document.querySelectorAll('.resultSeven .miniCircle');
const [...resultEight] = document.querySelectorAll('.resultEight .miniCircle');
const [...resultNine] = document.querySelectorAll('.resultNine .miniCircle');
const [...resultTen] = document.querySelectorAll('.resultTen .miniCircle');
const playAgain = document.querySelector('.playAgain');
const playArea = document.querySelector('.playArea');
const hidden = document.querySelector('.hidden');
const [...hidden2] = document.querySelectorAll('.hidden .circle2');

//Globals
let number = 0;
let result = 0;
let mysteryColours = [];
let colourSetArr = [];
let setCounter = 0;
let posCounter = 0;
let saveColour;
let winArr = [];
let colourSet;

//colours array
const coloursArray = [
  '',
  'radial-gradient(circle at 10px 10px, blue, rgb(1, 1, 44))',
  'radial-gradient(circle at 10px 10px, red, rgb(1, 1, 44))',
  'radial-gradient(circle at 10px 10px, yellow, rgb(1, 1, 44))',
  'radial-gradient(circle at 10px 10px, green, rgb(1, 1, 44))',
  'radial-gradient(circle at 10px 10px, purple, rgb(1, 1, 44))',
  'radial-gradient(circle at 10px 10px, white, rgb(1, 1, 44))'
];

//Guess positions array
const boardPositions = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten
];

//Result positions array
const resultPositions = [
  resultOne,
  resultTwo,
  resultThree,
  resultFour,
  resultFive,
  resultSix,
  resultSeven,
  resultEight,
  resultNine,
  resultTen
];

//Button background colours
blue.style =
  'background-color: blue; background: radial-gradient(circle at 10px 10px, blue, #01012c);';
red.style =
  'background-color: red; background: radial-gradient(circle at 10px 10px, red, #01012c);';
yellow.style =
  'background-color: yellow; background: radial-gradient(circle at 10px 10px, yellow, #01012c);';
green.style =
  'background-color: green; background: radial-gradient(circle at 10px 10px, green, #01012c);';
purple.style =
  'background-color: purple; background: radial-gradient(circle at 10px 10px, purple, #01012c);';
white.style =
  'background-color: white; background: radial-gradient(circle at 10px 10px, white, #01012c);';

console.log(mysteryColours);
//Functions

//This function will select our four mystery colours.
//As the random number generator can return an already used number
//we need to remove duplicate colours from the mystery colours array.
//This we do by placing our array into a set. Sets can only have unique entries.
//Therefore by checking if the size of the set is less than four we can try again
//until our mystery array only has four unique colours.
const start = () => {
  playAgain.disabled = true;
  playAgain.style = 'opacity: 0';
  hidden.style = 'opacity: 0';
  playArea.style = 'opacity: 1';
  info.innerHTML = 'Please choose a colour';
  assignColours();
  colourSet = new Set(mysteryColours);
  if (colourSet.size < 4) {
    mysteryColours.length = 0;
    colourSet.clear();
    start();
  }
};

//Create hidden colour code
const assignColours = () => {
  for (let i = 0; i < 4; i++) {
    result = getRandomIntInclusive(1, 6);
    mysteryColours.push(coloursArray[result]);
  }
};

//Random number generator
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
};

//Colour clicked. Put on available circle
const putOnBoard = e => {
  boardPositions[setCounter][posCounter].style.background =
    e.target.style.background;
  posCounter++;
  if (posCounter === 4) {
    checkSequence();
    checkColours();
    checkResults();
    posCounter = 0;
    setCounter++;
  }
};

//Check for correct colour and position
const checkSequence = () => {
  boardPositions[setCounter].map((pos1, index) => {
    if (pos1.style.background === mysteryColours[index]) {
      resultPositions[setCounter][index].style =
        'background-color: green; background: radial-gradient(circle at 10px 10px, green, #01012c);';
    }
  });
};

//Check for correct colours in wrong position
const checkColours = () => {
  resultPositions[setCounter].map((pos1, index1) => {
    if (pos1.style.background === '') {
      boardPositions[setCounter].map((pos2, index2) => {
        if (index1 === index2) {
          mysteryColours.map(colour => {
            if (pos2.style.background === colour) {
              pos1.style =
                'background-color: white; background: radial-gradient(circle at 10px 10px, white, #01012c);';
            }
          });
        }
      });
    }
  });
};

//Check result to continue or declare winner
const checkResults = () => {
  winArr.length = 0;
  resultPositions[setCounter].map(pos => {
    if (
      pos.style.background !==
      'radial-gradient(circle at 10px 10px, green, rgb(1, 1, 44))'
    ) {
      winArr.push(false);
    } else {
      winArr.push(true);
    }
  });

  let win = winArr.reduce((total, x) => (x === true ? total + x : null));

  if (win === 4) {
    info.innerHTML = 'You are a winner';
    playAgain.disabled = false;
    playAgain.style = 'opacity: 1;cursor: pointer';
    mysteryColours.map((colour, index) => {
      hidden2[index].style.background = colour;
    });
    hidden.style = 'opacity: 1';
    playArea.style = 'opacity: 0.3';
  } else {
    info.innerHTML = 'Please continue';
  }
};

//Play again button pressed. Reset all
const clearDown = () => {
  resultPositions.map(pos => {
    pos.map(colour => (colour.style.background = ''));
  });
  boardPositions.map(pos => {
    pos.map(colour => (colour.style.background = ''));
  });
  setCounter = 0;
  mysteryColours.length = 0;
  colourSet.clear();
  start();
};

//Listeners
colours.addEventListener('click', e => putOnBoard(e));
playAgain.addEventListener('click', () => clearDown());
