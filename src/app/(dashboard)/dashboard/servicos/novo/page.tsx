"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoServicoPage() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);

    const resposta = await fetch("/api/servicos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo,
        descricao,
        orcamento: orcamento ? Number(orcamento) : null,
        custoTokens: 1,
      }),
    });

    setSalvando(false);

    if (!resposta.ok) {
      alert("Erro ao cadastrar serviço.");
      return;
    }

    router.push("/dashboard/servicos");
    router.refresh();
  }

  return (
    <main>
      <div className="max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-zinc-900">Novo serviço</h1>

        <p className="mt-1 text-zinc-600">
          Publique sua demanda gratuitamente para freelancers entrarem em contato.
        </p>

        <form onSubmit={salvar} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Título do serviço
            </label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-zinc-900"
              placeholder="Ex: Preciso de criação de logo profissional"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Descrição
            </label>
            <textarea
              className="min-h-32 w-full rounded-lg border px-3 py-2 text-zinc-900"
              placeholder="Explique o que você precisa, prazo desejado e detalhes importantes..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Orçamento estimado
            </label>
            <input
              type="number"
              className="w-full rounded-lg border px-3 py-2 text-zinc-900"
              placeholder="Ex: 300"
              value={orcamento}
              onChange={(e) => setOrcamento(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {salvando ? "Publicando..." : "Publicar serviço"}
          </button>
        </form>
      </div>
    </main>
  );
}