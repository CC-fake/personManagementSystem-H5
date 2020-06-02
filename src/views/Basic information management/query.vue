<template>
    <div>
        <h2>人员信息查询</h2>

        <el-table
                :data="persons"
                border
                style="width: 100%;height: 620px">
            <el-table-column
                    prop="personID"
                    label="人员编号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="birth"
                    label="出生年月">
            </el-table-column>
            <el-table-column
                    prop="nat"
                    label="民族">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    label="部门">
                    <template slot-scope="scope">
                        {{scope.row.b_Dept}}-{{scope.row.s_Dept}}
                    </template>
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
        name: "query",
        data(){
            return{
                total:null,
                pageSize:null,
                persons:[

                ]
            }
        },
        methods:{
          page(currentPage){
              const _this = this;
              axios.get('http://localhost:8181/person/query/'+currentPage+'/12').then(function (resp) {
                  _this.persons = resp.data.content;
                  _this.total = resp.data.totalElements;
                  _this.pageSize = 12;
              })
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

</style>