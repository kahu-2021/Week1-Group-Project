const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if(err){
      console.log(err)
    } else{
      res.render('adventureView')
    }
  })
})