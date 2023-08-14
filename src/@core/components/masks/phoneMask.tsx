/* eslint-disable no-unused-vars */
import Cleave from 'cleave.js/react'

interface phoneMaskTypeInterface {
  value?: string
  onChange?: (value: string) => void
  isInvalid?: boolean
  onBlur?: (value: string) => void
  placehHolder?: string
  defaultValue?: string
  id?: string
  className?: string
  placeholder?: string
}
const PhoneMask = ({
  value,
  onChange,
  isInvalid,
  onBlur,
  id,
  placeholder,
  defaultValue,
  className
}: phoneMaskTypeInterface) => {
  const handleChange = (event: any) => {
    /* const rawValue = event.target.rawValue */ // Valor não formatado

    // Chamando a função de callback para passar o valor não formatado
    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (typeof onBlur === 'function') {
      onBlur(event.target.value)
    }
  }
  return (
    <Cleave
      placeholder={placeholder}
      options={{ phone: true, phoneRegionCode: 'BR' }}
      id={id}
      value={value}
      onChange={handleChange}
      onBlur={onBlur ? handleBlur : undefined}
      defaultValue={defaultValue}
      className={`form-control ${isInvalid ? 'is-invalid' : ''} ${className || ''}`}
    />
  )
}

export default PhoneMask
