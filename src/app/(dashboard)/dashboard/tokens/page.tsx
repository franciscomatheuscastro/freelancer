import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function adicionarTokens(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const usuarioId = (session.user as any).id;
  const quantidade = Number(formData.get("quantidade"));

  if (!quantidade || quantidade <= 0) {
    return;
  }

  await prisma.carteiraToken.upsert({
    where: {
      usuarioId,
    },
    update: {
      saldo: {
        increment: quantidade,
      },
    },
    create: {
      usuarioId,
      saldo: quantidade,
    },
  });

  await prisma.transacaoToken.create({
    data: {
      usuarioId,
      tipo: "BONUS",
      quantidade,
      descricao: `Crédito fake para teste: ${quantidade} tokens`,
    },
  });

  revalidatePath("/dashboard/tokens");
  revalidatePath("/dashboard/servicos");
}

export default async function TokensPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const usuarioId = (session.user as any).id;

  const carteira = await prisma.carteiraToken.upsert({
    where: {
      usuarioId,
    },
    update: {},
    create: {
      usuarioId,
      saldo: 0,
    },
  });

  const transacoes = await prisma.transacaoToken.findMany({
    where: {
      usuarioId,
    },
    orderBy: {
      criadoEm: "desc",
    },
    take: 10,
  });

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Tokens</h1>
        <p className="mt-1 text-zinc-600">
          Adicione créditos fake para testar a liberação de contatos.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Saldo atual</p>

          <h2 className="mt-2 text-4xl font-bold text-zinc-900">
            {carteira.saldo} tokens
          </h2>

          <form action={adicionarTokens} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Quantidade de tokens
              </label>

              <input
                type="number"
                name="quantidade"
                min="1"
                defaultValue={5}
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-5 py-3 font-semibold text-white hover:bg-zinc-800"
            >
              Adicionar tokens fake
            </button>
          </form>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-900">
            Histórico recente
          </h2>

          <div className="mt-4 space-y-3">
            {transacoes.length === 0 ? (
              <p className="text-sm text-zinc-500">
                Nenhuma transação registrada ainda.
              </p>
            ) : (
              transacoes.map((transacao) => (
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
      </div>
    </main>
  );
}