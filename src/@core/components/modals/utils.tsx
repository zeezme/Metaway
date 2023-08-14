import { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import toast from 'react-hot-toast'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'

const CustomError = ({ message, message2 }: { message: string; message2?: string }) => {
  const themeReverse = useSelector((state: RootState) => state.globalReducer.themeReverse)
  const [show, setShow] = useState(true)

  return (
    <Modal className="modal-dialog-centered" isOpen={show}>
      <ModalHeader className="text-danger">Ops...</ModalHeader>
      <ModalBody>
        <p className="text-danger text-break">{message}</p>
        <p className="text-danger">{message2}</p>
      </ModalBody>
      <ModalFooter>
        <Button color={`${themeReverse}`} onClick={() => setShow(false)}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export const CustomConfirmation = ({
  text,
  onClickNo,
  onClickYes
}: {
  text?: string
  onClickNo?: () => void
  onClickYes?: () => void
}) => {
  const [isActive, setIsActive] = useState(true)

  return (
    <Modal className="modal-dialog-centered" isOpen={isActive}>
      <ModalHeader>Atenção</ModalHeader>
      <ModalBody>{text ? <h5>{text}</h5> : null}</ModalBody>
      <ModalFooter className="d-flex flex-row justify-content-center">
        <Button
          color="dark"
          onClick={() => {
            if (onClickYes) {
              onClickYes()
            }
            setIsActive(false)
          }}>
          Sim
        </Button>
        <Button
          color="dark"
          onClick={() => {
            if (typeof onClickNo === 'function') onClickNo()
            setIsActive(false)
          }}>
          Não
        </Button>
      </ModalFooter>
    </Modal>
  )
}
const CustomSuccess = ({ message }: { message: string }) => {
  const [show, setShow] = useState(true)

  return (
    <Modal className="modal-dialog-centered" isOpen={show}>
      <ModalHeader className="text-success">Sucesso!</ModalHeader>
      <ModalBody>
        {message ? (
          Array.isArray(message) ? (
            message.map((err, index) => {
              return <li key={index}>{err}</li>
            })
          ) : (
            <span className="h5">{message}</span>
          )
        ) : null}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setShow(false)}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export const show = {
  error: (message: string, message2?: string) => {
    toast.custom(<CustomError message={message} message2={message2}></CustomError>)
  },
  success: (message: string) => {
    toast.custom(<CustomSuccess message={message}></CustomSuccess>)
  },
  toast: (message: string, color?: string) => {
    toast.success(
      <span
        className={`text-${color ? color : 'success'}  p-0 m-0 d-flex flex-row align-items-center`}>
        {message}
      </span>
    )
  },
  showConfirmation: (
    text: string | undefined,
    onClickNo: (() => void) | undefined,
    onClickYes: (() => void) | undefined
  ) => {
    toast.custom(<CustomConfirmation text={text} onClickNo={onClickNo} onClickYes={onClickYes} />)
  },
  toastError: (message: string) => {
    toast.error(<span className={'p-0 m-0 d-flex flex-row align-items-center'}>{message}</span>)
  }
}
