/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Form
} from 'reactstrap'
import { RootState } from '../../redux/store'

export default function Login() {
  const theme = useSelector((state: RootState) => state.globalReducer.theme)
  const themeReverse = useSelector((state: RootState) => state.globalReducer.themeReverse)
  return (
    <Row
      className="d-flex justify-content-center align-items-center m-0"
      style={{ height: '100vh', width: '100%' }}>
      <Col lg={4} md={8} className="p-0">
        <Card className={`bg-${themeReverse}`}>
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
                <Input name="user" />
                <FormFeedback>O nome de usuário não foi encontrado!</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="password" className={`text-${theme}`}>
                  Senha
                </Label>
                <Input
                  type="password"
                  name="password"
                  /* onChange={(e) => onChange('password', e.target.value)} */
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                      /* submit() */
                    }
                  }}
                />
                <FormFeedback>Senha invalida!</FormFeedback>
              </FormGroup>
              <Button color={theme} className="w-100 mt-3" onClick={() => console.log('teste')}>
                Acessar
                {/*  {loading ? <Spinner size="sm" /> : <span className="fw-bold">Acessar</span>} */}
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
