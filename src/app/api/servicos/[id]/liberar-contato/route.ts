import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    const usuarioId = (session?.user as any)?.id;

    if (!usuarioId) {
      return NextResponse.json(
        { erro: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const { id: servicoId } = await context.params;

    if (!servicoId) {
      return NextResponse.json(
        { erro: "ID do serviço não informado" },
        { status: 400 }
      );
    }

    const servico = await prisma.servico.findUnique({
      where: {
        id: servicoId,
      },
      include: {
        cliente: true,
        contatosLiberados: {
          where: {
            usuarioId,
          },
        },
      },
    });

    if (!servico) {
      return NextResponse.json(
        { erro: "Serviço não encontrado" },
        { status: 404 }
      );
    }

    if (servico.contatosLiberados.length > 0) {
      return NextResponse.json({
        liberado: true,
        email: servico.cliente.email,
        whatsapp: servico.cliente.whatsapp,
        mensagem: "Contato já liberado anteriormente",
      });
    }

    const carteira = await prisma.carteiraToken.findUnique({
      where: {
        usuarioId,
      },
    });

    if (!carteira) {
      return NextResponse.json(
        { erro: "Carteira de tokens não encontrada" },
        { status: 404 }
      );
    }

    const custo = servico.custoTokens ?? 1;

    if (carteira.saldo < custo) {
      return NextResponse.json(
        {
          erro: "Saldo insuficiente de tokens",
          saldoAtual: carteira.saldo,
          custo,
        },
        { status: 402 }
      );
    }

    await prisma.$transaction([
      prisma.carteiraToken.update({
        where: {
          usuarioId,
        },
        data: {
          saldo: {
            decrement: custo,
          },
        },
      }),

      prisma.contatoLiberado.create({
        data: {
          usuarioId,
          servicoId,
          tokensGastos: custo,
        },
      }),

      prisma.transacaoToken.create({
        data: {
          usuarioId,
          tipo: "USO",
          quantidade: -custo,
          descricao: `Liberação de contato do serviço ${servicoId}`,
        },
      }),
    ]);

    return NextResponse.json({
      liberado: true,
      email: servico.cliente.email,
      whatsapp: servico.cliente.whatsapp,
      tokensUsados: custo,
    });
  } catch (error) {
    console.error("Erro ao liberar contato:", error);

    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}