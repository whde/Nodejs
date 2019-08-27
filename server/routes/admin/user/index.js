module.exports = app => {

  const router = require("express").Router();
  const AdminUsers = require("../../../models/AdminUsers");
  const assert = require('http-assert');
  const Token = require('../../../plugins/token');
  const auth = require('../../../mid/auth');




  app.use("/admin/api", router);

  app.get('/admin/api/login/image', function (req, res) {
    AdminUsers.findOne(req.query, function(err, user) {
      console.log(user);
      if (!user || !user.image) {
        let resData = {
          code: 1,
          msg: "拉取失败"
        };
        res.send(resData);
      } else {
        let resData = {
          code: 0,
          msg: "拉取成功",
          data:user.image,
        };
        res.send(resData);
      }
    });
  });

  app.post("/admin/api/login",  function(req, res) {
    AdminUsers.findOne(req.body, function(err, user) {
      if (!user) {
        let resData = {
          code: 1,
          msg: "账号密码错误"
        };
        res.send(resData);
      } else {
        let date = Date.now();
        AdminUsers.updateOne({_id:user._id},{lastLoginDate:date}, function (err) {
          assert(!err,500, '登录失败，请重试！');
          let userParam = {
            _id: user._id,
            userName: user.userName,
            name: user.name,
            password: user.password,
            lastLoginDate:date,
          };
          userParam['token']=new Token(userParam).generateToken();
          userParam['image']=user.image;
          delete userParam.password;
          delete userParam.lastLoginDate;
          let resData = {
            code: 0,
            msg: "登录成功",
            data: userParam,
          };
          res.send(resData);
        });
      }
    });
  });
  app.post('/admin/api/register', function(req, res){

    // AdminUsers.deleteMany({userName:req.body.userName}, function (err, user) {
    //   AdminUsers.find({userName:req.body.userName}, function (err, user) {
    //     console.log(user);
    //   });
    // });

    AdminUsers.findOne({userName:req.body.userName}, function(err, user){
      if (user) {
        let resData = {
          code: 2,
          msg: "账号已被注册"
        };
        res.send(resData);
        return;
      }
      let now = Date.now();
      let param = req.body;
      param.createTime = now;
      param.updateTime = now;
      param.image = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
      let adminUsers = AdminUsers(param);
      adminUsers.save(function(err) {
        console.log(err);
        if (err) {
          let resData = {
            code: 1,
            msg: "账号注册失败",
          };
          res.send(resData);
        } else {
          // saved!
          console.log('adminUsers saved!');
          let resData = {
            code: 0,
            msg: "注册成功",
          };
          res.send(resData);
        }
      });
    });
  });


  app.get('/admin/api/user/info', auth(), function (req, res) {
    AdminUsers.findById(req.user._id, function (err, u) {
      if (err){
        let resData = {
          code: 1,
          msg: "用户信息拉取失败",
        };
        res.send(resData);
      } else {
        let data = u;
        delete data.password;
        delete data.lastLoginDate;
        let resData = {
          code: 0,
          msg: "用户信息拉取成功",
          data: data,
        };
        res.send(resData);
      }
    })
  });

  app.put('/admin/api/user/editInfo', auth(), function(req, res){
    let user = req.user;
    let body = req.body;
    let param = {
      name: body.name,
      sex: body.sex,
      age: body.age,
      phone: body.phone,
      email: body.email,
      address: body.address,
      updateTime: Date.now(),
    };
    AdminUsers.updateOne({_id:user._id}, param, function (err, u) {
        if (err){
          let resData = {
            code: 1,
            msg: "更新失败",
          };
          res.send(resData);
        } else {
          let data = u;
          delete data.password;
          delete data.lastLoginDate;
          let resData = {
            code: 0,
            msg: "更新成功",
            data: data,
          };
          res.send(resData);
        }
    });
  });
  const multer = require('multer');
  const upload = multer({
    dest: __dirname + '/../../../images/',
  });


  app.post('/main/api/user/posts/header', auth(), upload.single('file'), function (req, res) {
    const file = req.file;
    const url = 'http://localhost:3000/images/'+file.filename;
    AdminUsers.updateOne({_id:req.user._id}, {image:url},function (err, u) {

    });
    const resData = {
      code: 0,
      msg: "更新成功",
      data: url,
    };
    res.send(resData);
  });
};
