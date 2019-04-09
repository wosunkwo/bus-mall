'use strict';
var allItems = [];
var listOfItems = [['bag', 'jpg'], ['banana','jpg'], ['bathroom','jpg'], ['boots','jpg'], ['breakfast','jpg'], ['bubblegum','jpg'], ['chair','jpg'], ['cthulhu','jpg'], ['dog-duck','jpg'], ['dragon','jpg'], ['pen','jpg'], ['pet-sweep','jpg'], ['scissors','jpg'], ['shark','jpg'], ['sweep','png'], ['tauntaun','jpg'], ['unicorn','jpg'], ['usb','gif'], ['water-can','jpg'], ['wine-glass','jpg']];
var itemPics = [document.getElementById('image1'), document.getElementById('image2'), document.getElementById('image3')];
var itemPicsDiv = document.getElementById('imageSection');
var cnt = 0;
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
  var temp = random;
  for(var i=0; i<itemPics.length; i++){
    itemPics[i].src = allItems[random].filePath;
    itemPics[i].alt = allItems[random].name;
    itemPics[i].title = allItems[random].name;
    allItems[random].views++;
    console.log(allItems[random].name);
    random = getRandomItem();
    if(i === 0){
      // console.log('i got into the first if condition ' + 'value of i is = '+ i);
      while(itemPics[i].alt === allItems[random].name){
        console.log('duplicate random number caught between ' + itemPics[i].alt + ' and ' + allItems[random].name);
        random = getRandomItem();
      }
    }else if (i === 1){
      // console.log('i got into the second if condition ' + 'value of i is = '+ i);
      while(itemPics[i].alt === allItems[random].name || allItems[temp].name === allItems[random].name){
        console.log('duplicate random number caught between ' + itemPics[i].alt + ' and ' + allItems[random].name + ' or '+ allItems[temp].name + ' and '+ allItems[random].name);
        random = getRandomItem();
      }
    }
  }
  console.log('-------------------');
}

/*
function showRandomItem(){
  cnt++;
  if (cnt === 1){
    var random = getRandomItem();
    var previousImage1 = random;
    var temp = random;
    for(var i=0; i<itemPics.length; i++){
      itemPics[i].src = allItems[random].filePath;
      itemPics[i].alt = allItems[random].name;
      itemPics[i].title = allItems[random].name;
      allItems[random].views++;
      console.log(allItems[random].name);
      random = getRandomItem();
      if(i === 0){
        while(itemPics[i].alt === allItems[random].name){
          console.log('duplicate random number caught between ' + itemPics[i].alt + ' and ' + allItems[random].name);
          random = getRandomItem();
        }
        var previousImage2 = random;
      }else if (i === 1){
        while(itemPics[i].alt === allItems[random].name || allItems[temp].name === allItems[random].name){
          console.log('duplicate random number caught between ' + itemPics[i].alt + ' and ' + allItems[random].name + ' or '+ allItems[temp].name + ' and '+ allItems[random].name);
          random = getRandomItem();
        }
        var previousImage3 = random;
      }
    }
    console.log('First random image = ' + allItems[previousImage1].name + ' Second random image = ' + allItems[previousImage2].name +' Third random image = '+ allItems[previousImage3].name);
    console.log('-----------------------');

  }else{
    var random = getRandomItem();
    while(random === previousImage1 || random === previousImage2 || random === previousImage3){
      random = getRandomItem();
    }
    var previousImage1 = random;
    var temp = random;
    for(var i=0; i<itemPics.length; i++){
      itemPics[i].src = allItems[random].filePath;
      itemPics[i].alt = allItems[random].name;
      itemPics[i].title = allItems[random].name;
      allItems[random].views++;
      console.log(allItems[random].name);
      random = getRandomItem();
      if(i === 0){
        while((itemPics[i].alt === allItems[random].name) || (random === previousImage1 || random === previousImage2 || random === previousImage3) ){
          console.log('duplicate random number caught between ' + itemPics[i].alt + ' and ' + allItems[random].name + ' or between ' + allItems[random].name + ' and '+ allItems[previousImage1].name + ', '+ allItems[previousImage2].name + ', or '+ allItems[previousImage3].name);
          random = getRandomItem();
        }
        var previousImage2 = random;
      }else if (i === 1){
        while((itemPics[i].alt === allItems[random].name || allItems[temp].name === allItems[random].name) || (random === previousImage1 || random === previousImage2 || random === previousImage3)){
          console.log('duplicate random number caught between ' + itemPics[i].alt + ' and ' + allItems[random].name + ' or '+ allItems[temp].name + ' and '+ allItems[random].name + ' or between ' + allItems[random].name + ' and '+ allItems[previousImage1].name + ', '+ allItems[previousImage2].name + ', or '+ allItems[previousImage3].name);
          random = getRandomItem();
        }
        var previousImage3 = random;
      }
    }
    console.log('value of the previous first random image = ' + allItems[previousImage1].name + ' value of the previous second random image = ' + allItems[previousImage2].name +' value of the previous third random image = '+ allItems[previousImage3].name);
    console.log('-------------------------------');
  }
}
*/

//this functions calculates the total number of clicks an image gets and calls the function that will generate 3 new images to the dom

function handleItemClick(event){
  for(var i = 0; i<allItems.length; i++){
    if(allItems[i].name === event.target.alt){
      allItems[i].clicks += 1;
    }
  }
  showRandomItem();
}

addItems();
showRandomItem();
if(cnt < 25){
  itemPicsDiv.addEventListener('click', handleItemClick);
  cnt++;
  console.log('value of the counter ' + cnt);
}else{
  itemPicsDiv.removeEventListener('click', handleItemClick);
}
