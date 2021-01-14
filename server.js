const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const routes = require('./routes/nickname')
const server = express()


// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// routes/router(s) should go here

server.use("/nickname", routes)

server.get("/", (req, res) => {
  res.render('home')
})


module.exports = server
