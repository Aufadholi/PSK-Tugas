import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/kelas';

export function useKelas() {
  const queryClient = useQueryClient();

  const {
    data: kelas,
    isLoading,
    error,
  } = useQuery(['kelas'], async () => {
    const res = await axios.get(API_URL);
    return res.data;
  });

  const createKelas = useMutation(
    async (newData) => {
      const res = await axios.post(API_URL, newData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['kelas']);
      },
    }
  );

  const updateKelas = useMutation(
    async ({ id, ...updateData }) => {
      const res = await axios.put(`${API_URL}/${id}`, updateData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['kelas']);
      },
    }
  );

  const deleteKelas = useMutation(
    async (id) => {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['kelas']);
      },
    }
  );

  return {
    kelas,
    isLoading,
    error,
    createKelas,
    updateKelas,
    deleteKelas,
  };
}
