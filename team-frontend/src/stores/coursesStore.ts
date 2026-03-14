import { create } from 'zustand';
import { courseService, type CourseFilters } from '../lib/api/service/courseService';
import type { CoursesData } from '../types/course';

interface CoursesStore {
  // State
  coursesData: CoursesData | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchCourses: (filters?: CourseFilters) => Promise<void>;
  setCourses: (data: CoursesData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

export const useCoursesStore = create<CoursesStore>((set, get) => ({
  // Initial state
  coursesData: null,
  loading: false,
  error: null,

  // Fetch courses from API and store them
  fetchCourses: async (filters: CourseFilters = { page: 1, limit: 12 }) => {
    const state = get();
    
    console.log("🚀 Store fetchCourses called - loading:", state.loading);
    
    // Avoid fetching if already loading
    if (state.loading) {
      console.log("⏸️ Already loading, skipping fetch");
      return;
    }

    set({ loading: true, error: null });
    console.log("📡 Making API request with filters:", filters);

    try {
      const response = await courseService.getCourses(filters);
      console.log("📦 API response received:", response);
      
      // Handle API response with success/data structure
      if (response.data && response.data.success) {
        console.log("✅ API success - storing data in store");
        
        let dataToStore = response.data.data;
        
        // For 304 Not Modified, use existing data
        if (response.status === 304 && (!dataToStore || !dataToStore.courses)) {
          console.log("📄 304 Not Modified - keeping existing data");
          const existingData = get().coursesData;
          if (existingData) {
            dataToStore = existingData;
          } else {
            // If no existing data, don't update store
            set({ loading: false, error: null });
            return;
          }
        }
        
        if (dataToStore) {
          // Data is already transformed, just ensure pagination exists
          const coursesWithPagination = {
            courses: dataToStore.courses || dataToStore, // Handle both array and object formats
            pagination: dataToStore.pagination || {
              page: filters.page || 1,
              limit: filters.limit || 12,
              total: dataToStore.total || dataToStore.courses?.length || 0,
              totalPages: dataToStore.totalPages || Math.ceil((dataToStore.total || dataToStore.courses?.length || 0) / (filters.limit || 12))
            }
          };
          
          console.log("🗂️ Storing courses in store:", coursesWithPagination);
          console.log("🆔 Course IDs in store:", coursesWithPagination.courses?.map((c: any) => c.id));
          
          set({
            coursesData: coursesWithPagination,
            loading: false,
            error: null
          });
          console.log("💾 Data stored in store - courses count:", coursesWithPagination.courses?.length || 0);
        }
      } else {
        const errorMessage = response.data?.error?.message || 'Failed to fetch courses';
        console.log("❌ API error:", errorMessage);
        set({
          loading: false,
          error: errorMessage
        });
      }
    } catch (err: any) {
      let errorMessage = 'Failed to fetch courses';
      
      if (err.response?.status === 500) {
        errorMessage = 'Server error: Please try again later';
      } else if (err.response?.status === 401) {
        errorMessage = 'Authentication error: Please login again';
      } else if (err.message) {
        errorMessage = 'Failed to fetch courses: ' + err.message;
      }
      
      console.log("💥 Network error:", errorMessage);
      set({
        loading: false,
        error: errorMessage
      });
    }
  },

  // Set courses data directly
  setCourses: (data: CoursesData) => {
    // Ensure pagination exists
    const dataWithPagination = {
      courses: data.courses || data,
      pagination: data.pagination || {
        page: 1,
        limit: 12,
        total: data.courses?.length || 0,
        totalPages: Math.ceil((data.courses?.length || 0) / 12)
      }
    };
    
    set({
      coursesData: dataWithPagination,
      loading: false,
      error: null
    });
  },

  // Set loading state
  setLoading: (loading: boolean) => {
    set({ loading });
  },

  // Set error state
  setError: (error: string | null) => {
    set({ error, loading: false });
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset store
  reset: () => set({
    coursesData: null,
    loading: false,
    error: null
  })
}));
