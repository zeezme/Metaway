/* eslint-disable no-unused-vars */
import React from 'react'
import Cleave from 'cleave.js/react'

interface dateMaskTypeInterface {
  value: string
  onChange?: (value: string) => void
  isInvalid?: boolean
  onBlur?: (value: string) => void
  placeholder?: string
  defaultValue?: string
  id?: string
  className?: string
}

const DateMask = ({
  value,
  onChange,
  isInvalid,
  onBlur,
  id,
  placeholder,
  defaultValue,
  className
}: dateMaskTypeInterface) => {
  const handleChange = (event: any) => {
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
      options={{ date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-' }}
      id={id}
      value={value}
      onChange={handleChange}
      onBlur={onBlur ? handleBlur : undefined}
      defaultValue={defaultValue}
      className={`form-control ${isInvalid ? 'is-invalid' : ''} ${className || ''}`}
    />
  )
}

export default DateMask
