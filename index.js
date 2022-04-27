const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var fs = require('fs');

var homeSource = require('./homeSource')
const selectorClass = require('./selectorClass')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  var currentData = getData();
  res.json(currentData);
});

app.get("/resetStudent", (req, res) => {
  const data = JSON.stringify(homeSource);
  var rss = fs.writeFile('./home.json', data, (err) => {
    if (err) {
      res.send(err);
    }
    else{
      res.send("reset success");
    }
  
  });

  
});

app.get("/summary", (req, res) => {
  var currentData = getData(); 
  currentData[0].counting = currentData[0].student.length;
  currentData[1].counting = currentData[1].student.length;
  currentData[2].counting = currentData[2].student.length;
  currentData[3].counting = currentData[3].student.length;
  
  var message = currentData[0].name +" = "+currentData[0].counting + " , " + currentData[1].name +" = "+currentData[1].counting + " , " 
  + currentData[2].name +" = "+currentData[2].counting + " , " + currentData[3].name +" = "+currentData[3].counting;
  res.json(message);

});

app.post("/allData", (req, res) => {
  var currentData = getData();
  currentData[0].counting = currentData[0].student.length;
  currentData[1].counting = currentData[1].student.length;
  currentData[2].counting = currentData[2].student.length;
  currentData[3].counting = currentData[3].student.length;
  res.json(currentData);

});

app.get('/addStudent/', (req, res) => {
  var currentData = getData();
  let json =req.query.name
  let firstChar = req.query.name.charAt(0);
  let code = firstChar.charCodeAt(0);

  var countH0 = currentData[0].student.length;
  var countH1 = currentData[1].student.length;
  var countH2 = currentData[2].student.length;
  var countH3 = currentData[3].student.length;

  var select = new selectorClass(code,countH0,countH1,countH2,countH3);
  var selectHome = select.selectStudent();
  var selectHomeNumber = selectHome.id;
  currentData[selectHomeNumber].student.push(json);

  const data = JSON.stringify(currentData);
  // var rss = fs.writeFile('./home.json', data, (err) => {
  //           if (err) {
  //             return err;
  //           }
  //             return "success";
  //           });
  addStudent(data);
  
  var message = "Student Name " + json.name + " to Home " + currentData[selectHomeNumber].name;
  res.json({home:currentData[selectHomeNumber].name,name:json,message:message});

})

app.post('/addStudent/', (req, res) => {
  var currentData = getData();
  let json =req.body
  let firstChar = req.body.name.charAt(0);
  let code = firstChar.charCodeAt(0);

  var countH0 = currentData[0].student.length;
  var countH1 = currentData[1].student.length;
  var countH2 = currentData[2].student.length;
  var countH3 = currentData[3].student.length;

  var select = new selectorClass(code,countH0,countH1,countH2,countH3);
  var selectHome = select.selectStudent();
  var selectHomeNumber = selectHome.id;
  currentData[selectHomeNumber].student.push(json);

  const data = JSON.stringify(currentData);

  addStudent(data);
  
  var message = "Student Name " + json.name + " to Home " + currentData[selectHomeNumber].name;
  res.json({home:currentData[selectHomeNumber].name,name:json.name,message:message});

})

app.post('/addArrayStudent/', (req, res) => {
  var currentData = getData();
  let json =req.body;

  json.data.map((a) => {
    let firstChar = a.name.charAt(0);
    let code = firstChar.charCodeAt(0);
    var countH0 = currentData[0].student.length;
    var countH1 = currentData[1].student.length;
    var countH2 = currentData[2].student.length;
    var countH3 = currentData[3].student.length;

    var select = new selectorClass(code,countH0,countH1,countH2,countH3);
    var selectHome = select.selectStudent();
    var selectHomeNumber = selectHome.id;
    currentData[selectHomeNumber].student.push(a);
    
  });

  const data = JSON.stringify(currentData);
  addStudent(data);

  // res.json(json);
  res.json({"Gryffindor":currentData[0].student.length,"Hufflepuff":currentData[1].student.length,"Ravenclaw":currentData[2].student.length,"Slytherin":currentData[3].student.length});

})

app.listen(port, () => {
  console.log("Starting node.js at port " + port);
});

function getData(){
  return JSON.parse(fs.readFileSync('./home.json', 'utf8'));
}

function addStudent(data){
  var rss = fs.writeFile('./home.json', data, (err) => {
      if (err) {
        return err;
      }
      else{
        return "success";
      }
    });
}