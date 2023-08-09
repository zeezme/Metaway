import React from 'react'

const Teste = React.lazy(() => import('../../views/teste/teste'))

interface Route {
  id: number
  name: string
  path: string
  element: JSX.Element
  privateRoute: boolean
  layout: boolean
  show: boolean
}

export const routes: Route[] = [
  {
    id: 1,
    name: 'teste',
    path: '/teste',
    element: (
      <React.Suspense fallback={<p>Loading...</p>}>
        <Teste />
      </React.Suspense>
    ),
    privateRoute: true,
    layout: true,
    show: true
  }
]
