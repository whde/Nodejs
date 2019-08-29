<template>
    <el-form :model="info" ref="info" label-width="100px" class="form">
        <el-form-item>
            <el-upload
                    class="image"
                    :action="this.$http.defaults.baseURL+'/main/api/user/posts/web/header'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleAvatarError"
                    v-bind:headers=this.headers
                    :before-upload="beforeAvatarUpload">
                <el-avatar :size="100" v-bind:src=info.image @error="errorHandler">
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt=""/>
                </el-avatar>
            </el-upload>
        </el-form-item>
        <el-form-item label="用户名:" prop="userName" :rules="[ { required: true, message: '请输入用户名', trigger: 'blur' },{ min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }]">
            <el-input v-model="info.userName" v-bind:disabled="this.edit"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="name" :rules="[ { required: true, message: '请输入姓名', trigger: 'blur' }]">
            <el-input v-model="info.name" placeholder="请输入姓名" ></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
            <template>
                <el-radio v-model="info.sex" label="男">男</el-radio>
                <el-radio v-model="info.sex" label="女">女</el-radio>
            </template>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
            <el-input-number v-model="info.age" :min="1" :max="120"></el-input-number>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
            <el-input v-model="info.phone" placeholder="请输入电话" ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱:" :rules="emailRules">
            <el-input v-model="info.email"></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="address">
            <el-input v-model="info.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item size="large">
            <span v-if="edit">
                <el-button type="primary" @click="onModify">提交修改</el-button>
            </span>
            <span v-else>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </span>
            <el-button style="margin-left: 20px">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "memberEdit",
        data(){
            return{
                edit:false,
                info: {
                    userName: "",
                    name: "",
                    sex: "男",
                    age: 25,
                    phone: "",
                    email: "",
                    image: "",
                    address: "",
                },
                emailRules:[
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                headers:{

                }
            }
        },
        mounted(){
            const token = this.$userStorage.fetchToken();
            if (token) {
                this.headers.Authorization = `token ${token}`;
            }
            if (this.$router.currentRoute.params){
                this.edit = true;
                this.info = this.$router.currentRoute.params.info;
            }
        },
        methods:{
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleAvatarSuccess(res) {
                this.info.image = res.data;
            },
            handleAvatarError(res){
                if (res.toString().indexOf("验证失败") !== -1) {
                    this.$message.error('验证失败,请先登录');
                    this.$userStorage.removeAll();
                    this.$router.replace({
                        path: '/login',
                        query: {redirect: this.$router.currentRoute.fullPath}
                    });
                }
            },
            errorHandler() {
                return true
            },
            onSubmit(){
                if (this.info.userName.length<6||this.info.userName.length>16) {
                    this.$message.error('用户名长度不符合规范');
                    return;
                }
                if (this.info.name.length===0){
                    this.$message.error('姓名不能为空');
                    return;
                }
                this.$http.post('/main/api/user/create', this.info).then(res=>{
                    if (res.data.code!==0){
                        this.$message.error(res.data.msg);
                        return;
                    }
                    this.$message.success(res.data.msg);
                    this.$router.replace({name:'memberList'});
                });
            },
            onModify(){
                if (this.info.name.length===0){
                    this.$message.error('姓名不能为空');
                    return;
                }
                this.$http.post('/main/api/user/modify', this.info).then(res=>{
                    if (res.data.code!==0){
                        this.$message.error(res.data.msg);
                        return;
                    }
                    this.$message.success(res.data.msg);
                    this.$router.back();
                });

            }
        }
    }
</script>

<style scoped>
    .form{
        margin: 60px 10px 10px 10px;
        box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 20px;
    }
    .image{
        background-color: #fff;
        position: relative;
        width: 100px;
        height: 100px;
        border-color: #ffffff;
        border-radius: 50px;
        border-style: solid;
        border-width: 2px;
        box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
        margin: auto;
    }
</style>
