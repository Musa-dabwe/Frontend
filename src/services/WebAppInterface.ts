// frontend/src/services/WebAppInterface.ts

import type { Song } from '../types/music.d';
import { addSong, openDB } from './db';

// Declare a global interface for the Android-exposed object
declare global {
  interface Window {
    AndroidInterface?: {
      requestFileSelection: () => void;
    };
  }
}

const WebAppInterface = {
  onFileSelected: async (
    fileId: string,
    filePath: string,
    fileName: string,
    mimeType: string,
    size: number
  ) => {
    console.log("File selected from native:", {
      fileId,
      filePath,
      fileName,
      mimeType,
      size,
    });

    try {
      await openDB(); // Ensure DB is open
      const newSong: Song = {
        id: fileId, // Use the fileId from native as the song ID
        title: fileName.substring(0, fileName.lastIndexOf('.')) || fileName, // Remove extension for title
        artist: 'Unknown Artist', // Placeholder, could be extracted from metadata later
        album: 'Unknown Album',   // Placeholder
        duration: 0,              // Placeholder, could be extracted from metadata later
        filePath: filePath,
        fileFormat: mimeType.split('/')[1] || 'unknown', // e.g., "mpeg" from "audio/mpeg"
        dateAdded: new Date().toISOString(),
      };
      await addSong(newSong);
      console.log('Song added to IndexedDB:', newSong);
      alert(`Song added: ${newSong.title}`);
      // Potentially trigger a refresh of the LibraryScreen if it's currently visible
      // This would involve a more robust state management solution (e.g., React Context)
    } catch (error) {
      console.error('Failed to add song to IndexedDB:', error);
      alert(`Failed to add song: ${fileName}`);
    }
  },
};

// Expose WebAppInterface to the global scope so Android can call it
// This is typically done by assigning to window, or a specific namespace
// For simplicity, we'll assign directly to window for now.
(window as any).WebAppInterface = WebAppInterface;

export default WebAppInterface;