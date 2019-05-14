const mongoose = require('mongoose')
const router = require('express').Router()
const Article = mongoose.model('Article')

router.post('/' (req, res, next) => {
  const { body } = req

  if(!body.title || !body.author || !body.body) {
    resturn res.status(422).json({
      errors: {

      }
    })
  }

  if(!body.title) {
    
  }
})