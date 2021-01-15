const express = require('express')
const router = express.Router()
const fs = require('fs')

let name = {
  firstName: "",
  lastName: ""
}

let newName = " "

//newName = firstname + lastName

// /NickName main page -- has form on it
router.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if(err){
      console.log(err)
    } else{
      res.render('form')
    }
  })
})
// Calls the name object and updates it into the newName and redirects you to the newName page
// gets the information from form
router.post('/', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    const newData = JSON.parse(data)
    if(err){
      console.log(err)
    } else{
      //console.log(newData)
      name.firstName = req.body.firstName
      name.lastName = req.body.lastName 
      let f = name.firstName[0].toUpperCase()
      let l = name.lastName[0].toUpperCase()
      // console.log(f , l)
      let newFirstName = newData.firstName[0][f]
      let newLastName = newData.lastName[0][l]
      // data.""
      newName = newFirstName + " " + newLastName
      res.redirect('/nickname/NewName')
    }
  })
})



//displays new name on webpage
router.get('/NewName', (req, res) => {
  let name = {
    name:newName
  }
  res.render("name", name)
})




module.exports = router