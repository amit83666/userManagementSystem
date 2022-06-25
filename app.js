const path = require("path");
const express = require("express");
const { engine }  = require('express-handlebars');
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { ppid } = require("process");

require('dotenv').config();



const app = express();
const port = process.env.PORT || 3000;
//const port = 3000;

//parsing middleware
//parse application /x-wwww-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

//parse application/json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));
//console.log(__dirname);
//console.log(path.join(__dirname,'../'));

const publicDirectoryPath=path.join(__dirname,'public');
//console.log(path.join(__dirname,'public'));
//templateing Engine

app.engine('hbs',engine({
    defaultLayout: "main",
    extname:'.hbs'
}));

//app.engine('hbs', exphbs({extname: '.hbs'}));
//const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
//app.engine('hbs',hbs({}))
app.use(express.static(publicDirectoryPath));

//app.set('views', './views');


// app.get("/", (req, res)=>{
//     res.render("home");
// })


//here we create router from server routes
const routes = require('./Server/Routes/user');
app.use('/', routes);

// app.get("/main", (req, res)=>{
//     res.render("main");
// })

// app.get("/about", (req, res)=>{
//     res.render('about',{
//         title:"about",
//         name:"amit kumar"
//     })
// })

// app.get("/help", (req, res)=>{
//     res.render('help',{
//         title:"help page",
//         name:"amit kumar"
//     })
// })

// app.get("/hello", (req, res)=>{
// res.send("<h1>hello everyone</h1>");
// })

app.listen(port, ()=>{console.log(`server is running, Listening on ${port}`)});  