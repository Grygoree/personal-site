const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
//TODO: Determine if dependency is needed, and if not, remove
//const cloudinary = require('cloudinary')

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/blog"

try {
  mongoose.connect(url, {
    //TODO: Determine if following line is deprecated, and if so, remove
    //useMongoClient: true
  })
} catch (error) {
  console.log("Failed to connect to MongoDB")
}

let port = process.env.PORT || 5000

routes(router)

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

app.use('/api', router)

app.listen(port, () => {
  console.log('Server started at port: ${port}')
})
