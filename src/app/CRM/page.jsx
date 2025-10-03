"use client";

import { useEffect, useMemo, useState } from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  listLeads,
  createLead,
  moveLead,
  deleteLead,
} from "../../server/actions/lead-actions";

import LeadButton from "./_components/ui/LeadButton";

import {
  MagnifyingGlass,
  ChartLineUp,
  Wallet,
  EnvelopeSimple,
  WhatsappLogo,
  CalendarBlank,
  Funnel,
  Plus,
  DotsThree,
  CaretDown,
} from "@phosphor-icons/react";
import Client from "./_components/ui/Client";
import StageColumn from "./_components/ui/StageColumn";

const STAGES = [
  { key: "LEAD", label: "Lead Capturado", color: "border-blue-500" },
  { key: "MQL", label: "MQL", color: "border-amber-400" },
  { key: "ANALISE_MQL", label: "Análise de MQL", color: "border-emerald-500" },
  { key: "SQL", label: "SQL", color: "border-red-500" },
  { key: "REUNIAO", label: "Reunião agendada", color: "border-yellow-400" },
];

function MetricCard({ icon: Icon, title, subtitle, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
          <Icon size={20} className="text-slate-600" />
        </div>
        <div className="text-sm">
          <div className="font-medium text-slate-800">{title}</div>
          <div className="text-slate-400">{subtitle}</div>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="text-2xl font-semibold text-slate-900">{value}</div>
        <div className="h-8 w-24 rounded bg-gradient-to-tr from-emerald-100 to-emerald-200" />
      </div>
    </div>
  );
}

export function LeadCard({ lead, onDelete }) {
  const [{ isDragging }, drag] = useDrag({
    type: "LEAD_CARD",
    item: { id: lead.id, stage: lead.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm${
        isDragging ? " opacity-50" : ""
      }`}
      style={{ cursor: "move" }}
    >
      <div className=" mb-2 flex items-start justify-between">
        <div className="font-medium text-[15px] text-slate-800" >
          {(() => {
            const parts = lead.name.trim().split(" ");
            return parts.length > 1
               ? lead.id+". "+`${parts[0]} ${parts[parts.length - 1]}`
              : lead.id+". "+parts[0];
          })()}
        </div>
        {/* <button
          className="text-slate-400 hover:text-slate-600"
          onClick={() => {
            alert(`Ações para o lead: ${lead}`);
            console.log(lead)
          }}
        >
          <DotsThree size={18} weight="bold" /> */}
        <LeadButton windowTitle="Editar lead" data={lead}/>
        {/* </button> */}
      </div>

      <div className="mb-3 text-xs text-slate-500">
        {new Date(lead.updatedAt).getDate() +
          " deVERIFICAR ESSE CAMPO!!! " +
          new Date(lead.updatedAt)
            .toLocaleDateString("pt-BR", { month: "long" })
            .replace(/^./, (str) => str.toUpperCase())}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50"
          title="Agendar"
        >
          <CalendarBlank size={18} className="text-[#1E88E5]  " />
        </button>
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50"
          title="Email"
        >
          <EnvelopeSimple size={18} className="text-[#1E88E5]" />
        </button>
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50"
          title="WhatsApp"
          onClick={() => window.open("https://wa.me/" + lead.phone, "_blank")}
        >
          <WhatsappLogo size={18} className="text-[#1E88E5]" />
        </button>
      </div>

      {/* ações rápidas: mover ou deletar */}
      <div className="mt-3 flex flex-wrap gap-2">
        {/* {STAGES.filter((s) => s.key !== lead.stage).map((s) => (
          <button
            key={s.key}
            onClick={() => onMove(lead.id, s.key)}
            className="text-xs text-blue-600 hover:underline"
          >
            → {s.label}
          </button>
        ))} */}
        <button
          onClick={() => onDelete(lead.id)}
          className="text-xs text-red-500 hover:underline"
          >
          Excluir
        </button>
      </div>
    </div>
  );
}
export default function CRMPage() {
  const [leads, setLeads] = useState([]);
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");

  async function refresh() {
    const data = await listLeads();
    setLeads(data);
  }

  useEffect(() => {
    refresh();
    try {
      const name = localStorage.getItem("userName");
      if (name) setUserName(name);
    } catch (e) {}
  }, []);

  const grouped = useMemo(() => {
    const by = Object.fromEntries(STAGES.map((s) => [s.key, []]));
    leads
      .filter((l) =>
        search
          ? l.name.toLowerCase().includes(search.toLowerCase()) ||
            (l.origin || "").toLowerCase().includes(search.toLowerCase())
          : true
      )
      .forEach((l) => by[l.stage]?.push(l));
    return by;
  }, [leads, search]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#F7F8FA] text-slate-900">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[260px_1fr] gap-6 px-4 py-6">
          <aside className="h-[calc(100vh-48px)] sticky top-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-6 px-2 text-2xl font-extrabold tracking-tight text-[#2A6CF6]">
              Nex <span className="text-slate-800">Tools</span>
            </div>

            <div className="relative mb-5">
              <MagnifyingGlass
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar…"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:bg-white"
              />
            </div>

            <nav className="space-y-1 text-sm">
              {["Dashboard", "CRM"].map((item, idx) => (
                <a
                  key={item}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                    item === "CRM"
                      ? "bg-blue-50 font-medium text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  href="#"
                >
                  <span className="truncate">{item}</span>
                  {item === "CRM" && (
                    <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-semibold text-white">
                      {leads.length}
                    </span>
                  )}
                </a>
              ))}

              <div className="mt-6 text-xs font-semibold uppercase text-slate-400">
                Configurações
              </div>
              {["Editor DRE/KPIs", "Usuários"].map((i) => (
                <a
                  key={i}
                  className="mt-1 block rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50"
                  href="#"
                >
                  {i}
                </a>
              ))}
            </nav>

            <Client nome={userName} />
          </aside>

          <main className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-[22px] font-semibold">
                  CRM & Pipeline de Vendas
                </h1>
                <p className="text-sm text-slate-500">
                  Gestão completa de leads, oportunidades e funil de vendas
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Nova oportunidade
                </button>
                <LeadButton windowTitle="Novo Lead"/>
              </div>
            </div>

            {/* Métricas */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                icon={ChartLineUp}
                title="Pipeline Ponderado"
                subtitle="Valor x Probabilidade"
                value="R$ 142.000"
              />
              <MetricCard
                icon={Wallet}
                title="Pipeline Total"
                subtitle="Valor total das oportunidades"
                value="R$ 250K"
              />
              <MetricCard
                icon={Wallet}
                title="Ticket médio"
                subtitle="Valor médio por oportunidade"
                value="R$ 83K"
              />
              <MetricCard
                icon={Funnel}
                title="Oportunidades ativas"
                subtitle="Em negociação"
                value="03"
              />
            </section>
            <div className="space-y-6 h-[655px]">
              <section className="h-[70px] flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm ">
                {[
                  { label: "Todos os vendedores" },
                  { label: "Todas as origens" },
                  { label: "Últimos 30 dias" },
                ].map((f) => (
                  <button
                    key={f.label}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {f.label} <CaretDown size={14} />
                  </button>
                ))}

                <div className="ml-auto flex items-center gap-2">
                  <button className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                    Funil de Prospecção
                  </button>
                  <button className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100">
                    Funil de Expansão
                  </button>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                {STAGES.map((col) => (
                  <StageColumn
                    key={col.key}
                    col={col}
                    leads={grouped[col.key]}
                    moveLead={moveLead}
                    refresh={refresh}
                    deleteLead={deleteLead}
                  />
                ))}
              </section>
            </div>
          </main>
        </div>
      </div>
    </DndProvider>
  );
}
