module.exports = options => {
    const AdminUsers = require("../models/AdminUsers");
    const assert = require('http-assert');
    const Token = require('../plugins/token');
    return async (req, res, next) => {
        let token = req.get("Authorization");
        assert(token, 401, '需要登录');
        token = token.toString().split(' ').pop();
        let user = new Token(token).verifyToken();
        assert(user!=='err', 401, '验证失败,请先登录');
        console.log(user._id);
         AdminUsers.findOne({_id:user._id}, function (err, u) {
             assert(u, 401, '验证失败,请先登录');
             assert(u.lastLoginDate, 401, '验证失败,请先登录');
             assert(user.lastLoginDate, 401, '验证失败,请先登录');
             console.log(u);
             console.log(user);
             assert(u.lastLoginDate === user.lastLoginDate, 401, '验证失败,请先登录');
             req.user = u;
             next();
         });
    }
};
