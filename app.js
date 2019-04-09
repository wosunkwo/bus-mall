'use strict';

var allItems = [];
var listOfItems = [['bag', 'jpg'], ['banana','jpg'], ['bathroom','jpg'], ['boots','jpg'], ['breakfast','jpg'], ['bubblegum','jpg'], ['chair','jpg'], ['cthulhu','jpg'], ['dog-duck','jpg'], ['dragon','jpg'], ['pen','jpg'], ['pet-sweep','jpg'], ['scissors','jpg'], ['shark','jpg'], ['sweep','png'], ['tauntaun','jpg'], ['unicorn','jpg'], ['usb','gif'], ['water-can','jpg'], ['wine-glass','jpg']];
var itemPics = [document.getElementById('image1'), document.getElementById('image2'), document.getElementById('image3')];
//var itemPics = document.getElementById('image1');
//var itemPics2 = document.getElementById('image2');
//var itemPics3 = document.getElementById('image3');

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

function getRandomItem(){
  var random = Math.floor(Math.random() * listOfItems.length);
  //itemPics.src = allItems[random].filePath;

  return random;
}

function handleItemClick(){
  var random = getRandomItem();
  var temp = random;
  for(var i=0; i<itemPics.length; i++){
    itemPics[i].src = allItems[random].filePath;
    itemPics[i].alt = allItems[random].name;
    allItems[random].views++;
    console.log(allItems[random].name);
    random = getRandomItem();
    if(i === 0){
      console.log('i got into the first if condition ' + 'value of i is = '+ i);
      while(itemPics[i].alt === allItems[random].name){
        console.log('duplicate random number between ' + itemPics[i].alt + ' and ' + allItems[random].name);
        random = getRandomItem();
      }
    }else if (i === 1){
      console.log('i got into the second if condition ' + 'value of i is = '+ i);
      while(itemPics[i].alt === allItems[random].name || allItems[temp].name === allItems[random].name){
        console.log('duplicate random number between ' + itemPics[i].alt + ' and ' + allItems[random].name + ' or '+ allItems[temp].name + ' and '+ allItems[random].name);
        random = getRandomItem();
      }
    }
  }
}

addItems();
handleItemClick();
//itemPics.addEventListener('click', handleItemClick);
