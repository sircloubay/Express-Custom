const response = require('../../helper/response')
const login = require('../../models/auth/login')

module.exports = async (req, res) => {
    try{
        // DESCTRUCTURING DATA
        const {email, password} = req.body

        // CHECK WHEN DATA EMPTY
        if(!email || !password){
            return response(res, '400', {'message':'Mohon lengkapi form ini'})
        }

        // EXECUTE LOGIN
        const user = await login({email, password})
        
        // CHEK IF SUCCESS
        if(user.status === 200){
            response(res, 200, user)
        }else{
            response(res, 200, user)
        }
    }catch(err){
        console.log(err)
        response(res, 500,{'message': 'Terjadi kesalahan yang tidak diketahui ketika proses login'})
    }
}