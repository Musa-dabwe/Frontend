import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const NowPlayingScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState<string | null>(null); // New state for playback errors

  const songs = [
    { id: '1', filePath: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', title: 'Song 1', artist: 'Artist 1', duration: 200, album: 'Album A' },
    { id: '2', filePath: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', title: 'Song 2', artist: 'Artist 2', duration: 180, album: 'Album B' },
    { id: '3', filePath: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', title: 'Song 3', artist: 'Artist 3', duration: 220, album: 'Album C' },
  ];
  const playerRef = useRef<ReactPlayer>(null);

  const currentSong = songs[currentSongIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setPlaybackError(null); // Clear previous errors
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
    setPlayedSeconds(0);
  };

  const handlePrevious = () => {
    setPlaybackError(null); // Clear previous errors
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
    setPlayedSeconds(0);
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setTotalDuration(duration);
  };

  const handlePlaybackError = (error: any) => {
    console.error("ReactPlayer error:", error);
    setIsPlaying(false); // Stop playback
    setPlaybackError("Error playing audio. The file might be corrupted or unsupported.");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${('0' + remainingSeconds).slice(-2)}`;
  };

  const progressBarWidth = totalDuration > 0 ? (playedSeconds / totalDuration) * 100 : 0;

  return (
    <div className="relative flex h-screen w-full flex-col dark group/design-root overflow-hidden">
      {/* ReactPlayer component */}
      <ReactPlayer
        ref={playerRef}
        url={currentSong.filePath}
        playing={isPlaying}
        controls={false}
        height="0px"
        width="0px"
        onEnded={handleEnded}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onError={handlePlaybackError} // Add onError handler
      />

      {/* Playback Error Display */}
      {playbackError && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50">
          {playbackError}
        </div>
      )}

      {/* Top App Bar */}
      <div className="flex shrink-0 items-center p-4">
        <button className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-800 dark:text-white">
          <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
        </button>
        <div className="flex-1 text-center">
          <p className="text-xs font-normal uppercase tracking-widest text-gray-500 dark:text-gray-400">Playing from Album</p>
          <h2 className="text-sm font-bold leading-tight tracking-wide text-gray-800 dark:text-white">{currentSong.album || 'Unknown Album'}</h2>
        </div>
        <button className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-800 dark:text-white">
          <span className="material-symbols-outlined text-2xl">more_vert</span>
        </button>
      </div>

      {/* Album Art */}
      <div className="flex w-full grow items-center px-8 pt-4 pb-8">
        <div className="relative w-full overflow-hidden bg-background-light dark:bg-background-dark aspect-square shadow-2xl rounded-xl">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            data-alt="Vibrant abstract swirls of purple and blue paint mixing together"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBupfDEKg_muIYi-EyM3KiiTaz6TIZlrPQ04L8PcTCVnySW0t0xsWaXE-F6DUa5r2tRERX1huvv9d8HeiYIMTMRSpVSU02cusMhKo-xaZYgYKxr9hYwKBJAh7E5smJskHBlZaQhaMQk1-Hvw9d8KaK8p_wzE-BQQC7MUg8rkx6uv3NSn1F9o2AuahPDlhdWC368HB97UpfPO2gOWoj5imM3IsNLh40ka2lGEoM5vG1Gc-M6PTDCYL")',
            }}
          ></div>
        </div>
      </div>

      {/* Track Info */}
      <div className="px-8 pb-4">
        <h1 className="text-gray-900 dark:text-white text-[28px] font-bold leading-tight tracking-tight">{currentSong.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal pt-1">{currentSong.artist || 'Unknown Artist'}</p>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-1.5 px-8 pb-4">
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-primary" style={{ width: `${progressBarWidth}%` }}></div>
        </div>
        <div className="flex justify-between">
          <p className="text-xs font-normal leading-normal text-gray-600 dark:text-gray-400">{formatTime(playedSeconds)}</p>
          <p className="text-xs font-normal leading-normal text-gray-600 dark:text-gray-400">{formatTime(totalDuration)}</p>
        </div>
      </div>

      {/* Primary Playback Controls */}
      <div className="flex items-center justify-center gap-6 px-8 py-4">
        <button
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-800 dark:text-white"
          onClick={handlePrevious}
        >
          <span className="material-symbols-outlined text-4xl">skip_previous</span>
        </button>
        <button
          className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg"
          onClick={handlePlayPause}
        >
          <span className="material-symbols-outlined text-5xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
        </button>
        <button
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-800 dark:text-white"
          onClick={handleNext}
        >
          <span className="material-symbols-outlined text-4xl">skip_next</span>
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-4 px-8 pt-4 pb-8">
        <span className="material-symbols-outlined text-xl text-gray-600 dark:text-gray-400">volume_down</span>
        <div className="flex h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-primary" style={{ width: '70%' }}></div>
        </div>
        <span className="material-symbols-outlined text-xl text-gray-600 dark:text-gray-400">volume_up</span>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-between px-8 py-4 mb-4">
        <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-600 dark:text-gray-400">
          <span className="material-symbols-outlined text-2xl">shuffle</span>
        </button>
        <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-600 dark:text-gray-400">
          <span className="material-symbols-outlined text-2xl">lyrics</span>
        </button>
        <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-600 dark:text-gray-400">
          <span className="material-symbols-outlined text-2xl">playlist_add</span>
        </button>
        <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent text-primary">
          <span className="material-symbols-outlined text-2xl">repeat_one</span>
        </button>
      </div>
    </div>
  );
};

export default NowPlayingScreen;