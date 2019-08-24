module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const AdminUsers = require("../../models/AdminUsers");
  router.post("/login", function(req, res) {
    AdminUsers.findOne(req.body, function(err, user) {
      if (!user) {
        let resData = {
          code: 1,
          msg: "账号密码错误"
        };
        res.send(resData);
        // return handleError(err);
      } else {
        console.log(user);
        let resData = {
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
  router.post('/register', function(req, res){

    // AdminUsers.deleteMany({userName:req.body.userName}, function (err, user) {
    //   AdminUsers.find({userName:req.body.userName}, function (err, user) {
    //     console.log(user);
    //   });
    // });
    // return;

    AdminUsers.findOne({userName:req.body.userName}, function(err, user){
      if (user) {
        let resData = {
          code: 2,
          msg: "账号已被注册"
        };
        res.send(resData);
        return;
      }
      let adminUsers = AdminUsers(req.body);
      console.log(req.body);
      adminUsers.save(function(err, adminUsers) {
        console.log(err);
        if (err) {
          let resData = {
            code: 1,
            msg: "账号注册失败"
          };
          res.send(resData);
        } else {
          // saved!
          console.log('adminUsers saved!');
          let resData = {
            code: 0,
            msg: "注册成功",
            data: {}
          };
          res.send(resData);
        }
      });
    });
  });
  app.use("/admin/api", router);
};
