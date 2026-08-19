import { useState } from "react";

const FONT_SIZES = ["chica", "mediana", "grande"];

export default function Configuracion() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [fontIndex, setFontIndex] = useState(1); // 0=Chica, 1=Mediana, 2=Grande
  const [guardado, setGuardado] = useState(false);

  const handleGuardar = () => {
    // TODO: acá deberías persistir { modoOscuro, tamanoFuente: FONT_SIZES[fontIndex] }
    // en tu backend/localStorage según corresponda.
    setGuardado(true);
    setTimeout(() => setGuardado(false), 1500);
  };

  const cardBg = modoOscuro ? "bg-[#2b2b2b]" : "bg-[#e9e9e9]";
  const innerBg = modoOscuro ? "bg-[#3a3a3a]" : "bg-white";
  const border = modoOscuro ? "border-[#4a4a4a]" : "border-gray-200";
  const textPrimary = modoOscuro ? "text-white" : "text-gray-900";
  const textSecondary = modoOscuro ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`${cardBg} rounded-2xl p-6 w-full max-w-3xl transition-colors duration-200`}>
      {/* Header: título + botón Guardar Cambios */}
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>
          Configuración del sistema
        </h1>
        <button
          onClick={handleGuardar}
          className="bg-green-700 hover:bg-green-800 active:bg-green-900 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          {guardado ? "¡Guardado!" : "Guardar Cambios"}
        </button>
      </div>

      {/* Preferencias de Interfaz */}
      <div className={`${innerBg} border ${border} rounded-xl p-5 transition-colors duration-200`}>
        <h2 className={`text-lg font-bold mb-4 ${textPrimary}`}>
          Preferencias de Interfaz
        </h2>

        {/* Modo de Visualización */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <span className={`font-medium ${textPrimary}`}>Modo de Visualización</span>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setModoOscuro(false)}
              className="flex items-center gap-2"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  !modoOscuro ? "border-green-600" : "border-gray-400"
                }`}
              >
                {!modoOscuro && (
                  <span className="w-3 h-3 rounded-full bg-green-600" />
                )}
              </span>
              <span className={textPrimary}>Claro (Predeterminado)</span>
            </button>

            <button
              type="button"
              onClick={() => setModoOscuro(true)}
              className="flex items-center gap-2"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  modoOscuro ? "border-green-600" : "border-gray-400"
                }`}
              >
                {modoOscuro && (
                  <span className="w-3 h-3 rounded-full bg-green-600" />
                )}
              </span>
              <span className={textPrimary}>Oscuro</span>
            </button>
          </div>
        </div>

        {/* Tamaño de Fuente / Accesibilidad */}
        <div>
          <span className={`font-medium block mb-2 ${textPrimary}`}>
            Tamaño de Fuente / Accesibilidad
          </span>

          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={fontIndex}
            onChange={(e) => setFontIndex(Number(e.target.value))}
            className="w-full accent-green-600 cursor-pointer"
          />

          <div className={`flex justify-between text-sm mt-1 ${textSecondary}`}>
            <span className={fontIndex === 0 ? `font-bold ${textPrimary}` : ""}>
              Chica
            </span>
            <span className={fontIndex === 1 ? `font-bold ${textPrimary}` : ""}>
              Mediana
            </span>
            <span className={fontIndex === 2 ? `font-bold ${textPrimary}` : ""}>
              Grande
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
