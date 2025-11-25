import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Homepage from "./pages/Homepage";
import Trade from "./pages/Trade";
import Credits from "./pages/Credits";
import Quiz from "./pages/Quiz";
import "./styles.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* homepage */}
        <Route path="/" element={<Homepage />} />
        {/* marketplace */}
        <Route path="/trade" element={<Trade />} />
        {/* credits */}
        <Route path="/credits" element={<Credits />} />
        {/* quiz */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* settings */}
        <Route path="/settings" />
        {/* profile */}
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </div>
  );
}

export default App;
