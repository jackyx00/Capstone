import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Homepage from "./pages/Homepage";
import Trade from "./pages/Trade";
import Credits from "./pages/Credits";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* homepage */}
        <Route path="/" element={<Homepage />} />

        {/* marketplace */}
        <Route path="/trade" element={<Trade />} />

        {/* quiz */}
        <Route path="/quiz" element={<Quiz />} />

        {/* credits */}
        <Route path="/credits" element={<Credits />} />

        {/* profile */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
