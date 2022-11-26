import { createIoInstance } from "../providers/ioProvider";

const PJI_API_URL = process.env.NEXT_PUBLIC_PJI_API_URL || '';

interface PjiApiInstanceProps {
  withAuth: boolean
}

export const pjiApiInstance = ({ withAuth }: PjiApiInstanceProps) => {
  const ioInstance = createIoInstance(PJI_API_URL, withAuth);

  return ioInstance;
}