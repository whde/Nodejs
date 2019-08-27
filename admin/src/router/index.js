import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Login from "../login/index";
import Register from "../login/register";
import Main from "../main/index";
import Info from "../main/info";
import EditInfo from "../main/editInfo"
import MemberList from "../main/memberList";
import MemberEdit from "../main/memberEdit";
import error from "../error";

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", redirect: { name: "main" } },
        { path: "/login", name: "login", component: Login },
        { path: "/register", name: "register", component: Register },
        { path: "/main", name: "main", component: Main , meta:{login:true}, children: [
                {
                    path: '/main/info',
                    name: 'info',
                    component: Info
                },
                {
                    path: '/main/editInfo',
                    name: 'editInfo',
                    component: EditInfo
                },
                {
                    path: '/main/memberList',
                    name: 'memberList',
                    component: MemberList
                },                {
                    path: '/main/memberEdit',
                    name: 'memberEdit',
                    component: MemberEdit
                },
            ]
        },
        {
            path: "*",
            name: "404",
            component: error
        }
    ]
});
router.beforeEach((to, from, next) => {
    let token = router.app.$userStorage.fetchToken();
    if (token && to.name==='login') return next({name: 'main'});
    let needAuth = to.matched.some(item => item.meta.login);
    if(!token && needAuth) return next({name: "login"});
    next();
});

export default router;
