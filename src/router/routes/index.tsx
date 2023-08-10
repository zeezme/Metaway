import React from 'react'
//import BlankLayout from '../../@core/layouts/blankLayout'
import VerticalLayout from '../../@core/layouts/verticalLayout'
import BlankLayout from '../../@core/layouts/blankLayout'
const Login = React.lazy(() => import('../../views/login/login'))
const Home = React.lazy(() => import('../../views/home/home'))

interface Route {
  id: number
  name: string
  path: string
  element: JSX.Element
  privateRoute: boolean
  layout: JSX.Element
  show: boolean
}

export const routes: Route[] = [
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
    privateRoute: true,
    layout: <BlankLayout />,
    show: true
  }
]
