const action = require('../database/database')

exports.getDataCollection = async (req, res) => {
  const table = req.params.table
  await action.getCollection(table, res)
}

exports.getDataDetail = async (req, res) => {
  await action.getBy(req, res)
}

exports.update = async (req, res) => {
  await action.update(req.body.data, res)
}
