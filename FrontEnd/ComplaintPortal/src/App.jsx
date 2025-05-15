import { Outlet } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"


function App() {
const isLoggedIn  = useSelector(store=> store.user.isLoggedIn)
const location = useLocation();

  const hiddenPaths = ["/login", "/register"];
  const shouldHideHeaderFooter = hiddenPaths.includes(location.pathname);


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
