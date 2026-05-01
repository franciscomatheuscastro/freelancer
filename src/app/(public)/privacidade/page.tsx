import Link from "next/link";
import Image from "next/image";

export default function PrivacidadePage() {
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
          Política de privacidade
        </h1>

        <div className="mt-6 space-y-5 text-zinc-600">
          <p>
            O UpFreela coleta dados necessários para cadastro, autenticação,
            publicação de serviços e conexão entre clientes e freelancers.
          </p>

          <p>
            Dados como nome, e-mail e WhatsApp são utilizados para permitir o
            funcionamento da plataforma e facilitar o contato entre usuários
            após a liberação autorizada.
          </p>

          <p>
            Informações de contato não são exibidas publicamente. O acesso ao
            contato do cliente ocorre somente dentro do fluxo previsto pela
            plataforma.
          </p>

          <p>
            A plataforma adota boas práticas para proteger os dados dos usuários
            e não vende informações pessoais a terceiros.
          </p>

          <p>
            O usuário pode solicitar atualização ou remoção de dados conforme as
            regras aplicáveis e a política operacional da plataforma.
          </p>
        </div>
      </div>
    </main>
  );
}