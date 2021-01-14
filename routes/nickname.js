const express = require('express')
const router = express.Router()
const fs = require('fs')

// let name = {
//   firstName: "",
//   lastname: ""
// }

let newName = " "

//newName = firstname + lastName

// /NickName main page -- has form on it
router.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if(err){
      console.log(err)
    } else{
      res.render('home')
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
      firstname = req.body.firstName
      lastname = req.body.lastName 
      let f = firstName[0]
      let l = lastName[0]
      let newFirstName = newData.firstName[0].f
      let newLastName = newData.Lastname[0].l
      // data.""
      newName = newFirstName + " " + newLastName
      res.redirect('/NewName')
    }
  })
})



//displays new name on webpage
router.get('/NewName', (req, res) => {
  res.render("name", newName)
})








// router.get('firstName:', (req, res) => {
//   fs.readFile('./data.json', 'utf8', (err, filecontents) => {
//     const puppiesList = JSON.parse(filecontents)
//     const puppyId = req.params.id
    
//     if(err){
//       console.log('big error', err)
      
//     } else {
//     const foundPuppy = puppiesList.puppies.find(puppy => puppy.id == puppyId)
//     // console.log(foundPuppy)
//     // console.log('here are the puppies', filecontents)
//     res.render('edit', foundPuppy)
//   }
//     }
// )
// })


// [L]ogan
// [W]ebber




module.exports = router