const controller = require('../controller/controller')

module.exports = (app) => {
  // homepage
  app.get('/data/:table', (req, res) => {
    controller.getDataCollection(req, res)
  })

  app.get('/data/:table/:field/:value', (req, res) => {
    controller.getDataDetail(req, res)
  })

  app.put('/update', (req, res) => {
    controller.update(req, res)
  })

}
