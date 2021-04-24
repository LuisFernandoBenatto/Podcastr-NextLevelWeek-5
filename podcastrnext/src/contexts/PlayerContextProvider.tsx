import { useState, ReactNode } from 'react';
import { PlayerContext } from './PlayerContext'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextProviderProps = {
  children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);


  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function tougglePlay() {
    setIsPlaying(!isPlaying);
  }

  function touggleLoop() {
    setIsLooping(!isLooping);
  }

  function touggleSuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  
  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    } 
  }

  function playPrevious() {
    if (isShuffling) {
      const previousRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

      setCurrentEpisodeIndex(previousRandomEpisodeIndex);
    } else if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    } 
  }

  return (
    <PlayerContext.Provider value={
      { 
        episodeList, 
        currentEpisodeIndex, 
        play, 
        playList,
        playNext,
        playPrevious,
        isPlaying,
        isLooping, 
        isShuffling,
        tougglePlay,
        touggleLoop,
        touggleSuffle,  
        setPlayingState,
        hasNext,
        hasPrevious,
        clearPlayerState
      }
    }>
      { children }
    </PlayerContext.Provider>
  )
}