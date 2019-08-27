<template>
    <div class="card">
        <i class="el-icon-back back" @click="back"></i>
        <i class="el-icon-check done" @click="done"></i>
        <el-upload
                class="image"
                :action="this.$http.defaults.baseURL+'/main/api/user/posts/header'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="handleAvatarError"
                :headers=this.headers
                :before-upload="beforeAvatarUpload">
            <el-avatar :size="100" :src=info.image @error="errorHandler">
                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt=""/>
            </el-avatar>
        </el-upload>
        <el-form :model="info" ref="info" label-width="100px" class="form">
            <el-form-item label="用户名:" prop="userName">
                <el-input v-model="info.userName" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名:" prop="name" :rules="[ { required: true, message: '请输入姓名', trigger: 'blur' }]">
                <el-input v-model="info.name" placeholder="请输入姓名" ></el-input>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
                <el-select
                        value="男"
                        class="value"
                        v-model="info.sex"
                        placeholder="请选择性别">
                    <el-option
                            v-for="item in sexOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年龄:" prop="age">
                <el-input-number v-model="info.age" :min="1" :max="120"></el-input-number>
            </el-form-item>
            <el-form-item label="电话:" prop="phone"  :rules="[ { required: true, message: '请输入电话', trigger: 'blur' }]">
                <el-input v-model="info.phone" placeholder="请输入电话" ></el-input>
            </el-form-item>
            <el-form-item
                    prop="email"
                    label="邮箱:"
                    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]"
            >
                <el-input v-model="info.email"></el-input>
            </el-form-item>
            <el-form-item label="地址:" prop="address" :rules="[ { required: true, message: '请输入地址', trigger: 'blur' }]">
                <el-input v-model="info.address" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item label="创建时间:" prop="createTime">
                <el-input v-model="info.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="更新时间:" prop="date">
                <el-input v-model="info.updateTime" disabled></el-input>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "editInfo",
        data(){
            return {
                info: {
                    userName: "",
                    password: "",
                    name: "",
                    sex: "",
                    age: "",
                    phone: "",
                    email: "",
                    image: "",
                    address: "",
                    updateTime: "",
                    createTime: "",
                },
                sexOptions: ['男', '女'],
                headers:{

                }
            }
        },
        mounted() {
            this.info=this.$userStorage.fetch();
            this.info.image=this.$userStorage.fetchImg();
            const token = this.$userStorage.fetchToken();
            if (token) {
                this.headers.Authorization = `token ${token}`;
            }
        },
        methods: {
            back(){
                this.$router.back()
            },
            done(){
                let _this = this;
                _this.$http.put('/admin/api/user/editInfo', _this.info).then(res=>{
                    if (res.data.code!==0){
                        _this.$message.error(res.data.msg);
                        return;
                    }
                    _this.$message.success(res.data.msg);
                    _this.$router.replace({name:'info'});
                });
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleAvatarSuccess(res) {
                this.info.image = res.data;
                this.$userStorage.storeImg(res.data);
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
            }
        }
    }
</script>

<style scoped>
    .card{
        margin: 60px 10px 10px 10px;
        box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 0 20px 20px 20px;
    }
    .back{
        float:left;
        width: 25px;
        height: 25px;
        margin-top: 20px;
        margin-left: 5px;

    }
    .done {
        float:right;
        width: 25px;
        height: 25px;
        margin-top: 20px;
        margin-right: 5px;
    }
    .image{
        background-color: #fff;
        position: relative;
        top: -50px;
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
