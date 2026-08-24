import styles from "./Modal.module.css";

interface SettingsPanelProps {
  showFullExpression: boolean;
  onChangeShowFull: (value: boolean) => void;
  onClose: () => void;
}

export function SettingsPanel({
  showFullExpression,
  onChangeShowFull,
  onClose,
}: SettingsPanelProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Configurações</h2>
          <button type="button" className={styles.close} onClick={onClose}>
            ×
          </button>
        </div>
        <label className={styles.setting}>
          <span>
            <strong>Exibir operação completa</strong>
            <p>
              {showFullExpression
                ? "Mostra toda a expressão no display."
                : "Mostra só a última operação no display."}
            </p>
          </span>
          <input
            type="checkbox"
            checked={showFullExpression}
            onChange={(e) => onChangeShowFull(e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
}
