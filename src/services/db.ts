// frontend/src/services/db.ts

import type { Song, Playlist } from '../types/music.d'; // Assuming music.d.ts is in ../types/

const DB_NAME = 'MelodyFlowDB';
const DB_VERSION = 1; // Use a positive integer. Increment this if your schema changes.
const SONGS_STORE_NAME = 'songs';
const PLAYLISTS_STORE_NAME = 'playlists';

let db: IDBDatabase;

/**
 * Opens the IndexedDB database and creates object stores if they don't exist.
 */
export const openDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (_event) => {
      console.error('IndexedDB error:', request.error);
      reject(request.error);
    };

    request.onsuccess = (_event) => {
      db = request.result;
      console.log('IndexedDB opened successfully');
      resolve();
    };

    request.onupgradeneeded = (_event) => {
      const db = request.result;
      
      // Create songs object store
      if (!db.objectStoreNames.contains(SONGS_STORE_NAME)) {
        db.createObjectStore(SONGS_STORE_NAME, { keyPath: 'id' });
        // Can add indexes here if needed, e.g., db.objectStore(SONGS_STORE_NAME).createIndex('title', 'title', { unique: false });
        console.log('Songs object store created');
      }

      // Create playlists object store
      if (!db.objectStoreNames.contains(PLAYLISTS_STORE_NAME)) {
        db.createObjectStore(PLAYLISTS_STORE_NAME, { keyPath: 'id' });
        console.log('Playlists object store created');
      }

      console.log('IndexedDB upgrade complete');
    };
  });
};

/**
 * Adds a new song to the songs object store.
 */
export const addSong = (song: Song): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SONGS_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(SONGS_STORE_NAME);
    const request = store.add(song);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (_event) => {
      console.error('Error adding song:', request.error);
      reject(request.error);
    };
  });
};

/**
 * Retrieves all songs from the songs object store.
 */
export const getAllSongs = (): Promise<Song[]> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SONGS_STORE_NAME], 'readonly');
    const store = transaction.objectStore(SONGS_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (_event) => {
      console.error('Error getting all songs:', request.error);
      reject(request.error);
    };
  });
};

/**
 * Adds a new playlist to the playlists object store.
 */
export const addPlaylist = (playlist: Playlist): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([PLAYLISTS_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(PLAYLISTS_STORE_NAME);
    const request = store.add(playlist);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (_event) => {
      console.error('Error adding playlist:', request.error);
      reject(request.error);
    };
  });
};

/**
 * Retrieves a playlist by its ID from the playlists object store.
 */
export const getPlaylist = (id: string): Promise<Playlist | undefined> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([PLAYLISTS_STORE_NAME], 'readonly');
    const store = transaction.objectStore(PLAYLISTS_STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (_event) => {
      console.error('Error getting playlist:', request.error);
      reject(request.error);
    };
  });
};

/**
 * Deletes a song by its ID from the songs object store.
 */
export const deleteSong = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SONGS_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(SONGS_STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (_event) => {
      console.error('Error deleting song:', request.error);
      reject(request.error);
    };
  });
};