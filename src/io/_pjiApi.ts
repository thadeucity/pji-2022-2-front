import { createIoInstance } from "../providers/ioProvider";

const PJI_API_URL = 'http://localhost:3000/api';

interface PjiApiInstanceProps {
  withAuth: boolean
}

export const pjiApiInstance = ({ withAuth }: PjiApiInstanceProps) => {
  const ioInstance = createIoInstance(PJI_API_URL, withAuth);

  return ioInstance;
}