import { Button } from "./Button";
import styles from "./ButtonPanel.module.css";

interface ButtonPanelProps {
  onClick: (name: string) => void;
}

export function ButtonPanel({ onClick }: ButtonPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.row}>
        <Button name="AC" onClick={onClick} variant="gray" />
        <Button name="+/-" onClick={onClick} variant="gray" />
        <Button name="%" onClick={onClick} variant="gray" />
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
        <Button name="0" onClick={onClick} wide />
        <Button name="." onClick={onClick} />
        <Button name="=" onClick={onClick} variant="orange" />
      </div>
    </div>
  );
}
