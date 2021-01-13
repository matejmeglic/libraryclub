import logo from "./logo.svg";
import "./App.css";

function App() {
  const json = JSON.parse(document.getElementById("json").textContent);

  const reader = JSON.parse(
    document.getElementById("reader").textContent
  ).sort();

  var a = [],
    b = [],
    prev;

  for (var i = 0; i < reader.length; i++) {
    if (reader[i] !== prev) {
      a.push(reader[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = reader[i];
  }

  var reader_result = [];
  for (var i = 0; i < a.length; i++) {
    reader_result.push({ label: a[i], value: b[i] });
  }

  console.log(json);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {json.map((el) => (
          <p>
            {el["reader"]}: {el["author"]}-{el["name"]} {el["description"]}
          </p>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
