<template>
    <div>
        <h2>增加人员信息</h2>

        <br><br><br>

        <el-form :model="addPersonData" :rules="rules" ref="addPersonDataForm" label-width="100px" class="demo-ruleForm" >
            <el-row>
                <el-col :span="6" :offset="4">
                    <el-form-item label="人员编号" prop="personID">
                        <el-input v-model="addPersonData.personID" readonly></el-input> <!--编号为数据库接下来的编号，自动生成，只读-->
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-form-item label="人员姓名" prop="name">
                        <el-input v-model="addPersonData.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <br>

            <el-row>
                <el-col :span="6" :offset="4">
                    <el-form-item label="性别" prop="sex">
                        <el-input v-model="addPersonData.sex"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-form-item label="出生年月" prop="birth">
                        <el-input v-model="addPersonData.birth"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <br>

            <el-row>
                <el-col :span="6" :offset="4">
                    <el-form-item label="民族" prop="nat">
                        <el-input v-model="addPersonData.nat"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="addPersonData.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <br>

            <el-row>
                <el-col :span="6" :offset="4">
                    <el-form-item label="部门" prop="deptID">
                        <el-select v-model="addPersonData.deptID" placeholder="请选择部门">
                            <el-option
                                v-for="item in deptData"
                                :label="item.deptID + '-'+ item.b_Dept + '-' + item.s_Dept"
                                :value="item.deptID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-form-item label="其它" prop="other">
                        <el-input v-model="addPersonData.other"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <br><br><br><br>

            <el-row>
                <el-col :span="4" :offset="6">
                    <el-button type="primary" @click="submitForm('addPersonDataForm')">增加</el-button>
                </el-col>
                <el-col :span="4" :offset="6">
                    <el-button @click="resetForm('addPersonDataForm')">清空</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "add",
        inject:['reload'],
        data() {
            return {
                addPersonData: {
                    personID: '',
                    name: '',
                    sex:'',
                    birth:'',
                    nat:'',
                    address:'',
                    deptID:'',
                    salary: '0',
                    assess:'未考核',
                    other:''
                },
                deptData:[{}

                ],
                rules: {
                    personID: [
                        { required: true, message: '请输入人员编号', trigger: 'blur' }
                    ],
                    name:[
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    sex:[
                        {required: true, message: '请输入性别', trigger: 'blur'}
                    ],
                    birth:[
                        {required: true, message: '请输入出生年月，格式为：1999-01-01', trigger: 'blur'}
                    ],
                    nat:[
                        {required: true, message: '请输入民族', trigger: 'blur'}
                    ],
                    address:[
                        {required: true, message: '请输入地址', trigger: 'blur'}
                    ],
                    deptID:[
                        {required: true, message: '请选择部门', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8181/person/add',this.addPersonData).then(function (resp) {
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
            resetForm(formName) {
                const _this = this;
                this.$refs[formName].resetFields();
                axios.get("http://localhost:8181/person/query/biggestID").then(function (resp) {
                    _this.addPersonData.personID = resp.data + 1;
                })
            }
        },
        created() {
            const _this = this;
            axios.get("http://localhost:8181/dept/query").then(function (resp) {
                _this.deptData = resp.data;
            })
            axios.get("http://localhost:8181/person/query/biggestID").then(function (resp) {
                _this.addPersonData.personID = resp.data + 1;
            })
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
    }
</style>