import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function salvarPerfil(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  const usuarioId = (session.user as any).id;
  const tipoUsuario = (session.user as any).tipo;

  const nome = String(formData.get("nome") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").replace(/\D/g, "");

  await prisma.usuario.update({
    where: { id: usuarioId },
    data: {
      nome,
      whatsapp,
    },
  });

  if (tipoUsuario === "FREELANCER") {
    const titulo = String(formData.get("titulo") ?? "").trim();
    const bio = String(formData.get("bio") ?? "").trim();
    const habilidadesTexto = String(formData.get("habilidades") ?? "");
    const cidade = String(formData.get("cidade") ?? "").trim();
    const estado = String(formData.get("estado") ?? "").trim();

    const habilidades = habilidadesTexto
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);

    await prisma.perfilFreelancer.upsert({
      where: { usuarioId },
      update: {
        titulo,
        bio,
        habilidades,
        cidade,
        estado,
      },
      create: {
        usuarioId,
        titulo,
        bio,
        habilidades,
        cidade,
        estado,
      },
    });
  }

  revalidatePath("/dashboard/perfil");
  revalidatePath("/dashboard/servicos");
  revalidatePath("/dashboard/contatos");
}

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  const usuarioId = (session.user as any).id;
  const tipoUsuario = (session.user as any).tipo;

  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    include: {
      perfilFreelancer: true,
    },
  });

  if (!usuario) redirect("/login");

  const perfil = usuario.perfilFreelancer;

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#071B33]">Perfil</h1>

        <p className="mt-1 text-zinc-600">
          Atualize seus dados de contato e informações da conta.
        </p>
      </div>

      <form
        action={salvarPerfil}
        className="max-w-2xl space-y-5 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="text-sm font-medium text-[#071B33]">Nome</label>
          <input
            name="nome"
            defaultValue={usuario.nome}
            required
            className="mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:border-[#006BFF]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#071B33]">E-mail</label>
          <input
            value={usuario.email}
            disabled
            className="mt-1 w-full rounded-lg border bg-zinc-100 px-4 py-3 text-zinc-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#071B33]">WhatsApp</label>
          <input
            name="whatsapp"
            defaultValue={usuario.whatsapp ?? ""}
            placeholder="Ex: 65999999999"
            required
            className="mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:border-[#006BFF]"
          />
        </div>

        {tipoUsuario === "FREELANCER" && (
          <>
            <div className="border-t pt-5">
              <h2 className="text-xl font-bold text-[#071B33]">
                Perfil profissional
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Essas informações ajudam a qualificar seu perfil.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-[#071B33]">
                Título profissional
              </label>

              <input
                name="titulo"
                defaultValue={perfil?.titulo ?? ""}
                className="mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:border-[#006BFF]"
                placeholder="Ex: Desenvolvedor Full Stack"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#071B33]">
                Biografia
              </label>

              <textarea
                name="bio"
                defaultValue={perfil?.bio ?? ""}
                rows={4}
                className="mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:border-[#006BFF]"
                placeholder="Conte brevemente sua experiência..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#071B33]">
                Habilidades
              </label>

              <input
                name="habilidades"
                defaultValue={perfil?.habilidades?.join(", ") ?? ""}
                className="mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:border-[#006BFF]"
                placeholder="React, Node.js, Design, Marketing"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#071B33]">
                  Cidade
                </label>

                <input
                  name="cidade"
                  defaultValue={perfil?.cidade ?? ""}
                  className="mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:border-[#006BFF]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#071B33]">
                  Estado
                </label>

                <input
                  name="estado"
                  defaultValue={perfil?.estado ?? ""}
                  className="mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:border-[#006BFF]"
                />
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="rounded-lg bg-[#006BFF] px-6 py-3 font-semibold text-white hover:bg-[#0057CC]"
        >
          Salvar perfil
        </button>
      </form>
    </main>
  );
}