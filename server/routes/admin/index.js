module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const AdminUsers = require("../../models/AdminUsers");
  router.post("/login", function(req, res) {
    // var adminUsers = AdminUsers(req.body);
    // console.log(adminUsers);
    // adminUsers.save(function(err, adminUsers) {
    //     console.log(err);
    //   if (err) {
    //     console.log('adminUsers err!');
    //     return handleError(err);
    //   } else {
    //     // saved!
    //     console.log('adminUsers saved!');
    //     res.send(adminUsers);
    //   }
    // });
    AdminUsers.findOne(req.body, function(err, user) {
      if (!user) {
        var resData = {
          code: 1,
          msg: "账号密码错误"
        };
        res.send(resData);
        // return handleError(err);
      } else {
        console.log(user);
        var resData = {
          code: 0,
          msg: "登录成功",
          data: {
            id: user._id,
            userName: user.userName,
            password: user.password
          }
        };
        res.send(resData);
      }
    });
  });
  app.use("/admin/api", router);
};
