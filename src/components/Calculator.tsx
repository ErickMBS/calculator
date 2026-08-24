"use client";

import { useState } from "react";
import { Display } from "./Display";
import { ButtonPanel } from "./ButtonPanel";
import { calculate, CalculatorState } from "@/src/logic/calculate";
import styles from "./Calculator.module.css";

const initialState: CalculatorState = {
  total: null,
  next: null,
  operation: null,
};

export function Calculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  function handleClick(buttonName: string) {
    const newState = calculate(state, buttonName);
    setState((prev) => ({ ...prev, ...newState }));
  }

  const displayValue = state.next || state.total || "0";

  return (
    <div className={styles.calculator}>
      <Display value={displayValue} />
      <ButtonPanel onClick={handleClick} />
    </div>
  );
}
