const action = require('../database/database')

exports.getDataCollection = async (req, res) => {
  const table = req.params.table
  await action.getCollection(table, res)
}

exports.getDataDetail = async (req, res) => {
  await action.getBy(req, res)
}

exports.update = async (req, res) => {
  await action.update('mahasiswa', req.body, res)
}

exports.insert = async (req, res) => {
  await action.insert('mahasiswa', req.body, res)
}

exports.delete = async (req, res) => {
  const table = req.body.table
  const field = req.body.field
  const value = req.body.value
  await action.delete(table, field, value, res)
}

