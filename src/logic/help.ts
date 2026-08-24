export interface OperatorHelp {
  symbol: string;
  name: string;
  description: string;
  modes: string[];
}

export const operatorHelp: OperatorHelp[] = [
  { symbol: "+", name: "Soma", description: "Adiciona dois números.", modes: ["padrão", "científica", "financeira"] },
  { symbol: "-", name: "Subtração", description: "Subtrai o segundo número do primeiro.", modes: ["padrão", "científica", "financeira"] },
  { symbol: "x", name: "Multiplicação", description: "Multiplica dois números.", modes: ["padrão", "científica", "financeira"] },
  { symbol: "÷", name: "Divisão", description: "Divide o primeiro número pelo segundo.", modes: ["padrão", "científica", "financeira"] },
  { symbol: "%", name: "Porcentagem", description: "Converte o valor atual em porcentagem (divide por 100).", modes: ["padrão", "científica", "financeira"] },
  { symbol: "+/-", name: "Inverter sinal", description: "Troca o sinal do número atual (positivo ↔ negativo).", modes: ["padrão", "científica", "financeira"] },
  { symbol: "( )", name: "Parênteses", description: "Agrupam operações e definem a ordem de cálculo.", modes: ["padrão", "científica"] },
  { symbol: "^", name: "Potência", description: "Eleva a base ao expoente (ex: 2^3 = 8).", modes: ["científica"] },
  { symbol: "√", name: "Raiz quadrada", description: "Calcula a raiz quadrada do valor atual.", modes: ["científica"] },
  { symbol: "sin", name: "Seno", description: "Seno do ângulo em graus.", modes: ["científica"] },
  { symbol: "cos", name: "Cosseno", description: "Cosseno do ângulo em graus.", modes: ["científica"] },
  { symbol: "tan", name: "Tangente", description: "Tangente do ângulo em graus.", modes: ["científica"] },
  { symbol: "log", name: "Logaritmo", description: "Logaritmo decimal (base 10).", modes: ["científica"] },
  { symbol: "ln", name: "Logaritmo natural", description: "Logaritmo neperiano (base e).", modes: ["científica"] },
  { symbol: "!", name: "Fatorial", description: "Produto de todos os inteiros de 1 até n.", modes: ["científica"] },
  { symbol: "π", name: "Pi", description: "Constante π ≈ 3,14159.", modes: ["científica"] },
  { symbol: "e", name: "Número de Euler", description: "Constante e ≈ 2,71828.", modes: ["científica"] },
  { symbol: "N", name: "Períodos", description: "Número de períodos na calculadora financeira (TVM).", modes: ["financeira"] },
  { symbol: "I/Y", name: "Taxa de juros", description: "Taxa de juros por período, em porcentagem.", modes: ["financeira"] },
  { symbol: "PV", name: "Valor presente", description: "Valor presente (present value) do fluxo.", modes: ["financeira"] },
  { symbol: "PMT", name: "Pagamento", description: "Pagamento periódico (payment).", modes: ["financeira"] },
  { symbol: "FV", name: "Valor futuro", description: "Valor futuro (future value) do fluxo.", modes: ["financeira"] },
  { symbol: "CPT", name: "Calcular", description: "Pressione CPT e depois a variável que deseja calcular (as outras devem estar preenchidas).", modes: ["financeira"] },
];
