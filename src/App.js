import { useState } from "react";
import "./styles/global.css";
import DataCollection from "./layouts/DataCollection";

const App = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      data-theme={theme}
    >
      <DataCollection toggleTheme={toggleTheme} />
    </div>
  );
};

export default App;
