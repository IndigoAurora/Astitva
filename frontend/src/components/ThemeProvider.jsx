import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dimMode, setDimMode] = useState(() => {
    return localStorage.getItem("astitva-dim-mode") === "true";
  });

  useEffect(() => {
    localStorage.setItem(
      "astitva-dim-mode",
      dimMode
    );

    document.documentElement.setAttribute(
      "data-dim-mode",
      dimMode ? "true" : "false"
    );
  }, [dimMode]);

  const toggleDimMode = () => {
    setDimMode((current) => !current);
  };

  return (
    <ThemeContext.Provider
      value={{
        dimMode,
        setDimMode,
        toggleDimMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}