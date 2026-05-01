"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Freelancer = {
  id: string;
  nome: string;
  titulo: string;
  bio: string;
  habilidades: string[];
  cidade?: string | null;
  estado?: string | null;
};

type Servico = {
  id: string;
  titulo: string;
  descricao: string;
  orcamento: number | null;
  custoTokens: number;
  clienteNome: string;
};

export default function HomePrincipal({
  freelancers,
  servicos,
}: {
  freelancers: Freelancer[];
  servicos: Servico[];
}) {
  const [aba, setAba] = useState<"contratar" | "trabalhar">("contratar");

  return (
    <main className="min-h-screen bg-[#F5F8FC]">
      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Image
            src="/logo-upfreela.png"
            alt="UpFreela"
            width={170}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />

          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => setAba("contratar")}
              className={`font-semibold ${
                aba === "contratar" ? "text-[#006BFF]" : "text-[#071B33]"
              }`}
            >
              Eu quero contratar
            </button>

            <button
              onClick={() => setAba("trabalhar")}
              className={`font-semibold ${
                aba === "trabalhar" ? "text-[#006BFF]" : "text-[#071B33]"
              }`}
            >
              Eu quero trabalhar
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="font-semibold text-[#071B33]">
              Faça login
            </Link>

            <Link
              href="/cadastro"
              className="rounded-full bg-[#006BFF] px-5 py-2 font-semibold text-white"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold leading-tight text-[#071B33]">
            {aba === "contratar" ? (
              <>
                Encontre freelancers qualificados para o seu{" "}
                <span className="text-[#006BFF]">projeto</span>.
              </>
            ) : (
              <>
                Encontre serviços disponíveis e gere novas{" "}
                <span className="text-[#006BFF]">oportunidades</span>.
              </>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-zinc-600">
            {aba === "contratar"
              ? "Veja profissionais disponíveis sem expor dados pessoais. Para contratar, crie sua conta gratuitamente."
              : "Veja serviços e valores disponíveis. Para liberar o contato do cliente, faça login como freelancer e utilize tokens."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setAba("contratar")}
              className="rounded-full bg-[#006BFF] px-6 py-3 font-semibold text-white"
            >
              Quero contratar
            </button>

            <button
              onClick={() => setAba("trabalhar")}
              className="rounded-full border border-blue-200 px-6 py-3 font-semibold text-[#006BFF]"
            >
              Quero trabalhar
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#071B33]">
            Como funciona?
          </h2>

          <div className="mt-6 space-y-5 text-zinc-600">
            {aba === "contratar" ? (
              <>
                <p>1. Crie sua conta gratuitamente.</p>
                <p>2. Publique seu serviço ou veja freelancers disponíveis.</p>
                <p>3. Receba contatos de profissionais interessados.</p>
              </>
            ) : (
              <>
                <p>1. Crie sua conta como freelancer.</p>
                <p>2. Veja serviços disponíveis e valores.</p>
                <p>3. Use tokens para liberar WhatsApp e e-mail do cliente.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {aba === "contratar" ? (
          <>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#071B33]">
                  Freelancers disponíveis
                </h2>
                <p className="mt-2 text-zinc-600">
                  Conheça profissionais sem exibir dados de contato.
                </p>
              </div>

              <Link href="/freelancers" className="font-semibold text-[#006BFF]">
                Ver todos
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {freelancers.map((perfil) => (
                <article
                  key={perfil.id}
                  className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-[#071B33]">
                    {perfil.nome}
                  </h3>

                  <p className="mt-1 font-semibold text-[#006BFF]">
                    {perfil.titulo}
                  </p>

                  <p className="mt-3 line-clamp-3 text-sm text-zinc-600">
                    {perfil.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {perfil.habilidades.slice(0, 4).map((h) => (
                      <span
                        key={h}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#006BFF]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm text-zinc-500">
                    📍 {perfil.cidade || "Cidade não informada"}{" "}
                    {perfil.estado ? `- ${perfil.estado}` : ""}
                  </p>

                  <div className="mt-5 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600">
                    🔒 Contato protegido.
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#071B33]">
                  Serviços disponíveis
                </h2>
                <p className="mt-2 text-zinc-600">
                  Veja oportunidades abertas e valores.
                </p>
              </div>

              <Link href="/servicos" className="font-semibold text-[#006BFF]">
                Ver todos
              </Link>
            </div>

            <div className="grid gap-5">
              {servicos.map((servico) => (
                <article
                  key={servico.id}
                  className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#071B33]">
                        {servico.titulo}
                      </h3>

                      <p className="mt-2 text-zinc-600">{servico.descricao}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#EAFBE7] px-3 py-1 text-sm font-semibold text-[#1E7A23]">
                          {servico.custoTokens} token para liberar contato
                        </span>

                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700">
                          Cliente: {servico.clienteNome}
                        </span>
                      </div>
                    </div>

                    <div className="min-w-40 text-right">
                      <p className="text-sm text-zinc-500">Orçamento</p>
                      <p className="text-xl font-bold text-[#071B33]">
                        {servico.orcamento
                          ? `R$ ${Number(servico.orcamento).toFixed(2)}`
                          : "A combinar"}
                      </p>

                      <Link
                        href="/login"
                        className="mt-4 inline-block rounded-lg bg-[#071B33] px-4 py-2 text-sm font-semibold text-white"
                      >
                        Entrar para liberar
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      <footer className="mt-16 border-t border-blue-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-4">
          <div>
            <Image
              src="/logo-upfreela.png"
              alt="UpFreela"
              width={150}
              height={60}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-3 text-sm text-zinc-600">
              Conectando talentos, gerando oportunidades.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#071B33]">Institucional</h3>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/sobre" className="block text-zinc-600">Sobre</Link>
              <Link href="/como-funciona" className="block text-zinc-600">Como funciona</Link>
              <Link href="/contato" className="block text-zinc-600">Contato</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#071B33]">Marketplace</h3>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/freelancers" className="block text-zinc-600">Freelancers</Link>
              <Link href="/servicos" className="block text-zinc-600">Serviços</Link>
              <Link href="/cadastro" className="block text-zinc-600">Criar conta</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#071B33]">Legal</h3>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/termos" className="block text-zinc-600">Termos de uso</Link>
              <Link href="/privacidade" className="block text-zinc-600">Privacidade</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-100 py-4 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} UpFreela. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}