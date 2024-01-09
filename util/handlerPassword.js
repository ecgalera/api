const bcrypt = require("bcrypt")

const saltRounds =10;

//  función que hace el hash
const hashPassword = async (password) =>{
    return await bcrypt.hash(password, saltRounds)
};

// función que compara y des hash
const checkPassword = async (password, hashPassword) =>{
    return bcrypt.compare(password, hashPassword)
}

module.exports = {
    hashPassword,
    checkPassword
}