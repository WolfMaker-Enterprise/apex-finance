"use server";

import { PrismaClient, Stage } from "@prisma/client";
const prisma = new PrismaClient();

export async function listLeads() {
  // Retorna todos para o front agrupar por stage
  return await prisma.lead.findMany({
    orderBy: [{ stage: "asc" }, { createdAt: "desc" }],
    include: { owner: { select: { id: true, name: true, email: true } } },
  });
}

export async function createLead({ name, origin, value, ownerId }) {
  return await prisma.lead.create({
    data: {
      name,
      origin: origin || null,
      value: value ? value.toString() : null, // Decimal -> string
      ownerId: ownerId || null,
      stage: Stage.LEAD,
    },
  });
}

export async function moveLead(leadId, nextStage) {
  // nextStage deve ser uma string válida do enum: "LEAD" | "MQL" | "ANALISE_MQL" | "SQL" | "REUNIAO"
  return await prisma.lead.update({
    where: { id: Number(leadId) },
    data: { stage: nextStage },
  });
}

export async function deleteLead(leadId) {
  return await prisma.lead.delete({ where: { id: Number(leadId) } });
}

export async function updateLead(leadId, partial) {
  const data = {};
  if (partial.name !== undefined) data.name = partial.name;
  if (partial.origin !== undefined) data.origin = partial.origin || null;
  if (partial.value !== undefined)
    data.value = partial.value ? partial.value.toString() : null; // Decimal
  if (partial.ownerId !== undefined) data.ownerId = partial.ownerId || null;
  if (partial.stage !== undefined) data.stage = partial.stage;

  return await prisma.lead.update({
    where: { id: Number(leadId) },
    data,
  });
}
