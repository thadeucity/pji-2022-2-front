import {
  string as yupString,
  object as yupObject
} from 'yup'

export const groupFormSchema = yupObject().shape({
  name: yupString()
    .typeError('Nome do grupo é obrigatório')
    .required('Nome do grupo é obrigatório')
    .min(5, 'Nome do grupo deve ter no mínimo 5 caracteres')
    .max(50, 'Nome do grupo deve ter no máximo 50 caracteres')
})