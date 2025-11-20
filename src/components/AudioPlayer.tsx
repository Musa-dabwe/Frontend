import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    if (!isPlaying) return;
    setPlayed(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
    playerRef.current?.seekTo(seekTo, 'fraction');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        volume={volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="0"
        height="0"
        style={{ display: 'none' }}
      />

      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={handlePlayPause}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="text-sm">
          {formatTime(played * duration)} / {formatTime(duration)}
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={played}
        onChange={handleSeekChange}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer mb-4"
      />

      <div className="w-full flex items-center">
        <label htmlFor="volume" className="mr-2">Volume:</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
