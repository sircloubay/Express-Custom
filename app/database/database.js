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

exports.update = (table, data, res) => {
  let sql = `UPDATE ${table} SET`
  const key = Object.keys(data)
  const value = []

  // length to know position or array
  let length = key.length
  length -= 1
  let index

  for (let i = 0; i < key.length; i++) {
    if (key[i] !== 'id' && key[i] !== 'table') {
      // eslint-disable-next-line no-unused-vars
      index = key.indexOf(key[i])
      if (index !== length) {
        sql += ` ${key[i]}=?,`
        value.push(data[key[i]])
      } else {
        sql += ` ${key[i]}=?`
        value.push(data[key[i]])
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  sql += ' WHERE id=?'
  value.push(data.id)

  // excute
  connection.query(sql, value, (err, rows) => {
    if (err) {
      res.json(err)
      res.end()
    } else {
      res.json(rows)
      res.end()
    }
  })
}

exports.insert = (table, data, res) => {
  let sql = `INSERT INTO ${table} SET`
  const key = Object.keys(data)
  const value = []

  // length to know position or array
  let length = key.length
  length -= 1
  let index

  for (let i = 0; i < key.length; i++) {
    if (key[i] !== 'id' && key[i] !== 'table') {
      // eslint-disable-next-line no-unused-vars
      index = key.indexOf(key[i])
      if (index !== length) {
        sql += ` ${key[i]}=?,`
        value.push(data[key[i]])
      } else {
        sql += ` ${key[i]}=?`
        value.push(data[key[i]])
      }
    }
  }

  let status = null

  // excute
  connection.query(sql, value, (err, result, rows) => {
    if (err) {
      status = 401
    } else {
      status = 200
      console.log(rows)
      console.log(result)
    }
  })

  if (status === 401){
    res.status(401)
       .json({ 'message':'Gagal Menambahkan Data' }) 
  } else {
    res.status(200)
       .json({ 'message':'Berhasil Menambahkan Data' })
  }

  res.end()
}
