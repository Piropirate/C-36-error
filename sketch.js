var dog; 
var normalDog, happyDog; 
var database; 
var foodS = 0, foodStock;
var lastFed, fedTime;
var food, foodIMG;

function preload()
{
  normalDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  foodIMG = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(1530, 730);
  database = firebase.database();
  dog = createSprite(1250,365,50,50);
  dog.addImage(normalDog);
  dog.scale = 0.2;

  food = new Food();

  var feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  var addFood = createButton("Add Food");
  addFood.position(850,95);
  addFood.mousePressed(addFoods());

  
}

function draw() {  
  background(rgb(46, 139, 87));

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + " PM",400,50);
  }else if(lastFed === 0){
    text("Last Feed : 12 AM",400,50);
  }else{
    text("Last Feed :" + lastFed + " AM",400,50);
  }
  
  food.display();
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);

  food.updateFoodStock(food.getFoodStock() - 1);
  database.ref('/').update({
    Food : food.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}