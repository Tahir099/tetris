const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
let column = 10;
let row = 20;
const width = canvas.width / column;
const height = canvas.height / row;
let currentObj = [];
let end = [];
let interval;
let isMove = true;
let test;
let currentFIgure;
let direction = 1
let movieYDuration = 255
let isRotate = true
let isGameOver = false
let a;
let go = true;

function checkGameOver(){
  let a = {x:5 ,y:0}
  if(end.some(element=>element.x == a.x && element.y == a.y)){
    clearInterval(interval)
    isGameOver = true;
    clearArea()
    drawFigure()
    drawEnd()
  }
}



function rotate(currentFIgure){
  let testObj = JSON.parse(JSON.stringify(currentObj));
  if(currentFIgure == 1){
    if(direction == 1){
      currentObj[1].x+=2
      currentObj[0].x+=1
      currentObj[0].y+=1
      currentObj[3].x-=1
      currentObj[3].y+=1

      direction = 2
    }
    else if(direction == 2){
      currentObj[1].x-=2
      currentObj[0].x-=1
      currentObj[0].y-=1
      currentObj[3].x+=1
      currentObj[3].y-=1

      direction = 1
    }
  }
  else if(currentFIgure == 5){
    if(direction == 1){
      currentObj[0].x+=1
      currentObj[0].y+=1
      currentObj[1].y+=2
      currentObj[3].y-=1
      currentObj[3].x+=1

      direction = 2
    }
    else if(direction == 2){
      currentObj[0].x-=1
      currentObj[0].y-=1
      currentObj[1].y-=2
      currentObj[3].y+=1
      currentObj[3].x-=1
      direction = 1
    }
  }
  else if(currentFIgure == 2){
    if(direction == 1){
      currentObj[3].y -= 1
      currentObj[3].x -= 1
      currentObj[1].x += 1
      currentObj[1].y += 1
      currentObj[2].x += 2
      currentObj[2].y += 2

      direction = 2
    }
    else if(direction == 2){
      currentObj[3].y += 1
      currentObj[3].x += 1
      currentObj[1].x -= 1
      currentObj[1].y -= 1
      currentObj[2].x -= 2
      currentObj[2].y -= 2

      direction = 1
    }
  }
  else if(currentFIgure == 4){
      if(direction == 1){
        currentObj[0].x += 1 
        currentObj[0].y += 1 
        currentObj[2].y += 1 
        currentObj[2].x -= 1 
        currentObj[3].x += 1 
        currentObj[3].y -= 1 
        direction = 2
      }
      else if(direction == 2){
        currentObj[0].x -= 1 
        currentObj[0].y += 1 
        currentObj[2].y -= 1 
        currentObj[2].x -= 1 
        currentObj[3].x += 1 
        currentObj[3].y += 1 

        direction = 3
      }

      else if(direction == 3){
        currentObj[0].x -= 1 
        currentObj[0].y -= 1 
        currentObj[2].y -= 1 
        currentObj[2].x += 1 
        currentObj[3].x -= 1 
        currentObj[3].y += 1 

        direction = 4
      }
      else if(direction == 4){
  
        currentObj[0].x += 1 
        currentObj[0].y -= 1 
        currentObj[2].y += 1 
        currentObj[2].x += 1 
        currentObj[3].x -= 1 
        currentObj[3].y -= 1 

        direction = 1
      }
  }
  currentObj.forEach(element => {
    if(element.x >= column || element.y > row || end.some(elementend => elementend.x == element.x && elementend.y == element.y)){
      isRotate = false
      if(direction < 4)direction+=1
      else if(direction == 4)direction = 1
    }
    else if(element.x < 0){
      isRotate = false
      if(direction < 4)direction+=1
      else if(direction == 4)direction = 1
    }
  });
  if(!isRotate){
    currentObj = testObj
  }
  isRotate = true
}
function moveY(){
  interval = setInterval(() => {
    changeY();
  }, movieYDuration);
}

function createT() {
  
  isMove = true;
  currentFIgure = 4
  test = { x: 5, y: -2 ,color: "green" };
  point1 = test;  
  point2 = { x: test.x, y: test.y + 1 ,color: "green" }; 
  point3 = { x: test.x + 1, y: test.y + 1 ,color: "green" };
  point4 = { x: test.x - 1, y: test.y + 1 ,color: "green" };

  currentObj.push(point1);
  currentObj.push(point2);
  currentObj.push(point3);
  currentObj.push(point4);
  drawFigure()
  moveY()
}

function createCube() {
  isMove = true;

  currentFIgure = 3;
  isMove = true;
  test = { x: 5, y: -2,color:"red"};
  point1 = test;
  point2 = { x: test.x - 1, y: test.y ,color:"red"};
  point3 = { x: test.x, y: test.y + 1,color:"red" };
  point4 = { x: test.x - 1, y: test.y + 1 ,color:"red"};

  currentObj.push(point1);
  currentObj.push(point2);
  currentObj.push(point3);
  currentObj.push(point4);
  drawFigure()
  moveY()
}

function createZ() {
  isMove = true;
  currentFIgure = 1
  test = { x: 5 , y: -2 , color:"blue"};
  point1 = test;
  point2 = { x: test.x - 1, y: test.y , color:"blue"};
  point3 = { x: test.x, y: test.y + 1 , color:"blue" };
  point4 = { x: test.x + 1, y: test.y + 1 , color:"blue"};

  currentObj.push(point1);
  currentObj.push(point2);
  currentObj.push(point3);
  currentObj.push(point4);
  drawFigure()
  moveY()
}

function createReverseZ(){
  isMove = true;
  currentFIgure = 5
  test = { x: 5 , y: -2 , color:"blue"};
  point1 = test;
  point2 = { x: test.x + 1, y: test.y , color:"blue"};
  point3 = { x: test.x, y: test.y + 1 , color:"blue" };
  point4 = { x: test.x - 1, y: test.y + 1 , color:"blue"};

  currentObj.push(point1);
  currentObj.push(point2);
  currentObj.push(point3);
  currentObj.push(point4);
  drawFigure()
  moveY()
}

function createL() {
  isMove = true;

  currentFIgure = 2
  isMove = true;
  test = { x: 5, y: -1 ,color:"yellow"};
  point1 = test;
  point2 = { x: test.x - 1, y: test.y ,color:"yellow"};
  point3 = { x: test.x - 2, y: test.y  ,color:"yellow"};
  point4 = { x: test.x + 1, y: test.y  ,color:"yellow"};

  currentObj.push(point1);
  currentObj.push(point2);
  currentObj.push(point3);
  currentObj.push(point4);
  drawFigure()
  
  moveY()
}

getRandomFigure();
drawFigure();

function random(){
  return Math.floor(Math.random() * 5) + 1;
}

function getRandomFigure(){
  let a = random()
  switch(a){
    case 1:
      createL()
      break
    case 2:
      createZ()
      break
    case 3:
      createCube()
      break
    case 4:
      createT()
      break
    case 5:
      createReverseZ()
  }

}

function drawPart(obj) {
  ctx.beginPath();
  ctx.fillStyle = obj.color;
  ctx.rect(obj.x * width, obj.y * height, width, height);
  ctx.fill();
  ctx.stroke();
}


function drawFigure() {
  currentObj.forEach((element) => {
    drawPart(element);
  });
}

function clearArea() {
  ctx.fillStyle = "black";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}

function check() {
  for (let i = 0; i < currentObj.length; i++) {
    let a = { x: currentObj[i].x, y: currentObj[i].y + 1 };
    if (currentObj[i].y + 1 == row) {
      isMove = false;

      end = end.concat(currentObj);
      currentObj = [];
      direction = 1
      clearInterval(interval);
      drawEnd()
      checkGameOver()
      if(!isGameOver){
        getRandomFigure()
      }
      checkLines()

    }
    else if (end.some((b) => b.x == a.x && b.y == a.y)) {
      isMove = false;
      end = end.concat(currentObj);
      currentObj = [];
      direction = 1
      clearInterval(interval);
      drawEnd()
      checkGameOver()
      if(!isGameOver){
        getRandomFigure()
      }
      checkLines()

    }
  }
}

function changeY() {
  check();
  if (isMove) {
    
    go = true;
    a = 1;
    clearArea();
    drawFigure();
    for (let i = 0; i < currentObj.length ; i++) {
      currentObj[i].y += 1;
    }
    drawEnd();
  }
}

function drawEnd() {
  for(let i = 0 ; i < end.length ;i++){
    ctx.beginPath();
 
    ctx.fillStyle = end[i].color
    ctx.rect(end[i].x * width, end[i].y * height, width, height);
    ctx.fill();
    ctx.stroke();
  }
}


function changeX(e){
  let move = true;
  let XMove = true
  switch (e.which) {
    case 39:
      for(let i = 0 ; i < currentObj.length ; i ++){
        obj = {x:currentObj[i].x + 1 , y:currentObj[i].y}
        if(end.some(element=>element.x == obj.x && element.y == obj.y)){
          XMove = false;
        }
        if(currentObj[i].x + 1 == column){
          move = false
        }
      }
      if(move && XMove){
        for(let i = 0 ; i < currentObj.length  ; i ++){
          currentObj[i].x += 1
        }
      }
      move = true
      break;
    case 37:
      for(let i = 0 ; i < currentObj.length  ; i ++){
        obj = {x:currentObj[i].x - 1 , y:currentObj[i].y}
        if(end.some(element=>element.x == obj.x && element.y == obj.y)){
          XMove = false;
        }
        if(currentObj[i].x - 1 < 0){
          move = false
        }
      }
      if(move && XMove){
        for(let i = 0 ; i < currentObj.length  ; i ++){
          currentObj[i].x -= 1
        }
      }
      move = true
      break;
    case 38:
      rotate(currentFIgure)
    
  }
}

function checkLines(){
  let lines = []
  for(let i = 19   ; i > 0 ; i--){
    let count = 0;
    for(let j = 0 ; j < column ; j++){
      if(end.some(element => element.x == j && element.y == i)){

        count++;
      }
    }
    if(count == column)
    {
      lines.push(i)
      let obj;
      for(let objX = 0 ; objX < column ; objX++){
        obj = {x:objX , y:i}
        let objIndex = end.findIndex(element => element.x === obj.x && element.y === obj.y)
        end.splice(objIndex,1)
      }
    }
    count = 0
  }
  downParts(lines)
  drawEnd()
}


function downParts(array){
  let index = 0
  for(let i = 0 ; i < end.length ; i++){
    let a = end[i].y
    for(let i = 0 ; i < array.length ; i ++){
      if(a < array[i]){
        index++;
      }
    }
    end[i].y+=index
    index = 0
  }
}

document.body.onkeydown = changeX;