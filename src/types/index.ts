export type PregnancyNumber = 1 | 2 | 3;

export type SubscriptionTier = 'free' | 'premium' | 'enterprise';

export interface User {
  id: string;
  email: string | null;
  dueDate: string | null;
  currentWeek: number | null;
  pregnancyNumber: PregnancyNumber;
  subscriptionTier: SubscriptionTier;
  hasCompletedOnboarding: boolean;
  partnerCode: string | null;
  linkedPartnerId: string | null;
  createdAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  durationSeconds: number;
  weekRange: [number, number];
  trimester: 1 | 2 | 3;
  isPremium: boolean;
  category: 'labor' | 'advocacy' | 'postpartum' | 'mental_health' | 'emergency';
}

export interface ModuleProgress {
  moduleId: string;
  completionPercent: number;
  lastPosition: number;
  completedAt: string | null;
  isBookmarked: boolean;
}

export interface ContractionEntry {
  id: string;
  startTime: number;
  endTime: number | null;
  duration: number | null;
}

export interface CheckInResponse {
  questionId: string;
  value: number;
}

export interface CheckInResult {
  id: string;
  week: number;
  responses: CheckInResponse[];
  score: number;
  riskLevel: 'low' | 'elevated';
  createdAt: string;
}

export type NavigationParams = {
  [key: string]: object | undefined;
} & {
  SignIn: undefined;
  OnboardingDueDate: undefined;
  OnboardingPregnancyNumber: undefined;
  OnboardingNotifications: undefined;
  Home: undefined;
  ModuleLibrary: undefined;
  ModulePlayer: { moduleId: string };
  LaborStageMap: undefined;
  ContractionTimer: undefined;
  BirthAdvocacy: undefined;
  MentalHealthCheckIn: undefined;
  Postpartum: undefined;
  Paywall: undefined;
  GiftFlow: undefined;
  Profile: undefined;
};

export interface ApiResult<T> {
  data: T | null;
  error: string | null;
}
