<template>
    <div>
        <el-table
                :data="tableData"
                @sort-change="sortChange"
                style="width: 100%"
                :default-sort = "{prop: 'createTime', order: 'descending'}">
            <el-table-column
                    prop="createTime"
                    label="创建日期"
                    width="163"
                    sortable="custom"
                    :formatter="dateFormat">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="账号"
                    width="80"
                    sortable="custom">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="80"
                    sortable="custom">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    sortable="custom">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="margin-top: 10px"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="requestBody.currentPage"
                :page-sizes="[2, 5, 10, 50]"
                :page-size="requestBody.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "memberList",
        data() {
            return {
                tableData: [],
                requestBody:{
                    pageSize:10,
                    currentPage:1,
                    sortKey:'createTime',
                    sort:-1,
                },
                totalCount: 1,
                totalPage: 0,
            }
        },
        mounted() {
            this.request();
        },
        methods:{
            request(){
                this.$http.get('/main/api/user/list', {params:this.requestBody}).then(res=>{
                    if (res.data.code!==0){
                        this.$message.error(res.data.msg);
                        return;
                    }
                    this.tableData=res.data.data.data;
                    this.totalCount=res.data.data.page.totalCount;
                    this.totalPage=res.data.data.page.totalPage;
                });
            },
            sortChange(column){
                this.requestBody.sortKey=column.prop;
                this.requestBody.sort = (column.order === "ascending")?1:-1;
                this.currentPage = 1;
                this.request();
            },
            dateFormat(row, column, cellValue, index){
                return this.$time.getYMDHM(cellValue);
            },
            handleEdit(row) {
                this.$router.push({name:'memberEdit', params:{info:this.tableData[row]}});
            },
            handleDelete(index,row) {
                this.$http.post('/main/api/user/delete', {userName:row.userName}).then(res=>{
                    if (res.data.code!==0){
                        this.$message.error(res.data.msg);
                        return;
                    }
                    this.tableData.splice(index,1);
                });
            },
            handleSizeChange(val) {
                this.requestBody.pageSize=val;
                this.request();
            },
            handleCurrentChange(val) {
                this.requestBody.currentPage=val;
                this.request();
            }
        }
    }
</script>

<style scoped>

</style>
