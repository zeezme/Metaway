import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import {
  createPerson,
  deletePerson,
  /* downloadImage, */
  enderecoInterface,
  getFromCep,
  modifyPerson,
  pessoaInterface,
  resetFields,
  searchPeople,
  setAddressValues,
  setFieldsValues,
  setImage,
  setPersonInFocus,
  setSearchTerm
} from './store/peopleStore'
import { Button, Card, CardBody, Input, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PiMagnifyingGlass } from 'react-icons/pi'
import DataTable from 'react-data-table-component'
import { MdAdd, MdEdit } from 'react-icons/md'
import { Trash } from 'react-feather'
import CpfMask from '../../@core/components/masks/cpfMask'
import NumberMask from '../../@core/components/masks/numberMask'
import CepMask from '../../@core/components/masks/cepMask'
import { show as showModal } from '../../@core/components/modals/utils'

export default function People() {
  const theme = useSelector((state: RootState) => state.globalReducer.theme)
  const peopleList = useSelector((state: RootState) => state.peopleStore.peopleList)
  const peopleFields = useSelector((state: RootState) => state.peopleStore.fields)
  const searchTerm = useSelector((state: RootState) => state.peopleStore.searchTerm)

  const dispatch: AppDispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [editShow, setEditShow] = useState(false)

  const onChange = (field: keyof pessoaInterface, value: any) => {
    dispatch(setFieldsValues({ field, value }))
  }
  const onChangeAddress = (field: keyof enderecoInterface, value: any) => {
    dispatch(setAddressValues({ field, value }))
  }

  const handleCep = (cep: string) => {
    dispatch(getFromCep(cep))
  }

  const submit = () => {
    showModal.showConfirmation(
      'Tem certeza que deseja salvar?',
      () => {},
      () => dispatch(createPerson({ data: peopleFields, callback: () => setShow(false) }))
    )
  }
  const submitChanges = () => {
    showModal.showConfirmation(
      'Tem certeza que deseja alterar?',
      () => {},
      () => dispatch(modifyPerson({ data: peopleFields, callback: () => setShow(false) }))
    )
  }

  const HandleSearchPeople = (nome: string) => {
    dispatch(searchPeople(nome))
  }

  /*   const handleImageDownload = (id: any) => {
    dispatch(downloadImage(id))
  } */

  const handleImage = (event: any) => {
    const arquivo = event.target.files[0]
    dispatch(setImage({ image: arquivo }))
  }

  const handleEditButton = (row: any) => {
    dispatch(setPersonInFocus(row))
    setEditShow(true)
  }

  const handleAddButton = () => {
    setShow(true)
    dispatch(resetFields())
  }

  const handleDeletePeople = (row: any) => {
    showModal.showConfirmation(
      'Tem certeza que deseja excluir?',
      () => {},
      () => dispatch(deletePerson(row))
    )
  }

  const chooseTheme = theme === 'light' ? 'metawayLight' : 'metawayDark'

  const chooseColors =
    theme === 'light'
      ? { text: 'text-white', theme: '', button: 'dark' }
      : { text: 'text-dark', theme: 'dark', button: 'secondary' }

  const columns = [
    {
      name: 'Ações',
      width: '100px',
      cell: (row: any) => (
        <Fragment>
          <div className="d-flex align-items-center flex-row">
            <Button className="me-2 p-0" color="" onClick={() => handleEditButton(row)}>
              <MdEdit size={20} />
            </Button>
            <Button color="" className="ms-2 p-0" onClick={() => handleDeletePeople(row)}>
              <Trash className="text-danger" size={20} />
            </Button>
          </div>
        </Fragment>
      )
    },
    {
      name: 'Nome',
      selector: (row: any) => row.nome
    },
    {
      name: 'Cidade',
      selector: (row: any) => row.endereco.cidade
    },
    {
      name: 'CPF',
      selector: (row: any) => row.cpf
    }
  ]

  useEffect(() => {
    dispatch(searchPeople())
  }, [])

  /*   useEffect(() => {
    if (personInFocus.nome !== '') {
      if (personInFocus.foto !== null || personInFocus.foto !== undefined) {
        handleImageDownload(personInFocus?.id)
      }
    }
  }, [personInFocus]) */

  return (
    <Fragment>
      <Modal isOpen={show} toggle={() => setShow(false)}>
        <ModalHeader toggle={() => setShow(false)}>Adicionar Pessoa</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col">
              <small className=" fw-bold">Nome</small>
              <Input
                className="mb-3"
                onChange={(e) => onChange('nome', e.target.value)}
                value={peopleFields.nome}
              />
              <small className=" fw-bold">CPF</small>
              <CpfMask
                className="mb-3"
                onChange={(e) => onChange('cpf', e)}
                value={peopleFields.cpf}
              />
              <small className=" fw-bold">CEP</small>
              <CepMask className="mb-3" onBlur={(e) => handleCep(e)} />
              <small className=" fw-bold">Pais</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('pais', e.target.value)}
                value={peopleFields.endereco.pais}
              />
              <small className=" fw-bold">Estado</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('estado', e.target.value)}
                value={peopleFields.endereco.estado}
              />
            </div>
            <div className="col">
              <small className=" fw-bold">Cidade</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('cidade', e.target.value)}
                value={peopleFields.endereco.cidade}
              />
              <small className=" fw-bold">Número</small>
              <NumberMask
                className="mb-3"
                onChange={(e) => onChangeAddress('numero', e)}
                value={peopleFields.endereco.numero}
              />
              <small className=" fw-bold">Bairro</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('bairro', e.target.value)}
                value={peopleFields.endereco.bairro}
              />
              <small className=" fw-bold">Logradouro</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('logradouro', e.target.value)}
                value={peopleFields.endereco.logradouro}
              />
              <small className=" fw-bold">Foto</small>
              <Input
                type="file"
                accept="image/*"
                className="mb-3"
                onChange={(e) => handleImage(e)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button color="dark" onClick={() => submit()}>
              Salvar
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={editShow} toggle={() => setEditShow(false)}>
        <ModalHeader toggle={() => setEditShow(false)}>Editar Pessoa</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col">
              <small className=" fw-bold">Nome</small>
              <Input
                className="mb-3"
                onChange={(e) => onChange('nome', e.target.value)}
                value={peopleFields?.nome}
              />
              <small className=" fw-bold">CPF</small>
              <CpfMask
                className="mb-3"
                onChange={(e) => onChange('cpf', e)}
                value={peopleFields?.cpf}
              />

              <small className=" fw-bold">Pais</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('pais', e.target.value)}
                value={peopleFields?.endereco?.pais}
              />
              <small className=" fw-bold">Estado</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('estado', e.target.value)}
                value={peopleFields?.endereco?.estado}
              />
            </div>
            <div className="col">
              <small className=" fw-bold">Cidade</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('cidade', e.target.value)}
                value={peopleFields?.endereco?.cidade}
              />
              <small className=" fw-bold">Número</small>
              <NumberMask
                className="mb-3"
                onChange={(e) => onChangeAddress('numero', e)}
                value={peopleFields?.endereco?.numero}
              />
              <small className=" fw-bold">Bairro</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('bairro', e.target.value)}
                value={peopleFields?.endereco?.bairro}
              />
              <small className=" fw-bold">Logradouro</small>
              <Input
                className="mb-3"
                onChange={(e) => onChangeAddress('logradouro', e.target.value)}
                value={peopleFields?.endereco?.logradouro}
              />
            </div>
            <div>
              <small className=" fw-bold">Foto</small>
              <Input
                type="file"
                accept="image/*"
                className="mb-3"
                value={peopleFields?.downloaded}
              />
              <img src={'https://demometaway.vps-kinghost.net:8485/api/foto/download/8/'} />
            </div>
            <div className="d-flex justify-content-end">
              <Button color="dark" onClick={() => submitChanges()}>
                Salvar
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Card>
        <CardBody>
          <div className="d-flex flex-row">
            <Input
              className="me-3"
              placeholder="Pesquisar"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <Button
              className="me-2"
              color={chooseColors.button}
              outline
              onClick={() => handleAddButton()}>
              <MdAdd size={20} />
            </Button>
            <Button
              color={chooseColors.button}
              outline
              onClick={() => HandleSearchPeople(searchTerm)}>
              <PiMagnifyingGlass size={20} />
            </Button>
          </div>
        </CardBody>
      </Card>

      <div className="row mt-5">
        <div className="col">
          <Card>
            <CardBody>
              <DataTable
                columns={columns}
                data={peopleList}
                theme={chooseTheme}
                pagination={true}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </Fragment>
  )
}
