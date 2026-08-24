export type Operation = "+" | "-" | "x" | "÷" | "^";

import Big from "big.js";

export function operate(
  numberOne: string | null,
  numberTwo: string | null,
  operation: Operation
): string {
  const one = Big(numberOne || "0");
  const two = Big(
    numberTwo || (operation === "÷" || operation === "x" ? "1" : "0")
  );

  switch (operation) {
    case "+":
      return one.plus(two).toString();
    case "-":
      return one.minus(two).toString();
    case "x":
      return one.times(two).toString();
    case "÷":
      if (two.eq(Big("0"))) return "Erro";
      return one.div(two).toString();
    case "^":
      return Big(Math.pow(one.toNumber(), two.toNumber())).toString();
    default:
      throw new Error(`Operação desconhecida: '${operation}'`);
  }
}
