/* eslint-disable no-unused-vars */
import React from 'react'
import Cleave from 'cleave.js/react'

interface LowerCaseMaskProps {
  value: string
  onChange?: (value: string) => void
  isInvalid?: boolean
  onBlur?: (value: string) => void
  placeholder?: string
  defaultValue?: string
  id?: string
  className?: string
}

const LowerCaseMask = ({
  value,
  onChange,
  isInvalid,
  onBlur,
  id,
  placeholder,
  defaultValue,
  className
}: LowerCaseMaskProps) => {
  const handleChange = (event: any) => {
    const rawValue = event.target.rawValue // Valor não formatado
    const lowercaseValue = rawValue.toLowerCase().replace(/[^\w\s]/g, '') // Remover caracteres especiais

    // Chamando a função de callback para passar o valor convertido em minúsculas sem caracteres especiais
    if (typeof onChange === 'function') {
      onChange(lowercaseValue)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (typeof onBlur === 'function') {
      const rawValue = event.target.value
      const lowercaseValue = rawValue.toLowerCase().replace(/[^a-z]/g, '') // Remover caracteres especiais
      onBlur(lowercaseValue)
    }
  }

  return (
    <Cleave
      placeholder={placeholder}
      id={id}
      options={{ lowercase: true }}
      value={value}
      onChange={handleChange}
      onBlur={onBlur ? handleBlur : undefined}
      defaultValue={defaultValue}
      className={`form-control ${isInvalid ? 'is-invalid' : ''} ${className || ''}`}
    />
  )
}

export default LowerCaseMask
