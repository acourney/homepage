import Time from "./components/Time/Time";
import Weather from "./components/Weather/Weather";
import Quote from "./components/Quote/Quote";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Quote />
      <Time />
      <Weather />
    </div>
  );
}

export default App;
