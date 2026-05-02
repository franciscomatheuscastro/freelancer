import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { comprarPacoteTokens } from "@/src/app/actions/comprar-tokens";
import { pacotesTokens } from "./pacotes";

export default async function TokensPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const usuarioId = (session.user as any).id;

  const carteira = await prisma.carteiraToken.upsert({
    where: { usuarioId },
    update: {},
    create: {
      usuarioId,
      saldo: 0,
    },
  });

  const transacoes = await prisma.transacaoToken.findMany({
    where: { usuarioId },
    orderBy: {
      criadoEm: "desc",
    },
    take: 10,
  });

  return (
    <main className="pb-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Tokens</h1>
          <p className="mt-1 text-zinc-600">
            Compre créditos para liberar contatos e acelerar oportunidades.
          </p>
        </div>

        <div className="rounded-full bg-yellow-100 px-5 py-3 text-sm font-semibold text-zinc-800 shadow-sm">
          🪙 {carteira.saldo} tokens
        </div>
      </div>

      <h2 className="mb-6 text-center text-3xl font-bold text-zinc-900">
        Escolha seu pacote
      </h2>

      <div className="grid gap-6 lg:grid-cols-3">
        {pacotesTokens.map((pacote) => (
          <section
            key={pacote.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100"
          >
            <div className="p-6">
              <p className="font-semibold text-zinc-500">{pacote.nome}</p>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-3xl">
                  🪙
                </div>

                <p className="text-3xl font-bold text-zinc-900">
                  {pacote.tokens} tokens
                </p>
              </div>

              <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-center font-semibold text-green-700">
                ✅ {pacote.destaque}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t bg-zinc-50 p-6">
              <div>
                <p className="text-sm text-zinc-500">À vista</p>
                <p className="text-2xl font-bold text-zinc-900">
                  {pacote.precoTexto}
                </p>
              </div>

              <form action={comprarPacoteTokens}>
                <input type="hidden" name="pacoteId" value={pacote.id} />

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
                >
                  Comprar
                </button>
              </form>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-900">Histórico recente</h2>

        <div className="mt-4 space-y-3">
          {transacoes.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhuma transação registrada ainda.
            </p>
          ) : (
            transacoes.map((transacao: any) => (
              <div
                key={transacao.id}
                className="flex items-center justify-between rounded-xl bg-zinc-50 p-4"
              >
                <div>
                  <p className="font-medium text-zinc-800">
                    {transacao.descricao ?? transacao.tipo}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {new Date(transacao.criadoEm).toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <span
                  className={`font-bold ${
                    transacao.quantidade > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transacao.quantidade > 0 ? "+" : ""}
                  {transacao.quantidade}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}