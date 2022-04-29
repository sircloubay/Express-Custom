const bcrypt = require('bcrypt')
const asyncQuery = require('../../helper/asyncQuery')
const returnMessage = require('../../helper/returnMessage')

module.exports = async ({ email, password }) => {
    try {
        // QUERY TO KNOW DATA USER EXIST OR NAH 
        const users = await asyncQuery('SELECT * FROM account WHERE email = ?', [email])

        // IF DATA USER NOT FOUND
        if (users.length === 0) {
            return returnMessage(404, 'Tidak dapat menemukan akun dengan email tersebut')
        }

        // COMPARE PASSWORD
        const user = users[0]
        const match = await bcrypt.compare(password, user.password)

        // CHECK PASSWORD IS SAME OR NAH
        if (match) {
            return { status: 200, messages: 'Login sukses', data: { user_id: user.id } }
        } else {
            return returnMessage(400, 'Password tidak cocok dengan email tersebut')
        }

    } catch (error) {
        // ERRORR
        console.error(error)
        return returnMessage(500, 'Terjadi Kesalahan saat proses login')
    }
}