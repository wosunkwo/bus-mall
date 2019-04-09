'use strict';
var allItems = [];
var listOfItems = [['bag', 'jpg'], ['banana','jpg'], ['bathroom','jpg'], ['boots','jpg'], ['breakfast','jpg'], ['bubblegum','jpg'], ['chair','jpg'], ['cthulhu','jpg'], ['dog-duck','jpg'], ['dragon','jpg'], ['pen','jpg'], ['pet-sweep','jpg'], ['scissors','jpg'], ['shark','jpg'], ['sweep','png'], ['tauntaun','jpg'], ['unicorn','jpg'], ['usb','gif'], ['water-can','jpg'], ['wine-glass','jpg']];
var itemPics = [document.getElementById('image1'), document.getElementById('image2'), document.getElementById('image3')];
var itemPicsDiv = document.getElementById('imageSection');
var uniqueRandomArr = [0,0,0];
var globalClick = 0;
var ulEl = document.getElementById('votingResult');
var votingResultTextDom = document.getElementById('votingResultText');

//this is the constructor
function ItemPic(name, extension){
  this.filePath = 'images/' + name + '.' + extension;
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  allItems.push(this);

}

//this function adds the items to the constructor
function addItems(){
  for(var i=0; i<listOfItems.length; i++){
    new ItemPic(listOfItems[i][0], listOfItems[i][1]);
  }
}

//this function generates a random number
function getRandomItem(){
  var random = Math.floor(Math.random() * listOfItems.length);
  return random;
}

//this fucnction generates 3 random inages to the dom
function showRandomItem(){
  var random = getRandomItem();
  for(var j=0; j<uniqueRandomArr.length; j++){
    while(uniqueRandomArr.includes(random)){
      random = getRandomItem();
    }
    uniqueRandomArr[j] = random;
  }
  for(var i=0; i<itemPics.length; i++){
    itemPics[i].src = allItems[uniqueRandomArr[i]].filePath;
    itemPics[i].alt = allItems[uniqueRandomArr[i]].name;
    itemPics[i].title = allItems[uniqueRandomArr[i]].name;
    allItems[uniqueRandomArr[i]].views++;
    console.log(allItems[uniqueRandomArr[i]].name);
  }
  console.log('---------------------');
}

//this functions calculates the total number of clicks an image gets and calls the function that will generate 3 new images to the dom
function handleItemClick(event){
  for(var i = 0; i<allItems.length; i++){
    if(allItems[i].name === event.target.alt){
      allItems[i].clicks += 1;
    }
  }
  globalClick += 1;
  if(globalClick <= 25){
    showRandomItem();
  }else{
    itemPicsDiv.removeEventListener('click', handleItemClick);
    displayVotingResult();
  }
}

//This function displays the voting result
function displayVotingResult(){
  votingResultTextDom.textContent = 'Result:';
  for(var i =0; i<allItems.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = allItems[i].name + ': '+ allItems[i].clicks + ' votes';
    ulEl.appendChild(liEl);
  }
}

addItems();
showRandomItem();
itemPicsDiv.addEventListener('click', handleItemClick);

