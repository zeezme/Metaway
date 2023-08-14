import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { routes } from './routes'
import { verifyJwtExp } from '../services/verifyJwtExp'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import BlankLayout from '../@core/layouts/blankLayout'
import Login from '../views/login/login'

export const Router = () => {
  useEffect(() => {
    verifyJwtExp()
  }, [])

  const user = useSelector((state: RootState) => state.globalReducer.user)

  const verifyUserPermissions = (requiredRoles: Array<string>) => {
    if (requiredRoles.length === 0) {
      return true
    }

    const hasRequiredRoles = user.roles.some((role) => requiredRoles.includes(role))

    return hasRequiredRoles
  }

  const authorizedRoutes = () => {
    return routes.map((route) => {
      if (!route.privateRoute) {
        return route
      }

      if (verifyUserPermissions(route.requiredRoles)) {
        return route
      }

      return {
        ...route,
        layout: <BlankLayout />,
        element: <Login />
      }
    })
  }

  const routeElements = authorizedRoutes().map((route) => (
    <Route element={route.layout} key={route.id}>
      <Route key={route.id} path={route.path} element={route.element} />
    </Route>
  ))

  return (
    <BrowserRouter basename="/">
      <Routes>
        {routeElements}
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </BrowserRouter>
  )
}
