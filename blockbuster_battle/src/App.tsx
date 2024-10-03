import "./App.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Gamepage from "./pages/Gamepage";
import Playgame from "./pages/Playgame";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/play" element={<Playgame />} />
        <Route path="play/gamepage" element={<Gamepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
