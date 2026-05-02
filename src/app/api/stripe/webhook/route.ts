import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/src/lib/stripe";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Assinatura ausente." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook inválido." },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const usuarioId = session.metadata?.usuarioId;
    const pacoteId = session.metadata?.pacoteId;
    const tokens = Number(session.metadata?.tokens);

    if (!usuarioId || !pacoteId || !tokens) {
      return NextResponse.json(
        { error: "Metadata inválida." },
        { status: 400 }
      );
    }

    const transacaoExistente = await prisma.transacaoToken.findFirst({
      where: {
        stripeSessionId: session.id,
      },
    });

    if (!transacaoExistente) {
      await prisma.$transaction([
        prisma.carteiraToken.upsert({
          where: {
            usuarioId,
          },
          update: {
            saldo: {
              increment: tokens,
            },
          },
          create: {
            usuarioId,
            saldo: tokens,
          },
        }),

        prisma.transacaoToken.create({
          data: {
            usuarioId,
            tipo: "COMPRA",
            quantidade: tokens,
            descricao: `Compra do pacote ${pacoteId}`,
            stripeSessionId: session.id,
          },
        }),
      ]);
    }
  }

  return NextResponse.json({ received: true });
}