import React from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const json = JSON.parse(document.getElementById("json").textContent);

  return (
    <div>
      <Dashboard json={json} />
    </div>
  );
}

export default App;
