"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  servicoId: string;
}

export default function LiberarContatoButton({
  servicoId,
}: Props) {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  async function liberar() {
    try {
      setCarregando(true);

      const res = await fetch(
        `/api/servicos/${servicoId}/liberar-contato`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro || "Erro ao liberar contato");
        return;
      }

      alert("Contato liberado!");

      router.refresh();
    } catch {
      alert("Erro ao conectar com o servidor");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <button
      onClick={liberar}
      disabled={carregando}
      className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
    >
      {carregando ? "Liberando..." : "Liberar contato"}
    </button>
  );
}