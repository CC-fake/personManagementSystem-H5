import Vue from 'vue'
import VueRouter from 'vue-router'
import add from "../views/Basic information management/add";
import deleteInformation from "../views/Basic information management/deleteInformation";
import modify from "../views/Basic information management/modify";
import query from "../views/Basic information management/query";
import departmentManagement from "../views/Basic information management/departmentManagement";
import assessPerson from "../views/Personnel assessment management/assessPerson";
import queryAssessHistory from "../views/Personnel assessment management/queryAssessHistory";
import transferPerson from "../views/Personnel transfer management/transferPerson";
import queryTransferHistory from "../views/Personnel transfer management/queryTransferHistory";
import laborDistribution from "../views/Labor management/laborDistribution";
import queryLaborHistory from "../views/Labor management/queryLaborHistory";
import home from "../views/home";
import index from "../views/index";

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "根",
      component: index,
      redirect: "/home",
      children:[
        {
          path: "/home",
          name: "home",
          component: home
        }
      ]
    },
    {
      path: "/navigation1",
      name: "基本信息管理",
      component: index,
      children: [
        {
          path: "/add",
          name: "添加人员信息",
          component: add
        },
        {
          path: "/delete",
          name: "删除人员信息",
          component: deleteInformation
        },
        {
          path: "/modify",
          name: "修改人员信息",
          component: modify
        },
        {
          path: "/query",
          name: "查询人员信息",
          component: query
        },
        {
          path: "/departmentManagement",
          name: "部门管理",
          component: departmentManagement
        }
      ]
    },
    {
      path: "/navigation2",
      name: "人员调动管理",
      component: index,
      children: [
        {
          path: "/transferPerson",
          name: "人员调动",
          component: transferPerson
        },
        {
          path: "/queryTransferHistory",
          name: "调动历史查询",
          component: queryTransferHistory
        }
      ]
    },
    {
      path: "/navigation3",
      name: "人员考核管理",
      component: index,
      children: [
        {
          path: "/assessPerson",
          name: "人员考核",
          component: assessPerson
        },
        {
          path: "/queryAssessHistory",
          name: "考核历史查询",
          component: queryAssessHistory
        }
      ]
    },
    {
      path: "/navigation4",
      name: "劳资管理",
      component: index,
      children: [
        {
          path: "/laborDistribution",
          name: "劳资分配管理",
          component: laborDistribution
        },
        {
          path: "/queryLaborHistory",
          name: "劳资历史查询",
          component: queryLaborHistory
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
