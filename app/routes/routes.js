const session = require('express-session')
const home = require('../controller/home')
const registration = require('../controller/auth/registration')
const login = require('../controller/auth/login')

module.exports = (app) => {

  // ROUTE PAGE
  app.get('/',(req, res) => {
      res.render('index',{
        title:'Home | express custom',
        css : 'index',
        js: 'null',
      })
  })
  // END ROUTE PAGE


  // MYSQL ROUTE TESTING
  app.get('/data/:table', (req, res) => {
    home.getDataCollection(req, res)
  })

  app.get('/data/:table/:field/:value', (req, res) => {
    home.getDataDetail(req, res)
  })

  app.put('/', (req, res) => {
    home.update(req, res)
  })

  app.post('/', (req, res) => {
    home.insert(req, res)
  })

  app.delete('/', (req, res) => {
    home.deletes(req, res)
  })

  app.post('/sql',(req, res) => {
    home.querySQL(req.body.sql, res)
  })
  // END MYSQL ROUTE


  // AUTHENTICATION ROUTE
  app.post('/registration', (req, res) => {
    registration(req, res)
  })

  app.post('/login', (req, res) =>{
    login(req, res)
  })
  // END AUTHENTICATION ROUTE

}
