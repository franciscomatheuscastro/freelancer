import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";

export default async function FreelancersPublicosPage() {
  const freelancers = await prisma.perfilFreelancer.findMany({
    include: {
      usuario: {
        select: {
          nome: true,
        },
      },
    },
    orderBy: {
      criadoEm: "desc",
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
              className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-[#071B33]"
            >
              Entrar
            </Link>

            <Link
              href="/cadastro"
              className="rounded-lg bg-[#006BFF] px-4 py-2 text-sm font-semibold text-white"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold text-[#071B33]">
          Freelancers disponíveis
        </h1>

        {freelancers.length === 0 ? (
          <div className="rounded-2xl border border-blue-100 bg-white p-8 text-center">
            <h2 className="text-xl font-bold">
              Nenhum freelancer cadastrado ainda
            </h2>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {freelancers.map((perfil: any) => (
              <article
                key={perfil.id}
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-[#071B33]">
                  {perfil.usuario.nome}
                </h2>

                <p className="mt-1 text-sm text-zinc-600">
                  {perfil.titulo}
                </p>

                <p className="mt-2 text-zinc-700">
                  {perfil.bio}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {perfil.habilidades.map((habilidade: any, index: any) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#006BFF]"
                    >
                      {habilidade}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm text-zinc-600">
                  📍 {perfil.cidade} - {perfil.estado}
                </p>

                <div className="mt-5 rounded-xl bg-zinc-50 p-4">
                  <p className="text-sm text-zinc-600">
                    Contato protegido. Faça login para liberar.
                  </p>

                  <div className="mt-3 flex gap-3">
                    <Link
                      href="/login"
                      className="rounded-lg bg-[#071B33] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Entrar
                    </Link>

                    <Link
                      href="/cadastro"
                      className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-[#006BFF]"
                    >
                      Criar conta
                    </Link>
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