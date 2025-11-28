import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/mahasiswa';

export function useMahasiswa() {
  const queryClient = useQueryClient();

  // Fetch all mahasiswa
  const {
    data: mahasiswa,
    isLoading,
    error,
  } = useQuery(['mahasiswa'], async () => {
    const res = await axios.get(API_URL);
    return res.data;
  });

  // Create mahasiswa
  const createMahasiswa = useMutation(
    async (newData) => {
      const res = await axios.post(API_URL, newData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mahasiswa']);
      },
    }
  );

  // Update mahasiswa
  const updateMahasiswa = useMutation(
    async ({ id, ...updateData }) => {
      const res = await axios.put(`${API_URL}/${id}`, updateData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mahasiswa']);
      },
    }
  );

  // Delete mahasiswa
  const deleteMahasiswa = useMutation(
    async (id) => {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mahasiswa']);
      },
    }
  );

  return {
    mahasiswa,
    isLoading,
    error,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
  };
}
