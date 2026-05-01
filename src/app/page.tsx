import { prisma } from "@/src/lib/prisma";
import HomePrincipal from "@/src/app/components/HomePrincipal";

export default async function HomePage() {
  const freelancers = await prisma.perfilFreelancer.findMany({
    take: 6,
    orderBy: { criadoEm: "desc" },
    include: {
      usuario: {
        select: {
          nome: true,
        },
      },
    },
  });

  const servicos = await prisma.servico.findMany({
    where: { status: "ABERTO" },
    take: 6,
    orderBy: { criadoEm: "desc" },
    include: {
      cliente: {
        select: {
          nome: true,
        },
      },
    },
  });

  return (
    <HomePrincipal
      freelancers={freelancers.map((f: any) => ({
        id: f.id,
        nome: f.usuario.nome,
        titulo: f.titulo,
        bio: f.bio,
        habilidades: f.habilidades,
        cidade: f.cidade,
        estado: f.estado,
      }))}
      servicos={servicos.map((s) => ({
        id: s.id,
        titulo: s.titulo,
        descricao: s.descricao,
        orcamento: s.orcamento ? Number(s.orcamento) : null,
        custoTokens: s.custoTokens,
        clienteNome: s.cliente.nome,
      }))}
    />
  );
}