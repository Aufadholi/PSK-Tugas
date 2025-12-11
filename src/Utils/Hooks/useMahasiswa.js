
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllMahasiswa, storeMahasiswa, updateMahasiswa as apiUpdateMahasiswa, deleteMahasiswa as apiDeleteMahasiswa } from "@/Utils/Apis/MahasiswaApi";

export const useMahasiswa = (query = {}) => {
  const queryClient = useQueryClient();

  const {
    data: res,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mahasiswa", query],
    queryFn: () => getAllMahasiswa(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res?.headers["x-total-count"] ?? "0", 10),
    }),
  });

  // Create mahasiswa
  const createMahasiswa = useMutation({
    mutationFn: async (newData) => {
      const res = await storeMahasiswa(newData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mahasiswa"]);
    },
  });

  // Update mahasiswa
  const updateMahasiswa = useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const res = await apiUpdateMahasiswa(id, updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mahasiswa"]);
    },
  });

  // Delete mahasiswa
  const deleteMahasiswa = useMutation({
    mutationFn: async (id) => {
      await apiDeleteMahasiswa(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mahasiswa"]);
    },
  });

  return {
    result: res ?? { data: [], total: 0 },
    isLoadingMahasiswa: isLoading,
    error,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa: deleteMahasiswa,
  };
};
