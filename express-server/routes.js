const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    const newData = JSON.parse(data)
    if(err){
      console.log(err)
    } else {
      console.log(data)
      res.render('home', newData)
    }
  })
})




module.exports = router