import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

// Factor de escala real para cada tamaño (Chica / Mediana / Grande)
const ESCALA_FUENTE = { 0: 0.875, 1: 1, 2: 1.15 };

export default function Configuracion() {
  const { modoOscuro, setModoOscuro, fontIndex, setFontIndex, guardarConfig } =
    useTheme();
  const [guardado, setGuardado] = useState(false);

  const handleGuardar = () => {
    guardarConfig();
    // TODO: si tenés backend, acá también harías el POST/PUT correspondiente
    setGuardado(true);
    setTimeout(() => setGuardado(false), 1500);
  };

  const c = modoOscuro ? colorsOscuro : colorsClaro;
  const s = ESCALA_FUENTE[fontIndex]; // factor de escala actual

  return (
    <div style={{ ...styles.card, backgroundColor: c.cardBg }}>
      {/* Header: título + botón Guardar Cambios */}
      <div style={styles.headerRow}>
        <h1 style={{ ...styles.titulo, fontSize: 24 * s, color: c.textPrimary }}>
          Configuración del sistema
        </h1>
        <button
          onClick={handleGuardar}
          style={{ ...styles.botonGuardar, fontSize: 14 * s }}
        >
          {guardado ? "¡Guardado!" : "Guardar Cambios"}
        </button>
      </div>

      {/* Preferencias de Interfaz */}
      <div
        style={{
          ...styles.innerCard,
          backgroundColor: c.innerBg,
          borderColor: c.border,
        }}
      >
        <h2 style={{ ...styles.subtitulo, fontSize: 18 * s, color: c.textPrimary }}>
          Preferencias de Interfaz
        </h2>

        {/* Modo de Visualización */}
        <div style={styles.filaModo}>
          <span style={{ fontWeight: 600, fontSize: 16 * s, color: c.textPrimary }}>
            Modo de Visualización
          </span>

          <div style={styles.opcionesModo}>
            <button
              type="button"
              onClick={() => setModoOscuro(false)}
              style={styles.opcionBtn}
            >
              <span
                style={{
                  ...styles.radioOuter,
                  borderColor: !modoOscuro ? "#15803d" : "#9ca3af",
                }}
              >
                {!modoOscuro && <span style={styles.radioInner} />}
              </span>
              <span style={{ fontSize: 15 * s, color: c.textPrimary }}>
                Claro (Predeterminado)
              </span>
            </button>

            <button
              type="button"
              onClick={() => setModoOscuro(true)}
              style={styles.opcionBtn}
            >
              <span
                style={{
                  ...styles.radioOuter,
                  borderColor: modoOscuro ? "#15803d" : "#9ca3af",
                }}
              >
                {modoOscuro && <span style={styles.radioInner} />}
              </span>
              <span style={{ fontSize: 15 * s, color: c.textPrimary }}>Oscuro</span>
            </button>
          </div>
        </div>

        {/* Tamaño de Fuente / Accesibilidad */}
        <div>
          <span
            style={{
              fontWeight: 600,
              fontSize: 16 * s,
              display: "block",
              marginBottom: 8,
              color: c.textPrimary,
            }}
          >
            Tamaño de Fuente / Accesibilidad
          </span>

          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={fontIndex}
            onChange={(e) => setFontIndex(Number(e.target.value))}
            style={styles.slider}
          />

          <div style={styles.etiquetasSlider}>
            {["Chica", "Mediana", "Grande"].map((label, i) => (
              <span
                key={label}
                style={{
                  fontSize: 14 * s,
                  fontWeight: fontIndex === i ? 700 : 400,
                  color: fontIndex === i ? c.textPrimary : c.textSecondary,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const colorsClaro = {
  cardBg: "#e9e9e9",
  innerBg: "#ffffff",
  border: "#e5e7eb",
  textPrimary: "#111827",
  textSecondary: "#4b5563",
};

const colorsOscuro = {
  cardBg: "#2b2b2b",
  innerBg: "#3a3a3a",
  border: "#4a4a4a",
  textPrimary: "#ffffff",
  textSecondary: "#d1d5db",
};

const styles = {
  card: {
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 720,
    transition: "background-color 0.2s ease",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    boxSizing: "border-box",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 12,
  },
  titulo: {
    fontWeight: 700,
    margin: 0,
  },
  botonGuardar: {
    backgroundColor: "#15803d",
    color: "#fff",
    fontWeight: 600,
    padding: "8px 20px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  innerCard: {
    border: "1px solid",
    borderRadius: 12,
    padding: 20,
    transition: "background-color 0.2s ease, border-color 0.2s ease",
  },
  subtitulo: {
    fontWeight: 700,
    marginTop: 0,
    marginBottom: 16,
  },
  filaModo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 12,
  },
  opcionesModo: {
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  opcionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "#15803d",
  },
  slider: {
    width: "100%",
    accentColor: "#15803d",
    cursor: "pointer",
  },
  etiquetasSlider: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 4,
  },
};