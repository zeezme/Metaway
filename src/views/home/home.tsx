import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Fragment, useEffect, useState } from 'react'
import Select from 'react-select'

import {
  updateContact,
  deleteContact,
  deleteFavorite,
  getFavoritesList,
  getFilteredContactsList,
  resetFields,
  setContactFavorite,
  setContactInFocus,
  setFieldsValues,
  setPerson,
  createContact
} from './store/homeStore'
import { Button, Card, CardBody, Input, Modal, ModalBody, ModalHeader } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { MdAdd, MdEdit, MdFavorite } from 'react-icons/md'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Trash } from 'react-feather'
import { searchPeople } from '../people/store/peopleStore'
import PhoneMask from '../../@core/components/masks/phoneMask'
import { show as showModal } from '../../@core/components/modals/utils'

export default function Home() {
  const loggedUserData = useSelector((state: RootState) => state.globalReducer.user.id)
  const contactsList = useSelector((state: RootState) => state.homeStore.contactList)
  const favoritesList = useSelector((state: RootState) => state.homeStore.favoritesList)
  const searchTerm = useSelector((state: RootState) => state.homeStore.fields.termo)
  const contactFields = useSelector((state: RootState) => state.homeStore.fields)
  const peopleList = useSelector((state: RootState) => state.peopleStore.peopleList)
  const theme = useSelector((state: RootState) => state.globalReducer.theme)
  const [show, setShow] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const dispatch: AppDispatch = useDispatch()

  const handleFavorite = (contact: any) => {
    if (
      favoritesList.some((favorite: any) => {
        return favorite.id === contact.id
      })
    ) {
      dispatch(deleteFavorite({ contactId: contact.id }))
    } else {
      dispatch(setContactFavorite({ contact }))
    }
  }

  const handleEditButton = (contact: any) => {
    dispatch(setContactInFocus(contact))
    setShow(true)
  }

  const submit = () => {
    dispatch(getFilteredContactsList({ data: searchTerm }))
  }

  const submitChange = () => {
    showModal.showConfirmation(
      'Você tem certeza que deseja alterar este contato?',
      () => {},
      () => dispatch(updateContact({ contact: contactFields }))
    )
  }

  const onChange = (field: any, value: any) => {
    dispatch(setFieldsValues({ field, value }))
  }

  const handleDeleteContact = (contact: any) => {
    showModal.showConfirmation(
      'Você tem certeza que deseja excluir este contato?',
      () => {},
      () => dispatch(deleteContact({ contactId: contact.id }))
    )
  }

  const handleAddButton = () => {
    setShowAdd(true)
    dispatch(resetFields())
  }

  const submitCreateContact = () => {
    showModal.showConfirmation(
      'Você tem certeza que deseja adicionar este contato?',
      () => {},
      () =>
        // eslint-disable-next-line implicit-arrow-linebreak
        dispatch(
          createContact({
            data: {
              tag: contactFields.tag,
              email: contactFields.email,
              telefone: contactFields.telefone,
              tipoContato: contactFields.tipoContato,
              privado: contactFields.privado,
              pessoa: {
                id: contactFields.pessoa.id
              }
            },
            callback: () => {
              setShowAdd(false)
            }
          })
        )
    )
  }

  useEffect(() => {
    dispatch(searchPeople())
    if (loggedUserData !== undefined) {
      dispatch(getFavoritesList())
      dispatch(getFilteredContactsList({}))
    }
  }, [])

  const chooseTheme = theme === 'light' ? 'metawayLight' : 'metawayDark'
  const chooseColors =
    theme === 'light'
      ? { text: 'text-white', theme: '', button: 'dark' }
      : { text: 'text-dark', theme: 'dark', button: 'secondary' }

  const tipoContato = [
    { value: 'TELEFONE', label: 'Telefone' },
    { value: 'CELULAR', label: 'Celular' },
    { value: 'EMAIL', label: 'Email' }
  ]

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: theme === 'light' ? '1px solid #dee2e6' : '1px solid #495057'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#343a40' : 'transparent'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: theme === 'light' ? 'black' : 'white'
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: theme === 'light' ? 'white' : '#212529'
    })
  }

  const columns = [
    {
      name: 'Nome',
      selector: (row: any) => row.pessoa.nome
    },
    {
      name: 'Ações',
      selector: (row: any) => {
        return (
          <Fragment>
            <Button
              color=""
              onClick={() => {
                handleFavorite(row)
              }}>
              {favoritesList.some((favorite: any) => {
                return favorite.id === row.id
              }) ? (
                <MdFavorite className="text-danger" />
              ) : (
                <MdFavorite className="text-secondary" />
              )}
            </Button>
            <Button color="" onClick={() => handleEditButton(row)}>
              <MdEdit size={22} />
            </Button>
            <Button color="" onClick={() => handleDeleteContact(row)}>
              <Trash size={20} className="text-danger" />
            </Button>
          </Fragment>
        )
      }
    }
  ]

  return (
    <Fragment>
      <Modal isOpen={showAdd} toggle={() => handleAddButton()}>
        <ModalHeader toggle={() => setShowAdd(!showAdd)}></ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column">
            <small className=" fw-bold">Escolha a pessoa</small>
            <Select
              placeholder="Escolha"
              className="mb-3"
              onChange={(e) => dispatch(setPerson(e))}
              getOptionLabel={(option: any) => option.nome}
              getOptionValue={(option: any) => option.id}
              options={peopleList}
              styles={customStyles}
            />
            <small className=" fw-bold">Email</small>
            <Input className="mb-3" onChange={(e) => onChange('email', e.target.value)} />
            <small className=" fw-bold">Telefone</small>
            <PhoneMask className="mb-3" onChange={(e) => onChange('telefone', e)} />
            <small className=" fw-bold">Tag</small>
            <Input className="mb-3" onChange={(e) => onChange('tag', e.target.value)} />

            <small className=" fw-bold">Tipo do Contato</small>
            <Select
              placeholder="Escolha"
              className="mb-3"
              options={tipoContato}
              styles={customStyles}
              onChange={(e) => onChange('tipoContato', e?.value)}
            />

            <small className=" fw-bold">Privado</small>
            <Input
              className="mb-3"
              type="checkbox"
              onChange={(e) => onChange('privado', e.target.checked)}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button color="dark" onClick={() => submitCreateContact()}>
              Salvar
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={show} toggle={() => setShow(!show)}>
        <ModalHeader toggle={() => setShow(!show)}>
          <div className="m-0 p-0">
            <h4 className="fw-bold text-success m-0 p-0">{contactFields?.pessoa?.nome}</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column">
            <small className=" fw-bold">Email</small>
            <Input
              className="mb-3"
              value={contactFields?.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
            <small className=" fw-bold">Telefone</small>
            <PhoneMask
              className="mb-3"
              value={contactFields?.telefone}
              onChange={(e) => onChange('telefone', e)}
            />
            <small className=" fw-bold">Tag</small>
            <Input
              className="mb-3"
              value={contactFields?.tag}
              onChange={(e) => onChange('tag', e.target.value)}
            />

            <small className=" fw-bold">Tipo do Contato</small>
            <Select
              placeholder="Escolha"
              className="mb-3"
              options={tipoContato}
              styles={customStyles}
              value={tipoContato.find((option) => option.value === contactFields?.tipoContato)}
              onChange={(e) => onChange('tipoContato', e?.value)}
            />

            <small className=" fw-bold">Privado</small>
            <Input
              disabled
              className="mb-3"
              type="checkbox"
              checked={contactFields?.privado}
              onChange={(e) => onChange('privado', e.target.checked)}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button color={chooseColors.button} onClick={submitChange}>
              Salvar
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Card color={chooseColors.theme}>
        <CardBody>
          <div className="d-flex flex-row">
            <Input
              placeholder="Pesquisar"
              className=" me-3"
              value={searchTerm}
              onChange={(e) => {
                dispatch(setFieldsValues({ field: 'termo', value: e.target.value }))
              }}
            />
            <Button
              outline
              className="me-2"
              color={chooseColors.button}
              onClick={() => setShowAdd(true)}>
              <MdAdd size={20} />
            </Button>
            <Button outline color={chooseColors.button} onClick={submit}>
              <PiMagnifyingGlass size={20} />
            </Button>
          </div>
        </CardBody>
      </Card>
      <div className="row mt-3">
        <div className="col">
          <h4 className="fw-bold">Contatos</h4>
          <Card>
            <CardBody>
              <DataTable columns={columns} data={contactsList} theme={chooseTheme} pagination />
            </CardBody>
          </Card>
        </div>
        {favoritesList.length > 0 && (
          <div className="col">
            <h4 className="fw-bold">Favoritos</h4>
            <Card>
              <CardBody>
                <div>
                  <DataTable
                    columns={columns}
                    data={favoritesList}
                    theme={chooseTheme}
                    pagination
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </Fragment>
  )
}
