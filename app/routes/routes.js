const session = require('express-session')
const home = require('../controller/home')

module.exports = (app) => {
  // homepage
  app.get('/',(req, res) => {
      res.render('index',{
        title:'Home | express custom',
        css : 'index',
        js: 'null',
      })
  })

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

  app.get('/auth',(req, res) => {
    req.session.userId = "mansbjdhsfa8765"
    req.session.save()
    res.redirect('/')
  })

  app.get('/logout',(req, res) => {
    req.session.destroy()
    res.end('anda telah logout')
  })

  app.post('/sql',(req, res) => {
    home.querySQL(req.body.sql, res)
  })

}
