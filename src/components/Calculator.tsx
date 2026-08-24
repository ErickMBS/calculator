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

  // Monta a expressão visível (ex: "12 + 5")
  function buildExpression(): string {
    const parts: string[] = [];
    if (state.total) parts.push(state.total);
    if (state.operation) parts.push(state.operation);
    if (state.total && state.operation && state.next) parts.push(state.next);
    return parts.join(" ");
  }

  return (
    <div className={styles.calculator}>
      <Display expression={buildExpression()} value={displayValue} />
      <ButtonPanel onClick={handleClick} />
    </div>
  );
}
