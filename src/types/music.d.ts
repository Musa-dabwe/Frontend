// frontend/src/types/music.d.ts

/**
 * Represents an individual audio track within the music library.
 * Metadata for songs will be stored in web-based client-side storage (e.g., IndexedDB or Local Storage).
 * The actual audio file content resides on the Android device's file system, referenced by a URI.
 */
export interface Song {
  /** A unique identifier for the song (e.g., UUID). This will be used as the primary key. */
  id: string;
  /** The title of the song. */
  title: string;
  /** The artist(s) of the song. */
  artist?: string; // Optional
  /** The album the song belongs to. */
  album?: string; // Optional
  /** The duration of the song in seconds. */
  duration: number;
  /** A URI or path that references the local audio file on the Android device. */
  filePath: string;
  /** The format of the audio file (e.g., "MP3", "WAV", "AAC", "OGG", "M4A"). */
  fileFormat: string;
  /** Timestamp indicating when the song was added to the library. */
  dateAdded: string; // ISO 8601 string for datetime
}

/**
 * Represents a collection of songs. For this feature, the primary instance will be the "My Library"
 * which contains all added songs. Additional playlists could be considered in future iterations.
 */
export interface Playlist {
  /** A unique identifier for the playlist (e.g., UUID). For the main library, this might be a predefined constant. */
  id: string;
  /** The name of the playlist (e.g., "My Library", "Favorites"). */
  name: string;
  /** An ordered list of Song.id's belonging to this playlist. */
  songIds: string[];
}
