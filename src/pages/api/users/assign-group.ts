import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from '@auth0/nextjs-auth0';
import { query as q, Ref } from 'faunadb'

import { fauna } from "../../../services/fauna";
import { apiHandler } from "../../../_api/apiHandler"

type User = {
  ref: {
    id: string;
  }
  data: {
    email: string;
    groupRef: typeof Ref 
  }
}

type Group = {
  ref: {
    id: string;
  }
  data: {
    name: string;
  }
}

const putAssignGroup = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const session = getSession(req, res);

  const { groupName } = req.body 

  if(!session || !session?.user?.email) {
    return res.status(401).json({
      error: "User not authenticated."
    })
  }

  if (!groupName) {
    return res.status(400).json({
      error: "Group name not provided."
    })
  }

  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session?.user?.email)
      )
    )
  ).catch((e) => {
    return null
  })

  if (!user) {
    return res.status(500).json({
      error: "Unable to add user to group."
    })
  }

  const group = await fauna.query<Group>(
    q.Get(q.Match(q.Index('group_by_name'), groupName))
  ).catch((e) => {
    return null
  })

  if (group && group?.ref?.id) { 
    await fauna.query<User>(
      q.Update(
        q.Ref(q.Collection('users'), user.ref.id),
        { data: { 
          groupRef: q.Ref(q.Collection('groups'), group?.ref?.id)
        } }
      )
    )

    return res.json({ 
      email: user?.data?.email || '', 
      groupRef: group?.ref?.id || '' 
    })
  } else {
    const faunaRes = await fauna.query<Group>(
      q.Create(
        q.Collection('groups'),
        { data: { name: groupName } }
      )
    )

    await fauna.query(
      q.Update(
        q.Ref(q.Collection('users'), user.ref.id),
        { data: {
          groupRef: q.Ref(q.Collection('groups'), faunaRes?.ref?.id)
        } }
      )
    )

    return res.json({ 
      email: user?.data?.email || '', 
      groupRef: faunaRes?.ref?.id || '' 
    })
  }
}


export default apiHandler({
  PUT: putAssignGroup
})