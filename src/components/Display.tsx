import styles from "./Display.module.css";

interface DisplayProps {
  expression: string;
  value: string;
  subtitle?: string;
}

export function Display({ expression, value, subtitle }: DisplayProps) {
  return (
    <div className={styles.display}>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      <div className={styles.expression}>{expression}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
