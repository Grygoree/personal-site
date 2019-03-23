const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const errorHandler = require('errorhandler')
const mongoose = require('mongoose')

mongoose.promise = global.Promise

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'MicroBlog', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false}))

if(!isProduction) {
  app.use(errorHandler());
}

const mongoURI = 'mongodb://localhost/microblog'

mongoose.set('debug', true)

mongoose.connect(mongoURI, {useNewUrlParser: true}).then(
  () => {console.log(`Successfully connected to mongoDB at ${mongoURI}`)}
).catch(
  (err) => {console.log(`Unable to connect to mongoDB at ${mongoURI}`)}
)

app.use(require('./routes'))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    })
  })
}

app.use((err, req, res) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  })
})

const listenPort = 8000

const server = app.listen(listenPort, () => console.log(`Server started on http://localhost:${listenPort}`))
