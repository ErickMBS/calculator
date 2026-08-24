import { evaluate } from "./evaluate";
import { isNumber } from "./isNumber";

export type CalculatorMode = "padrão" | "científica" | "financeira";

export interface CalculatorState {
  expression: string;
  current: string;
  overwrite: boolean;
  lastOp: string;
  openParens: number;
}

export const initialState: CalculatorState = {
  expression: "",
  current: "0",
  overwrite: true,
  lastOp: "",
  openParens: 0,
};

function endsWithOperator(expr: string): boolean {
  return /[+\-x÷/^]$/.test(expr);
}

function needsImplicitMultiply(expr: string): boolean {
  return /[0-9)!.]$/.test(expr) || /π$/.test(expr) || /e$/.test(expr);
}

function closeOpenParens(expr: string): string {
  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  return expr + ")".repeat(Math.max(0, open - close));
}

export function calculate(
  state: CalculatorState,
  buttonName: string
): Partial<CalculatorState> {
  if (buttonName === "AC") {
    return { ...initialState };
  }

  if (buttonName === "⌫") {
    if (!state.overwrite && state.current.length > 1) {
      return { current: state.current.slice(0, -1) };
    }
    if (!state.overwrite && state.current.length === 1) {
      return { current: "0", overwrite: true };
    }
    if (state.expression) {
      const last = state.expression.slice(-1);
      return {
        expression: state.expression.slice(0, -1),
        openParens:
          last === "("
            ? state.openParens - 1
            : last === ")"
              ? state.openParens + 1
              : state.openParens,
        lastOp: "",
      };
    }
    return {};
  }

  if (isNumber(buttonName)) {
    if (state.overwrite) {
      return { current: buttonName, overwrite: false };
    }
    if (state.current === "0") {
      return { current: buttonName };
    }
    return { current: state.current + buttonName };
  }

  if (buttonName === ".") {
    if (state.overwrite) {
      return { current: "0.", overwrite: false };
    }
    if (state.current.includes(".")) return {};
    return { current: state.current + "." };
  }

  if (buttonName === "+/-") {
    if (state.current === "0") return {};
    if (state.current.startsWith("-")) {
      return { current: state.current.slice(1), overwrite: false };
    }
    return { current: "-" + state.current, overwrite: false };
  }

  if (buttonName === "(") {
    let expr = state.expression;
    if (!state.overwrite) {
      expr += state.current;
      if (needsImplicitMultiply(expr)) expr += "x";
    } else if (expr && needsImplicitMultiply(expr)) {
      expr += "x";
    }
    return {
      expression: expr + "(",
      current: "0",
      overwrite: true,
      openParens: state.openParens + 1,
      lastOp: "(",
    };
  }

  if (buttonName === ")") {
    if (state.openParens <= 0) return {};
    let expr = state.expression;
    if (!state.overwrite) {
      expr += state.current;
    } else if (endsWithOperator(expr) || expr.endsWith("(")) {
      return {};
    }
    return {
      expression: expr + ")",
      current: "0",
      overwrite: true,
      openParens: state.openParens - 1,
      lastOp: ")",
    };
  }

  const binaryOps = ["+", "-", "x", "÷", "^"];
  if (binaryOps.includes(buttonName)) {
    let expr = state.expression;
    if (state.overwrite && endsWithOperator(expr)) {
      return {
        expression: expr.slice(0, -1) + buttonName,
        lastOp: buttonName,
      };
    }
    if (!state.overwrite) {
      expr += state.current;
    } else if (!expr) {
      expr = state.current;
    } else if (expr.endsWith(")")) {
      // keep
    } else if (!endsWithOperator(expr)) {
      expr += state.current;
    }
    return {
      expression: expr + buttonName,
      current: "0",
      overwrite: true,
      lastOp: buttonName,
    };
  }

  if (buttonName === "%") {
    return {
      current: evaluate(state.current + "%"),
      overwrite: true,
      lastOp: "%",
    };
  }

  if (buttonName === "!") {
    return {
      current: evaluate(state.current + "!"),
      overwrite: true,
      lastOp: "!",
    };
  }

  if (buttonName === "√") {
    return {
      current: evaluate(`sqrt(${state.current})`),
      overwrite: true,
      lastOp: "√",
    };
  }

  if (["sin", "cos", "tan", "log", "ln"].includes(buttonName)) {
    return {
      current: evaluate(`${buttonName}(${state.current})`),
      overwrite: true,
      lastOp: buttonName,
    };
  }

  if (buttonName === "π") {
    return { current: Math.PI.toString(), overwrite: true, lastOp: "π" };
  }

  if (buttonName === "e") {
    return { current: Math.E.toString(), overwrite: true, lastOp: "e" };
  }

  if (buttonName === "=") {
    let full = state.expression;
    if (!state.overwrite) {
      full += state.current;
    } else if (!full) {
      full = state.current;
    } else if (endsWithOperator(full)) {
      full += state.current;
    }

    full = closeOpenParens(full);
    const result = evaluate(full);
    return {
      expression: "",
      current: result,
      overwrite: true,
      openParens: 0,
      lastOp: `${full} =`,
    };
  }

  return {};
}

export function buildDisplayExpression(
  state: CalculatorState,
  showFull: boolean
): string {
  if (!showFull) {
    if (["+", "-", "x", "÷", "^"].includes(state.lastOp)) {
      if (state.overwrite) {
        const base = state.expression.slice(0, -1);
        return base ? `${base} ${state.lastOp}` : state.lastOp;
      }
      return `${state.lastOp} ${state.current}`;
    }
    return state.lastOp || "";
  }

  if (!state.expression) return "";
  if (state.overwrite) return state.expression;
  return state.expression + state.current;
}
