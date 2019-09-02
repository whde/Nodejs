<template>
    <div style="height: 100%">
        <el-button type="primary" @click="spider" round style="margin: auto;">
            开始爬取
        </el-button>
    </div>
</template>

<script>
    export default {
        name: "spider",
        methods:{
            spider(){
                this.$http.post('/main/api/joke/spider').then(res=>{
                   if (res.data.code===0){
                       this.$message.success(res.data.msg);
                   } else {
                       this.$message.error(res.data.msg);
                   }
                });
            }
        }
    }
</script>

<style scoped>

</style>
