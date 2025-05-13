import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice"

const AppStore = configureStore({
    reducer :{
        "user": userReducer
    }
})

export default AppStore;