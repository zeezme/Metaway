import { useState } from 'react'
import { sideBarItems } from '../../../config/sidebarConfig'
import SidebarProps from './sidebarProps'
export default function Sidebar() {
  const [sideBarStatus, setSideBarStatus] = useState(false)

  return (
    <div
      style={{
        backgroundColor: '#343A40'
      }}
      className={`sidebar${sideBarStatus ? '-open' : ''}`}
      onMouseEnter={() => setSideBarStatus(true)}
      onMouseLeave={() => setSideBarStatus(false)}>
      {sideBarItems.map((item, index) => (
        <SidebarProps
          status={sideBarStatus}
          key={index}
          icon={item.icon}
          title={item.title}
          route={item.route}
          childrenItem={item.childrenItem ? item.childrenItem : []}
        />
      ))}
    </div>
  )
}
