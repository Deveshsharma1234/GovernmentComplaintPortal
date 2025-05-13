import { Outlet } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { useSelector } from "react-redux"



function App() {
const isLoggedIn  = useSelector(store=> store.user.isLoggedIn)


  return (
    <>
      <div className="min-h-screen flex flex-col">
       {isLoggedIn && <Header />}
        <main className="flex-1">
          <Outlet />
        </main>
       {isLoggedIn && <Footer />}
      </div>



    </>
  )
}

export default App
