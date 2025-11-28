import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/matakuliah';

export function useMatakuliah() {
  const queryClient = useQueryClient();

  const {
    data: matakuliah,
    isLoading,
    error,
  } = useQuery(['matakuliah'], async () => {
    const res = await axios.get(API_URL);
    return res.data;
  });

  const createMatakuliah = useMutation(
    async (newData) => {
      const res = await axios.post(API_URL, newData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['matakuliah']);
      },
    }
  );

  const updateMatakuliah = useMutation(
    async ({ id, ...updateData }) => {
      const res = await axios.put(`${API_URL}/${id}`, updateData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['matakuliah']);
      },
    }
  );

  const deleteMatakuliah = useMutation(
    async (id) => {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['matakuliah']);
      },
    }
  );

  return {
    matakuliah,
    isLoading,
    error,
    createMatakuliah,
    updateMatakuliah,
    deleteMatakuliah,
  };
}
