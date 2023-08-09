import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { routes } from './routes'

export const Router = () => {
  const filteredRoutes = routes.filter((route) => route.show !== false)

  const routeElements = filteredRoutes.map((route) => (
    <Route element={route.element} key={route.id}>
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
