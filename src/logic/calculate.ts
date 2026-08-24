import Big from "big.js";
import { operate, Operation } from "./operate";
import { isNumber } from "./isNumber";

export interface CalculatorState {
  total: string | null;
  next: string | null;
  operation: Operation | null;
}

export function calculate(
  state: CalculatorState,
  buttonName: string
): Partial<CalculatorState> {
  // AC - limpar tudo
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  // Números (0-9)
  if (isNumber(buttonName)) {
    if (buttonName === "0" && state.next === "0") {
      return {};
    }

    if (state.operation) {
      if (state.next) {
        return { next: state.next + buttonName };
      }
      return { next: buttonName };
    }

    if (state.next) {
      const next = state.next === "0" ? buttonName : state.next + buttonName;
      return { next, total: null };
    }

    return { next: buttonName, total: null };
  }

  // Porcentagem
  if (buttonName === "%") {
    if (state.operation && state.next) {
      // Ex: 100 - 10% → 10% de 100 = 10, resultado: 100 - 10 = 90
      const percentage = Big(state.total || "0")
        .times(Big(state.next))
        .div(Big("100"));
      return {
        total: operate(state.total, percentage.toString(), state.operation),
        next: null,
        operation: null,
      };
    }
    if (state.next) {
      return {
        next: Big(state.next).div(Big("100")).toString(),
      };
    }
    return {};
  }

  // Ponto decimal
  if (buttonName === ".") {
    if (state.next) {
      if (state.next.includes(".")) {
        return {};
      }
      return { next: state.next + "." };
    }
    return { next: "0." };
  }

  // Igual
  if (buttonName === "=") {
    if (state.next && state.operation) {
      return {
        total: operate(state.total, state.next, state.operation),
        next: null,
        operation: null,
      };
    }
    return {};
  }

  // Inverter sinal (+/-)
  if (buttonName === "+/-") {
    if (state.next) {
      return { next: (-1 * parseFloat(state.next)).toString() };
    }
    if (state.total) {
      return { total: (-1 * parseFloat(state.total)).toString() };
    }
    return {};
  }

  // Operações (+, -, x, ÷)
  if (state.operation) {
    return {
      total: operate(state.total, state.next, state.operation),
      next: null,
      operation: buttonName as Operation,
    };
  }

  if (!state.next) {
    return { operation: buttonName as Operation };
  }

  return {
    total: state.next,
    next: null,
    operation: buttonName as Operation,
  };
}
