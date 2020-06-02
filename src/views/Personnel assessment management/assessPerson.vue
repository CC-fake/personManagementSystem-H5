<template>
    <div>
        <h2>人员考核</h2>
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
                    <el-form-item label="上次考核" prop="oldAssess">
                        <el-input v-model="oldAssess" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="新部门" prop="assess">
                        <el-select  v-model="currentPerson.assess" placeholder="请选择考核结果" @change="changeAssess()" :disabled="selectFlag">
                            <el-option
                                    v-for="item in assessData"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row style="margin-top: 40px">
                <el-col :span="2" :offset="9">
                    <el-button plain @click="add('currentPerson')" :disabled="addFlag">确定</el-button>
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
        name: "assessPerson",
        inject:['reload'],
        data() {
            return {
                total:null,
                pageSize:null,
                addFlag:true, //增加按钮是否被禁止
                selectFlag:true,
                transferTimes:'',
                oldAssess:'',
                currentPerson:{
                    personID:'',
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
                assessData:[
                    '优秀',
                    '合格',
                    '不合格'
                ]
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
                    this.currentPerson.birth = val.birth;
                    this.currentPerson.salary = val.salary;
                    this.currentPerson.other = val.other;
                    this.oldAssess = val.assess;
                    this.addFlag = true;
                    this.selectFlag = false;
                }
            },
            add(formName){
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put("http://localhost:8181/transfer/excuteTransfer",_this.currentPerson).then(function (resp) {

                        })

                        axios.post("http://localhost:8181/transfer/addTransferHistory",_this.newHistrjn).then(function (resp) {
                            if (resp.data == "success")
                            {
                                _this.$message("修改成功！");
                                _this.reload();
                            }
                            else
                            {
                                _this.$message("修改失败！");
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            changeAssess()
            {
                const _this = this;
                this.addFlag = false;
                var aDate = new Date();
                this.newHistrjn.fromAcc = 1;
                this.newHistrjn.oldInfo = this.oldAssess
                this.newHistrjn.newInfo = this.currentPerson.assess
                this.newHistrjn.regDate = aDate.getFullYear() + '-' + (aDate.getMonth() + 1) + '-' +
                    aDate.getDate() +" " + aDate.getHours() + ':' + aDate.getMinutes() + ':' + aDate.getSeconds();
                this.newHistrjn.personID = this.currentPerson.personID;
                axios.get("http://localhost:8181/transfer/frequency/"+_this.currentPerson.name+"/1").then(function (resp) {
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
                this.oldAssess = '';
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
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
    }
</style>