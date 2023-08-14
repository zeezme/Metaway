import { Outlet } from 'react-router-dom'
import Topbar from '../components/topbar/topBar'
import Sidebar from '../components/sidebar/sidebar'
import { useCookies } from 'react-cookie'

export default function VerticalLayout() {
  const cookie = useCookies()

  return (
    <div>
      <Topbar />

      {cookie[0].token && <Sidebar />}
      <div className="general-container">
        <Outlet />
      </div>
    </div>
  )
}
