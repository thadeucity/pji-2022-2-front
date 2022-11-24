import { EXERCISES_POINTS_MULTIPLIER } from "../../consts/exercises"

const calculateSingleExercisePoints = (
  exercise: keyof typeof EXERCISES_POINTS_MULTIPLIER, 
  reps: number
) => {
  const exerciseMultiplier = EXERCISES_POINTS_MULTIPLIER[exercise] || 0

  return exerciseMultiplier * reps
}

export const calculatePoints = (exercises: Record<string, number>) => {
  const exercisesPoints = Object.entries(exercises)
    .map(([exercise, reps]) => 
      calculateSingleExercisePoints(
        exercise as keyof typeof EXERCISES_POINTS_MULTIPLIER, reps
      ))

  return exercisesPoints.reduce((acc, curr) => acc + curr, 0)
}