import React from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const json = JSON.parse(document.getElementById("json").textContent);

  console.log(json);

  return (
    <div>
      <Dashboard json={json} />

      {/* {json.map((el) => (
        <p>
          {el["reader"]}: {el["author"]}-{el["name"]} {el["description"]}
        </p>
      ))} */}
    </div>
  );
}

export default App;
