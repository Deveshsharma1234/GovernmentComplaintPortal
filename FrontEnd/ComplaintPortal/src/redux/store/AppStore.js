import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice"
import toggleSideBarReducer from "../slice/toggleSideBarSlice"


const AppStore = configureStore({
    reducer :{
        "user": userReducer,
        "toggleSideBar": toggleSideBarReducer
    }
})

export default AppStore;