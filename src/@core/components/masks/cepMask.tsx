/* eslint-disable no-unused-vars */
import React from 'react'
import Cleave from 'cleave.js/react'

interface CepMaskProps {
  value?: string
  onChange?: (value: string) => void
  isInvalid?: boolean
  onBlur?: (value: string) => void
  className?: string
}

const CepMask = ({ value, onChange, isInvalid, onBlur, className }: CepMaskProps) => {
  const handleChange = (event: any) => {
    const rawValue = event.target.rawValue // Valor não formatado

    // Chamando a função de callback para passar o valor não formatado
    if (typeof onChange === 'function') {
      onChange(rawValue)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (typeof onBlur === 'function') {
      onBlur(event.target.value)
    }
  }

  return (
    <Cleave
      placeholder="00000-000"
      options={{ blocks: [5, 3], delimiters: ['-'], numericOnly: true }}
      id="cep"
      value={value}
      onChange={handleChange}
      onBlur={onBlur ? handleBlur : undefined}
      className={`form-control ${isInvalid ? 'is-invalid' : ''} ${className || ''}`}
    />
  )
}

export default CepMask
