-- CreateEnum
CREATE TYPE "public"."Stage" AS ENUM ('LEAD', 'MQL', 'ANALISE_MQL', 'SQL', 'REUNIAO');

-- CreateTable
CREATE TABLE "public"."lead" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT,
    "value" DECIMAL(65,30),
    "stage" "public"."Stage" NOT NULL DEFAULT 'LEAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER,

    CONSTRAINT "lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lead_stage_idx" ON "public"."lead"("stage");

-- CreateIndex
CREATE INDEX "lead_ownerId_idx" ON "public"."lead"("ownerId");

-- AddForeignKey
ALTER TABLE "public"."lead" ADD CONSTRAINT "lead_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
