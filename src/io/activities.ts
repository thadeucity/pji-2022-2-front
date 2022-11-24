import { useMemo } from "react";
import { useQuery } from "react-query";
import { AVAILABLE_EXERCISES, EXERCISES_TYPES_LABELS } from "../consts/exercises";
import { pjiApiInstance } from "./_pjiApi";

interface GetDateActivitiesProps {
  date: string
}

export const getDateActivities = async ({
  date,
}: GetDateActivitiesProps) => {
  const [res, error] = await pjiApiInstance(
    { withAuth: true }
  ).get('/activities', { date });

  const parsedActivities = (res?.data || []).map((userActivity: any) => {
    const userExercises = userActivity.exercises || {}

    return {
      ...userActivity,
      exercises: Object.keys(userExercises).map(exercise => {
        const exerciseData = AVAILABLE_EXERCISES[exercise] || {}
        const exerciseSuffix = EXERCISES_TYPES_LABELS[exerciseData?.type || '-']?.shortLabel || '' 
        return {
          label: AVAILABLE_EXERCISES[exercise]?.label || '',
          val: userExercises[exercise],
          suffix: exerciseSuffix,
        }
      }).filter(exercise => exercise.val > 0 && !!exercise.label),
    }
  })

  console.log({parsedActivities})

  return {
    res: parsedActivities,
    error,
  }
}

export const useDateActivities = (date: string) => {
  const {     
    data: queriedResponse,
    isLoading: isQueryLoading,
    isRefetching: isQueryRefetching 
  } = useQuery(
    ['date-activities', date],
    () => getDateActivities({ date }),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      initialData: {res: [], error: null},
      initialDataUpdatedAt: 0,
    }
  )

  const isLoading = useMemo(
    () => isQueryRefetching || isQueryLoading,
    [isQueryRefetching, isQueryLoading]
  )

  return {
    queriedResponse: queriedResponse?.res || [],
    isLoading
  } 
}