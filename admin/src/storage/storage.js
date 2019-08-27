var storage = {
// 获取
    getLocalStorage(key) {
        return localStorage.getItem(key);
    },
// 保存
    setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    },
// 获取
    getObjectLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    },
// 保存
    setObjectLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
// 删除
    removeLocalStorage(key) {
        localStorage.removeItem(key);
    },
}
export default storage;
