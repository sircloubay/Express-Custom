const Insert = require('../database/mysql/insert')
const Update = require('../database/mysql/update')
const Delete = require('../database/mysql/delete')
const GetBy = require('../database/mysql/getBy')
const GetCollection = require('../database/mysql/getCollection')

exports.getDataCollection = async (req, res) => {
  const table = req.params.table
  await GetCollection(table, res)
}

exports.getDataDetail = async (req, res) => {
  await GetBy(req, res)
}

exports.update = async (req, res) => {
  await Update('mahasiswa', req.body, res)
}

exports.insert = async (req, res) => {
  await Insert('mahasiswa', req.body, res)
}

exports.deletes = async (req, res) => {
  const table = req.body.table
  const field = req.body.field
  const value = req.body.value
  await Delete(table, field, value, res)
}

