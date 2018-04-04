'use strict'
// imports
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mysql = require('mysql')

require('dotenv').config({
  path:'./vars.env'
})

console.log(process.env.DB_PORT)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

//routes
const index = require('./routes/index')
const error = require('./routes/404')

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// maleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


connection.connect(function(error){
  if(error){
    console.log(error)
  }else{
    console.log('ho')
  }
})
app.use('/', index)
app.use('/404', error)

app.use(function(req, res, next){
  res.status(404);

  res.format({
    html: function () {
      res.render('404', { url: req.url })
    },
    json: function () {
      res.json({ error: 'Not found' })
    },
    default: function () {
      res.type('txt').send('Not found')
    }
  })
});

module.exports = app
