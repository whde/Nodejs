const mongoose = require("mongoose");
const schema = mongoose.Schema({
    userName: { type: String },
    password: { type: String },
    name: { type: String },
    sex: { type: String },
    age: { type: String },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
    address: { type: String },
    updateTime: { type: String },
    createTime:{type:String},
    lastLoginDate:{type:Number},
    createBy:{type:String},
    updateBy:{type:String},
});

module.exports = mongoose.model('WebUsers',schema)
