import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import LiberarContatoButton from "@/src/app/components/LiberarContatoButton";

export default async function ServicosPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const usuarioId = (session.user as any).id;
  const tipoUsuario = (session.user as any).tipo;

  const servicos = await prisma.servico.findMany({
    where:
      tipoUsuario === "FREELANCER"
        ? { status: "ABERTO" }
        : { clienteId: usuarioId },
    include: {
      cliente: true,
      contatosLiberados: {
        where: { usuarioId },
      },
    },
    orderBy: {
      criadoEm: "desc",
    },
  });

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            {tipoUsuario === "FREELANCER"
              ? "Serviços disponíveis"
              : "Meus serviços"}
          </h1>

          <p className="mt-1 text-zinc-600">
            {tipoUsuario === "FREELANCER"
              ? "Veja oportunidades disponíveis e libere contatos com tokens."
              : "Gerencie os serviços cadastrados no UpFreela."}
          </p>
        </div>

        {tipoUsuario !== "FREELANCER" && (
          <Link
            href="/dashboard/servicos/novo"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Novo serviço
          </Link>
        )}
      </div>

      {servicos.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-xl font-semibold text-zinc-900">
            Nenhum serviço encontrado
          </h2>
          <p className="mt-2 text-zinc-600">
            {tipoUsuario === "FREELANCER"
              ? "Ainda não existem serviços disponíveis."
              : "Cadastre seu primeiro serviço para começar."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {servicos.map((servico: any) => {
            const contatoLiberado = servico.contatosLiberados.length > 0;

            return (
              <div key={servico.id} className="rounded-2xl bg-white p-6 shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900">
                      {servico.titulo}
                    </h2>

                    <p className="mt-2 text-zinc-600">{servico.descricao}</p>

                    <div className="mt-4 flex flex-wrap gap-2 text-sm">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                        {servico.status}
                      </span>

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">
                        {servico.custoTokens} token
                      </span>
                    </div>

                    {tipoUsuario === "FREELANCER" && (
                      <div className="mt-4 rounded-xl bg-zinc-50 p-4">
                        {contatoLiberado ? (
                          <div className="text-sm text-zinc-700">
                            <p>
                              <strong>Email:</strong> {servico.cliente.email}
                            </p>

                            <p>
                              <strong>WhatsApp:</strong>{" "}
                              {servico.cliente.whatsapp ?? "Não informado"}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-zinc-600">
                              Contato bloqueado. Libere usando tokens.
                            </p>

                            <LiberarContatoButton servicoId={servico.id} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-zinc-900">
                      {servico.orcamento
                        ? `R$ ${Number(servico.orcamento).toFixed(2)}`
                        : "A combinar"}
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