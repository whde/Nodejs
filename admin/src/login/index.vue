
<template>
  <el-container id="bg" style="margin:0; pandding:0;">
    <el-form :model="form" ref="form" :rules="rules" label-width="80px" id="form">
      <img
        src="https://github.com/whde/Alert/blob/master/AlertDemo/AlertDemo/Assets.xcassets/AppIcon.appiconset/Icon-60.0@3x.png?raw=true"
        alt
        class="header"
      />
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
      <router-link to="/register" class="register">注册</router-link>
      <el-button id="submit" type="primary" round @click="onSubmit('form')">登录</el-button>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "Whde1234",
        password: "Whde123456"
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.onLogin();
        } else {
          return false;
        }
      });
    },
    onLogin() {
      let _this = this;
      _this.$http.post("/admin/api/login", _this.form).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          _this.$message({
            message: res.data.msg,
            type: "success"
          });
          _this.$userStorage.store(res.data.data);
          _this.$router.push({name:"main"});
        } else {
          _this.$message.error(res.data.msg);
        }
      });
    }
  }
};
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
.header {
  background-color: #fff;
  position: relative;
  top: -50px;
  left: 150px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-color: #ffffff;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
}
.register{
  float:right;
  color: #42b983;
}
#submit {
  margin: 0 15%;
  width: 70%;
}
</style>
