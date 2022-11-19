import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

type MethodTypes = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type MethodFn = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void | NextApiResponse>

export const apiHandler = (methods: {
  [key in MethodTypes]?: MethodFn
}) => withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
  const listedMethods = Object.keys(methods) as MethodTypes[];
  
  if (!listedMethods.includes(req.method as MethodTypes)) {
    return res.status(405).json({
      error: `Method ${req.method} not allowed.`
    });
  }

  return methods[req.method as MethodTypes]!(req, res);
})