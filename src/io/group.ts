import { pjiApiInstance } from "./_pjiApi";

export const enterGroup = async (groupName: string) => {
  const [res, error] = await pjiApiInstance(
    { withAuth: true }
  ).put('/users/assign-group', { groupName });

  return {
    res: res?.data ?? null,
    error,
  }
}