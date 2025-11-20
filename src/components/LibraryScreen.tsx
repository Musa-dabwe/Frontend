import React, { useEffect, useState } from 'react';
import type { Song } from '../types/music.d';
import { openDB, getAllSongs, deleteSong } from '../services/db';

const LibraryScreen: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        await openDB(); // Open the database
        const allSongs = await getAllSongs();
        setSongs(allSongs);
      } catch (err) {
        setError("Failed to load songs from IndexedDB.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSongs();
  }, []);

  const handleAddSongClick = () => {
    if (window.AndroidInterface && typeof window.AndroidInterface.requestFileSelection === 'function') {
      window.AndroidInterface.requestFileSelection();
    } else {
      alert("AndroidInterface is not available. Are you running in a WebView?");
    }
  };

  const handleDeleteSong = async (songId: string) => {
    try {
      await openDB(); // Ensure DB is open
      await deleteSong(songId);
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
      alert("Song deleted successfully!");
    } catch (err) {
      setError("Failed to delete song from IndexedDB.");
      console.error(err);
      alert("Error deleting song.");
    }
  };

  if (isLoading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex items-center justify-center h-full text-text-light dark:text-text-dark">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex items-center justify-center h-full text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center">
          <span className="material-symbols-outlined text-text-light dark:text-text-dark text-2xl">music_note</span>
        </div>
        <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1">Library</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-text-light dark:text-text-dark gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
        </div>
      </div>

      {/* Playlist List */}
      <main className="flex-grow px-2 pb-24">
        {songs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <span className="material-symbols-outlined text-5xl text-text-secondary-light dark:text-text-secondary-dark">queue_music</span>
            <p className="text-text-light dark:text-text-dark mt-4 text-lg font-medium">Your library is empty</p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">Tap the '+' button to add songs.</p>
          </div>
        ) : (
          songs.map((song) => (
            <div key={song.id} className="flex items-center gap-4 px-2 min-h-[72px] py-2 justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 flex items-center justify-center bg-primary/20 dark:bg-primary/30">
                  <span className="material-symbols-outlined text-primary text-4xl">music_note</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal line-clamp-1">{song.title}</p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal line-clamp-2">{song.artist || 'Unknown Artist'}</p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2"> {/* Added flex container for buttons */}
                <button
                  className="text-text-light dark:text-text-dark flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => handleDeleteSong(song.id)} // Delete button
                >
                  <span className="material-symbols-outlined text-2xl">delete</span>
                </button>
                <button className="text-text-light dark:text-text-dark flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                  <span className="material-symbols-outlined text-2xl">more_vert</span>
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          className="flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-primary text-white shadow-lg transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary/50"
          onClick={handleAddSongClick}
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default LibraryScreen;