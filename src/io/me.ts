import { pjiApiInstance } from "./_pjiApi";

export const whoIAm = async () => {
  const [res, error] = await pjiApiInstance(
    { withAuth: true }
  ).put('/users/me');

  return {
    res: res?.data ?? null,
    error,
  }
}