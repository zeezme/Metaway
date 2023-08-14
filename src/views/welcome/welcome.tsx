import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Fragment } from 'react'
/* import { PiArrowLeft } from 'react-icons/pi' */

export default function Welcome() {
  const loggedUser = useSelector((state: RootState) => state.globalReducer.user.username)

  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <div className="h3">
            Bem vindo de volta <span className="fw-bolder text-success h3 ms-1">{loggedUser}</span>{' '}
            !
          </div>
          {/* <div className="d-flex flex-column justify-content-start mt-3 h5">
            Utilize o menu ao lado para navegar no nosso sistema
            <PiArrowLeft className="mt-3" size={80} />
          </div> */}
        </div>
      </div>
    </Fragment>
  )
}
