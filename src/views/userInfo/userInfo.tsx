import { Fragment, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, Input, Modal, ModalBody, ModalHeader } from 'reactstrap'
import {
  changePassword,
  getLoggedUser,
  modifyLoggedUser,
  passwordChangeInterface,
  setFieldsValues,
  setPasswordFields,
  userInterface
} from './store/userInfoStore'
import { MdEdit } from 'react-icons/md'
import LowerCaseMask from '../../@core/components/masks/lowerCaseMask'
import CpfMask from '../../@core/components/masks/cpfMask'
import DateMask from '../../@core/components/masks/dateMask'
import PhoneMask from '../../@core/components/masks/phoneMask'
import { show } from '../../@core/components/modals/utils'
import PasswordMask from '../../@core/components/masks/passwordMask'

export default function UserInfo() {
  const [editMode, setEditMode] = useState(false)
  const [passwordChange, setPasswordChange] = useState(false)
  const userFields = useSelector((state: RootState) => state.userInfoStore.fields)
  const passwordChangeFields = useSelector((state: RootState) => state.userInfoStore.passwordChange)
  const theme = useSelector((state: RootState) => state.globalReducer.theme)
  const loggedUser = useSelector((state: RootState) => state.globalReducer.user.username)

  const dispatch: AppDispatch = useDispatch()

  const onChange = (field: keyof userInterface, value: string) => {
    dispatch(setFieldsValues({ field, value }))
  }

  const onChangePasswordFields = (field: keyof passwordChangeInterface, value: string) => {
    dispatch(setPasswordFields({ field, value }))
  }

  const submit = () => {
    const _submit = () => {
      dispatch(modifyLoggedUser(userFields))
      setEditMode(false)
    }
    show.showConfirmation(
      'Tem certeza que deseja alterar seus dados?',
      () => {},
      () => {
        _submit()
      }
    )
  }

  const submitPasswordChange = () => {
    show.showConfirmation(
      'Tem certeza que deseja alterar sua senha?',
      () => {},
      () => dispatch(changePassword(passwordChangeFields))
    )
  }

  const chooseColors =
    theme === 'light'
      ? { text: 'text-white', theme: '', button: 'dark' }
      : { text: 'text-dark', theme: 'dark', button: 'secondary' }

  useEffect(() => {
    dispatch(getLoggedUser())
  }, [])

  return (
    <Fragment>
      <Modal isOpen={passwordChange} toggle={() => setPasswordChange(!passwordChange)}>
        <ModalHeader toggle={() => setPasswordChange(!passwordChange)}>Alterar senha</ModalHeader>
        <ModalBody>
          <small className="fw-bolder">Username</small>
          <Input className="mb-3" disabled value={loggedUser} />
          <small className="fw-bolder">Senha</small>
          <Input
            className="mb-3"
            onChange={(e) => onChangePasswordFields('password', e.target.value)}
            type="password"
            value={passwordChangeFields.password}
          />
          <small className="fw-bolder">Nova Senha</small>
          <PasswordMask
            className="mb-3"
            onChange={(e) => onChangePasswordFields('newPassword', e)}
            value={passwordChangeFields.newPassword}
          />
          <div className="d-flex justify-content-end">
            <Button color="dark" onClick={() => submitPasswordChange()}>
              Salvar
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <span className="fw-bolder h4 m-0 p-0 d-flex align-items-center">
              Cadastro de <span className="fw-bolder text-success ms-2">{userFields.nome}</span>
            </span>
            <Button color={chooseColors.button} outline onClick={() => setEditMode(!editMode)}>
              <MdEdit size={20} />
            </Button>
          </div>
        </CardBody>
      </Card>

      <div className="row">
        <div className="col">
          <Card className="mt-3">
            <CardBody>
              <div className="d-flex justify-content-end">
                {editMode ? (
                  <span className="fw-bolder text-danger">Editando</span>
                ) : (
                  <span className=" text-success">Visualizando</span>
                )}
              </div>
              <div className="d-flex flex-column">
                <small className="fw-bolder">Nome</small>
                {editMode ? (
                  <Input
                    className="mb-3"
                    onChange={(e) => onChange('nome', e.target.value)}
                    value={userFields.nome}
                  />
                ) : (
                  <span className="mb-3">{userFields.nome}</span>
                )}

                <small className="fw-bolder">Username</small>
                {editMode ? (
                  <LowerCaseMask
                    className="mb-3"
                    onChange={(e) => onChange('username', e)}
                    value={userFields.username}
                  />
                ) : (
                  <span className="mb-3">{userFields.username}</span>
                )}
                <small className="fw-bolder">CPF</small>
                {editMode ? (
                  <CpfMask
                    className="mb-3"
                    onChange={(e) => onChange('cpf', e)}
                    value={userFields.cpf}
                  />
                ) : (
                  <span className="mb-3">{userFields.cpf}</span>
                )}
                <small className="fw-bolder">Data de nascimento</small>
                {editMode ? (
                  <DateMask
                    className="mb-3"
                    onChange={(e) => onChange('dataNascimento', e)}
                    value={userFields.dataNascimento}
                  />
                ) : (
                  <span className="mb-3">{userFields.dataNascimento}</span>
                )}
                <small className="fw-bolder">Email</small>
                {editMode ? (
                  <Input
                    className="mb-3"
                    onChange={(e) => onChange('email', e.target.value)}
                    value={userFields.email}
                  />
                ) : (
                  <span className="mb-3">{userFields.email}</span>
                )}
                <small className="fw-bolder">Telefone</small>
                {editMode ? (
                  <PhoneMask
                    className="mb-3"
                    onChange={(e) => onChange('telefone', e)}
                    value={userFields.telefone}
                  />
                ) : (
                  <span className="mb-3">{userFields.telefone}</span>
                )}
              </div>
              {editMode && (
                <div className="d-flex justify-content-between">
                  <Button color="dark" onClick={() => setPasswordChange(true)}>
                    Alterar Senha
                  </Button>
                  <Button color="dark" onClick={submit}>
                    Salvar
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </Fragment>
  )
}
