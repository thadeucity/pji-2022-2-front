import { unsafeHash } from "../../utils/hash"

const mokedDoneList = [
  ['push_ups', 'pull_ups', 'burpees', 'sit_ups'],
  ['running', 'rope', 'squats', 'leg_lifts'],
  ['swimming', 'climbing'],
  ['push_ups', 'pull_ups', 'squats', 'climbing'],
  ['running', 'rope', 'burpees', 'sit_ups'],
  ['swimming', 'leg_lifts'],
  ['push_ups', 'pull_ups', 'squats', 'climbing', 'running', 'rope'],
  ['burpees', 'sit_ups', 'swimming', 'leg_lifts'],
  ['push_ups', 'sit_ups', 'squats', 'climbing', 'running', 'rope'],
  ['push_ups', 'pull_ups'],
  ['swimming', 'sit_ups'],
  ['squats', 'climbing', 'running'],
  ['running', 'rope'],
  ['burpees', 'running'],
  ['leg_lifts', 'swimming'],
  ['push_ups', 'pull_ups', 'burpees', 'leg_lifts'],
  ['running', 'leg_lifts'],
]

const mockedQuantityList = [
  [15, 30, 10, 8, 2, 15, 9, 7, 15, 5, 15, 30, 10, 8, 2, 15, 9, 7, 15, 5],
  [17, 50, 12, 10, 4, 17, 11, 9, 17, 7, 17, 50, 12, 10, 4, 17, 11, 9, 17, 7],
  [19, 70, 14, 12, 6, 19, 13, 11, 19, 9, 19, 70, 14, 12, 6, 19, 13, 11, 19, 9],
  [13, 22, 14, 17, 2, 13, 19, 7, 13, 5, 13, 22, 14, 17, 2, 13, 19, 7, 13, 5],
  [13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
  [22, 11, 14, 13, 11, 17, 22, 5, 15, 14, 7, 3, 8, 24, 13, 5, 27, 32, 45],
  [14, 45, 17, 88, 120, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33],
  [25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63],
  [15, 37, 12, 8, 2, 15, 9, 7, 15, 5, 15, 30, 10, 8, 2, 15, 9, 7, 15, 5],
]

const mockedLimits = {
  push_ups: 150,
  pull_ups: 30,
  burpees: 60,
  sit_ups: 50,
  running: 8,
  rope: 20,
  squats: 100,
  leg_lifts: 300,
  swimming: 120,
  climbing: 150,
}

const getDoneList = (seed: number) => {
  const doneList = mokedDoneList[seed % mokedDoneList.length]
  return doneList
}

const getQuantityList = (seed: number) => {
  const quantityList = mockedQuantityList[seed % mockedQuantityList.length]
  return quantityList
}

const getMockedMultiplier = (seed: number) => {
  const multiplier = seed % 21
  return multiplier
}

export const createMockedResults = (seed: number) => {
  const doneList = getDoneList(seed)
  const quantityList = getQuantityList(seed)
  const multiplier = getMockedMultiplier(seed)

  const resultsArr: [string, number][] = doneList.map((exercise, index) => {
    const quantity = quantityList[index]
    const limit = mockedLimits[exercise as keyof typeof mockedLimits] || 0

    if (!limit || !quantity) return [exercise, 0]

    const points = quantity * multiplier
    const done = points % limit

    return [exercise, done]
  })

  const results = Object.fromEntries(new Map(resultsArr))

  return results
}

export const creteSeedFromEmailAndDate = (email: string = '', date: string = '') => {
  const seed = parseInt(unsafeHash(email + date), 16)

  return seed
}