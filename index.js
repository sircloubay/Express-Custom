const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const routes = require('./app/routes/routes')
const upload = require('express-fileupload')
const port = 3000
const app = express()

// ejs
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')

// configuration
app.use(cors())
app.use(upload())
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))

// use routes
routes(app)

// listen server
app.listen(port, async () => {
  console.log(`server running on port ${port}`)
})
