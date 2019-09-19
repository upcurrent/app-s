import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Home from './views/Home.vue'
const Printer = () => import("./views/printer/Printer");
const History = () => import("./views/printer/History");
const Template = () => import("./views/printer/Template");
const User = () => import("./views/service/User");
const Service = () => import("./views/service/Service");

const DefaultSetting = () => import("./views/app_set/DefaultSetting");
const Interface = () => import("./views/app_set/Interface");
const UserRole = () => import("./views/app_set/UserRole");

let routes = [
    {
        path: '/',
        component: Home,
        name: '服务',
        iconCls: 'el-icon-user',
        children: [
            { path: '/user', name: '用户管理',component: User },
            { path: '/service',name: '服务管理', component: Service }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '打印',
        iconCls: 'el-icon-printer',//图标样式class
        meta:{
            title:'款项管理'
        },
        children: [
            { path: '/main', component: null, name: '主页', hidden: true },
            { path: '/printer',name: '打印机', component: Printer },
            { path: '/template',name: '打印模板', component: Template },
            { path: '/history',name:'打印历史',component:History}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'el-icon-setting',//图标样式class
        children: [
            { path: '/defaultSetting',name: '默认设置', component:DefaultSetting },
            { path: '/interface',name: '用户界面编辑', component:Interface },
            { path: '/userRole',name : '用户权限',component:UserRole}
        ]
    }
];

export default new Router({
    routes
})

/**
 * routes: [
 {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
 ]
 */
