import { Outlet } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { useLocation } from "react-router"
import { BASE_URL } from "./utils/constants"

function App() {
const location = useLocation(); //for getting properties of browswer like window.location.pathname
// debugger
  const hiddenPaths = ["/login", "/register"];
  const shouldHideHeaderFooter = hiddenPaths.includes(location.pathname); //on login and register hide header and footer



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
