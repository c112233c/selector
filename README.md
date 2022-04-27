# selector
PEA DevPool

Run project
1. open CMD
2. go to project directory
3. start with "node index.js"

How to test

add student
GET - localhost:3000/addStudent?name=asdf
POST - localhost:3000/addStudent
body : {"name":"fff"}

add ArrayStudent
POST - localhost:3000/addArrayStudent
body : {
"data":[
{"name":"aaaa"},{"name":"bbbbb"}
]
}

resetStudent
GET - localhost:3000/resetStudent

getSummary
GET - localhost:3000/summary

getAllData
POST - localhost:3000/allData