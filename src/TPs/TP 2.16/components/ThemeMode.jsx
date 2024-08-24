import { useEffect, useState } from "react";

export default function ThemeMode() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.className = storedTheme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <button onClick={toggleTheme}>
      Mudar para {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
