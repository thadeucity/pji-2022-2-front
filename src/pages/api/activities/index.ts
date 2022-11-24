import { NextApiRequest, NextApiResponse } from "next"
import { query as q, Ref } from 'faunadb'
import { apiHandler } from "../../../_api/apiHandler"
import { getSession } from '@auth0/nextjs-auth0';
import { fauna } from "../../../services/fauna";
import { createUsersExercisesForDate } from "../../../_api/mock/mockedUsers";
import { calculatePoints } from "../../../_api/utils/calculatePoints";

type ExerciseDataType = {
  ref: {
    id: string;
  }
  data: {
    email: string;
    name: string
    date: string
    exercises: {
      push_ups: number;
      pull_ups: number;
      burpees: number;
      sit_ups: number;
      running: number;
      rope: number;
      squats: number;
      leg_lifts: number;
      swimming: number;
      climbing: number;
    }
  }
}

type User = {
  ref: {
    id: string;
  }
  data: {
    email: string;
    groupRef: any
  }
}

const getDateActivities = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { date, group } = req.query

  if (!date) {
    return res.status(400).json({
      error: "Date is required.",
    })
  }

  // const queryRes = await fauna.query<{data: ExerciseDataType[]}>(
  //   q.Paginate(
  //     q.Match(
  //       q.Index("activities_by_group_and_date"), 
  //       q.Select(
  //         'ref', 
  //         q.Get(q.Ref(q.Collection('groups'), group))
  //       ),
  //       date
  //     )
  //   )
  // ).catch((e) => {
  //   return {data: [] as ExerciseDataType[]}
  // })

  const queryRes = await fauna.query<{data: ExerciseDataType[]}>(
   q.Map( 
    q.Paginate(
      q.Match(
        q.Index("activities_by_group_and_date"), 
        q.Select(
          'ref', 
          q.Get(q.Ref(q.Collection('groups'), group))
        ),
        date
      )),
    q.Lambda("activity", q.Get(q.Var("activity")))
  )).catch((e) => {
    return {data: [] as ExerciseDataType[]}
  })


  const mokedUsersWithExercises = createUsersExercisesForDate(String(date))

  const parsedUsers = queryRes.data.map((userExercise) => {
    return {
      name: userExercise.data.name,
      email: userExercise.data.email,
      exercises: userExercise.data.exercises,
    }
  })

  const usersWithPoints = [
    ...mokedUsersWithExercises, 
    ...parsedUsers
  ].map((user) => {
    const userPts = calculatePoints(user.exercises)
    return {...user, points: userPts}
  })

  return res.json(usersWithPoints)
}



const putDateActivities = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { exercises, date } = req.body

  if (!date) {
    return res.status(400).json({
      error: "Date is required.",
    })
  }

  if (!exercises || typeof exercises !== 'object' || !Object.keys(exercises).length) {
    return res.status(400).json({
      error: "Exercises is required.",
    })
  }

  const session = getSession(req, res);

  if(!session || !session?.user?.email) {
    return res.status(401).json({
      error: "User not authenticated."
    })
  }

  const makeSafeExercise = (exerciseCount: unknown) => {
    return Number(exerciseCount) || 0
  }

  const safeExercises = {
    push_ups: makeSafeExercise(exercises?.push_ups),
    pull_ups: makeSafeExercise(exercises?.pull_ups),
    burpees: makeSafeExercise(exercises?.burpees),
    sit_ups: makeSafeExercise(exercises?.sit_ups),
    running: makeSafeExercise(exercises?.running),
    rope: makeSafeExercise(exercises?.rope),
    squats: makeSafeExercise(exercises?.squats),
    leg_lifts: makeSafeExercise(exercises?.leg_lifts),
    swimming: makeSafeExercise(exercises?.swimming),
    climbing: makeSafeExercise(exercises?.climbing),
  }

  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session?.user?.email)
      )
    )
  ).catch(() => null)

  const alreadyCreatedExercise = await fauna.query<ExerciseDataType>(
    q.Get(q.Match(q.Index('activity_by_date_and_email'), [date, session.user.email]))
  ).catch((e) => {
    return null
  })

  if (alreadyCreatedExercise) {
    await fauna.query(
      q.Update(
        q.Ref(q.Collection('activities'), alreadyCreatedExercise.ref.id),
        {
          data: {
            exercises: safeExercises,
            date,
            name: session.user.name || '',
            email: session.user.email,
            groupRef: user?.data?.groupRef || '',
          }
        }
      )
    )
  } else {
    await fauna.query(
      q.Create(
        q.Collection('activities'),
        {
          data: {
            exercises: safeExercises,
            date,
            name: session.user.name || '',
            email: session.user.email,
            groupRef: user?.data?.groupRef || '',
          }
        }
      )
    )
  }

  return res.status(201).json({
    message: "Activity created successfully."
  })
}


export default apiHandler({GET: getDateActivities, PUT: putDateActivities})