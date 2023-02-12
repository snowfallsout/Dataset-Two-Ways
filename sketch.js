//TURN OFF AUTO-REFRESH NOW !!!

//From: https://api.openaq.org
let airData;
let loading = true;
//let url = "https://api.openaq.org/v2/measurements?location_id=225765&parameter=pm25&parameter=pm10&parameter=no2&date_from=2023-02-06T00:00:00Z&date_to=2023-02-12T00:00:00Z&limit=1000";
let url =
  "https://api.openaq.org/v2/measurements?location_id=7743&parameter=pm25&date_from=2023-02-10T00:00:00Z&date_to=2023-02-11T00:00:00Z&limit=1000";

let w;
let bubble3 = [];
let pm;

function setup() {
  angleMode(DEGREES);

  createCanvas(625, 625);

  w = min(windowWidth, windowHeight);
  w =625;
  createCanvas(w, w);
  angleMode(DEGREES);
  g = w / 5;

  //HAVE YOU TURNED OFF AUTO-REFRESH?

  // perform request
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Got data");
      console.log(data);
      //HAVE YOU TURNED OFF AUTO-REFRESH?

      airData = data;
      loading = false;
    })
    .catch(function (err) {
      console.log(`Something went wrong: ${err}`);
    });
}

function draw() {
  
  
  textAlign(CENTER);
  background(235);

  fill(0);

  if (loading) {
    // loading screen
    textSize(30);
    text("Loading...", 0, height / 2 - 25, width, 50);
  } else {
    //display using the simple line-graph code
    //HAVE YOU TURNED OFF AUTO-REFRESH?
  }

  //drawPattern(1);
  //translate(width/2,height/2);
  push();
  for (let i = 0; i < airData.results.length; i++) {
    //    for (let x = g / 2; x <= w - g / 2; x += g) {
    // for (let y = g / 2; y <= w - g / 2; y += g) {
    translate(29, 0);
    
    
    drawPattern(airData.results[i].value * 1);
    
   
    // text(airData.results[i].value, 0, 0);
    // push();
    // translate(0,10);
    // text(airData.results[i].parameter, 0, 0);
    // pop();
  }
  pop();
  
  push();
  translate(0,height-55);
   push();
  for (let i = 0; i < airData.results.length; i++) {
    //    for (let x = g / 2; x <= w - g / 2; x += g) {
    // for (let y = g / 2; y <= w - g / 2; y += g) {
    translate(29,0);
    noStroke();
    fill(0);
    ellipse(0,0,airData.results[i].value * 1);
    // text(airData.results[i].value, 0, 0);
    // push();
    // translate(0,10);
    // text(airData.results[i].parameter, 0, 0);
    // pop();
  }
  pop();
  pop();


  
//        for (let x = g / 2; x <= w - g / 2; x += g) {
//     for (let y = g / 2; y <= w - g / 2; y += g) {
//       push();
//       translate(x, y);
    
//    drawPattern(airData.results[10].value * 1);
    
//       pop();
//     }
//        }
  
  
  // 	let rw = w/10;
  //fill(0);
  // textSize(30);
  // text(airData.results[0].location, 100, height  - 25);
  drawChart();
}

function drawPattern(size) {
  //    for (let x = g / 2; x <= w - g / 2; x += g) {
  //   for (let y = g / 2; y <= w - g / 2; y += g) {
  //     push();
  //     translate(x, y);
  //     for (let j = 0; j < 30; j++) {
  //       let col = map(size,10,30,0,255);
  //       fill(random([0, 255]));
  //       noStroke();
  //       let er = random(g / 4, g);
  //       ellipse(
  //         random(-g / 2 + er / 2, g / 2 - er / 2),
  //         random(-g / 2 + er / 2, g / 2 - er / 2),
  //         er,
  //         er
  //       );
  //     }
  //     pop();
  //   }
  // }
  //   noLoop();

  //ellipse(0,height/2,size);

  push();
  //translate(x, y);
  
  for (let j = 0; j < 100; j++) {
    let col = map(size, 5, 25, 255, 0);
    //fill(random([0, 255]));
    fill(col,random([0, 255]));
    noStroke();
    //let er = random(g / 4, g);
    let er = random(size*8);
    push();
    //translate(0,100);
    let x = random(-g / 2 + er / 2, g / 2 - er / 2);
    let y = random(-g / 2 + er / 2, g / 2 - er / 2)*10;
    
    
    noStroke();
    ellipse(
      x,
      y,
      er,
      er
    );
    
    //stroke(col);
    //stroke(255-col,255,100);
    //line(x,0,x,y);
    // strokeWeight(1);
    // stroke(255-col,255,100);
    // line(0,y,x,y);
    pop();
      //ellipse(0,0, er,er);
  }
  pop();
  noLoop();
}
function drawChart(){


  textAlign(CENTER, BOTTOM); 
  text("PM2.5 "+airData.results[0].location,width/2,height-10);

  // Compute max and min (for normalization)
  let maxTemp = 0; 
  let minTemp = 0;
  for (let i=0; i<airData.results.length; i++) {
    if ( airData.results[i].value > maxTemp) {
      maxTemp = airData.results[i].value;
    }
    if ( airData.results[i].value < minTemp) {
      minTemp = airData.results[i].value;
    }
  }


  let tempStep = 5;
  maxTemp = Math.ceil(maxTemp / tempStep) * tempStep;//always round up the max temp to the next step in chart
  minTemp = Math.floor(minTemp / tempStep) * tempStep;//always round down the min temp to the next step in chart

  
  let colWidth = width/(airData.results.length+2); //add 2 so there is space either side of the chart
  let chartHeight = height-(colWidth*2);

  // Display temp labels
  for (let temp = minTemp; temp <= maxTemp; temp += tempStep) {
    
    let tempY =  map(temp, minTemp, maxTemp, chartHeight, colWidth); 

    fill(0); 
    textAlign(RIGHT, BOTTOM); 
    push();
    translate( colWidth, tempY);
    line(0,0,10,0);
    textSize(12);
    text(temp,-10,5);
    pop();

  }  

  // Display date labels
  for (let i=0; i<airData.results.length; i++) {
    let item = airData.results[i];
    
    let dateX = map(i, 0, airData.results.length, colWidth, width); //map range includes the space on either side
   
    let date = new Date(item.date.local);
    let dateString = date.toDateString().split(" ");//splits on space
    console.log(dateString);//logs out array
    dateString.pop();//discards the year because why not, you could add this to the chart title
    dateString = dateString.join(" ");// uses javascript array join functionatlity
    console.log(dateString);

    fill(0); 
    textAlign(LEFT, TOP); 
    push();
    translate( dateX, chartHeight);
    line(0,0,0,-(chartHeight-colWidth));
    rotate(45);
    textSize(6);
    text(dateString,10,0);
    pop();

  }  

  //Map line to chart
  strokeWeight(3);
  stroke(255,0,0);
  noFill();

  //this is a shape so we need two loops for the temperature
  beginShape();
  // Display temp
  for (let i=0; i<airData.results.length; i++) {
    let item = airData.results[i];
    
    let pX = map(i, 0, airData.results.length, colWidth, width); //map range includes the space on either side
    let pY = map(item.value, minTemp, maxTemp, chartHeight, colWidth); //inverse mapping because our origin in p5 is in the top left
    //ellipse(pX,pY,item.value)

    vertex(pX, pY);
   //text(item.value,pX,pY);// to test
    
  }  
  endShape();
  
   strokeWeight(1);
  stroke(0);
  fill(0);
   beginShape();
  // Display temp
  for (let i=0; i<airData.results.length; i++) {
    let item = airData.results[i];
    
    let pX = map(i, 0, airData.results.length, colWidth, width); //map range includes the space on either side
    let pY = map(item.value, minTemp, maxTemp, chartHeight, colWidth); //inverse mapping because our origin in p5 is in the top left
    textSize(8);

   text(item.value,pX,pY);// to test
    
  }  
  endShape();



  //Code challenge... 
  //map the feelsLike property to the same graph (read the json file)
  //can you make the line plotting functionality more modular??
  //make a function that takes in the property to map and the color as parameters

}