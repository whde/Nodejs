import storage from "./storage";   

const USER_INFO = 'USER_INFO';

var userStorage = {

    store(params){
        storage.setObjectLocalStorage(USER_INFO, params);
    }

}
export default userStorage;