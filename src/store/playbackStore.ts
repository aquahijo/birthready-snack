import { create } from 'zustand';

interface PlaybackState {
  currentModuleId: string | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  playbackSpeed: number;
  isDownloaded: boolean;
  downloadProgress: number | null;
  
  setCurrentModule: (moduleId: string | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  setIsDownloaded: (isDownloaded: boolean) => void;
  setDownloadProgress: (progress: number | null) => void;
  reset: () => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  currentModuleId: null,
  isPlaying: false,
  position: 0,
  duration: 0,
  playbackSpeed: 1,
  isDownloaded: false,
  downloadProgress: null,

  setCurrentModule: (currentModuleId) => set({ currentModuleId }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPosition: (position) => set({ position }),
  setDuration: (duration) => set({ duration }),
  setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),
  setIsDownloaded: (isDownloaded) => set({ isDownloaded }),
  setDownloadProgress: (downloadProgress) => set({ downloadProgress }),
  reset: () => set({
    currentModuleId: null,
    isPlaying: false,
    position: 0,
    duration: 0,
    isDownloaded: false,
    downloadProgress: null,
  }),
}));
