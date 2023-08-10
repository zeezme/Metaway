/* eslint-disable no-unused-vars */
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
import { Fields, setLoginFieldsValues } from './store/loginStore'
import { setGlobalValues } from '../../redux/globalReducer'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { api } from '../../services/api'

export default function Login() {
  const theme = useSelector((state: RootState) => state.globalReducer.theme)
  const themeReverse = useSelector((state: RootState) => state.globalReducer.themeReverse)
  const rememberPassword = useSelector((state: RootState) => state.globalReducer.rememberPassword)
  const loginFields = useSelector((state: RootState) => state.loginStore.fields)
  const dispatch = useDispatch()
  const onChange = (field: keyof Fields, value: any) => {
    dispatch(setLoginFieldsValues({ field, value }))
  }
  const [cookies, setCookie] = useCookies(['token'])
  const user = cookies['token']

  useEffect(() => {
    if (user !== undefined) {
      window.location.href = '/'
    }
  })

  const [loginError, setLoginError] = useState(false)

  const [loading, setLoading] = useState('')
  const submit = async () => {
    setLoading('loading')
    try {
      const res = await api.post('/auth/login', {
        username: loginFields.username,
        password: loginFields.password
      })
      if (res.status === 200) {
        setLoading('')
        setLoginError(false)
        setCookie('token', res.data)
        dispatch(
          setGlobalValues({
            field: 'user',
            value: { username: res.data.username, roles: res.data.tipos }
          })
        )
        return res.data
      }
    } catch (error: any) {
      if (error.response.data.message === 'Bad credentials') {
        setLoading('')
        setLoginError(true)
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
                <Input
                  name="user"
                  className="text-white"
                  invalid={loginError}
                  onChange={(e) => onChange('username', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password" className={`text-${theme}`}>
                  Senha
                </Label>
                <Input
                  type="password"
                  name="password"
                  className="text-white"
                  invalid={loginError}
                  onChange={(e) => onChange('password', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                      submit()
                    }
                  }}
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
              <div className={`d-flex flex-row justify-content-center mt-5 text-${theme}`}>
                <span>Precisar de ajuda?</span>
                <span className="fw-bold ms-1 cursor-pointer">Clique aqui</span>
              </div>
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
