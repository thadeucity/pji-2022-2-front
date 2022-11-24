import { creteSeedFromEmailAndDate, createMockedResults } from "./createMockedResults"

const mokedUsers = [
  { email: 'joao@mail.com', name: 'João das Neves' },
  { email: 'felipe@mail.com', name: 'Felipe Marino'},
  { email: 'rocky@mail.com', name: 'Rocky Balboa'},
  { email: 'johane@mail.com', name: 'Johane Doe'},
  { email: 'mariadasflores@mail.com', name: 'Maria das Flores'},
  { email: 'arlindosilva@mail.com', name: 'Arlindo Silva'},
  { email: 'marinaroseline@mail.com', name: 'Marina Roseline'},
  { email: 'caiosilva@mail.com', name: 'Caio Silva' },
  { email: 'helena_rodrigues@mail.com', name: 'Helena Rodrigues' },
  { email: 'marioalgusto@mail.com', name: 'Mario Augusto' },
]

export const createUsersExercisesForDate = (date: string) => {
  const usersExercises = mokedUsers.map((user) => {
    const seed = creteSeedFromEmailAndDate(user.email, date)
    const exercises = createMockedResults(seed)

    return {
      ...user,
      exercises,
    }
  })

  return usersExercises
}