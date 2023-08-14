import React from 'react'
//import BlankLayout from '../../@core/layouts/blankLayout'
import VerticalLayout from '../../@core/layouts/verticalLayout'
import BlankLayout from '../../@core/layouts/blankLayout'
import People from '../../views/people/people'
import UserInfo from '../../views/userInfo/userInfo'
import Welcome from '../../views/welcome/welcome'
const Login = React.lazy(() => import('../../views/login/login'))
const Home = React.lazy(() => import('../../views/home/home'))
const Users = React.lazy(() => import('../../views/users/users'))

export interface RouteTypeInterface {
  id: number
  name: string
  path: string
  element: JSX.Element
  privateRoute: boolean
  layout: JSX.Element
  show: boolean
  requiredRoles: Array<string>
}

export const routes: RouteTypeInterface[] = [
  {
    id: 0,
    name: 'home',
    path: '/',
    element: (
      <React.Suspense fallback={<p>Loading...</p>}>
        <Home />
      </React.Suspense>
    ),
    privateRoute: true,
    layout: <VerticalLayout />,
    requiredRoles: ['ROLE_USER', 'ROLE_ADMIN'],
    show: true
  },
  {
    id: 1,
    name: 'login',
    path: '/login',
    element: (
      <React.Suspense fallback={<p>Loading...</p>}>
        <Login />
      </React.Suspense>
    ),
    privateRoute: false,
    layout: <BlankLayout />,
    requiredRoles: ['ROLE_USER', 'ROLE_ADMIN'],
    show: true
  },
  {
    id: 2,
    name: 'users',
    path: '/users',
    element: (
      <React.Suspense fallback={<p>Loading...</p>}>
        <Users />
      </React.Suspense>
    ),
    privateRoute: true,
    layout: <VerticalLayout />,
    requiredRoles: ['ROLE_ADMIN'],
    show: true
  },
  {
    id: 3,
    name: 'pessoas',
    path: '/people',
    element: (
      <React.Suspense fallback={<p>Loading...</p>}>
        <People />
      </React.Suspense>
    ),
    privateRoute: true,
    layout: <VerticalLayout />,
    requiredRoles: ['ROLE_USER'],
    show: true
  },
  {
    id: 4,
    name: 'cadastro',
    path: '/user-info',
    element: (
      <React.Suspense fallback={<p>Loading...</p>}>
        <UserInfo />
      </React.Suspense>
    ),
    privateRoute: true,
    layout: <VerticalLayout />,
    requiredRoles: ['ROLE_USER'],
    show: true
  },
  {
    id: 4,
    name: 'contatos',
    path: '/contacts',
    element: (
      <React.Suspense fallback={<p>Loading...</p>}>
        <Home />
      </React.Suspense>
    ),
    privateRoute: true,
    layout: <VerticalLayout />,
    requiredRoles: ['ROLE_USER'],
    show: true
  },
  {
    id: 5,
    name: 'bemvindo',
    path: '/welcome',
    element: (
      <React.Suspense fallback={<p>Loading...</p>}>
        <Welcome />
      </React.Suspense>
    ),
    privateRoute: true,
    layout: <VerticalLayout />,
    requiredRoles: ['ROLE_USER'],
    show: true
  }
]
