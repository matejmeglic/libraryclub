import React from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const json = JSON.parse(document.getElementById("json").textContent);

  // const reader = JSON.parse(
  //   document.getElementById("reader").textContent
  // ).sort();

  // var a = [],
  //   b = [],
  //   prev;

  // for (var i = 0; i < reader.length; i++) {
  //   if (reader[i] !== prev) {
  //     a.push(reader[i]);
  //     b.push(1);
  //   } else {
  //     b[b.length - 1]++;
  //   }
  //   prev = reader[i];
  // }

  // var reader_result = [];
  // for (var i = 0; i < a.length; i++) {
  //   reader_result.push({ label: a[i], value: b[i] });
  // }
  console.log(json);

  return (
    <div>
      <Dashboard />

      {/* {json.map((el) => (
        <p>
          {el["reader"]}: {el["author"]}-{el["name"]} {el["description"]}
        </p>
      ))} */}
    </div>
  );
}

export default App;
