
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "@/Utils/Apis/KelasApi";

export function useKelas() {
  const queryClient = useQueryClient();

  const kelasQuery = useQuery({
    queryKey: ["kelas"],
    queryFn: getAllKelas,
  });

  const createKelas = useMutation({
    mutationFn: storeKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  const updateKelasMutation = useMutation({
    mutationFn: ({ id, data }) => updateKelas(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  const deleteKelasMutation = useMutation({
    mutationFn: deleteKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  return {
    kelasQuery,
    createKelas,
    updateKelasMutation,
    deleteKelasMutation,
  };
}
