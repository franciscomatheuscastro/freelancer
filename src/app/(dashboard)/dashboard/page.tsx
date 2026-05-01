import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const usuarioId = (session.user as any).id;
  const tipoUsuario = (session.user as any).tipo;
  const nome = session.user.name ?? "usuário";

  const totalServicos =
    tipoUsuario === "CLIENTE"
      ? await prisma.servico.count({ where: { clienteId: usuarioId } })
      : await prisma.servico.count({ where: { status: "ABERTO" } });

  const totalContatosLiberados =
    tipoUsuario === "CLIENTE"
      ? await prisma.contatoLiberado.count({
          where: {
            servico: {
              clienteId: usuarioId,
            },
          },
        })
      : await prisma.contatoLiberado.count({
          where: {
            usuarioId,
          },
        });

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
        <p className="mt-1 text-zinc-600">Bem-vindo, {nome}.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Link
          href="/dashboard/servicos"
          className="rounded-2xl bg-white p-6 shadow hover:shadow-md"
        >
          <h2 className="text-xl font-bold text-zinc-900">
            {tipoUsuario === "CLIENTE" ? "Meus serviços" : "Serviços disponíveis"}
          </h2>
          <p className="mt-2 text-3xl font-bold text-zinc-900">
            {totalServicos}
          </p>
          <p className="mt-1 text-zinc-600">
            {tipoUsuario === "CLIENTE"
              ? "Serviços publicados por você."
              : "Oportunidades abertas na plataforma."}
          </p>
        </Link>

        <Link
          href={tipoUsuario === "CLIENTE" ? "/dashboard/servicos/novo" : "/dashboard/contatos"}
          className="rounded-2xl bg-white p-6 shadow hover:shadow-md"
        >
          <h2 className="text-xl font-bold text-zinc-900">
            {tipoUsuario === "CLIENTE" ? "Publicar serviço" : "Contatos liberados"}
          </h2>
          <p className="mt-2 text-3xl font-bold text-zinc-900">
            {tipoUsuario === "CLIENTE" ? "+" : totalContatosLiberados}
          </p>
          <p className="mt-1 text-zinc-600">
            {tipoUsuario === "CLIENTE"
              ? "Cadastre uma nova demanda grátis."
              : "Leads desbloqueados com tokens."}
          </p>
        </Link>

        <Link
          href="/dashboard/perfil"
          className="rounded-2xl bg-white p-6 shadow hover:shadow-md"
        >
          <h2 className="text-xl font-bold text-zinc-900">Perfil</h2>
          <p className="mt-2 text-zinc-600">
            Atualize seus dados de contato.
          </p>
        </Link>
      </div>
    </main>
  );
}