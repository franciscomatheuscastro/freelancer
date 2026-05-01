import Link from "next/link";
import Image from "next/image";

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-[#F5F8FC] px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
        <Link href="/" className="font-semibold text-[#006BFF]">
          ← Voltar
        </Link>

        <div className="mt-8">
          <Image
            src="/logo-upfreela.png"
            alt="UpFreela"
            width={180}
            height={70}
            className="h-14 w-auto object-contain"
          />
        </div>

        <h1 className="mt-8 text-4xl font-bold text-[#071B33]">
          Como funciona
        </h1>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-[#F5F8FC] p-6">
            <h2 className="text-2xl font-bold text-[#071B33]">
              Para contratar
            </h2>

            <div className="mt-4 space-y-3 text-zinc-600">
              <p>1. Crie sua conta gratuitamente.</p>
              <p>2. Publique seu serviço informando título, descrição e orçamento.</p>
              <p>3. Freelancers interessados poderão liberar seu contato.</p>
              <p>4. A negociação acontece diretamente por WhatsApp ou e-mail.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F5F8FC] p-6">
            <h2 className="text-2xl font-bold text-[#071B33]">
              Para trabalhar
            </h2>

            <div className="mt-4 space-y-3 text-zinc-600">
              <p>1. Crie sua conta como freelancer.</p>
              <p>2. Veja serviços disponíveis e seus valores.</p>
              <p>3. Use tokens para liberar o contato do cliente.</p>
              <p>4. Fale diretamente com o cliente para negociar o serviço.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}