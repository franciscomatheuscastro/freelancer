import Link from "next/link";
import Image from "next/image";

export default function SobrePage() {
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
          Sobre o UpFreela
        </h1>

        <p className="mt-4 text-lg text-zinc-600">
          O UpFreela é uma plataforma criada para conectar clientes que precisam
          de serviços com freelancers que buscam novas oportunidades.
        </p>

        <p className="mt-4 text-zinc-600">
          Nosso modelo protege os dados de contato e permite que freelancers
          visualizem serviços disponíveis antes de liberar o contato do cliente
          utilizando tokens.
        </p>

        <p className="mt-4 text-zinc-600">
          Para quem contrata, a publicação de serviços é gratuita. Para quem
          trabalha como freelancer, o acesso ao contato é feito de forma simples,
          direta e transparente.
        </p>
      </div>
    </main>
  );
}