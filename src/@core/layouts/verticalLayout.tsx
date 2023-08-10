import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'reactstrap'
import Topbar from '../components/topbar/topBar'
import Sidebar from '../components/sidebar/sidebar'

export default function VerticalLayout() {
  return (
    <Fragment>
      <Topbar />
      <Sidebar />
      <Container fluid>
        <Outlet />
      </Container>
    </Fragment>
  )
}
