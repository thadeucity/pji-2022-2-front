import { useMemo } from "react";
import { useQuery } from "react-query";
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

  return {
    res: res.data,
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