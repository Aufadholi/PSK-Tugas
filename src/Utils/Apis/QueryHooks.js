/**
 * React Query Hooks untuk Server State Management
 * Menggunakan @tanstack/react-query untuk data fetching & caching
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllMahasiswa, 
  getMahasiswa as getMahasiswaById,
  storeMahasiswa as createMahasiswa, 
  updateMahasiswa, 
  deleteMahasiswa 
} from './MahasiswaApi';
import { getAllKelas, getAllMataKuliah } from './KelasApi';

// ============ MAHASISWA QUERIES ============

/**
 * Hook untuk fetch semua data mahasiswa dengan caching
 */
export const useMahasiswaList = (options = {}) => {
  return useQuery({
    queryKey: ['mahasiswa'],
    queryFn: getAllMahasiswa,
    staleTime: 1000 * 60 * 5, // 5 menit
    cacheTime: 1000 * 60 * 30, // 30 menit
    ...options
  });
};

/**
 * Hook untuk fetch data mahasiswa by ID
 */
export const useMahasiswaById = (id, options = {}) => {
  return useQuery({
    queryKey: ['mahasiswa', id],
    queryFn: () => getMahasiswaById(id),
    enabled: !!id, // hanya fetch jika id ada
    ...options
  });
};

/**
 * Hook untuk create mahasiswa baru
 */
export const useCreateMahasiswa = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createMahasiswa,
    onSuccess: () => {
      // Invalidate dan refetch mahasiswa list
      queryClient.invalidateQueries({ queryKey: ['mahasiswa'] });
    },
    onError: (error) => {
      console.error('Error creating mahasiswa:', error);
    }
  });
};

/**
 * Hook untuk update mahasiswa
 */
export const useUpdateMahasiswa = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateMahasiswa(id, data),
    onSuccess: (data, variables) => {
      // Invalidate list dan specific mahasiswa
      queryClient.invalidateQueries({ queryKey: ['mahasiswa'] });
      queryClient.invalidateQueries({ queryKey: ['mahasiswa', variables.id] });
    },
    onError: (error) => {
      console.error('Error updating mahasiswa:', error);
    }
  });
};

/**
 * Hook untuk delete mahasiswa
 */
export const useDeleteMahasiswa = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mahasiswa'] });
    },
    onError: (error) => {
      console.error('Error deleting mahasiswa:', error);
    }
  });
};

// ============ KELAS QUERIES ============

/**
 * Hook untuk fetch semua data kelas
 */
export const useKelasList = (options = {}) => {
  return useQuery({
    queryKey: ['kelas'],
    queryFn: getAllKelas,
    staleTime: 1000 * 60 * 10, // 10 menit
    ...options
  });
};

// ============ MATA KULIAH QUERIES ============

/**
 * Hook untuk fetch semua mata kuliah
 */
export const useMataKuliahList = (options = {}) => {
  return useQuery({
    queryKey: ['matakuliah'],
    queryFn: getAllMataKuliah,
    staleTime: 1000 * 60 * 10, // 10 menit
    ...options
  });
};

// ============ PREFETCH UTILITIES ============

/**
 * Prefetch mahasiswa data untuk optimistic UI
 */
export const usePrefetchMahasiswa = () => {
  const queryClient = useQueryClient();
  
  return (id) => {
    queryClient.prefetchQuery({
      queryKey: ['mahasiswa', id],
      queryFn: () => getMahasiswaById(id)
    });
  };
};

// ============ QUERY CLIENT UTILITIES ============

/**
 * Get cached mahasiswa data tanpa refetch
 */
export const getCachedMahasiswa = (queryClient) => {
  return queryClient.getQueryData(['mahasiswa']);
};

/**
 * Set mahasiswa data ke cache
 */
export const setCachedMahasiswa = (queryClient, data) => {
  queryClient.setQueryData(['mahasiswa'], data);
};

/**
 * Optimistic update untuk mahasiswa
 */
export const optimisticUpdateMahasiswa = (queryClient, id, updates) => {
  queryClient.setQueryData(['mahasiswa', id], (old) => ({
    ...old,
    ...updates
  }));
};
