<template>
    <div>
        <h2>劳资历史查询</h2>

        <el-table
                :data="histrjn"
                border
                style="width: 100%;height: 620px">
            <el-table-column
                    prop="jourNo"
                    label="流水号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="人员姓名">
            </el-table-column>
            <el-table-column
                    prop="oldInfo"
                    label="原薪水">
            </el-table-column>
            <el-table-column
                    prop="newInfo"
                    label="新薪水">
            </el-table-column>
            <el-table-column
                    prop="chgTime"
                    label="变更次数">
            </el-table-column>
            <el-table-column
                    prop="regDate"
                    label="变更日期">
            </el-table-column>
        </el-table>

        <el-pagination
                style="text-align: center"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "queryLaborHistory",
        data(){
            return{
                total:null,
                pageSize:null,
                histrjn:null,
            }
        },
        methods:{
            page(currentPage){
                const _this = this;
                axios.get('http://localhost:8181/transfer/salaryhistoryquery/'+currentPage+'/12').then(function (resp) {
                    _this.histrjn = resp.data.content;
                    _this.total = resp.data.totalElements;
                    _this.pageSize = 12;
                })
            }
        },
        created() {
            const _this = this;
            axios.get('http://localhost:8181/transfer/salaryhistoryquery/1/12').then(function (resp) {
                _this.histrjn = resp.data.content;
                _this.total = resp.data.totalElements;
                _this.pageSize = 12;
            })
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
    }
</style>