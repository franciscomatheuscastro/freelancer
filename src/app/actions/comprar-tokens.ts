"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth";
import { stripe } from "@/src/lib/stripe";
import { pacotesTokens } from "@/src/app/(dashboard)/dashboard/tokens/pacotes";

export async function comprarPacoteTokens(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const usuarioId = (session.user as any).id;
  const pacoteId = String(formData.get("pacoteId"));

  const pacote = pacotesTokens.find((item) => item.id === pacoteId);

  if (!pacote) {
    throw new Error("Pacote inválido.");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!appUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL não configurada.");
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${appUrl}/dashboard/tokens?sucesso=1`,
    cancel_url: `${appUrl}/dashboard/tokens?cancelado=1`,
    metadata: {
      usuarioId,
      pacoteId: pacote.id,
      tokens: String(pacote.tokens),
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "brl",
          unit_amount: pacote.preco,
          product_data: {
            name: pacote.nome,
            description: `${pacote.tokens} tokens para liberar contatos.`,
          },
        },
      },
    ],
  });

  if (!checkoutSession.url) {
    throw new Error("Não foi possível criar o checkout.");
  }

  redirect(checkoutSession.url);
}