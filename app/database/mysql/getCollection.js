const mysql = require('mysql')
const resend = require('../../helper/resend')
const connection = require('../../config/mysql-connect')

// method get collection
module.exports= (table, res) => {
  connection.query(`SELECT * FROM ${table}`, (err, result, field) => {
    if (err) {
      resend(res,404,err)
    }else{
      resend(res,200,result)
    }
  })
}