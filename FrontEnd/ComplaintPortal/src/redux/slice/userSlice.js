import { createSlice } from "@reduxjs/toolkit";

//getting user from local storage 
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
// console.log(storedUser);

const isLoggedIn = user? true: false;

const userSlice = createSlice({
    name: "user",
    initialState : {
        user : user,
        isLoggedIn: isLoggedIn
    },
    reducers:{
          addUser : (state,action)=>{
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(action.payload)); 
        },
        removeUser : (state)=>{
            state.user = null;
            state.isLoggedIn = false
            localStorage.removeItem("email");
            localStorage.removeItem("user");
            localStorage.removeItem("password");
        }
    }

})
export const {addUser,removeUser} = userSlice.actions;
export default userSlice.reducer;