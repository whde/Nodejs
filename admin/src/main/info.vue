<template>
    <div class="card">
        <i class="el-icon-edit-outline edit" @click="editInfo"></i>
        <div class="image">
            <el-avatar :size="100" :src=this.info.image @error="errorHandler">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
            </el-avatar>
        </div>
        <el-row class="item">
            <div class="name">用户名:</div>
            <span class="value">{{this.info.userName}}</span>
        </el-row>
        <el-row class="item">
            <div class="name">姓名:</div>
            <span class="value">{{this.info.name}}</span>
        </el-row>
        <el-row class="item">
            <div class="name">性别:</div>
            <span class="value">{{this.info.sex}}</span>
        </el-row>
        <el-row class="item">
            <div class="name">年龄:</div>
            <span class="value">{{this.info.age}}</span>
        </el-row>
        <el-row class="item">
            <div class="name">电话:</div>
            <span class="value">{{this.info.phone}}</span>
        </el-row>
        <el-row class="item">
            <div class="name">邮箱:</div>
            <span class="value">{{this.info.email}}</span>
        </el-row>
        <el-row class="item">
            <div class="name">地址:</div>
            <span class="value">{{this.info.address}}</span>
        </el-row>
        <el-row class="item">
            <div class="name">创建时间:</div>
            <span class="value">{{this.info.createTime}}</span>
        </el-row>
        <el-row class="item">
            <div class="name">更新时间:</div>
            <span class="value">{{this.info.updateTime}}</span>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "info.vue",
        data(){
            return {
                info:{
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
                }
            }
        },
        mounted() {
            let _this = this;
            _this.$http.get('/admin/api/user/info').then(res=>{
                if (res.data.code!==0){
                    _this.info=_this.$userStorage.fetch();
                    return;
                }
                _this.info = res.data.data;
                _this.$userStorage.store(_this.info);
            });

        },
        methods: {
            editInfo(){
                this.$router.push({name:'editInfo'})
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
    }
    .edit {
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
    .item{
        display: flex;
        height: 50px;
    }
    .name{
        margin-left: 30px;
        width: 100px;
        text-align: right;
    }
    .value{
        margin-left: 20px;
    }
</style>
