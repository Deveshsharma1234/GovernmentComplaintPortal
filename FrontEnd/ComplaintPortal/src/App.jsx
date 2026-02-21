import { Outlet, useNavigate } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { removeUser } from "./redux/slice/userSlice";
import apiClient from "./utils/apiClient";
import { BASE_URL } from "./utils/constants"

function App() {
const dispatch = useDispatch();
const isLoggedIn  = useSelector(store=> store.user.isLoggedIn) ;//extracting from store
const location = useLocation(); //for getting properties of browswer like window.location.pathname
const navigate = useNavigate(); //react router dom 
  const hiddenPaths = ["/login", "/register"];
  const shouldHideHeaderFooter = hiddenPaths.includes(location.pathname); //on login and register hide header and footer

useEffect(()=>{
  apiClient.get(BASE_URL+"/ping/pingWithAuth");
  navigate('/login')
},[navigate])

  return (
    <>
      <div className="min-h-screen flex flex-col">
       {!shouldHideHeaderFooter && <Header />}
        <main className="flex-1">
          <Outlet />
        </main>
       {!shouldHideHeaderFooter && <Footer />}
      </div>



    </>
  )
}

export default App
