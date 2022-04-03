const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express'
})

connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Database Connected')
  }
})

exports.getCollection = (table, res) => {
  connection.query(`SELECT * FROM ${table}`, (err, result, field) => {
    if (err) {
      throw err
    }
    res.json(result)
    res.end()
  })
}

exports.getBy = (req, res) => {
  connection.query(`SELECT * FROM ${req.params.table} WHERE ${req.params.field}='${req.params.value}'`, (err, result, field) => {
    if (err) {
      throw err
    }
    res.json(result)
    res.end()
  })
}

exports.update = (data, res) => {
  let sql = `UPDATE ${data.table} SET`
  const key = Object.keys(data)

  for (let i = 0; i < key.length; i++) {
    if (key[i] !== 'id' && key[i] !== 'table') {
      // eslint-disable-next-line no-unused-vars
      sql += ` ${key[i]}='${data[key[i]]}'`
    }
  }
  // eslint-disable-next-line no-unused-vars
  sql += ` WHERE id='${data.id}'`
}
