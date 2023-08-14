/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Cleave from 'cleave.js/react'

interface PasswordMaskProps {
  value: string
  onChange?: (value: string) => void
  isInvalid?: boolean
  onBlur?: (value: string) => void
  onEnterPress?: () => void // Função chamada quando a tecla Enter é pressionada
  placeholder?: string
  id?: string
  className?: string
}

const PasswordMask = ({
  value,
  onChange,
  isInvalid,
  onBlur,
  onEnterPress,
  className,
  placeholder
}: PasswordMaskProps) => {
  const [isValidPassword, setIsValidPassword] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    if (newValue === '') {
      setIsValidPassword(true) // Se o campo estiver vazio, não exibir erro
    } else {
      // Realize a validação do valor da senha aqui (pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      const isValid = passwordRegex.test(newValue)
      setIsValidPassword(isValid)
    }

    if (typeof onChange === 'function') {
      onChange(newValue)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (typeof onBlur === 'function') {
      onBlur(event.target.value)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault() // Evita o comportamento padrão do formulário ao pressionar Enter
      if (typeof onEnterPress === 'function') {
        onEnterPress()
      }
    }
  }

  return (
    <div className="password-mask-container">
      <Cleave
        placeholder={placeholder}
        options={{ blocks: [20], numericOnly: false }}
        id="password"
        type="password"
        value={value}
        onChange={handleChange}
        onBlur={onBlur ? handleBlur : undefined}
        onKeyDown={handleKeyDown} // Adiciona o evento onKeyDown para capturar a tecla Enter
        className={`form-control ${
          isInvalid || (!isValidPassword && value !== '') ? 'is-invalid' : ''
        } ${className || ''}`}
      />
      {value !== '' && !isValidPassword && (
        <div className="invalid-feedback">
          A senha deve conter pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e
          caracteres especiais.
        </div>
      )}
    </div>
  )
}

export default PasswordMask
