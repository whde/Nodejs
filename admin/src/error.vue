
<template>
  <div class="error">
<!--    <span class="aaa">404<br/></span>-->
<!--    <span class="bbb">页面不存在</span>-->
<!--    <p class="bbb">对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>-->
<!--    <p class="paddingbox">请点击以下链接继续浏览网页</p>-->
<!--    <p><a style="cursor:pointer" οnclick="history.back()">返回上一页面</a></p>-->
<!--    <p><a href="/">返回网站首页</a></p>-->
    <span class="aaa">404</span><br />
    <span class="bbb">对不起，您请求的页面不存在、或已被删除、或暂时不可用</span><br />
    <span class="ccc">请点击以下链接继续浏览网页</span><br />
    <span> >> <router-link to="/">返回网站首页</router-link></span>
  </div>
</template>
<script>
  export default {};
</script>
<style scoped>
  .error {
    text-align: center;
    align-items: center;
    height: 100%;
    background: coral;
  }
  .aaa {
    font-size: 100px;
    color: white;
  }
  .bbb{
    font-size: 26px;
    color: white;
  }
  .ccc{
    font-size: 20px;
    color: white;
  }
  </style>
