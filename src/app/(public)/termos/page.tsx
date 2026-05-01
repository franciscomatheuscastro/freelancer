import Link from "next/link";
import Image from "next/image";

export default function TermosPage() {
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
          Termos de uso
        </h1>

        <div className="mt-6 space-y-5 text-zinc-600">
          <p>
            Ao utilizar o UpFreela, o usuário concorda com as regras de uso da
            plataforma e se compromete a fornecer informações verdadeiras.
          </p>

          <p>
            Clientes podem publicar serviços gratuitamente. Freelancers podem
            visualizar oportunidades e utilizar tokens para liberar contatos.
          </p>

          <p>
            O UpFreela atua como plataforma de conexão entre clientes e
            freelancers. A negociação, execução e pagamento do serviço são de
            responsabilidade das partes envolvidas.
          </p>

          <p>
            É proibido utilizar a plataforma para atividades ilegais, abusivas,
            fraudulentas ou que violem direitos de terceiros.
          </p>

          <p>
            A plataforma poderá alterar estes termos conforme evolução do
            produto, regras operacionais ou exigências legais.
          </p>
        </div>
      </div>
    </main>
  );
}