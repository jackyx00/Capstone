import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage"
import Nav from "./components/Nav"
import './styles.css'

function App() {
  useEffect(() => {
    async function testConnection() {
      const port = import.meta.env.VITE_BACKEND_PORT;
      const response = await fetch(`http://localhost:${port}`);
      const result = await response.json();
      console.log(result);
    }
    testConnection();
  }, []);

  return (
      <div className="App">
        <Nav />
        <Routes>
          {/* homepage */}
          <Route path="/" element={<Homepage />}/>
          {/* marketplace */}
          <Route path="/trade"/>
          {/* settings */}
          <Route path="/settings"/>
        </Routes>
      </div>
  );
}

export default App;
