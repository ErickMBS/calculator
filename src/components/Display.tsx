import styles from "./Display.module.css";

interface DisplayProps {
  value: string;
}

export function Display({ value }: DisplayProps) {
  return (
    <div className={styles.display}>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
