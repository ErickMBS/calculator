import { CalculatorMode } from "@/src/logic/calculate";
import styles from "./Toolbar.module.css";

interface ToolbarProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onOpenHistory: () => void;
}

const modes: CalculatorMode[] = ["padrão", "científica", "financeira"];

export function Toolbar({
  mode,
  onModeChange,
  onOpenSettings,
  onOpenHelp,
  onOpenHistory,
}: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.modes}>
        {modes.map((m) => (
          <button
            key={m}
            type="button"
            className={`${styles.modeBtn} ${mode === m ? styles.active : ""}`}
            onClick={() => onModeChange(m)}
          >
            {m}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.iconBtn} onClick={onOpenHistory} title="Histórico">
          Hist
        </button>
        <button type="button" className={styles.iconBtn} onClick={onOpenSettings} title="Configurações">
          Cfg
        </button>
        <button type="button" className={styles.iconBtn} onClick={onOpenHelp} title="Ajuda">
          ?
        </button>
      </div>
    </div>
  );
}
