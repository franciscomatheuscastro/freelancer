import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";

export default async function ServicosPublicosPage() {
  const servicos = await prisma.servico.findMany({
    where: {
      status: "ABERTO",
    },
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      cliente: {
        select: {
          nome: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#F5F8FC]">
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/">
            <Image
              src="/logo-upfreela.png"
              alt="UpFreela"
              width={170}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-[#071B33] hover:bg-blue-50"
            >
              Entrar
            </Link>

            <Link
              href="/cadastro"
              className="rounded-lg bg-[#006BFF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0057CC]"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#071B33]">
            Serviços disponíveis
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Veja oportunidades abertas. Para liberar email e WhatsApp do cliente,
            crie uma conta de freelancer e utilize tokens.
          </p>
        </div>

        {servicos.length === 0 ? (
          <div className="rounded-2xl border border-blue-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#071B33]">
              Nenhum serviço disponível no momento
            </h2>
            <p className="mt-2 text-zinc-600">
              Novas oportunidades aparecerão aqui em breve.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {servicos.map((servico: any) => (
              <article
                key={servico.id}
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#071B33]">
                      {servico.titulo}
                    </h2>

                    <p className="mt-2 text-zinc-600">{servico.descricao}</p>

                    <div className="mt-4 flex flex-wrap gap-2 text-sm">
                      <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-[#006BFF]">
                        {servico.status}
                      </span>

                      <span className="rounded-full bg-[#EAFBE7] px-3 py-1 font-medium text-[#1E7A23]">
                        {servico.custoTokens} token para liberar contato
                      </span>

                      <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
                        Cliente: {servico.cliente.nome}
                      </span>
                    </div>

                    <div className="mt-5 rounded-xl bg-zinc-50 p-4">
                      <p className="text-sm text-zinc-600">
                        Contato protegido. Faça login como freelancer para
                        desbloquear email e WhatsApp.
                      </p>

                      <div className="mt-3 flex flex-wrap gap-3">
                        <Link
                          href="/login"
                          className="rounded-lg bg-[#071B33] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0B2A4D]"
                        >
                          Entrar para liberar
                        </Link>

                        <Link
                          href="/cadastro"
                          className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-[#006BFF] hover:bg-blue-50"
                        >
                          Criar conta freelancer
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-32 text-right">
                    <p className="text-sm text-zinc-500">Orçamento</p>
                    <p className="text-xl font-bold text-[#071B33]">
                      {servico.orcamento
                        ? `R$ ${Number(servico.orcamento).toFixed(2)}`
                        : "A combinar"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}