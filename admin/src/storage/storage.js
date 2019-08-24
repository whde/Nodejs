// import localStorage from "./storage/localstorage.js";
// import sessionStorage from "./storage/session.js";
// import cookies from "./storage/cookies.js";
// import JSON from "./storage/json.js";

var storage ={
// Local
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

// Session
// 获取
 getSessionStorage(key) {
  return sessionStorage.getItem(key);
},
// 保存
 setSessionStorage(key, value) {
  sessionStorage.setItem(key, value);
},
// 获取
 getObjectSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
},
// 保存
 setObjectSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
},
// 删除
 removeSessionStorage(key) {
  sessionStorage.removeItem(key);
}
}
export default storage;