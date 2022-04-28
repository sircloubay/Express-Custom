const asyncQuery = require('../../helper/asyncQuery')
const syncQuery = require('../../helper/asyncQuery')

module.exports = async (data) => {
    try{
        const result = await asyncQuery('INSER INTO account SET ?', [data])

        if(result.affectedRows){
            return {'status':'200', 'message': 'terima kasih telah melakukan registrasi'}
        }

        return {'status':'400', 'message': 'Terjadi kesalahan ketika proses pendaftaran'}

    }catch(err){
        return {'status':'400', 'message': err.sqlMessage}
    }
}