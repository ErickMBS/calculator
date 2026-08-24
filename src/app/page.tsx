import { Calculator } from "@/src/components/Calculator";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Calculator />
    </main>
  );
}
