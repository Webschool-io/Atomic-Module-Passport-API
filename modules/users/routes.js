const express = require('express')
const router = express.Router()
const passport = require('passport')
const Controller = require("./organism")

// Create
router.post('/', Controller.create)
// Retrieve
router.get('/', isLoggedIn, Controller.find)
// get current user
router.get('/currentuser', isLoggedIn, (req, res) => {
  res.json(req.user)
})
// send JSON notifying about LOGIN
router.get('/login', (req, res) => {
  const loginJSON = {
    message: "Please SEND your DATA for this ROUTE with POST"
  }
  res.json(loginJSON)
})
// logout
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  res.status(200).send('Ok')
})
// get by id
router.get('/:id', Controller.findById)
// get one
router.post('/find', Controller.findOne)
// Update
router.put('/:id', Controller.update)
// Delete
router.delete('/:id', Controller.remove)
// login
router.post('/login', passport.authenticate('local-login'), function(req, res){
  const loginJSON = {
    message: "User "+ req.body.email +" LOGGED!"
  }
  res.json(loginJSON)
  res.end()
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
  {
    return next()
  }
  res.json({success: false})
}

module.exports = router
