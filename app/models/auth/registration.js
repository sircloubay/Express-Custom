const asyncQuery = require('../../helper/asyncQuery')
const returnMessage = require('../../helper/returnMessage')

module.exports = async (data) => {
    try{
        // EXECUTE INSERT DATA
        const result = await asyncQuery('INSERT INTO account SET ?', [data])

        // CHEK IF SUCCESS
        if(result.affectedRows){
            return returnMessage('200', 'Terima kasih telah melakukan registrasi')
        }
        
        // IF NOT SUCCESS
        return returnMessage('400', 'Terjadi kesalahan ketika proses pendaftaran')

    }catch(err){
        // ERROR
        return returnMessage('400', err.sqlMessage)
    }
}