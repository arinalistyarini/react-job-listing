'use client';

import { useState } from 'react'

// https://www.codevertiser.com/react-forms-best-practices/
export function useForm(formState: Record<string, any>) {
  const [form, setForm] = useState(formState)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, isCheckbox?: boolean) => {
    const { name, value, checked } = e.target as HTMLInputElement

    setForm({ ...form, [name]: isCheckbox ? checked : value })
  }

  const onSubmitForm = (e: Event) => {
    e.preventDefault()
  }

  return {
    form,
    onChangeInput,
    onSubmitForm,
  }
}
