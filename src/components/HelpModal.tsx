import { operatorHelp } from "@/src/logic/help";
import { CalculatorMode } from "@/src/logic/calculate";
import styles from "./Modal.module.css";

interface HelpModalProps {
  mode: CalculatorMode;
  onClose: () => void;
}

export function HelpModal({ mode, onClose }: HelpModalProps) {
  const items = operatorHelp.filter((op) => op.modes.includes(mode));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Operadores — {mode}</h2>
          <button type="button" className={styles.close} onClick={onClose}>
            ×
          </button>
        </div>
        <ul className={styles.list}>
          {items.map((op) => (
            <li key={op.symbol} className={styles.item}>
              <span className={styles.symbol}>{op.symbol}</span>
              <div>
                <strong>{op.name}</strong>
                <p>{op.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
