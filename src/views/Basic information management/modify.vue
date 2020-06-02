<template>
    <div>
        <h2>修改人员信息</h2>

        <br><br><br>

        <el-form :model="modifyPersonData" :rules="rules" ref="modifyPersonDataForm" label-width="100px" class="demo-ruleForm" >
            <el-row>
                <el-col :span="6" :offset="4">
                    <el-form-item label="人员编号" prop="personID">
                        <el-input v-model="modifyPersonData.personID" readonly></el-input> <!--编号为数据库接下来的编号，自动生成，只读-->
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-form-item label="人员姓名" prop="name">
                        <el-input v-model="modifyPersonData.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <br>

            <el-row>
                <el-col :span="6" :offset="4">
                    <el-form-item label="性别" prop="sex">
                        <el-input v-model="modifyPersonData.sex"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-form-item label="出生年月" prop="birth">
                        <el-input v-model="modifyPersonData.birth"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <br>

            <el-row>
                <el-col :span="6" :offset="4">
                    <el-form-item label="民族" prop="nat">
                        <el-input v-model="modifyPersonData.nat"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="modifyPersonData.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <br>

            <el-row>
                <el-col :span="10" :offset="4">
                    <el-form-item label="其它" prop="other">
                        <el-input v-model="modifyPersonData.other"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <br>

            <el-row>
                <el-col :span="6" :offset="4">
                    <el-form-item label="选择人员信息" prop="personID" >
                        <el-select v-model="personData.personID" placeholder="请选择人员" @change="selectChanged" @click.native="selectClick">
                            <el-option
                                    v-for="(item,index) in personData"
                                    :label="item.personID + '-' + item.name"
                                    :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <br><br><br><br>

            <el-row>
                <el-col :span="4" :offset="6">
                    <el-button type="primary" @click="submitForm('modifyPersonDataForm')">修改</el-button>
                </el-col>
                <el-col :span="4" :offset="6">
                    <el-button @click="resetForm('modifyPersonDataForm')">清空</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "modify",
        data() {
            return {
                modifyPersonData: {
                    personID: '',
                    name: '',
                    sex:'',
                    birth:'',
                    nat:'',
                    address:'',
                    deptID:'',
                    salary: '',
                    assess:'',
                    other:''
                },
                personData:[

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
                        axios.put('http://localhost:8181/person/update',this.modifyPersonData).then(function (resp) {
                            if (resp.data == 'success')
                            {
                                _this.$message('修改成功！');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                const _this = this;
                _this.modifyPersonData.name = '';
                _this.modifyPersonData.address = '';
                _this.modifyPersonData.sex = '';
                _this.modifyPersonData.nat = '';
                _this.modifyPersonData.birth = '';
                _this.modifyPersonData.other = '';

            },
            selectChanged(value){
                this.modifyPersonData.personID = this.personData[value].personID;
                this.modifyPersonData.name = this.personData[value].name;
                this.modifyPersonData.address = this.personData[value].address;
                this.modifyPersonData.sex = this.personData[value].sex;
                this.modifyPersonData.nat = this.personData[value].nat;
                this.modifyPersonData.birth = this.personData[value].birth;
                this.modifyPersonData.other = this.personData[value].other;
                this.modifyPersonData.deptID = this.personData[value].deptID;
                this.modifyPersonData.salary = this.personData[value].salary;
                this.modifyPersonData.assess = this.personData[value].assess;
            },
            selectClick()
            {
                const _this = this;
                axios.get("http://localhost:8181/person/query").then(function (resp) {
                    _this.personData = resp.data;
                })
            }
        },
        created() {
            const _this = this;
            axios.get("http://localhost:8181/person/query").then(function (resp) {
                _this.personData = resp.data;
            })
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
    }
</style>