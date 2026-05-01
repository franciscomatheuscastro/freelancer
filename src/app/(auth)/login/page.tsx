"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    const formData = new FormData(event.currentTarget);

    const resultado = await signIn("credentials", {
      email: formData.get("email"),
      senha: formData.get("senha"),
      redirect: false,
    });

    setCarregando(false);

    if (resultado?.error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F8FC] px-4">
      <form
        onSubmit={entrar}
        className="w-full max-w-md rounded-2xl border border-blue-100 bg-white p-8 shadow-sm"
      >
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo-upfreela.png"
            alt="UpFreela"
            width={220}
            height={90}
            priority
            className="h-20 w-auto object-contain"
          />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-[#071B33]">Entrar</h1>

        <p className="mb-6 text-sm text-zinc-600">
          Acesse sua conta para continuar.
        </p>

        {erro && (
          <div className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
            {erro}
          </div>
        )}

        <label className="mb-2 block text-sm font-medium text-[#071B33]">
          E-mail
        </label>
        <input
          name="email"
          type="email"
          className="mb-4 w-full rounded-lg border px-3 py-2 text-zinc-900 outline-none focus:border-[#006BFF]"
          required
        />

        <label className="mb-2 block text-sm font-medium text-[#071B33]">
          Senha
        </label>
        <input
          name="senha"
          type="password"
          className="mb-6 w-full rounded-lg border px-3 py-2 text-zinc-900 outline-none focus:border-[#006BFF]"
          required
        />

        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-lg bg-[#006BFF] py-2 font-semibold text-white hover:bg-[#0057CC] disabled:opacity-60"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        <p className="mt-4 text-center text-sm text-zinc-600">
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="font-semibold text-[#006BFF]">
            Criar conta
          </Link>
        </p>
      </form>
    </main>
  );
}