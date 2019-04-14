'use strict';
var allItems = [];
var listOfItems = [['bag', 'jpg'], ['banana','jpg'], ['bathroom','jpg'], ['boots','jpg'], ['breakfast','jpg'], ['bubblegum','jpg'], ['chair','jpg'], ['cthulhu','jpg'], ['dog-duck','jpg'], ['dragon','jpg'], ['pen','jpg'], ['pet-sweep','jpg'], ['scissors','jpg'], ['shark','jpg'], ['sweep','png'], ['tauntaun','jpg'], ['unicorn','jpg'], ['usb','gif'], ['water-can','jpg'], ['wine-glass','jpg']];
var itemPics = [document.getElementById('image1'), document.getElementById('image2'), document.getElementById('image3')];
var itemPicsDiv = document.getElementById('imageSection');
var uniqueRandomArr = [];
var globalClick = 0;
var ulEl = document.getElementById('votingResult');
var votingResultTextDom = document.getElementById('votingResultText');
var clearLocalStorageDom = document.getElementById('clearLocalStorage');
var names = [];
var clicks = [];

//this is the constructor
function ItemPic(name, extension){
  this.filePath = 'images/' + name + '.' + extension;
  this.name = name;
  this.views = 0;
  this.click = 0;
  allItems.push(this);

}

//this function adds the items to the constructor
function addItems(){
  for(var i=0; i<listOfItems.length; i++){
    new ItemPic(listOfItems[i][0], listOfItems[i][1]);
  }
}

function updateChartArrays(){
  for(var i=0; i<allItems.length; i++){
    names[i] = allItems[i].name;
    clicks[i] = allItems[i].click;
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
  for(var j=0; j<itemPics.length; j++){
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
      allItems[i].click += 1;
    }
  }
  globalClick += 1;
  updateChartArrays();
  if(globalClick < 25){
    showRandomItem();
  }else{
    localStorage.allItemsStorage = JSON.stringify(allItems);
    itemPicsDiv.removeEventListener('click', handleItemClick);
    drawChart();
    displayVotingResult();
  }
}

//this is the function that checks if the local storage is empty or not. If the local storage is empty it initializes the object array, else it sends what is already in the local storage to the array before loading new images.
function localStorageHandler(){
  var allItemsLocalStorage = [];
  if(localStorage.getItem('allItemsStorage') === null){
    showRandomItem();
    itemPicsDiv.addEventListener('click', handleItemClick);
    clearLocalStorageDom.addEventListener('click', clearLocalStorageFunction);
  }else{
    allItemsLocalStorage = JSON.parse(localStorage.allItemsStorage);
    for(var j=0; j<allItems.length; j++){
      allItems[j].click = allItemsLocalStorage[j].click;
      allItems[j].views = allItemsLocalStorage[j].views;
    }
    showRandomItem();
    itemPicsDiv.addEventListener('click', handleItemClick);
    clearLocalStorageDom.addEventListener('click', clearLocalStorageFunction);
  }
}

function clearLocalStorageFunction(){
  localStorage.clear();
  console.log('local storage has been cleared');
  clearLocalStorageDom.removeEventListener('click', clearLocalStorageFunction);
}

//This function displays the voting result
function displayVotingResult(){
  votingResultTextDom.textContent = 'Result:';
  for(var i =0; i<allItems.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = allItems[i].name + ': '+ allItems[i].click + ' votes';
    ulEl.appendChild(liEl);
  }
}

function drawChart() {
  var canvas = document.getElementById('votingResultChart');
  var ctx = canvas.getContext('2d');

  var data = {
    labels: names, // an array that stores the names of the items
    datasets: [{
      label: 'Total number of votes',
      data: clicks, // an array that stores the amount of clicks for each item
      backgroundColor: [
        'bisque', 'green','blue','pink','brown','burlywood','navy','lightblue','black','beige',
        'yellow','azure','violet','cyan','indigo','orange','magenta','gold','coral','red'
      ],
      hoverBackgroundColor: []
    }]
  };
  var voteChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1.0
          }
        }]
      }
    },
  });
}

addItems();
localStorageHandler();

