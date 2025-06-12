import { Bounce, toast } from "react-toastify";
import { useCallback } from "react";
import loginValidation from "../utils/validation/loginValidation";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { BASE_URL } from "../utils/constants";

const useSignInWithEmailAndPassword = () => {
    const dispatch = useDispatch();

    //   const loginHandler = 
    return useCallback(async (emailRef, passwordRef, navigate) => {
        try {
            const Email = emailRef.current?.value;
            const Password = passwordRef.current?.value;
            if (!Email || !Password) {
                toast.error("Both fields are required", { theme: "dark" });
                return;
            }
            const isValid = loginValidation(Email, Password);
            if (!isValid) {
                toast.error("Credentials are invalid", { theme: "dark" });
                return;
            }

            let response = await fetch(BASE_URL + "/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Email, Password }),
                credentials: "include"
            });
            const data = await response.json();
            console.log(data + "  from login");
            if (!response.ok) {
                toast.error(data.message || "Login failed", { theme: "dark" });
                return;
            }

//adding to local
            if (data.user) {
                //for making user persistent across refreshes
                localStorage.setItem("email", Email);
                localStorage.setItem("password", Password);
                //for redux store
                dispatch(addUser(data.user));

                toast('Loggin In', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setTimeout(() => {
                    navigate("/");
                }, 3000)
            } else {
                toast.error("Login Failed", { theme: "dark" });
            }
        } catch (error) {
            console.log(error.messate);
            toast.error("😓 Website is down ..\nPlease try again later", { theme: "dark" });
        }
    }, [dispatch]);

    //   return loginHandler;
}


export default useSignInWithEmailAndPassword;