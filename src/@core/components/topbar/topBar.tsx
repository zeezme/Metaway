import { Fragment, useEffect } from 'react'
import '../../../@core/scss/global.scss'
import { Button, Nav, NavItem, Navbar, NavbarBrand, UncontrolledTooltip } from 'reactstrap'
import { PiLightbulbFilamentFill } from 'react-icons/pi'
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setGlobalValues } from '../../../redux/globalReducer'
import { useCookies } from 'react-cookie'
import { AppDispatch, RootState } from '../../../redux/store'
import { show } from '../modals/utils'
export default function Topbar() {
  const cookie = useCookies()[0]

  const theme = useSelector((state: RootState) => state.globalReducer.theme)
  const themeReverse = useSelector((state: RootState) => state.globalReducer.themeReverse)

  const dispatch: AppDispatch = useDispatch()
  const handleTheme = () => {
    if (theme === 'light') {
      dispatch(setGlobalValues({ field: 'theme', value: 'dark' }))
      dispatch(setGlobalValues({ field: 'themeReverse', value: 'secondary' }))
    } else {
      dispatch(setGlobalValues({ field: 'theme', value: 'light' }))
      dispatch(setGlobalValues({ field: 'themeReverse', value: 'dark' }))
    }
  }

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme)
  }, [theme])

  const handleLogout = () => {
    const _logout = () => {
      dispatch(logout())
      window.location.reload()
    }
    show.showConfirmation(
      'Tem certeza que deseja sair?',
      () => {},
      () => _logout()
    )
  }
  return (
    <Fragment>
      <Navbar data-bs-theme={themeReverse} color={themeReverse} expand="xl" className="topbar">
        <NavbarBrand href="/" className="fw-bold w-fit">
          Meta<span className="text-warning">genda</span>
        </NavbarBrand>
        <Nav>
          <NavItem>
            <Button color="" id="themeButton" onClick={() => handleTheme()}>
              <PiLightbulbFilamentFill className="text-white" size={30} />
            </Button>
            <UncontrolledTooltip placement="bottom" target="themeButton">
              Alterar Tema
            </UncontrolledTooltip>
          </NavItem>
          {cookie.token ? (
            <NavItem>
              <Button color="" id="logoutButton" onClick={handleLogout}>
                <IoMdLogOut className="text-white" size={30} />
              </Button>
              <UncontrolledTooltip placement="bottom" target="logoutButton">
                Fazer Logout
              </UncontrolledTooltip>
            </NavItem>
          ) : (
            <NavItem>
              <Button tag={Link} to="/login" color="" id="loginButton">
                <IoMdLogIn className="text-white" size={30} />
              </Button>
              <UncontrolledTooltip placement="bottom" target="loginButton">
                Fazer Login
              </UncontrolledTooltip>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    </Fragment>
  )
}
