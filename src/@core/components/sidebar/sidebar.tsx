import { useState } from 'react'
import { sideBarItems } from '../../../config/sidebarConfig'
import SidebarProps from './sidebarProps'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
export default function Sidebar() {
  const [sideBarStatus, setSideBarStatus] = useState(false)
  const user = useSelector((state: RootState) => state.globalReducer.user)

  const verifyUserPermissions = (requiredRoles: Array<string>) => {
    if (requiredRoles.length !== 0) {
      const userRoleNames = user.roles.map((role) => role.toString())
      const hasRequiredRoles = requiredRoles.every((role) => userRoleNames.includes(role))

      return hasRequiredRoles
    }

    return true
  }

  return (
    <div
      style={{
        backgroundColor: '#343A40'
      }}
      className={`sidebar${sideBarStatus ? '-open' : ''}`}
      onMouseEnter={() => setSideBarStatus(true)}
      onMouseLeave={() => setSideBarStatus(false)}>
      {sideBarItems.map((item, index) => {
        if (verifyUserPermissions(item.requiredRoles) === true) {
          return (
            <SidebarProps
              status={sideBarStatus}
              key={index}
              icon={item.icon}
              title={item.title}
              route={item.route}
              childrenItem={item.childrenItem ? item.childrenItem : []}
            />
          )
        }
      })}
    </div>
  )
}
