import { useState } from "react";
import "./styles/global.css";
import DataCollection from "./layouts/DataCollection";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      data-theme={theme}
    >
      <DataCollection toggleTheme={toggleTheme} theme={theme} />
    </div>
  );
};

export default App;
