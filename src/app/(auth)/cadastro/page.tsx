import Image from "next/image";
import Link from "next/link";
import { cadastrarUsuario } from "./actions";

export default function CadastroPage() {
  const inputClass =
    "mb-4 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-[#006BFF]";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F8FC] px-4 py-8">
      <form
        action={cadastrarUsuario}
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

        <h1 className="mb-2 text-2xl font-bold text-[#071B33]">
          Criar conta
        </h1>

        <p className="mb-6 text-sm text-zinc-600">
          Comece como cliente ou freelancer.
        </p>

        <label className="mb-2 block text-sm font-medium text-[#071B33]">
          Nome
        </label>
        <input name="nome" type="text" className={inputClass} required />

        <label className="mb-2 block text-sm font-medium text-[#071B33]">
          E-mail
        </label>
        <input name="email" type="email" className={inputClass} required />

        <label className="mb-2 block text-sm font-medium text-[#071B33]">
          WhatsApp
        </label>
        <input
          name="whatsapp"
          type="tel"
          placeholder="Ex: 65999999999"
          className={inputClass}
          required
        />

        <label className="mb-2 block text-sm font-medium text-[#071B33]">
          Senha
        </label>
        <input name="senha" type="password" className={inputClass} required />

        <label className="mb-2 block text-sm font-medium text-[#071B33]">
          Tipo de conta
        </label>
        <select
          name="tipo"
          className="mb-6 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-[#006BFF]"
          defaultValue="CLIENTE"
        >
          <option value="CLIENTE" className="text-zinc-900">
            Quero contratar freelancers
          </option>
          <option value="FREELANCER" className="text-zinc-900">
            Quero trabalhar como freelancer
          </option>
        </select>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#006BFF] py-2 font-semibold text-white hover:bg-[#0057CC]"
        >
          Criar conta
        </button>

        <p className="mt-4 text-center text-sm text-zinc-600">
          Já tem conta?{" "}
          <Link href="/login" className="font-semibold text-[#006BFF]">
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}