<template>
    <el-container style="height: 100%; border: 1px none #eee">
        <el-aside  width="200px">

            <el-menu :default-openeds="open_list" unique-opened router>
                <el-submenu v-show="index!=0" v-for="(item,index) in $router.options.routes" :index="index+''">
                    <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
                    <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
                    :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-main>
            <router-view v-if="isRouterActive"></router-view>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "index",
        provide:function(){
            return{
                reload:this.reload
            }
        },
        data(){
            return{
                open_list: ['1'],
                isRouterActive:true
            }
        },
        methods:{
            async reload() {
                this.isRouterActive = false;
                await this.$nextTick(function () {
                    this.isRouterActive = true;
                })
            }
        }
    }

</script>
<style scoped>

</style>