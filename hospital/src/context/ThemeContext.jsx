import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "config-sistema";

function cargarConfigGuardada() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { modoOscuro: false, fontIndex: 1 };
    return JSON.parse(raw);
  } catch {
    return { modoOscuro: false, fontIndex: 1 };
  }
}

export function ThemeProvider({ children }) {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [fontIndex, setFontIndex] = useState(1); // 0=Chica, 1=Mediana, 2=Grande

  // Al montar la app entera, levanta la última config guardada
  useEffect(() => {
    const cfg = cargarConfigGuardada();
    setModoOscuro(cfg.modoOscuro);
    setFontIndex(cfg.fontIndex);
  }, []);

  // Best-effort: si en el futuro pasás tus estilos a rem, esto ya
  // les va a pegar globalmente. Por ahora no rompe nada que no lo use.
  useEffect(() => {
    const px = fontIndex === 0 ? 14 : fontIndex === 2 ? 18 : 16;
    document.documentElement.style.fontSize = `${px}px`;
  }, [fontIndex]);

  const guardarConfig = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ modoOscuro, fontIndex })
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        modoOscuro,
        setModoOscuro,
        fontIndex,
        setFontIndex,
        guardarConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  }
  return ctx;
}