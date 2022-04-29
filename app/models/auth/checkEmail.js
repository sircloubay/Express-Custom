const asyncQuery = require('../../helper/asyncQuery')

module.exports = (table, email) => {
    // QUERY EMAIL 
   const email_status = asyncQuery(`SELECT * FROM ${table} WHERE email='${email}'`)

    // RESOLVE PROMISE    
   const status = email_status.then((email)=>{
        if(email.length > 0){
            return 1
        }else{
            return 0
        }
   })

   return status
}