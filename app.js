const express = require("express");
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const Tables = require('./infra/tables')

dotenv.config({path: './.env'});

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname,'./public');  
app.use(express.static(publicDirectory));
app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());

app.use(cookieParser());

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

connection.connect((err) => {
  if (err){
    console.log(err)
  } else{ 
    console.log('db conected...')
    Tables.init(connection)
  }
});

//Router 
app.use('/', require('./router/pages'));
app.use('/auth', require('./router/auth'));

app.listen(5501, () => {
  console.log("Server on port 5501")
})
