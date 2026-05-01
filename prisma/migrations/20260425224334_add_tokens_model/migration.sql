-- CreateEnum
CREATE TYPE "TipoTransacaoToken" AS ENUM ('COMPRA', 'USO', 'BONUS', 'ESTORNO');

-- DropForeignKey
ALTER TABLE "PerfilFreelancer" DROP CONSTRAINT "PerfilFreelancer_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Proposta" DROP CONSTRAINT "Proposta_servicoId_fkey";

-- DropForeignKey
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_clienteId_fkey";

-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "custoTokens" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "whatsapp" TEXT;

-- CreateTable
CREATE TABLE "CarteiraToken" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "saldo" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarteiraToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContatoLiberado" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "tokensGastos" INTEGER NOT NULL DEFAULT 1,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContatoLiberado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransacaoToken" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipo" "TipoTransacaoToken" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransacaoToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarteiraToken_usuarioId_key" ON "CarteiraToken"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "ContatoLiberado_usuarioId_servicoId_key" ON "ContatoLiberado"("usuarioId", "servicoId");

-- AddForeignKey
ALTER TABLE "PerfilFreelancer" ADD CONSTRAINT "PerfilFreelancer_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarteiraToken" ADD CONSTRAINT "CarteiraToken_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContatoLiberado" ADD CONSTRAINT "ContatoLiberado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContatoLiberado" ADD CONSTRAINT "ContatoLiberado_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoToken" ADD CONSTRAINT "TransacaoToken_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
