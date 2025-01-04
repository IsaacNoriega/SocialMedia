const crypto = require('crypto');

export default function(pwd : String){
    pwd = pwd ?? '' // verifica la existencia de la password
    const hashedPwd = crypto.scryptSync(pwd , 'secretKey' , 24); // Hash de la contraseña
    return hashedPwd.toString('hex');
}