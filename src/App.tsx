import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LibraryScreen from './components/LibraryScreen';
import NowPlayingScreen from './components/NowPlayingScreen';
import SettingsScreen from './components/SettingsScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LibraryScreen />} />
        <Route path="/nowplaying" element={<NowPlayingScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
