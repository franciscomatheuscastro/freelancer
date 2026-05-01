import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export default async function ContatosLiberadosPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const usuarioId = (session.user as any).id;

  const contatos = await prisma.contatoLiberado.findMany({
    where: {
      usuarioId,
    },
    include: {
      servico: {
        include: {
          cliente: true,
        },
      },
    },
    orderBy: {
      criadoEm: "desc",
    },
  });

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">
          Contatos liberados
        </h1>
        <p className="mt-1 text-zinc-600">
          Acompanhe os contatos que você já desbloqueou com tokens.
        </p>
      </div>

      {contatos.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-xl font-semibold text-zinc-900">
            Nenhum contato liberado
          </h2>
          <p className="mt-2 text-zinc-600">
            Libere contatos na página de serviços disponíveis.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {contatos.map((item) => {
            const whatsapp = item.servico.cliente.whatsapp;

            return (
              <div key={item.id} className="rounded-2xl bg-white p-6 shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900">
                      {item.servico.titulo}
                    </h2>

                    <p className="mt-2 text-zinc-600">
                      {item.servico.descricao}
                    </p>

                    <div className="mt-4 text-sm text-zinc-700">
                      <p>
                        <strong>Cliente:</strong> {item.servico.cliente.nome}
                      </p>
                      <p>
                        <strong>Email:</strong> {item.servico.cliente.email}
                      </p>
                      <p>
                        <strong>WhatsApp:</strong>{" "}
                        {whatsapp ?? "Não informado"}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={`mailto:${item.servico.cliente.email}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Enviar email
                      </a>

                      {whatsapp && (
                        <a
                          href={`https://wa.me/55${whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        >
                          Chamar no WhatsApp
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="text-right text-sm text-zinc-500">
                    <p>{item.tokensGastos} token gasto</p>
                    <p>
                      {new Date(item.criadoEm).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}