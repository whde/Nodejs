<template>
    <el-container id="bg" style="margin:0; pandding:0;">
        <el-form :model="form" ref="form" :rules="rules" label-width="90px" id="form">
            <el-form-item label="用户名" prop="userName">
                <el-input
                        v-model="form.userName"
                        placeholder="请输入用户名"
                        minlength="6"
                        maxlength="16"
                        show-word-limit
                        clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                        v-model="form.password"
                        placeholder="请输入密码"
                        show-password
                        show-word-limit
                        clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="again">
                <el-input
                        v-model="form.again"
                        placeholder="请输入密码"
                        show-password
                        show-word-limit
                        clearable
                ></el-input>
            </el-form-item>
            <el-button id="cancel" round @click="back()">取消</el-button>
            <el-button id="submit" type="primary" round @click="onSubmit('form')">注册</el-button>
        </el-form>
    </el-container>
</template>

<script>
    export default {

        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                form: {
                    userName: "Whde1234",
                    password: "Whde123456",
                    again: "Whde123456"
                },
                rules: {
                    userName: [
                        { required: true, message: "请输入用户名", trigger: "blur" },
                        { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                        { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
                    ],
                    again:[
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ]
                }
            };
        },
        methods:{
            onSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.register();
                    } else {
                        return false;
                    }
                });
            },
            register() {
                let _this = this;
                _this.$http.post("/admin/api/register", _this.form).then(res => {
                    if (res.data.code == 0) {
                        _this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                        _this.$userStorage.store(res.data.data);
                        _this.$router.back();
                    } else {
                        _this.$message.error(res.data.msg);
                    }
                });
            },
            back(){
                this.$router.back();
            }
        }
    }
</script>

<style scoped>
    #bg {
        height: 100%;
        background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566476263848&di=eddf72704ce6920924385a39bd97b08c&imgtype=0&src=http%3A%2F%2Fimg.findlawimg.com%2Finfo%2F2018%2F1207%2F20181207085713881.jpg");
        background-size: 100%;
        background-repeat: repeat-y;
    }
    #form {
        box-shadow: 0 0 1000px 1000px rgba(0, 0, 0, 0.3);
        width: 400px;
        background-color: #fff;
        margin: auto;
        padding: 20px 20px 20px 0px;
        border-radius: 8px;
    }
    #submit {
        margin: 0 5%;
        width: 60%;
    }
    #cancel{
        margin: 0 5%;
        width: 20%;
    }
</style>
