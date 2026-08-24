import styles from "./Modal.module.css";

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
}

interface HistoryPanelProps {
  history: HistoryEntry[];
  onResume: (entry: HistoryEntry) => void;
  onClear: () => void;
  onClose: () => void;
}

export function HistoryPanel({ history, onResume, onClear, onClose }: HistoryPanelProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Histórico</h2>
          <button type="button" className={styles.close} onClick={onClose}>
            ×
          </button>
        </div>
        {history.length === 0 ? (
          <p className={styles.empty}>Nenhuma operação ainda.</p>
        ) : (
          <>
            <ul className={styles.list}>
              {history.map((entry) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    className={styles.historyBtn}
                    onClick={() => onResume(entry)}
                  >
                    <span className={styles.histExpr}>{entry.expression}</span>
                    <span className={styles.histResult}>= {entry.result}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className={styles.secondary} onClick={onClear}>
              Limpar histórico
            </button>
          </>
        )}
      </div>
    </div>
  );
}
