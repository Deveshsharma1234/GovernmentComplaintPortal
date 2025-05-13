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

            let loggedInUser = await fetch(BASE_URL + "/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Email, Password }),
                credentials: "include"
            });

            loggedInUser = await loggedInUser.json();

            if (loggedInUser.error === undefined) {
                //just for testing purpose
                localStorage.setItem("email", Email);
                localStorage.setItem("password", Password);
                //for redux store
                dispatch(addUser(loggedInUser.user));
                toast('🦄 Wow Logged in', {
                    position: "top-right",
                    autoClose: 5000,
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
                }, 2000)
            } else {
                toast.error(loggedInUser.error, { theme: "dark" });
            }
        } catch (error) {
            console.log(error.messate);
            toast.error("😓 Website is down ..\nPlease try again later", { theme: "dark" });
        }
    }, [dispatch]);

    //   return loginHandler;
}


export default useSignInWithEmailAndPassword;