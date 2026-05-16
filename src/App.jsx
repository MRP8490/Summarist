import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import Book from "./pages/Book";
import Player from "./pages/Player";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/for-you" element={<ForYou />} />
      <Route path="/book/:id" element={<Book />} />
      <Route path="/player/:id" element={<Player />} />
      <Route path="/library" element={<Library />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;