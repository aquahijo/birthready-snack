import { create } from 'zustand';
import { ModuleProgress } from '../types';

interface ProgressState {
  progressMap: Record<string, ModuleProgress>;
  bookmarkedModules: string[];
  
  setProgress: (moduleId: string, progress: ModuleProgress) => void;
  getProgress: (moduleId: string) => ModuleProgress | undefined;
  toggleBookmark: (moduleId: string) => void;
  isBookmarked: (moduleId: string) => boolean;
  getCompletedCount: () => number;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progressMap: {},
  bookmarkedModules: [],

  setProgress: (moduleId, progress) => set((state) => ({
    progressMap: { ...state.progressMap, [moduleId]: progress }
  })),

  getProgress: (moduleId) => get().progressMap[moduleId],

  toggleBookmark: (moduleId) => set((state) => {
    const isCurrentlyBookmarked = state.bookmarkedModules.includes(moduleId);
    return {
      bookmarkedModules: isCurrentlyBookmarked
        ? state.bookmarkedModules.filter((id) => id !== moduleId)
        : [...state.bookmarkedModules, moduleId],
    };
  }),

  isBookmarked: (moduleId) => get().bookmarkedModules.includes(moduleId),

  getCompletedCount: () => {
    const progress = get().progressMap;
    return Object.values(progress).filter((p) => p.completionPercent >= 90).length;
  },

  reset: () => set({
    progressMap: {},
    bookmarkedModules: [],
  }),
}));
