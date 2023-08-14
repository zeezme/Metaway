import { Fragment, useState } from 'react'
import { Menu } from 'react-feather'
import { MdAdd } from 'react-icons/md'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  Input,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row
} from 'reactstrap'
import { RootState } from '../../../redux/store'

interface SidebarTypesInterface {
  placeholder: string
  children: any
  reducer: any
  fieldsReducer: any
  store: any
  addbutton?: boolean
}

export default function FilterCard({
  placeholder,
  children,
  reducer,
  fieldsReducer,
  store,
  addbutton
}: SidebarTypesInterface) {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.globalReducer.theme)

  const chooseColors =
    theme === 'light'
      ? { text: 'text-white', theme: '', button: 'dark' }
      : { text: 'text-dark', theme: 'dark', button: 'secondary' }

  const onChange = (field: string, value: any) => {
    dispatch(fieldsReducer({ field, value }))
  }

  const submit = () => {
    dispatch(reducer({ ...store }))
  }
  return (
    <Fragment>
      <Card color={chooseColors.theme}>
        <CardBody>
          <Row>
            <div className="d-flex flex-row">
              <Input
                className=" me-3"
                placeholder={placeholder}
                onChange={(e) => {
                  onChange('nome', e.target.value)
                }}
              />
              <Button outline className="me-2" onClick={submit} color={chooseColors.button}>
                <PiMagnifyingGlass size={20} />
              </Button>
              {addbutton && (
                <Button
                  outline
                  color={chooseColors.button}
                  className="h-100 ms-3"
                  onClick={() => setShow(!show)}>
                  <MdAdd size={22} className="p-0 my-1" />
                </Button>
              )}
              <Button
                outline
                color={chooseColors.button}
                className="h-100"
                onClick={() => setShow(!show)}>
                <Menu size={20} />
              </Button>
            </div>
          </Row>
        </CardBody>
      </Card>
      <Offcanvas direction="end" isOpen={show} toggle={() => setShow(!show)}>
        <OffcanvasHeader toggle={() => setShow(!show)}>Filtros</OffcanvasHeader>
        <OffcanvasBody>
          <div>
            {children}
            <Button onClick={submit}>Filtrar</Button>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </Fragment>
  )
}
