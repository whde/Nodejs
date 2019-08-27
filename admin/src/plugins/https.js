import Axios from "axios";
import router from "../router";

let http = Axios.create({
    timeout: 3000,   //超时配置 3秒
    responseType: 'json',   // 响应数据格式
    responseEncoding: 'utf8',  // 响应数据编码
    baseURL:'http://localhost:3000',
});

http.interceptors.request.use(
    config => {
        let token = router.app.$userStorage.fetchToken();
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.app.$message.error(error.response.data.message);
                    // 返回 401 清除token信息并跳转到登录页面
                    router.app.$userStorage.removeAll();
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    });
                    break;
                default:
                    break;
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });
export default http;
