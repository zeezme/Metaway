import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Fragment, useEffect, useState } from 'react'
import {
  updateUser,
  getUsersList,
  resetFields,
  setUserInFocus,
  setUsersFilterValues,
  usersTypeInterface,
  createUser,
  setFieldsValues
} from './store/usersStore'
import FilterCard from '../../@core/components/filterCard/filterCard'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledCollapse
} from 'reactstrap'
import { Tool } from 'react-feather'
import LowerCaseMask from '../../@core/components/masks/lowerCaseMask'
import DateMask from '../../@core/components/masks/dateMask'
import PhoneMask from '../../@core/components/masks/phoneMask'
import CpfMask from '../../@core/components/masks/cpfMask'
import { show } from '../../@core/components/modals/utils'

export default function Users() {
  const dispatch: AppDispatch = useDispatch()
  const usersFields = useSelector((state: RootState) => state.usersStore.fields)
  const filtersFields = useSelector((state: RootState) => state.usersStore.filters)
  const userList = useSelector((state: RootState) => state.usersStore.usersList)

  const [showModal, setShowModal] = useState(false)
  const [addModal, setAddModal] = useState(false)

  //Limpa a modal manualmente já que não é um componente a parte
  useEffect(() => {
    if (showModal === false) {
      dispatch(resetFields())
    }
  }, [showModal])

  const onChangeFilters = (field: keyof usersTypeInterface, value: any) => {
    dispatch(setUsersFilterValues({ field, value }))
  }
  const onChange = (field: keyof usersTypeInterface, value: any) => {
    dispatch(setFieldsValues({ field, value }))
  }

  useEffect(() => {
    if (userList.length === 0) {
      dispatch(getUsersList({}))
    }
  }, [])

  const handleSetUserInFocus = (user: usersTypeInterface) => {
    dispatch(setUserInFocus(user))
    setShowModal(true)
  }
  const handleModifyUser = (user: usersTypeInterface) => {
    show.showConfirmation(
      'Tem certeza que deseja salvar?',
      () => {},
      () => dispatch(updateUser(user))
    )
  }

  const submitCreateUser = () => {
    show.showConfirmation(
      'Tem certeza que deseja salvar?',
      () => {},
      () => dispatch(createUser({ user: usersFields, callback: setAddModal(false) }))
    )
  }

  return (
    <Fragment>
      <Modal isOpen={addModal}>
        <ModalHeader toggle={() => setAddModal(!addModal)}>
          <h4 className="modal-title">Novo Usuário</h4>
        </ModalHeader>
        <ModalBody>
          <div>
            <small className="fw-bolder">Username</small>
            <LowerCaseMask
              className="mb-2"
              onChange={(e) => onChange('username', e)}
              value={usersFields.username}
            />
            <small className="fw-bolder">Senha</small>
            <Input
              type="password"
              className="mb-2"
              onChange={(e) => onChange('password', e.target.value)}
              value={usersFields.password}
            />

            <small className="fw-bolder">Nome</small>
            <Input
              className="mb-2"
              onChange={(e) => onChange('nome', e.target.value)}
              value={usersFields.nome}
            />
            <small className="fw-bolder">Data de Nascimento</small>
            <DateMask
              className="mb-2"
              placeholder="aaaa-mm-dd"
              value={usersFields.dataNascimento}
              onChange={(e) => onChange('dataNascimento', e)}
            />
            <small className="fw-bolder">Email</small>
            <Input
              className="mb-2"
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="exemplo@dominio.com"
              value={usersFields.email}
            />
            <small className="fw-bolder">Telefone</small>
            <PhoneMask
              className="mb-2"
              placeholder="(00) 0000-0000"
              onChange={(e) => onChange('telefone', e)}
              value={usersFields.telefone}
            />

            <small className="fw-bolder">CPF</small>
            <CpfMask
              className="mb-2"
              onChange={(e) => onChange('cpf', e)}
              placeholder="000.000.000-00"
              value={usersFields.cpf}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button className="m-1" color="dark" onClick={submitCreateUser}>
              Salvar
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <FilterCard
        reducer={getUsersList}
        store={filtersFields}
        fieldsReducer={setUsersFilterValues}
        placeholder="Nome"
        addbutton={false}>
        <small className="text-muted fw-bolder">Nome</small>
        <Input
          className="mb-2"
          onChange={(e) => onChangeFilters('nome', e.target.value)}
          value={filtersFields.nome}
        />
        <small className="text-muted fw-bolder">Username</small>
        <Input
          className="mb-2"
          onChange={(e) => onChangeFilters('username', e.target.value)}
          value={filtersFields.username}
        />
        <small className="text-muted fw-bolder">CPF</small>
        <Input
          className="mb-2"
          onChange={(e) => onChangeFilters('cpf', e.target.value)}
          value={filtersFields.cpf}
        />
      </FilterCard>

      <div className="d-flex justify-content-between align-items-center">
        <h3 className="my-3">Usuários</h3>
        <Button className="m-1" onClick={() => setAddModal(true)}>
          Adicionar Usuário
        </Button>
      </div>

      <div className="d-flex flex-column flex-lg-row flex-md-row row">
        {userList.map((user: any, index) => (
          <div key={index} className="col col-md-4 col-lg-3">
            <Card className="mb-3" style={{ minWidth: '12.9rem' }}>
              <CardHeader className="text-center">
                <span className="fw-bold">{user.nome || user.username}</span>
                <Button
                  color=""
                  className="position-absolute top-0 end-0 m-1"
                  onClick={() => handleSetUserInFocus(user)}>
                  <Tool className="text-success" />
                </Button>
                <hr className="mb-0 pb-0" />
              </CardHeader>
              <CardBody>
                <small className="text-muted fw-bolder">Nascimento</small>
                <p>{user.dataNascimento}</p>
                <small className="text-muted fw-bolder">CPF</small>
                <p>{user.cpf}</p>
                <small className="text-muted fw-bolder">Telefone</small>
                <p>{user.telefone}</p>
                <small className="text-muted fw-bolder">Email</small>
                <p className="text-truncate">{user.email}</p>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      <Modal centered isOpen={showModal} toggle={() => setShowModal(!showModal)}>
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          <span className="fw-bold">Opções de {usersFields.nome || usersFields.username}</span>
        </ModalHeader>
        <ModalBody className="d-flex flex-column">
          <Button className="my-2" id="toggler">
            Ver Detalhes
          </Button>

          <UncontrolledCollapse toggler="#toggler">
            <Card>
              <CardBody>
                <div className="row">
                  <div className="col">
                    <small className="text-muted fw-bolder">Nome</small>
                    <p>{usersFields.nome}</p>
                    <small className="text-muted fw-bolder">Username</small>
                    <p>{usersFields.username}</p>
                    <small className="text-muted fw-bolder">Nascimento</small>
                    <p>{usersFields.dataNascimento}</p>
                  </div>
                  <div className="col">
                    <small className="text-muted fw-bolder">CPF</small>
                    <p>{usersFields.cpf}</p>
                    <small className="text-muted fw-bolder">Telefone</small>
                    <p>{usersFields.telefone}</p>
                    <small className="text-muted fw-bolder">Email</small>
                    <p className="text-truncate">{usersFields.email}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          <Button className="my-2" id="alterarDadosToggler">
            Alterar Dados
          </Button>
          <UncontrolledCollapse toggler="alterarDadosToggler">
            <Card>
              <CardBody>
                <div className="row">
                  <div className="col">
                    <small className="text-muted fw-bolder">Nome</small>
                    <Input
                      onChange={(e) => onChange('nome', e.target.value)}
                      value={usersFields.nome}
                    />

                    <small className="text-muted fw-bolder">Username</small>
                    <LowerCaseMask
                      onChange={(e) => onChange('username', e)}
                      value={usersFields.username}
                    />

                    <small className="text-muted fw-bolder">Nascimento</small>
                    <DateMask
                      onChange={(e) => onChange('dataNascimento', e)}
                      value={usersFields.dataNascimento}
                    />
                  </div>
                  <div className="col">
                    <small className="text-muted fw-bolder">CPF</small>
                    <Input
                      onChange={(e) => onChange('cpf', e.target.value)}
                      value={usersFields.cpf}
                    />
                    <small className="text-muted fw-bolder">Telefone</small>
                    <Input
                      onChange={(e) => onChange('telefone', e.target.value)}
                      value={usersFields.telefone}
                    />
                    <small className="text-muted fw-bolder">Email</small>
                    <Input
                      onChange={(e) => onChange('email', e.target.value)}
                      value={usersFields.email}
                    />
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <Button color="success" onClick={() => handleModifyUser(usersFields)}>
                      Salvar
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}
