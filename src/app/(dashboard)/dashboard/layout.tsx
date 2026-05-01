import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import LogoutButton from "@/src/app/components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const usuarioId = (session.user as any).id;
  const tipoUsuario = (session.user as any).tipo;

  let carteira = null;

  if (tipoUsuario === "FREELANCER") {
    carteira = await prisma.carteiraToken.findUnique({
      where: { usuarioId },
    });

    if (!carteira) {
      carteira = await prisma.carteiraToken.create({
        data: {
          usuarioId,
          saldo: 0,
        },
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC]">
      <header className="border-b border-blue-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-upfreela.png"
              alt="UpFreela"
              width={200}
              height={100}
              className="h-12 w-auto object-contain"
              priority
            />

            
          </div>

          <div className="flex items-center gap-4">
            {tipoUsuario === "FREELANCER" && (
              <>
                <div className="rounded-xl bg-[#EAFBE7] px-4 py-2 text-sm font-semibold text-[#1E7A23]">
                  Saldo: {carteira?.saldo ?? 0} tokens
                </div>

                <Link
                  href="/dashboard/tokens"
                  className="rounded-lg bg-[#071B33] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0B2A4D]"
                >
                  Adicionar tokens
                </Link>
              </>
            )}

            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-[240px_1fr] gap-6 px-6 py-6">
        <aside className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-[#071B33] hover:bg-blue-50"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/servicos"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-[#071B33] hover:bg-blue-50"
            >
              Serviços
            </Link>

            {tipoUsuario === "CLIENTE" && (
              <>
                <Link
                  href="/dashboard/servicos/novo"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-[#071B33] hover:bg-blue-50"
                >
                  Novo serviço
                </Link>

                <Link
                  href="/dashboard/interessados"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-[#071B33] hover:bg-blue-50"
                >
                  Interessados
                </Link>
              </>
            )}

            {tipoUsuario === "FREELANCER" && (
              <>
                <Link
                  href="/dashboard/contatos"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-[#071B33] hover:bg-blue-50"
                >
                  Contatos liberados
                </Link>

                <Link
                  href="/dashboard/tokens"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-[#071B33] hover:bg-blue-50"
                >
                  Tokens
                </Link>
              </>
            )}

            <Link
              href="/dashboard/perfil"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-[#071B33] hover:bg-blue-50"
            >
              Perfil
            </Link>
          </nav>
        </aside>

        <section>{children}</section>
      </div>
    </div>
  );
}