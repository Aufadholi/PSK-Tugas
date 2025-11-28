import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/dosen';

export function useDosen() {
  const queryClient = useQueryClient();

  const {
    data: dosen,
    isLoading,
    error,
  } = useQuery(['dosen'], async () => {
    const res = await axios.get(API_URL);
    return res.data;
  });

  const createDosen = useMutation(
    async (newData) => {
      const res = await axios.post(API_URL, newData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dosen']);
      },
    }
  );

  const updateDosen = useMutation(
    async ({ id, ...updateData }) => {
      const res = await axios.put(`${API_URL}/${id}`, updateData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dosen']);
      },
    }
  );

  const deleteDosen = useMutation(
    async (id) => {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dosen']);
      },
    }
  );

  return {
    dosen,
    isLoading,
    error,
    createDosen,
    updateDosen,
    deleteDosen,
  };
}
