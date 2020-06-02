<template>
    <div>
        <h2>部门管理</h2>
        <el-table
                border
                ref="singleTable"
                :data="depts"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%;height: 620px">
            <el-table-column
                    property="deptID"
                    label="部门编号">
            </el-table-column>
            <el-table-column
                    property="b_Dept"
                    label="一级部门">
            </el-table-column>
            <el-table-column
                    property="s_Dept"
                    label="二级部门">
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

        <el-form :model="currentDept" :rules="rules" ref="currentDept" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="5" :offset="2">
                    <el-form-item label="编号" prop="deptID">
                        <el-input v-model="currentDept.deptID" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="一级部门" prop="b_Dept">
                        <el-input v-model="currentDept.b_Dept"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="二级部门" prop="s_Dept">
                        <el-input v-model="currentDept.s_Dept"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row style="margin-top: 40px">
                <el-col :span="3" :offset="7">
                    <el-button plain @click="newId()">获取新编号</el-button>
                </el-col>
                <el-col :span="2" >
                    <el-button plain @click="add('currentDept')" :disabled="addFlag">增加</el-button>
                </el-col>
                <el-col :span="2" >
                    <el-button plain @click="modify('currentDept')" :disabled="modifyFlag">修改</el-button>
                </el-col>
                <el-col :span="2" >
                    <el-button plain @click="deleteById" :disabled="modifyFlag">删除</el-button>
                </el-col>
                <el-col :span="2" >
                    <el-button plain @click="reset()">清空</el-button>
                </el-col>
            </el-row>
        </el-form>





    </div>
</template>

<script>
    export default {
        name: "departmentManagement",
        inject:['reload'],
        data() {
            return {
                total:null,
                pageSize:null,
                addFlag:true, //增加按钮是否被禁止
                modifyFlag:true,//修改和删除按钮是否被禁止
                currentDept:{
                    deptID:'',
                    s_Dept:'',
                    b_Dept:'',
                },
                depts:[{}

                ],
                rules: {
                    b_Dept: [
                        { required: true, message: '请输入一级部门', trigger: 'blur' }
                    ],
                    s_Dept:[
                        {required: true,message: '请输入二级部门',trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            page(currentPage){
                const _this = this;
                axios.get('http://localhost:8181/dept/query/'+currentPage+'/12').then(function (resp) {
                    _this.depts = resp.data.content;
                    _this.total = resp.data.totalElements;
                    _this.pageSize = 12;
                })
            },
            handleCurrentChange(val) {
                if (val != null)
                {
                    this.currentDept.deptID = val.deptID;
                    this.currentDept.b_Dept = val.b_Dept;
                    this.currentDept.s_Dept = val.s_Dept;
                    this.addFlag = true;
                    this.modifyFlag = false;
                }
            },
            newId(row){
                const _this = this;
                    axios.get("http://localhost:8181/dept/query/findMax").then(function (resp) {
                        _this.currentDept = {
                            deptID:'',
                            s_Dept:'',
                            b_Dept:'',
                        };
                        _this.currentDept.deptID = resp.data + 1;
                        _this.addFlag = false;
                        _this.modifyFlag = true;
                    })
                this.$refs.singleTable.setCurrentRow(row);
            },
            add(formName){
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post("http://localhost:8181/dept/add",this.currentDept).then(function (resp) {
                            if (resp.data == 'success')
                            {
                                _this.$message('增加成功！');
                                _this.reload();
                            }
                            else
                            {
                                _this.$message('增加失败!!');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            modify(formName)
            {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put("http://localhost:8181/dept/update",this.currentDept).then(function (resp) {
                            if (resp.data == 'success')
                            {
                                _this.$message('修改成功！');
                                _this.reload();
                            }
                            else
                            {
                                _this.$message('修改失败!!');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            deleteById()
            {
                const _this = this;
                axios.delete("http://localhost:8181/dept/deleteById/" + _this.currentDept.deptID).then(function (resp) {
                    _this.$message('删除成功');
                    _this.reload();
                })
            },
            reset(row)
            {
                this.$refs.singleTable.setCurrentRow(row);
                this.currentDept.deptID = '';
                this.currentDept.b_Dept = '';
                this.currentDept.s_Dept = '';
                this.addFlag = true;
                this.modifyFlag = true;
            }
        },
        created() {
            const _this = this;
            axios.get('http://localhost:8181/dept/query/1/12').then(function (resp) {
                _this.depts = resp.data.content;
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