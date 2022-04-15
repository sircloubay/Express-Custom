const mysql = require('mysql')
const resend = require('../helper/resend')

// configuration in database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express'
})

//create connection
connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Database Connected')
  }
})

// method get collection
exports.getCollection = (table, res) => {
  connection.query(`SELECT * FROM ${table}`, (err, result, field) => {
    if (err) {
      resend(res,404,err)
    }else{
      resend(res,200,result)
    }
    
  })
}

// method get data by field
exports.getBy = (req, res) => {
  connection.query(`SELECT * FROM ${req.params.table} WHERE ${req.params.field}='${req.params.value}'`, (err, result, field) => {
    if (err) {
      resend(res,404,err)
    }else{
      resend(res,200,result)
    }
  })
}

// method update
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
      resend(res,404,{'message':'Gagal Memperbarui Data'})
    } else {
      if( rows.affectedRows > 0){
        resend(res,200,{'message':'Berhasil Memperbarui Data'})
      }else{
        resend(res,401,{'message':'Tidak Ada Data Yang di Perbarui'})
      }
    }
  })

}

// method insert data
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
      resend(res,404,{'message':'Gagal Menambahkan Data'})
    } else {
      if( rows.affectedRows > 0){
        resend(res,200,{'message':'Berhasil Menambahkan Data'})
      }else{
        resend(res,401,{'message':'Tidak Ada Data Yang ditambahkan'})
      }
    }
  })
}

// method delete
exports.delete = (table, field, value, res) => {
    connection.query(`DELETE FROM ${table} WHERE ${field}='${value}' `,(err, result)=>{
      if (err) {
        resend(res,404,{'message':'Gagal Menghapus Data'})
      } else {
        if( result.affectedRows > 0){
          resend(res,200,{'message':'Berhasil Menghapus Data'})
        }else{
          resend(res,401,{'message':'Tidak Ada Data Yang dihapus'})
        }
      }
    })
}

// method sql
exports.sql = (sql, res) => {
  connection.query(sql,(err,result,rows) => {
    if (err) {
      resend(res,404,err)
    } else {
      resend(res,200,result)
    }
  })
}
