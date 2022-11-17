import { pjiApiInstance } from "./_pjiApi";

interface AssignActivityProps {
  exercises: Record<string, number>
  date: string
}

export const assignActivityToDate = async ({
  date,
  exercises,
}: AssignActivityProps) => {
  const [res, error] = await pjiApiInstance(
    { withAuth: true }
  ).put('/activities', { date, exercises });

  return {
    res,
    error,
  }
}