import storage from "./storage";

const USER_INFO = 'USER_INFO';
const USER_TOKEN = 'USER_TOKEN';
const USER_IMG = 'USER_IMG';

var userStorage = {

    store(params){
        storage.setObjectLocalStorage(USER_INFO, params);
    },
    fetch(){
        return storage.getObjectLocalStorage(USER_INFO);
    },
    storeToken(token){
        storage.setObjectLocalStorage(USER_TOKEN, token);
    },
    fetchToken(){
        return storage.getObjectLocalStorage(USER_TOKEN);
    },
    storeImg(img){
        storage.setObjectLocalStorage(USER_IMG, img);
    },
    fetchImg(){
        return storage.getObjectLocalStorage(USER_IMG);
    },
    removeAll(){
        storage.removeLocalStorage(USER_INFO);
        storage.removeLocalStorage(USER_TOKEN);
        storage.removeLocalStorage(USER_IMG);
    }
}
export default userStorage;
