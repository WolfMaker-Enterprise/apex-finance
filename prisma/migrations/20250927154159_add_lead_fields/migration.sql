/*
  Warnings:

  - You are about to alter the column `value` on the `lead` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "public"."lead" ADD COLUMN     "company" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phone" VARCHAR(30),
ADD COLUMN     "score" SMALLINT,
ALTER COLUMN "value" SET DATA TYPE DECIMAL(12,2);

-- CreateIndex
CREATE INDEX "lead_email_idx" ON "public"."lead"("email");

-- CreateIndex
CREATE INDEX "lead_phone_idx" ON "public"."lead"("phone");
