import { useEffect } from "react";
// import './App.css'

function App() {
  useEffect(() => {
    async function testConnection() {
      const port = import.meta.env.VITE_BACKEND_PORT;
      const response = await fetch(`http://localhost:${port}`)
      const result = await response.json()
      console.log(result)
    }
    testConnection()
  }, []);

  return <></>;
}

export default App;
