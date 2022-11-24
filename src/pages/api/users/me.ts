import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from '@auth0/nextjs-auth0';
import { query as q } from 'faunadb'

import { fauna } from "../../../services/fauna";
import { apiHandler } from "../../../_api/apiHandler"

type User = {
  ref: {
    id: string;
  }
  data: {
    email: string;
    groupRef: string;
  }
}

const putMe = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const session = getSession(req, res);

  if(!session || !session?.user?.email) {
    return res.status(401).json({
      error: "User not authenticated."
    })
  }

  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session?.user?.email)
      )
    )
  ).catch(() => null)

  if (!user) {
    await fauna.query<User>(
      q.Create(
        q.Collection('users'),
        { data: { email: session?.user?.email, groupRef: '' } }
      )
    )
  }
  
  return res.json({ 
    email: user?.data?.email || '', 
    groupRef: user?.data?.groupRef || '' 
  })
}


export default apiHandler({
  PUT: putMe
})