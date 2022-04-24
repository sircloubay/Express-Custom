const mysql = require('mysql')
const resend = require('../../helper/resend')
const connection = require('../../config/mysql-connect')

// method delete
module.exports = (table, field, value, res) => {
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