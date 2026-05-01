import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { erro: "Não autorizado" },
        { status: 401 }
      );
    }

    const usuarioId = (session.user as any).id;
    const tipoUsuario = (session.user as any).tipo;

    if (tipoUsuario !== "CLIENTE" && tipoUsuario !== "ADMIN") {
      return NextResponse.json(
        { erro: "Apenas clientes podem publicar serviços" },
        { status: 403 }
      );
    }

    const data = await req.json();

    if (!data.titulo || !data.descricao) {
      return NextResponse.json(
        { erro: "Título e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    const servico = await prisma.servico.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        orcamento: data.orcamento ? data.orcamento : null,
        custoTokens: data.custoTokens ?? 1,
        clienteId: usuarioId,
      },
    });

    return NextResponse.json(servico);
  } catch (error) {
    console.error("Erro ao criar serviço:", error);

    return NextResponse.json(
      { erro: "Erro interno ao criar serviço" },
      { status: 500 }
    );
  }
}