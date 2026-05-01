"use server";

import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function cadastrarUsuario(formData: FormData) {
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const whatsapp = String(formData.get("whatsapp") ?? "").replace(/\D/g, "");
  const senha = String(formData.get("senha") ?? "");
  const tipoForm = String(formData.get("tipo") ?? "CLIENTE");

  if (!nome || !email || !whatsapp || !senha) {
    throw new Error("Preencha todos os campos.");
  }

  const tipo = tipoForm === "FREELANCER" ? "FREELANCER" : "CLIENTE";

  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  await prisma.$transaction(async (tx) => {
    const usuario = await tx.usuario.create({
      data: {
        nome,
        email,
        whatsapp,
        senha: senhaHash,
        tipo,
      },
    });

    if (tipo === "FREELANCER") {
      await tx.carteiraToken.create({
        data: {
          usuarioId: usuario.id,
          saldo: 0,
        },
      });
    }
  });

  redirect("/login");
}