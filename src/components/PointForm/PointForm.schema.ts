import {
  object as yupObject,
  string as yupNumber,
} from 'yup'

const exerciseSchema = (name: string) => {
  return yupNumber()
    .transform(value => (!Number(value) ? 0 : Number(value)))
    .typeError(`${name} deve ser um número`)
    .min(0, `${name} deve ser maior ou igual a 0`)
    .required(`${name} é obrigatório`)
}

export const pointFormSchema = yupObject().shape({
  push_ups: exerciseSchema('Flexões'),
  pull_ups: exerciseSchema('Barra Fixa'),
  burpees: exerciseSchema('Burp'),
  sit_ups: exerciseSchema('Abdominais'),
  running: exerciseSchema('Corrida'),
  rope: exerciseSchema('Corda'),
  squats: exerciseSchema('Agachamentos'),
  leg_lifts: exerciseSchema('Elevação de perna'),
  swimming: exerciseSchema('Natação'),
  climbing: exerciseSchema('Escalador'),
})