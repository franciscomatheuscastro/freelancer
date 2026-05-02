export const pacotesTokens = [
  {
    id: "bronze",
    nome: "Pacote bronze",
    tokens: 100,
    preco: 2990,
    precoTexto: "R$ 29,90",
    destaque: "Ideal para começar",
  },
  {
    id: "prata",
    nome: "Pacote prata",
    tokens: 250,
    preco: 5990,
    precoTexto: "R$ 59,90",
    destaque: "Mais chances de fechar serviços",
  },
  {
    id: "ouro",
    nome: "Pacote ouro",
    tokens: 600,
    preco: 11990,
    precoTexto: "R$ 119,90",
    destaque: "Melhor custo-benefício",
  },
] as const;

export type PacoteTokenId = (typeof pacotesTokens)[number]["id"];