const bcrypt = require('bcrypt')
const registration = require('../../models/auth/registration')
const response = require('../../helper/response')
const asyncQuery = require('../../helper/asyncQuery')
const checkEmail = require('../../models/auth/checkEmail')

module.exports = async (req, res) => {
    try{
        // DESTRUCTURING DATA 
        let {email, password, repeat_password, username, role} = req.body

        // CHEK DATA WHEN EMPTY
        if(!email || !password || !repeat_password || !username || !role){
            return response(res, '400', {'message':'Mohon lengkapi form ini'})
        }

        // CHEK IF PASSWORD DOESN'T MATCH
        if(password !== repeat_password){
           return response(res, '400', {'message':'Password harus sama'})
        }

        // CHEK IF EMAIL ALREADY IN USE
        const emailReadyInUse = await checkEmail('account', email)
        
        if(emailReadyInUse > 0){
            response(res, '400', {'message':'Email Telah digunakan'})
        }else{
            // HASH PASSWORD
            const salt = await bcrypt.genSaltSync(9);
            password = await bcrypt.hashSync(repeat_password, salt);

            // GET TIME NOW
            const createAt = Date.now()
            
            // EXECUTE 
            const {status, message} = await registration({email, password, username, role, createAt})

            // SEND RESPONSE
            response(res, status, {message})
        }

    }catch(err){
        // PROGRAM ERROR
        console.log(err)
        return false
    }
}