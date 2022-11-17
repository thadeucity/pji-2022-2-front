import { NextApiRequest, NextApiResponse } from "next"
import { apiHandler } from "../../_api/apiHandler"

const getDateActivities = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { date } = req.query

  if (!date) {
    return res.status(400).json({
      error: "Date is required.",
    })
  }

  const mokedExercises = [
    {
      email: 'joao@mail.com',
      name: 'João das Neves',
      points: 1250,
      exercises: [
        { label: 'Flexões', val: 50, suffix: '' },
        { label: 'Barra Fixa', val: 20, suffix: '' },
        { label: 'Burp', val: 120, suffix: '' },
        { label: 'Abdominais', val: 250, suffix: '' },
        { label: 'Corrida', val: 2, suffix: 'km' },
        { label: 'Corda', val: 10, suffix: 'min' },
      ]
    },
    {
      email: 'felipe@mail.com',
      name: 'Felipe Marino',
      points: 985,
      exercises: [
        { label: 'Fexões', val: 45, suffix: '' },
        { label: 'Barra Fixa', val: 22, suffix: '' },
        { label: 'Burp', val: 70, suffix: '' },
        { label: 'Agachamentos', val: 150, suffix: '' },
        { label: 'Escalador', val: 200, suffix: '' }
      ]
    },
    {
      email: 'rocky@mail.com',
      name: 'Rocky Balboa',
      points: 889,
      exercises: [
        { label: 'Fexões', val: 45, suffix: '' },
        { label: 'Barra Fixa', val: 22, suffix: '' },
        { label: 'Elevação de perna', val: 70, suffix: '' },
        { label: 'Escalador', val: 200, suffix: '' }
      ]
    },
    {
      email: 'johane@mail.com',
      name: 'Johane Doe',
      points: 750,
      exercises: [
        { label: 'Flexões', val: 50, suffix: '' },
        { label: 'Corrida', val: 2, suffix: 'km' },
        { label: 'Corda', val: 10, suffix: 'min' },
      ]
    },
    {
      email: 'mariadasflores@mail.com',
      name: 'Maria das Flores',
      points: 500,
      exercises: [
        { label: 'Natação', val: 40, suffix: 'min' },
        { label: 'Corrida', val: 1, suffix: 'km' },
        { label: 'Corda', val: 2, suffix: 'min' },
      ]
    },
    {
      email: 'arlindosilva@mail.com',
      name: 'Arlindo Silva',
      points: 250,
      exercises: [
        { label: 'Natação', val: 40, suffix: 'min' },
        { label: 'Corrida', val: 1, suffix: 'km' },
      ]
    },
    {
      email: 'marinaroseline@mail.com',
      name: 'Marina Roseline',
      points: 100,
      exercises: [
        { label: 'Natação', val: 40, suffix: 'min' },
      ]
    },
    {
      email: 'caiosilva@mail.com',
      name: 'Caio Silva',
      points: 50,
      exercises: [
        { label: 'Corrida', val: 1, suffix: 'km' },
      ]
    }
  ]

  return res.json(mokedExercises)
}


export default apiHandler({GET: getDateActivities})