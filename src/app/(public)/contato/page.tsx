import Link from "next/link";
import Image from "next/image";

export default function ContatoPage() {
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
          Contato
        </h1>

        <p className="mt-4 text-zinc-600">
          Fale com a equipe UpFreela para dúvidas, suporte, parcerias ou
          informações comerciais.
        </p>

        <div className="mt-8 space-y-4 rounded-2xl bg-[#F5F8FC] p-6">
          <p className="text-zinc-700">
            <strong>E-mail:</strong> contato@upfreela.com.br
          </p>

          <p className="text-zinc-700">
            <strong>WhatsApp:</strong> (00) 00000-0000
          </p>

          <p className="text-zinc-700">
            <strong>Atendimento:</strong> Segunda a sexta, das 8h às 18h
          </p>
        </div>
      </div>
    </main>
  );
}