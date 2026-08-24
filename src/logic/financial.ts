import Big from "big.js";

export interface TvmValues {
  n: number | null;
  iy: number | null;
  pv: number | null;
  pmt: number | null;
  fv: number | null;
}

export type TvmKey = keyof TvmValues;

export const emptyTvm: TvmValues = {
  n: null,
  iy: null,
  pv: null,
  pmt: null,
  fv: null,
};

function fvOf(r: number, n: number, pv: number, pmt: number): number {
  if (Math.abs(r) < 1e-10) return pv + pmt * n;
  const factor = Math.pow(1 + r, n);
  return pv * factor + pmt * ((factor - 1) / r);
}

function solveN(r: number, pv: number, pmt: number, fv: number): number {
  if (Math.abs(r) < 1e-10) {
    if (Math.abs(pmt) < 1e-12) throw new Error("Impossível");
    return -(pv + fv) / pmt;
  }
  const a = pmt + pv * r;
  const b = pmt + fv * r;
  if (a === 0 || b / a <= 0) throw new Error("Impossível");
  return Math.log(b / a) / Math.log(1 + r) * -1;
}

function solveIy(n: number, pv: number, pmt: number, fv: number): number {
  if (n === 0) throw new Error("Impossível");
  let r = 0.01;
  for (let i = 0; i < 80; i++) {
    const f = fvOf(r, n, pv, pmt) + fv;
    const h = 1e-8;
    const f2 = fvOf(r + h, n, pv, pmt) + fv;
    const deriv = (f2 - f) / h;
    if (Math.abs(deriv) < 1e-14) break;
    const next = r - f / deriv;
    if (!Number.isFinite(next)) break;
    if (Math.abs(next - r) < 1e-10) {
      r = next;
      break;
    }
    r = next;
  }
  return r * 100;
}

function solvePv(r: number, n: number, pmt: number, fv: number): number {
  if (Math.abs(r) < 1e-10) return -(fv + pmt * n);
  const factor = Math.pow(1 + r, n);
  return -(fv + pmt * ((factor - 1) / r)) / factor;
}

function solvePmt(r: number, n: number, pv: number, fv: number): number {
  if (Math.abs(r) < 1e-10) return -(pv + fv) / n;
  const factor = Math.pow(1 + r, n);
  return -(pv * factor + fv) / ((factor - 1) / r);
}

function solveFv(r: number, n: number, pv: number, pmt: number): number {
  return -fvOf(r, n, pv, pmt);
}

export function computeTvm(values: TvmValues, target: TvmKey): number {
  const { n, iy, pv, pmt, fv } = values;
  const r = (iy ?? 0) / 100;

  switch (target) {
    case "n":
      if (iy === null || pv === null || pmt === null || fv === null) throw new Error("Faltam valores");
      return solveN(r, pv, pmt, fv);
    case "iy":
      if (n === null || pv === null || pmt === null || fv === null) throw new Error("Faltam valores");
      return solveIy(n, pv, pmt, fv);
    case "pv":
      if (n === null || iy === null || pmt === null || fv === null) throw new Error("Faltam valores");
      return solvePv(r, n, pmt, fv);
    case "pmt":
      if (n === null || iy === null || pv === null || fv === null) throw new Error("Faltam valores");
      return solvePmt(r, n, pv, fv);
    case "fv":
      if (n === null || iy === null || pv === null || pmt === null) throw new Error("Faltam valores");
      return solveFv(r, n, pv, pmt);
    default:
      throw new Error("Alvo inválido");
  }
}

export function formatTvm(value: number): string {
  try {
    return Big(value).round(6).toString();
  } catch {
    return "Erro";
  }
}
