const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const routes = require('./app/routes/routes')
const port = 3000
const app = express()

// configuration
app.use(cors())
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// use routes
routes(app)

// listen server
app.listen(port, async () => {
  console.log(`server running on port ${port}`)
})
