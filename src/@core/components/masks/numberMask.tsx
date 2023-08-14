/* eslint-disable no-unused-vars */
import Cleave from 'cleave.js/react'

interface numberMaskTypeInterface {
  value?: any
  onChange?: (value: string) => void
  isInvalid?: boolean
  onBlur?: (value: string) => void
  placehHolder?: string
  defaultValue?: string
  id?: string
  className?: string
  placeholder?: string
}
const NumberMask = ({
  value,
  onChange,
  isInvalid,
  onBlur,
  id,
  placeholder,
  defaultValue,
  className
}: numberMaskTypeInterface) => {
  const handleChange = (event: any) => {
    /* const rawValue = event.target.rawValue */ // Valor não formatado

    // Chamando a função de callback para passar o valor não formatado
    if (typeof onChange === 'function') {
      onChange(event.target.value.toString())
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
      options={{ numericOnly: true, numeralThousandsGroupStyle: 'none' }}
      id={id}
      value={value}
      onChange={handleChange}
      onBlur={onBlur ? handleBlur : undefined}
      defaultValue={defaultValue}
      className={`form-control ${isInvalid ? 'is-invalid' : ''} ${className || ''}`}
    />
  )
}

export default NumberMask
