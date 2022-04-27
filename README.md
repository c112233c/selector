# selector
PEA DevPool

Run project
1. open CMD
2. go to project directory
3. start with "node index.js"

How to test

1. add student
	- GET - localhost:3000/addStudent?name=asdf
	- POST - localhost:3000/addStudent
body : {"name":"fff"}

2. add ArrayStudent
	- POST - localhost:3000/addArrayStudent
body : {
"data":[
{"name":"aaaa"},{"name":"bbbbb"}
]
}

3. resetStudent
	- GET - localhost:3000/resetStudent

4. getSummary
	- GET - localhost:3000/summary

5. getAllData
	- POST - localhost:3000/allData