import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react";

type Theme = "light" | "dark"

interface ThemeContextType {
  setTheme(theme: Theme): void;
  toggleTheme(): void;
  currentTheme: Theme
}

export const ThemeContext = createContext<ThemeContextType>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // have option to use systemm defaults
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    return () => document.documentElement.removeAttribute("data-theme");
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ setTheme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

