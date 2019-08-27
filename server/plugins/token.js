const fs = require('fs');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');
class Token {
    constructor(data) {
        this.data = data;
    }

    //生成token
    generateToken() {
        let data = this.data;
        let created = Math.floor(Date.now() / 1000);  //10*24*60*60*1000;
        let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_private_key.pem'));//私钥 可以自己生成
        let token = jsonwebtoken.sign({
            data,
            exp: created + 60 * 30,
        }, cert, {algorithm: 'RS256'});
        return token;
    }

    // 校验token
    verifyToken() {
        let token = this.data;
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_public_key.pem'));//公钥 可以自己生成
        let res = 'err';
        try {
            let result = jsonwebtoken.verify(token, cert, {algorithms: ['RS256']}) || {};
            let {exp = 0} = result;
            if (created <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
    }
}

module.exports = Token;
