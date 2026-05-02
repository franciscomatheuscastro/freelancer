/*
  Warnings:

  - A unique constraint covering the columns `[stripeSessionId]` on the table `TransacaoToken` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TransacaoToken" ADD COLUMN     "stripeSessionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TransacaoToken_stripeSessionId_key" ON "TransacaoToken"("stripeSessionId");

-- CreateIndex
CREATE INDEX "TransacaoToken_usuarioId_idx" ON "TransacaoToken"("usuarioId");
