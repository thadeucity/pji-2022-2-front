import { useMemo } from "react";
import { useQuery } from "react-query";
import { AVAILABLE_EXERCISES, EXERCISES_TYPES_LABELS } from "../consts/exercises";
import { useAppUser } from "../hooks/user";
import { pjiApiInstance } from "./_pjiApi";

interface GetDateActivitiesProps {
  date: string
  groupId: string
}

export const getDateActivities = async ({
  date,
  groupId,
}: GetDateActivitiesProps) => {
  const [res, error] = await pjiApiInstance(
    { withAuth: true }
  ).get('/activities', { date, group: groupId });

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
  const {groupId} = useAppUser()

  const {     
    data: queriedResponse,
    isLoading: isQueryLoading,
    isRefetching: isQueryRefetching 
  } = useQuery(
    ['date-activities', date, groupId],
    () => getDateActivities({ date, groupId }),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      initialData: {res: [], error: null},
      initialDataUpdatedAt: 0,
      enabled: !!date && !!groupId,
    }
  )

  const isLoading = useMemo(
    () => isQueryRefetching || isQueryLoading,
    [isQueryRefetching, isQueryLoading]
  )

  const orderedActivities = useMemo(() => {
    return queriedResponse?.res?.sort((a: any, b: any) => {
      if (a.points > b.points) {
        return -1;
      }
      if (a.points < b.points) {
        return 1;
      }
      return 0;
    })
  },[queriedResponse?.res])

  return {
    queriedResponse: orderedActivities || [],
    isLoading
  } 
}