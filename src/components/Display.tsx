import styles from "./Display.module.css";

interface DisplayProps {
  expression: string;
  value: string;
}

export function Display({ expression, value }: DisplayProps) {
  return (
    <div className={styles.display}>
      <div className={styles.expression}>{expression}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
