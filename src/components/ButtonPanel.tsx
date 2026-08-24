import { Button } from "./Button";
import { CalculatorMode } from "@/src/logic/calculate";
import styles from "./ButtonPanel.module.css";

interface ButtonPanelProps {
  mode: CalculatorMode;
  onClick: (name: string) => void;
  computeMode?: boolean;
}

export function ButtonPanel({ mode, onClick, computeMode }: ButtonPanelProps) {
  if (mode === "financeira") {
    return (
      <div className={styles.panel}>
        <div className={styles.row}>
          <Button name="AC" onClick={onClick} variant="gray" />
          <Button name="+/-" onClick={onClick} variant="gray" />
          <Button name="%" onClick={onClick} variant="gray" />
          <Button name="÷" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="CPT" onClick={onClick} variant={computeMode ? "orange" : "gray"} />
          <Button name="N" onClick={onClick} variant="gray" />
          <Button name="I/Y" onClick={onClick} variant="gray" />
          <Button name="x" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="PV" onClick={onClick} variant="gray" />
          <Button name="PMT" onClick={onClick} variant="gray" />
          <Button name="FV" onClick={onClick} variant="gray" />
          <Button name="-" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="7" onClick={onClick} />
          <Button name="8" onClick={onClick} />
          <Button name="9" onClick={onClick} />
          <Button name="+" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="4" onClick={onClick} />
          <Button name="5" onClick={onClick} />
          <Button name="6" onClick={onClick} />
          <Button name="=" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="1" onClick={onClick} />
          <Button name="2" onClick={onClick} />
          <Button name="3" onClick={onClick} />
          <Button name="." onClick={onClick} />
        </div>
        <div className={styles.row}>
          <Button name="0" onClick={onClick} wide />
          <Button name="⌫" onClick={onClick} variant="gray" />
        </div>
      </div>
    );
  }

  if (mode === "científica") {
    return (
      <div className={styles.panel}>
        <div className={styles.row}>
          <Button name="sin" onClick={onClick} variant="gray" small />
          <Button name="cos" onClick={onClick} variant="gray" small />
          <Button name="tan" onClick={onClick} variant="gray" small />
          <Button name="log" onClick={onClick} variant="gray" small />
          <Button name="ln" onClick={onClick} variant="gray" small />
        </div>
        <div className={styles.row}>
          <Button name="(" onClick={onClick} variant="gray" small />
          <Button name=")" onClick={onClick} variant="gray" small />
          <Button name="^" onClick={onClick} variant="gray" small />
          <Button name="√" onClick={onClick} variant="gray" small />
          <Button name="!" onClick={onClick} variant="gray" small />
        </div>
        <div className={styles.row}>
          <Button name="π" onClick={onClick} variant="gray" />
          <Button name="e" onClick={onClick} variant="gray" />
          <Button name="AC" onClick={onClick} variant="gray" />
          <Button name="÷" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="7" onClick={onClick} />
          <Button name="8" onClick={onClick} />
          <Button name="9" onClick={onClick} />
          <Button name="x" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="4" onClick={onClick} />
          <Button name="5" onClick={onClick} />
          <Button name="6" onClick={onClick} />
          <Button name="-" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="1" onClick={onClick} />
          <Button name="2" onClick={onClick} />
          <Button name="3" onClick={onClick} />
          <Button name="+" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="+/-" onClick={onClick} variant="gray" />
          <Button name="0" onClick={onClick} />
          <Button name="." onClick={onClick} />
          <Button name="=" onClick={onClick} variant="orange" />
        </div>
        <div className={styles.row}>
          <Button name="%" onClick={onClick} variant="gray" />
          <Button name="⌫" onClick={onClick} variant="gray" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.row}>
        <Button name="AC" onClick={onClick} variant="gray" />
        <Button name="+/-" onClick={onClick} variant="gray" />
        <Button name="%" onClick={onClick} variant="gray" />
        <Button name="÷" onClick={onClick} variant="orange" />
      </div>
      <div className={styles.row}>
        <Button name="(" onClick={onClick} variant="gray" />
        <Button name=")" onClick={onClick} variant="gray" />
        <Button name="⌫" onClick={onClick} variant="gray" />
        <Button name="x" onClick={onClick} variant="orange" />
      </div>
      <div className={styles.row}>
        <Button name="7" onClick={onClick} />
        <Button name="8" onClick={onClick} />
        <Button name="9" onClick={onClick} />
        <Button name="-" onClick={onClick} variant="orange" />
      </div>
      <div className={styles.row}>
        <Button name="4" onClick={onClick} />
        <Button name="5" onClick={onClick} />
        <Button name="6" onClick={onClick} />
        <Button name="+" onClick={onClick} variant="orange" />
      </div>
      <div className={styles.row}>
        <Button name="1" onClick={onClick} />
        <Button name="2" onClick={onClick} />
        <Button name="3" onClick={onClick} />
        <Button name="=" onClick={onClick} variant="orange" />
      </div>
      <div className={styles.row}>
        <Button name="0" onClick={onClick} wide />
        <Button name="." onClick={onClick} />
      </div>
    </div>
  );
}
