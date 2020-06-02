<template>
    <div>
        <h2>人物信息删除</h2>
        <el-table
                border
                ref="singleTable"
                :data="persons"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%;height: 620px">
            <el-table-column
                    property="personID"
                    label="人员编号">
            </el-table-column>
            <el-table-column
                    property="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    property="birth"
                    label="出生年月">
            </el-table-column>
            <el-table-column
                    property="nat"
                    label="民族">
            </el-table-column>
            <el-table-column
                    property="address"
                    label="地址">
            </el-table-column>
            <el-table-column label="部门">
                <template slot-scope="scope">
                    {{scope.row.b_Dept}}-{{scope.row.s_Dept}}
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 0px">
            <el-pagination
                    style="text-align: center"
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    @current-change="page">
            </el-pagination>
        </div>

        <br><br>

        <div id="button">
            <el-button plain type="warning" @click="submitDelete">删除</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "delete",
        inject:['reload'],
        data() {
            return {
                total:null,
                pageSize:null,
                persons:[
                ],
                currentRow: null
            }
        },
        methods:{
            page(currentPage){
                const _this = this;
                _this.currentRow = null;
                axios.get('http://localhost:8181/person/query/'+currentPage+'/12').then(function (resp) {
                    _this.persons = resp.data.content;
                    _this.total = resp.data.totalElements;
                    _this.pageSize = 12;
                })
            },
            handleCurrentChange(val) {
                this.currentRow = val.personID;
            },
            submitDelete(){
                const _this = this;
                if (_this.currentRow == null)
                {
                    _this.$message('删除失败！,未选择删除信息');
                }
                else
                {
                    axios.delete("http://localhost:8181/person/deleteById/"+ _this.currentRow).then(function (resp) {
                        _this.$message('删除成功！');
                        _this.reload();
                    })
                }
            }
        },
        created() {
            const _this = this;
            axios.get('http://localhost:8181/person/query/1/12').then(function (resp) {
                _this.persons = resp.data.content;
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
    #button{
        margin-top: 50px;
        text-align: center;
    }
</style>