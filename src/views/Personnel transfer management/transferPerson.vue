<template>
    <div>
        <h2>人员调动</h2>
        <el-table
                border
                ref="singleTable"
                :data="persons"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%;height: 620px">
            <el-table-column
                    property="personID"
                    label="工号">
            </el-table-column>
            <el-table-column
                    property="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    property="sex"
                    label="性别">
            </el-table-column>
            <el-table-column
                    label="部门">
                <template slot-scope="scope">
                    {{scope.row.b_Dept}}-{{scope.row.s_Dept}}
                </template>
            </el-table-column>
            <el-table-column
                    property="salary"
                    label="薪酬">
            </el-table-column>
            <el-table-column
                    property="assess"
                    label="考核信息">
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

        <el-form :model="currentPerson"  ref="currentPerson" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="5" :offset="2">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="currentPerson.name" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="原部门" prop="dept">
                        <el-input v-model="oldDeptInfo" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="新部门" prop="deptID">
                        <el-select value-key="deptID" v-model="currentDept" placeholder="请选择部门" @change="changeDept()" :disabled="selectFlag">
                            <el-option
                                    v-for="item in deptData" v-if="item.deptID != currentPerson.deptID"
                                    :label="item.deptID + '-'+ item.b_Dept + '-' + item.s_Dept"
                                    :key="item.deptID"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row style="margin-top: 40px">
                <el-col :span="2" :offset="9">
                    <el-button plain @click="add('currentPerson')" :disabled="addFlag">调入新部门</el-button>
                </el-col>
                <el-col :span="2" :offset="2">
                    <el-button plain @click="reset()">清空信息</el-button>
                </el-col>
            </el-row>
        </el-form>


    </div>
</template>

<script>
    export default {
        name: "transferPerson",
        inject:['reload'],
        data() {
            return {
                total:null,
                pageSize:null,
                addFlag:true, //增加按钮是否被禁止
                selectFlag:true,
                currentDept:null,
                oldDeptInfo:'',
                transferTimes:'',
                currentPerson:{
                    personID:0,
                    name:'',
                    sex:'',
                    salary:'',
                    assess:'',
                    nat:'',
                    address:'',
                    birth:'',
                    deptID:'',
                    other:''
                },
                newHistrjn:{
                    jourNo:'',
                    fromAcc:'',
                    oldInfo:'',
                    newInfo:'',
                    chgTime:'',
                    regDate:'',
                    personID:''
                },
                persons:[{}

                ],
                deptData:[{}]
            }
        },
        methods:{
            page(currentPage){
                const _this = this;
                axios.get('http://localhost:8181/transfer/person/'+currentPage+'/12').then(function (resp) {
                    _this.persons = resp.data.content;
                    _this.total = resp.data.totalElements;
                    _this.pageSize = 12;
                })
            },
            handleCurrentChange(val) {
                if (val != null)
                {
                    this.currentPerson.deptID = val.deptID;
                    this.currentPerson.personID = val.personID;
                    this.currentPerson.name = val.name;
                    this.currentPerson.sex = val.sex;
                    this.currentPerson.address = val.address;
                    this.currentPerson.nat = val.nat;
                    this.currentPerson.assess = val.assess;
                    this.currentPerson.birth = val.birth;
                    this.currentPerson.salary = val.salary;
                    this.currentPerson.other = val.other;
                    this.oldDeptInfo = val.b_Dept + '-' + val.s_Dept;
                    this.currentDept = null;
                    this.addFlag = true;
                    this.selectFlag = false;
                }
            },
            add(formName){
                const _this = this;
                this.currentPerson.deptID = this.currentDept.deptID;    //不在选择部门的时候修改这样不会出现已在部门的选项
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put("http://localhost:8181/transfer/excuteTransfer",_this.currentPerson).then(function (resp) {

                        })

                        axios.post("http://localhost:8181/transfer/addTransferHistory",_this.newHistrjn).then(function (resp) {
                            if (resp.data == "success")
                            {
                                _this.$message("调动成功！");
                                _this.reload();
                            }
                            else
                            {
                                _this.$message("调动失败！");
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            changeDept()
            {
                const _this = this;
                this.addFlag = false;
                var aDate = new Date();
                this.newHistrjn.fromAcc = 0;
                this.newHistrjn.oldInfo = this.oldDeptInfo;
                this.newHistrjn.newInfo = this.currentDept.b_Dept + '-' + this.currentDept.s_Dept;
                this.newHistrjn.regDate = aDate.getFullYear() + '-' + (aDate.getMonth() + 1) + '-' +
                    aDate.getDate() +" " + aDate.getHours() + ':' + aDate.getMinutes() + ':' + aDate.getSeconds();
                this.newHistrjn.personID = this.currentPerson.personID;
                axios.get("http://localhost:8181/transfer/frequency/"+_this.currentPerson.name+"/0").then(function (resp) {
                    _this.newHistrjn.chgTime = resp.data + 1;
                })
            },
            reset(row)
            {
                this.$refs.singleTable.setCurrentRow(row);
                this.currentPerson.deptID = '';
                this.currentPerson.personID = '';
                this.currentPerson.name = '';
                this.currentPerson.sex = '';
                this.currentPerson.address = '';
                this.currentPerson.nat = '';
                this.currentPerson.assess = '';
                this.currentPerson.birth = '';
                this.currentPerson.salary = '';
                this.currentPerson.other = '';
                this.oldDeptInfo = '';
                this.currentDept = null;
                this.addFlag = true;
                this.selectFlag = true;
            }
        },
        created() {
            const _this = this;
            axios.get('http://localhost:8181/transfer/person/1/12').then(function (resp) {
                _this.persons = resp.data.content;
                _this.total = resp.data.totalElements;
                _this.pageSize = 12;
            })
            axios.get("http://localhost:8181/dept/query").then(function (resp) {
                _this.deptData = resp.data;
            })
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
    }
</style>