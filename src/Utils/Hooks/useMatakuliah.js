
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMataKuliah,
  storeMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "@/Utils/Apis/MataKuliahApi";

export function useMataKuliah() {
  const queryClient = useQueryClient();

  const mataKuliahQuery = useQuery({
    queryKey: ["matakuliah"],
    queryFn: getAllMataKuliah,
  });

  const createMataKuliah = useMutation({
    mutationFn: storeMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
    },
  });

  const updateMataKuliahMutation = useMutation({
    mutationFn: ({ id, data }) => updateMataKuliah(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
    },
  });

  const deleteMataKuliahMutation = useMutation({
    mutationFn: deleteMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
    },
  });

  return {
    mataKuliahQuery,
    createMataKuliah,
    updateMataKuliahMutation,
    deleteMataKuliahMutation,
  };
}
