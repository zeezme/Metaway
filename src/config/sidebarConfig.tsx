import { Users } from 'react-feather'
import { MdOutlineAdminPanelSettings, MdHome } from 'react-icons/md'
import { AiOutlineFileDone } from 'react-icons/ai'
import { TiContacts } from 'react-icons/ti'

export const sideBarItems = [
  {
    icon: <MdHome size={30} />,
    title: 'Home',
    route: '/',
    requiredRoles: []
  },
  {
    icon: <AiOutlineFileDone size={30} />,
    title: 'Cadastro',
    route: '/user-info',
    requiredRoles: []
  },
  {
    icon: <Users size={30} />,
    title: 'Pessoas',
    route: '/people',
    requiredRoles: []
  },
  {
    icon: <TiContacts size={30} />,
    title: 'Contatos',
    route: '/contacts',
    requiredRoles: []
  },
  {
    icon: <MdOutlineAdminPanelSettings size={30} />,
    title: 'Admin.',
    childrenItem: [
      {
        title: 'Usuários',
        route: '/users'
      }
    ],
    requiredRoles: ['ROLE_ADMIN']
  }
]
