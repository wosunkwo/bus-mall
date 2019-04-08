'use strict';

var allItems = [];
var listOfItems = [['bag', 'jpg'], ['banana','jpg'], ['bathroom','jpg'], ['boots','jpg'], ['breakfast','jpg'], ['bubblegum','jpg'], ['chair','jpg'], ['cthulhu','jpg'], ['dog-duck','jpg'], ['dragon','jpg'], ['pen','jpg'], ['pet-sweep','jpg'], ['scissors','jpg'], ['shark','jpg'], ['sweep','png'], ['tauntaun','jpg'], ['unicorn','jpg'], ['usb','gif'], ['water-can','jpg'], ['wine-glass','jpg']];
var itemPics = document.getElementById('imageSection1');

function ItemPic(name, extension){
  this.filePath = 'images/' + name + '.' + extension;
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  allItems.push(this);

}

function addItems(){
  for(var i=0; i<listOfItems.length; i++){
    new ItemPic(listOfItems[i][0], listOfItems[i][1]);
  }
}

function showRandomItem(){
  var random = Math.floor(Math.random() * listOfItems.length);
  itemPics.src = allItems[random].filePath;
}

addItems();
showRandomItem();
