//Create variables here
var dog, happyDogImg, database, foodS, foodStock, feedTime;
var dogImg, dogImg2;
//var foods = 0;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(700, 500);
  dog = createSprite(550, 170, 10, 10);
  dog.addImage("dogImg", dogImg);
  dog.scale = 0.2;

  // foodStock = database.ref("Food")
  // foodStock.on("value", readStock, showError);

  food = new Food();
  food.getFoodStock();
  food.getFeedTime();

  var title = createElement("h2");
  title.html("Virtual Pet");
  title.position(130, 0);

  var input = createInput("Name Your Dog");
  input.position(970, 300);

  var button1 = createButton("feed Dog");
  button1.position(850, 70);

  button1.mousePressed(function() {
    food.deductFood();
    dog.addImage("dogImg", happyDogImg);
  })

  var button2 = createButton("add Food");
  button2.position(750, 70);

  button2.mousePressed(function() {
  food.addFood();
  })
  
}


function draw() {  
  background(46, 139, 87);


  stroke("blue");
  fill("white");
  textSize(18);
  if(foodS){
    text("Food Remaing :- " + foodS, 150, 120);
  }

  

  food.display();

  showTime();

  drawSprites();
  

}

function writeStock(x){
  if(x <= 0) {
    x = 0;
  } else {
    x = x -1;
  }
  database.ref("/").set({
      Food: x
  })

}

function readStock(data) {
  foodS = data.val();
  console.log(foodS);
}

function showError() {
  console.log("there is a error reading the values");
}

function showTime() {
  console.log(feedTime);
  stroke("blue");
  fill("white");
  textSize(18);
  if(feedTime) {
    text("Last Feed Time :- " + feedTime, 25, 75);
  }
}


