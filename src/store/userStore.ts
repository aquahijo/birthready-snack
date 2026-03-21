import { create } from 'zustand';
import { User, PregnancyNumber, SubscriptionTier } from '../types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setDueDate: (dueDate: string) => void;
  setPregnancyNumber: (pregnancyNumber: PregnancyNumber) => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  completeOnboarding: () => void;
  setCurrentWeek: (week: number) => void;
  linkPartner: (partnerId: string) => void;
  unlinkPartner: () => void;
  signOut: () => void;
  reset: () => void;
}

const calculateCurrentWeek = (dueDate: string): number => {
  const due = new Date(dueDate);
  const today = new Date();
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeksUntilDue = Math.floor(diffDays / 7);
  const currentWeek = 40 - weeksUntilDue;
  return Math.max(1, Math.min(42, currentWeek));
};

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    isLoading: false 
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setDueDate: (dueDate) => {
    const currentUser = get().user;
    if (currentUser) {
      const currentWeek = calculateCurrentWeek(dueDate);
      set({
        user: { ...currentUser, dueDate, currentWeek }
      });
    }
  },

  setPregnancyNumber: (pregnancyNumber) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, pregnancyNumber }
      });
    }
  },

  setSubscriptionTier: (subscriptionTier) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, subscriptionTier }
      });
    }
  },

  completeOnboarding: () => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, hasCompletedOnboarding: true }
      });
    }
  },

  setCurrentWeek: (week) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, currentWeek: week }
      });
    }
  },

  linkPartner: (partnerId) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, linkedPartnerId: partnerId }
      });
    }
  },

  unlinkPartner: () => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, linkedPartnerId: null }
      });
    }
  },

  signOut: () => set({ 
    user: null, 
    isAuthenticated: false,
    isLoading: false
  }),

  reset: () => set({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  }),
}));
