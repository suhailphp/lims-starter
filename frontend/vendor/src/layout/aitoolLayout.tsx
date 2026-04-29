import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import AitoolHeader from "../components/header/aitoolHeader"
import TwoColSidebar from "../components/sidebar/twoColSidebar"

const AitoolLayout = () => {
  useEffect(() => {
    // Add classes to body when component mounts
    document.body.classList.add('tools-wrapper', 'overflow-hidden')
    
    // Cleanup: remove classes when component unmounts
    return () => {
      document.body.classList.remove('tools-wrapper', 'overflow-hidden')
    }
  }, [])

  return (
   <div className="main-wrapper">
    <AitoolHeader/>
    <TwoColSidebar/>
    <Outlet/>

   </div>
  )
}

export default AitoolLayout