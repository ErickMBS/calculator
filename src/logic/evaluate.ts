import Big from "big.js";

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  const s = input.replace(/\s+/g, "").replace(/×/g, "x").replace(/÷/g, "/").replace(/π/g, "PI").replace(/√/g, "sqrt");

  while (i < s.length) {
    if (/[0-9.]/.test(s[i])) {
      let num = "";
      while (i < s.length && /[0-9.]/.test(s[i])) {
        num += s[i++];
      }
      tokens.push(num);
      continue;
    }

    if (/[a-zA-Z]/.test(s[i])) {
      let name = "";
      while (i < s.length && /[a-zA-Z]/.test(s[i])) {
        name += s[i++];
      }
      tokens.push(name);
      continue;
    }

    if ("+-x/^()%!".includes(s[i])) {
      tokens.push(s[i++]);
      continue;
    }

    throw new Error(`Caractere inválido: ${s[i]}`);
  }

  return tokens;
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) throw new Error("Fatorial inválido");
  if (n > 170) throw new Error("Overflow");
  let r = 1;
  for (let i = 2; i < n; i++) r *= i;
  return r;
}

class Parser {
  private tokens: string[];
  private pos = 0;

  constructor(tokens: string[]) {
    this.tokens = tokens;
  }

  private peek(): string | undefined {
    return this.tokens[this.pos];
  }

  private consume(): string {
    return this.tokens[this.pos++];
  }

  parse(): Big {
    const result = this.parseExpression();
    if (this.pos < this.tokens.length) {
      throw new Error("Expressão incompleta");
    }
    return result;
  }

  private parseExpression(): Big {
    let left = this.parseTerm();
    while (this.peek() === "+" || this.peek() === "-") {
      const op = this.consume();
      const right = this.parseTerm();
      left = op === "+" ? left.plus(right) : left.minus(right);
    }
    return left;
  }

  private parseTerm(): Big {
    let left = this.parsePower();
    while (this.peek() === "x" || this.peek() === "/" || this.peek() === "+" || this.peek() === "-") {
      const op = this.consume();
      const right = this.parsePower();
      if (op === "x") {
        left = left.times(right);
      } else if (op === "/") {
        if (right.eq(0)) {
          return left;
        }
        left = left.div(right);
      } else if (op === "+") {
        left = left.plus(right);
      } else {
        left = left.minus(right);
      }
    }
    return left;
  }

  private parsePower(): Big {
    let base = this.parseUnary();
    while (this.peek() === "^") {
      this.consume();
      const exp = this.parseUnary();
      base = Big(Math.pow(base.toNumber(), exp.toNumber()));
    }
    return base;
  }

  private parseUnary(): Big {
    if (this.peek() === "-") {
      this.consume();
      return this.parseUnary().times(-1);
    }
    if (this.peek() === "+") {
      this.consume();
      return this.parseUnary();
    }
    return this.parsePostfix();
  }

  private parsePostfix(): Big {
    let value = this.parsePrimary();
    while (this.peek() === "!") {
      this.consume();
      value = Big(factorial(value.toNumber()));
    }
    while (this.peek() === "%") {
      this.consume();
      value = value.div(100);
    }
    return value;
  }

  private parsePrimary(): Big {
    const token = this.peek();

    if (token === "(") {
      this.consume();
      const value = this.parseExpression();
      if (this.peek() !== ")") throw new Error("Parêntese não fechado");
      this.consume();
      return value;
    }

    if (token === "PI") {
      this.consume();
      return Big(Math.PI);
    }

    if (token === "e") {
      this.consume();
      return Big(Math.E);
    }

    const funcs: Record<string, (n: number) => number> = {
      sqrt: Math.sqrt,
      // Ângulos em GRAUS — padrão de calculadora científica de consumo (HP, Casio, etc.).
      // Math.sin/cos/tan do JS esperam radianos; a conversão abaixo é intencional.
      sin: (n) => Math.sin((n * Math.PI) / 180),
      cos: (n) => Math.cos((n * Math.PI) / 180),
      tan: (n) => Math.tan((n * Math.PI) / 180),
      log: Math.log10,
      ln: Math.log,
      abs: Math.abs,
    };

    if (token && funcs[token]) {
      this.consume();
      if (this.peek() !== "(") throw new Error(`Esperado ( após ${token}`);
      this.consume();
      const arg = this.parseExpression();
      if (this.peek() !== ")") throw new Error("Parêntese não fechado");
      this.consume();
      const result = funcs[token](arg.toNumber());
      if (!Number.isFinite(result)) throw new Error("Erro");
      return Big(result);
    }

    if (token && /^[0-9.]/.test(token)) {
      this.consume();
      return Big(token);
    }

    throw new Error("Expressão inválida");
  }
}

export function evaluate(expression: string): string {
  const trimmed = expression.trim();
  if (!trimmed) return "0";
  try {
    const tokens = tokenize(trimmed);
    const parser = new Parser(tokens);
    const result = parser.parse();
    return result.toString();
  } catch {
    return "Erro";
  }
}
