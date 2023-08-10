import { MdAdminPanelSettings, MdHome } from 'react-icons/md'

export const sideBarItems = [
  {
    icon: <MdHome size={30} />,
    title: 'Home',
    route: '/'
  },
  {
    icon: <MdAdminPanelSettings size={30} />,
    title: 'Admin.',
    childrenItem: [
      {
        title: 'Usuários',
        route: '/users'
      }
    ]
  }
]
