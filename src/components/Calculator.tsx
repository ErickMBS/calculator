"use client";

import { useEffect, useState } from "react";
import { Display } from "./Display";
import { ButtonPanel } from "./ButtonPanel";
import { Toolbar } from "./Toolbar";
import { HelpModal } from "./HelpModal";
import { HistoryPanel, HistoryEntry } from "./HistoryPanel";
import { SettingsPanel } from "./SettingsPanel";
import {
  calculate,
  buildDisplayExpression,
  CalculatorMode,
  CalculatorState,
  initialState,
} from "@/src/logic/calculate";
import {
  TvmValues,
  TvmKey,
  emptyTvm,
  computeTvm,
  formatTvm,
  toCashFlowSign,
} from "@/src/logic/financial";
import styles from "./Calculator.module.css";

type Panel = "help" | "history" | "settings" | null;

const HISTORY_KEY = "calc-history";
const SETTINGS_KEY = "calc-show-full";

function fullExpression(state: CalculatorState): string {
  if (!state.expression) return state.current;
  if (state.overwrite) return state.expression;
  return state.expression + state.current;
}

export function Calculator() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [mode, setMode] = useState<CalculatorMode>("padrão");
  const [panel, setPanel] = useState<Panel>(null);
  const [showFullExpression, setShowFullExpression] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [tvm, setTvm] = useState<TvmValues>(emptyTvm);
  const [computeArmed, setComputeArmed] = useState(false);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
  }, [history]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved));
      const setting = localStorage.getItem(SETTINGS_KEY);
      if (setting !== null) setShowFullExpression(setting === "true");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, String(showFullExpression));
  }, [showFullExpression]);

  function pushHistory(expression: string, result: string) {
    if (!expression || result === "Erro") return;
    setHistory((prev) =>
      [{ id: `${Date.now()}`, expression, result }, ...prev].slice(0, 50)
    );
  }

  function handleModeChange(next: CalculatorMode) {
    setMode(next);
    setState(initialState);
    setComputeArmed(false);
    if (next !== "financeira") setTvm(emptyTvm);
  }

  function handleFinancial(buttonName: string) {
    const tvmMap: Record<string, TvmKey> = {
      N: "n",
      "I/Y": "iy",
      PV: "pv",
      PMT: "pmt",
      FV: "fv",
    };

    if (buttonName === "CPT") {
      setComputeArmed((v) => !v);
      return;
    }

    const key = tvmMap[buttonName];
    if (key) {
      if (computeArmed) {
        try {
          const value = computeTvm(tvm, key);
          const formatted = formatTvm(value);
          setTvm((prev) => ({ ...prev, [key]: value }));
          setState({
            ...initialState,
            current: formatted,
            lastOp: `CPT ${buttonName}`,
          });
          pushHistory(`CPT ${buttonName}`, formatted);
        } catch {
          setState({
            ...initialState,
            current: "Erro",
            lastOp: `CPT ${buttonName}`,
          });
        }
        setComputeArmed(false);
        return;
      }

      const num = parseFloat(state.current);
      if (Number.isNaN(num)) return;
      // Convenção de fluxo de caixa (TVM / HP-12C): dinheiro que SAI é negativo.
      // PV (investimento) e PMT (parcela paga) positivos digitados pelo usuário
      // são armazenados com sinal invertido — comportamento esperado em calculadoras financeiras.
      const signed = toCashFlowSign(key, num);
      setTvm((prev) => ({ ...prev, [key]: signed }));
      setState({
        ...initialState,
        current: String(signed),
        overwrite: true,
        lastOp: `${buttonName} = ${signed}`,
      });
      return;
    }

    const before = fullExpression(state);
    const newState = calculate(state, buttonName);
    if (buttonName === "=" && newState.current) {
      pushHistory(before, newState.current);
    }
    setState((prev) => ({ ...prev, ...newState }));
  }

  function handleClick(buttonName: string) {
    if (mode === "financeira") {
      handleFinancial(buttonName);
      return;
    }

    const before = fullExpression(state);
    const newState = calculate(state, buttonName);
    if (buttonName === "=" && newState.current) {
      pushHistory(before, newState.current);
    }
    setState((prev) => ({ ...prev, ...newState }));
  }

  function handleResume(entry: HistoryEntry) {
    const resumed = entry.expression;
    setState({
      ...initialState,
      current: resumed.split("=")[0].trim(),
      lastOp: entry.result,
    });
    setPanel(null);
  }

  const expression = buildDisplayExpression(state, showFullExpression);

  const tvmSummary =
    mode === "financeira"
      ? [
          tvm.n !== null ? `N:${tvm.n}` : null,
          tvm.iy !== null ? `I/Y:${tvm.iy}` : null,
          tvm.pv !== null ? `PV:${tvm.pv}` : null,
          tvm.pmt !== null ? `PMT:${tvm.pmt}` : null,
          tvm.fv !== null ? `FV:${tvm.fv}` : null,
          computeArmed ? "CPT…" : null,
        ]
          .filter(Boolean)
          .join("  ")
      : undefined;

  return (
    <div
      className={`${styles.calculator} ${mode !== "padrão" ? styles.wide : ""}`}
    >
      <Toolbar
        mode={mode}
        onModeChange={handleModeChange}
        onOpenSettings={() => setPanel("settings")}
        onOpenHelp={() => setPanel("help")}
        onOpenHistory={() => setPanel("history")}
      />
      <Display
        expression={expression}
        value={state.current}
        subtitle={tvmSummary || undefined}
      />
      <ButtonPanel
        mode={mode}
        onClick={handleClick}
        computeMode={computeArmed}
      />

      {panel === "help" && (
        <HelpModal mode={mode} onClose={() => setPanel(null)} />
      )}
      {panel === "history" && (
        <HistoryPanel
          history={history}
          onResume={handleResume}
          onClear={() => setHistory([])}
          onClose={() => setPanel(null)}
        />
      )}
      {panel === "settings" && (
        <SettingsPanel
          showFullExpression={showFullExpression}
          onChangeShowFull={setShowFullExpression}
          onClose={() => setPanel(null)}
        />
      )}
    </div>
  );
}
