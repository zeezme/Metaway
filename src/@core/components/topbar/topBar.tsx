import { Fragment, useEffect, useState } from 'react'
import '../../../@core/scss/global.scss'
import { Button, Nav, NavItem, Navbar, NavbarBrand, UncontrolledTooltip } from 'reactstrap'
import { PiLightbulbFilamentFill } from 'react-icons/pi'
import { IoMdLogIn } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setGlobalValues } from '../../../redux/globalReducer'
export default function Topbar() {
  const [theme, setTheme] = useState('light')
  const [themeReverse, setThemeReverse] = useState('dark')
  const dispatch = useDispatch()
  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      setThemeReverse('secondary')
      dispatch(setGlobalValues({ field: 'theme', value: 'dark' }))
      dispatch(setGlobalValues({ field: 'themeReverse', value: 'secondary' }))
    } else {
      setTheme('light')
      setThemeReverse('dark')
      dispatch(setGlobalValues({ field: 'theme', value: 'light' }))
      dispatch(setGlobalValues({ field: 'themeReverse', value: 'dark' }))
    }
  }

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Fragment>
      <Navbar data-bs-theme={themeReverse} color={themeReverse} expand="xl" className="navbar">
        <NavbarBrand href="/" className="fw-bold">
          <img src="/public/logo-metaway-white.png" className="me-2" style={{ width: '20%' }} />
          Metaway
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
          <NavItem>
            <Button tag={Link} to="/login" color="" id="loginButton">
              <IoMdLogIn className="text-white" size={30} />
            </Button>
            <UncontrolledTooltip placement="bottom" target="loginButton">
              Fazer Login
            </UncontrolledTooltip>
          </NavItem>
        </Nav>
      </Navbar>
    </Fragment>
  )
}
