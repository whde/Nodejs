import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Login from "../login/index.vue";
import Main from "../main/index.vue";
import error from "../error.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", redirect: { name: "login" } },
    { path: "/login", name: "login", component: Login },
    { path: "/main", name: "main", component: Main },
    {
      path: "*",
      name: "404",
      component: error
    }
  ]
});
router.beforeEach((to, from, next) => {
  console.log(router.app);
  // let token = router.app.$storage.fetch("token");
  // let needAuth = to.matched.some(item => item.meta.login);
  // if(!token && needAuth) return next({name: "main"});

  next();
});

export default router;
