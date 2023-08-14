/* eslint-disable no-unused-vars */
import Cleave from 'cleave.js/react'

interface CPFMaskProps {
  value: string
  onChange?: (value: string) => void
  isInvalid?: boolean
  onBlur?: (value: string) => void
  placeholder?: string
  defaultValue?: string
  id?: string
  className?: string
}
const CpfMask = ({ value, onChange, isInvalid, onBlur, className, placeholder }: CPFMaskProps) => {
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
      options={{ blocks: [3, 3, 3, 2], delimiters: ['.', '.', '-'], numericOnly: true }}
      id="cpf"
      value={value}
      onChange={handleChange}
      onBlur={onBlur ? handleBlur : undefined}
      className={`form-control ${isInvalid ? 'is-invalid' : ''} ${className || ''}`}
    />
  )
}

export default CpfMask
