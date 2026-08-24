import styles from "./Display.module.css";

interface DisplayProps {
  expression: string;
  value: string;
  subtitle?: string;
}

export function Display({ expression, value, subtitle }: DisplayProps) {
  const decimalPart = value.split(".")[1];
  const fractionDigits = decimalPart.length;

  return (
    <div className={styles.display}>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      <div className={styles.expression}>{expression}</div>
      <div className={styles.value} data-fraction-digits={fractionDigits}>
        {value}
      </div>
    </div>
  );
}
