<template>
<el-container style="height: 100%; margin:0; pandding:0;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1']" unique-opened :default-active="this.$router.history.current.path">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="/main/memberList">用户列表</el-menu-item>
          <el-menu-item index="/main/memberEdit">新增/编辑</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>笑话管理</template>
        <el-menu-item-group>
          <el-menu-item index="/joke/list">笑话列表</el-menu-item>
          <el-menu-item index="/joke/create">新增笑话</el-menu-item>
          <el-menu-item index="/joke/spider">抓取笑话</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>古诗文管理</template>
        <el-menu-item-group>
          <el-menu-item index="/poet/author">作者列表</el-menu-item>
          <el-menu-item index="/poet/list">诗文列表</el-menu-item>
          <el-menu-item index="/poet/spider">抓取古诗文</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-message"></i>电影管理</template>
        <el-menu-item-group>
          <el-menu-item index="/movie/category">电影分类</el-menu-item>
          <el-menu-item index="/movie/spider">抓取电影</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-message"></i>留言管理</template>
        <el-menu-item-group>
          <el-menu-item index="/main/memberList">留言列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>

  <el-container>
    <el-header height="40px" style="text-align: right; font-size: 12px; alignment-baseline: center">
      <el-dropdown @command="handleCommand">
        <div style="display: flex;flex-direction: row;align-items: center">
          <span>{{this.name}}&nbsp</span>
          <el-avatar class="avatar" size="small" :src=this.image @error="errorHandler">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt=""/>
          </el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <router-view :key="this.$router.history.current.path">
      </router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>

export default {
  data(){
    return {
      name:'',
      image:'',
    }
  },
  mounted(){
    let info = this.$userStorage.fetch();
    if (info.name) this.name=info.name;
    else this.name=info.userName;
    this.image=this.$userStorage.fetchImg();
    let path = this.$router.history.current.path;
    if (path==="/main/"||path==='/main'){
      this.$router.push({name:'memberList'});
    }
  },
  methods:{
    handleCommand(command){
      if (command==='logout'){
        this.logout();
      } else if (command==='info'){
        this.$router.push({name:"info"});
      }
    },
    logout(){
      this.$userStorage.removeAll();
      this.$router.replace({name:"login"});
    },
    errorHandler(){
      return true;
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #BBFFFF;
    color: #ffffff;
    line-height: 40px;
  }
  .el-aside {
    color: #333;
  }
  .avatar{
    /*margin-top: 5px;*/
  }
</style>
