import { pjiApiInstance } from "./_pjiApi";

export const enterGroup = async (groupId: string) => {
  const [res, error] = await pjiApiInstance(
    { withAuth: true }
  ).put('/group/enter', { groupId });

  return {
    res,
    error,
  }
}