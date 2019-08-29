module.exports = app => {
    const WebUsers = require("../../models/WebUsers");
    const auth = require('../../mid/auth');

    const multer = require('multer');
    const upload = multer({
        dest: __dirname + '/../../images/',
    });

    app.get('/main/api/user/list', auth(),function (req, res) {
        let limit = 10;
        let currentPage=1;
        if (parseInt(req.query.pageSize) !== 0) limit=parseInt(req.query.pageSize);
        if (parseInt(req.query.currentPage) >= 0) currentPage=parseInt(req.query.currentPage);
        let skip = (currentPage-1)*limit;
        let sortKey=req.query.sortKey?req.query.sortKey:'createTime';
        let sort=req.query.sort?parseInt(req.query.sort):-1;
        let mySort;
        switch (sortKey) {
            case "createTime":
                mySort = {'createTime':sort};
                break;
            case "name":
                mySort = {'name':sort};
                break;
            case "address":
                mySort = {'address':sort};
                break;
            case "userName":
                mySort = {'userName':sort};
                break;
            default:
                mySort = {'createTime':sort};
                break;
        }
        WebUsers.find({},null,{skip:skip,limit:limit,sort:mySort}, function (err, result) {
            if (err){
                let resData={
                    code: 1,
                    msg: "查询失败"
                };
                res.send(resData);
                return;
            }
            WebUsers.count({}, function(err, count) {
                let resData={
                    code:0,
                    msg:"查询成功",
                    data:{
                        page:{
                            currentPage:currentPage,
                            pageSize: limit,
                            totalCount:count,
                            totalPage:Math.ceil(count/limit),
                        },
                        data:result,
                    }
                };
                res.send(resData);
            });
        });
    });

    app.post('/main/api/user/posts/web/header', auth(), upload.single('file'), function (req, res) {
        const file = req.file;
        const url = 'http://localhost:3000/images/'+file.filename;
        const resData = {
            code: 0,
            msg: "上传成功",
            data: url,
        };
        res.send(resData);
    });

    app.post('/main/api/user/create', auth(), function (req, res) {
        //const {userName,name, sex, age, phone, email, image, address}=req.body;
        let body = req.body;
        body['password']="666666";
        const time = new Date().getTime();
        body['updateTime'] = time;
        body['createTime'] = time;
        body['createBy'] = req.user.userName;
        WebUsers.create(body,function (err, u) {
            if (err){
                let resData = {
                    code: 1,
                    msg: "创建失败"
                };
                res.send(resData);
                return;
            }
            let resData = {
                code: 0,
                msg: "创建成功"
            };
            res.send(resData);
        });
    });

    app.post('/main/api/user/modify', auth(), function (req, res) {
        let body = {
            updateTime:new Date().getTime(),
            updateBy:req.user.userName,
            name: req.body.name,
            age:req.body.age,
            sex:req.body.sex,
            phone:req.body.phone,
            email:req.body.email,
            address:req.body.address,
        };
        WebUsers.updateOne({userName:req.body.userName},body,function (err, u) {
            if (err){
                let resData = {
                    code: 1,
                    msg: "更新失败"
                };
                res.send(resData);
                return;
            }
            let resData = {
                code: 0,
                msg: "更新成功"
            };
            res.send(resData);
        });
    });
    app.post('/main/api/user/delete', auth(), function (req, res) {
        WebUsers.deleteOne({userName:req.body.userName}, function (err) {
            if (err){
                let resData = {
                    code: 1,
                    msg: "删除失败"
                };
                res.send(resData);
                return;
            }
            let resData = {
                code: 0,
                msg: "删除成功"
            };
            res.send(resData);
        });
    });
};
