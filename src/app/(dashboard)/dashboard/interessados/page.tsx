import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export default async function InteressadosPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const usuarioId = (session.user as any).id;

  const contatos = await prisma.contatoLiberado.findMany({
    where: {
      servico: {
        clienteId: usuarioId,
      },
    },
    include: {
      usuario: true,
      servico: true,
    },
    orderBy: {
      criadoEm: "desc",
    },
  });

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">
          Interessados no seu serviço
        </h1>

        <p className="mt-1 text-zinc-600">
          Freelancers que desbloquearam seu contato.
        </p>
      </div>

      {contatos.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-xl font-semibold text-zinc-900">
            Nenhum interessado ainda
          </h2>

          <p className="mt-2 text-zinc-600">
            Quando alguém liberar contato, aparecerá aqui.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {contatos.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-6 shadow"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {item.servico.titulo}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-700">
                    <strong>Nome:</strong> {item.usuario.nome}
                  </p>

                  <p className="text-sm text-zinc-700">
                    <strong>Email:</strong> {item.usuario.email}
                  </p>

                  <p className="text-sm text-zinc-700">
                    <strong>WhatsApp:</strong>{" "}
                    {item.usuario.whatsapp ?? "Não informado"}
                  </p>
                </div>

                <div className="text-sm text-zinc-500">
                  {new Date(item.criadoEm).toLocaleDateString("pt-BR")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}