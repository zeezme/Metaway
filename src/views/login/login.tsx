import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Form,
  Spinner
} from 'reactstrap'
import { RootState } from '../../redux/store'
import { Fields, resetUserFields, setLoginFieldsValues } from './store/loginStore'
import { setGlobalValues, setToken } from '../../redux/globalReducer'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { api } from '../../services/api'
import { show } from '../../@core/components/modals/utils'
import PasswordMask from '../../@core/components/masks/passwordMask'
import LowerCaseMask from '../../@core/components/masks/lowerCaseMask'

export default function Login() {
  const theme = useSelector((state: RootState) => state.globalReducer.theme)
  const themeReverse = useSelector((state: RootState) => state.globalReducer.themeReverse)
  const rememberPassword = useSelector((state: RootState) => state.globalReducer.rememberPassword)
  const loginFields = useSelector((state: RootState) => state.loginStore.fields)

  const dispatch = useDispatch()
  const onChange = (field: keyof Fields, value: any) => {
    dispatch(setLoginFieldsValues({ field, value }))
  }

  const [cookies, setCookie, removeCookie] = useCookies(['token', 'sessionExpiration'])

  const user = cookies['token']

  useEffect(() => {
    if (user?.username !== undefined && user?.tipos?.length === 0) {
      show.error(
        'Usuário sem a permissão: ["ROLE_USER"]',
        'Por favor entre em contato com o administrador do sistema.'
      )
      removeCookie('token')
      removeCookie('sessionExpiration')
    }
    if (!theme) {
      dispatch(setGlobalValues({ field: 'theme', value: 'light' }))
      dispatch(setGlobalValues({ field: 'themeReverse', value: 'dark' }))
    }
    if (user !== undefined) {
      window.location.href = '/'
    }
    return () => {
      dispatch(resetUserFields())
    }
  }, [])

  const [loading, setLoading] = useState('')

  const handleSessionExpiration = () => {
    const now = new Date()
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)
    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    if (!rememberPassword) {
      setCookie('sessionExpiration', oneHourLater)
    } else {
      setCookie('sessionExpiration', oneDayLater)
    }
  }
  const submit = async () => {
    setLoading('loading')
    try {
      const res = await api.post('/auth/login', {
        username: loginFields.username,
        password: loginFields.password
      })

      if (res.status === 200) {
        setLoading('')

        setCookie('token', res.data)
        dispatch(setToken({ token: btoa(res.data) }))
        dispatch(
          setGlobalValues({
            field: 'user',
            value: { username: res.data.username, roles: res.data.tipos, id: res.data.id }
          })
        )
        window.location.href = '/welcome'

        handleSessionExpiration()
      }
    } catch (error: any) {
      if (error.response.data.message === 'Bad credentials') {
        setLoading('')
      }
    }
  }

  return (
    <Row
      className="d-flex justify-content-center align-items-center m-0"
      style={{ height: '100vh', width: '100%' }}>
      <Col lg={4} md={8} className="p-0">
        <Card className={`bg-${themeReverse} rounded-0`}>
          <CardBody>
            <div className={`d-flex flex-row justify-content-center mt-5 text-${theme}`}>
              <span className="h1 fw-bolder">Metaway</span>
            </div>
            <div className={`d-flex flex-row justify-content-center mt-2 mb-5 text-${theme}`}>
              <small>Acesso ao sistema</small>
            </div>
            <Form className="mx-5">
              <FormGroup>
                <Label for="user" className={`text-${theme}`}>
                  Usuário
                </Label>
                <LowerCaseMask
                  className="text-white"
                  value={loginFields.username}
                  onChange={(e) => onChange('username', e)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password" className={`text-${theme}`}>
                  Senha
                </Label>
                <PasswordMask
                  className="text-white"
                  value={loginFields.password}
                  onChange={(e) => onChange('password', e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="rememberMe" className={`text-${theme}`}>
                  Lembrar de mim
                </Label>
                <Input
                  type="checkbox"
                  className="ms-2"
                  name="rememberMe"
                  checked={rememberPassword}
                  onChange={(e) =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    dispatch(
                      setGlobalValues({ field: 'rememberPassword', value: e.target.checked })
                    )
                  }
                />
              </FormGroup>
              <Button color={theme} className="w-100 mt-3" onClick={() => submit()}>
                {loading ? <Spinner size="sm" /> : <span className="fw-bold">Acessar</span>}
              </Button>
            </Form>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
        <div className="d-flex flex-row justify-content-end mt-2">
          <Button color="" tag={Link} to="/" className={`text-${themeReverse} fw-bolder`}>
            Voltar
          </Button>
        </div>
      </Col>
    </Row>
  )
}
