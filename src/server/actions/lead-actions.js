"use server";

import { PrismaClient, Stage } from "@prisma/client";

// --- Prisma singleton (evita muitas conexões em dev/hmr) ---
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

// -------- Helpers de parse/normalização --------
function opt(v) {
  const s = String(v ?? "").trim();
  return s ? s : null;
}
function toInt(v) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}
function toDecimal(v) {
  if (v === null || v === undefined || v === "") return null;
  const s = String(v).replace(",", ".").trim();
  const n = Number(s);
  // Prisma aceita string para Decimal; guardamos como string
  return Number.isFinite(n) ? String(n) : null;
}
function stageOrDefault(v) {
  const s = String(v || "").toUpperCase();
  return Object.prototype.hasOwnProperty.call(Stage, s) ? Stage[s] : Stage.LEAD;
}

// ----------------- Ações -----------------
export async function listLeads() {
  const leads = await prisma.lead.findMany({
    orderBy: [{ stage: "asc" }, { createdAt: "desc" }],
    include: { owner: { select: { id: true, name: true, email: true } } },
  });
  return leads.map(serializeLead); //Retorna dados serializado, estava dando erro ao carregar a página
}

/**
 * createLead pode receber:
 * - um objeto JS com os campos
 * - ou um FormData direto do <form action={createLead}>
 */
export async function createLead(payload) {
  // Suporta FormData ou objeto plano
  const get = (k) =>
    payload instanceof FormData ? payload.get(k) : payload?.[k];

  const data = {
    name: String(get("name") || "").trim(),
    company: opt(get("company")),
    email: opt(get("email")?.toLowerCase()),
    phone: opt(get("phone")),
    jobTitle: opt(get("jobTitle")),
    origin: opt(get("origin")),
    score: toInt(get("score")),
    notes: opt(get("notes")),
    value: toDecimal(get("value")),
    ownerId: toInt(get("ownerId")),
    stage: stageOrDefault(get("stage")), // default LEAD
  };

  if (!data.name) return { ok: false, error: "Nome é obrigatório." };

  const lead = await prisma.lead.create({ data });
  return { ok: true, lead };
}

function serializeLead(lead) { //Serializa os dados que estavam dando erro ao carregar a página
  return {
    id: lead.id,
    name: lead.name,
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    jobTitle: lead.jobTitle,
    origin: lead.origin,
    score: lead.score,
    notes: lead.notes,
    value: lead.value?.toNumber?.() ?? null, // ✅ Decimal → number
    ownerId: lead.ownerId,
    stage: lead.stage,
    createdAt: lead.createdAt.toISOString(),  // ✅ Date → string
    updatedAt: lead.updatedAt.toISOString(),  // ✅ Date → string
  };
}

export async function moveLead(leadId, nextStage) {
  const stage = stageOrDefault(nextStage);
  return prisma.lead.update({
    where: { id: Number(leadId) },
    data: { stage },
  });
}

export async function deleteLead(leadId) {
  return prisma.lead.delete({ where: { id: Number(leadId) } });
}

export async function updateLead(leadId, partial = {}) {
  const data = {};

  if (partial.name !== undefined) data.name = String(partial.name).trim();
  if (partial.company !== undefined) data.company = opt(partial.company);
  if (partial.email !== undefined)
    data.email = opt(String(partial.email).toLowerCase());
  if (partial.phone !== undefined) data.phone = opt(partial.phone);
  if (partial.jobTitle !== undefined) data.jobTitle = opt(partial.jobTitle);
  if (partial.origin !== undefined) data.origin = opt(partial.origin);
  if (partial.score !== undefined) data.score = toInt(partial.score);
  if (partial.notes !== undefined) data.notes = opt(partial.notes);
  if (partial.value !== undefined) data.value = toDecimal(partial.value);
  if (partial.ownerId !== undefined) data.ownerId = toInt(partial.ownerId);
  if (partial.stage !== undefined) data.stage = stageOrDefault(partial.stage);

  return prisma.lead.update({
    where: { id: Number(leadId) },
    data,
  });
}
