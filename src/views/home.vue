<template>
    <div>
        <h2>欢迎使用人事管理系统</h2>

        <el-button type="primary" @click="open">打开</el-button>
    </div>


</template>

<script>
    export default {
        name: "home",
        methods:{
            open(){
                const _this = this
                axios.post("http://192.168.0.139:8080/device/open").then(function () {
                    _this.$message('打开成功');
                })
            }
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
    }
</style>