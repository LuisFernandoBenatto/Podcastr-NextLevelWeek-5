import { createContext, useContext } from 'react'
import Episode from '../pages/episodes/[slug]';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  tougglePlay: () => void;
  touggleLoop: () => void;  
  touggleSuffle: () => void;
  setPlayingState: (state: boolean) => void;
  hasNext: boolean;
  hasPrevious: boolean;
  clearPlayerState: () => void;
};
  
export const PlayerContext = createContext({} as PlayerContextData);

export const usePlayer = () => {
  return (
    useContext(PlayerContext)
  );
}

