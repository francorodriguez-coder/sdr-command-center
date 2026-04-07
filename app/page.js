"use client";

import { useState, useMemo, useEffect, useCallback } from "react";

// ============================================================
// REAL DATA — Extracted from HubSpot, Asana, Granola, Ecosystem Graph
// Last sync: 2026-04-07 ~17:00 UTC
// ============================================================

const LAST_SYNC = "7 abr 2026, 17:00";

const STAGE_MAP = {
  "1224356372": { name: "New Lead", group: "pre", color: "#71717a", order: 0 },
  "1224356373": { name: "Research + Tagging", group: "pre", color: "#8b5cf6", order: 1 },
  "1232050606": { name: "Ready to Ship", group: "pre", color: "#6366f1", order: 2 },
  "1308810585": { name: "Ready to Ship by Owner", group: "pre", color: "#3b82f6", order: 3 },
  "1244737059": { name: "Hold", group: "pre", color: "#f97316", order: 4 },
  "1224356374": { name: "Initial Outreach", group: "active", color: "#22c55e", order: 5 },
  "1275457612": { name: "1st Email Answered", group: "active", color: "#10b981", order: 6 },
  "1224356375": { name: "Followup Sequence", group: "active", color: "#14b8a6", order: 7 },
  "1224356376": { name: "Conversation", group: "active", color: "#06b6d4", order: 8 },
  "1225118002": { name: "Requalification", group: "active", color: "#0ea5e9", order: 9 },
  "1225118003": { name: "Handoff", group: "active", color: "#2563eb", order: 10 },
  "1224356377": { name: "Won", group: "won", color: "#eab308", order: 11 },
  "1224356378": { name: "Lost (Nurture Loop)", group: "lost", color: "#ef4444", order: 12 },
  "1225118004": { name: "Lost (No Response)", group: "lost", color: "#dc2626", order: 13 },
  "1244570040": { name: "Lost (Disqualified)", group: "lost", color: "#991b1b", order: 14 },
};

// Real data from HubSpot SDR pipeline (826132498) — 443 deals total
const CAMPAIGNS_DATA = [
  { name: "Lost SQL", total: 133, stages: { "1224356374": 1, "1224356377": 1, "1224356378": 7, "1225118004": 14, "1244570040": 110 }, description: "Deals que recibieron propuesta y se perdieron. Timing minimo 2 meses post-perdida." },
  { name: "AI/Branding Outreach", total: 79, stages: { "1224356372": 10, "1224356373": 4, "1224356378": 3, "1225118004": 5, "1244570040": 57 }, description: "Case studies de AI compartidos. Campana hiperpersonalizada completada." },
  { name: "Referrers", total: 40, stages: { "1224356377": 1, "1224356378": 4, "1225118004": 19, "1244570040": 16 }, description: "Partners de referidos. Emails enviados a todos los contactos." },
  { name: "Job Change", total: 34, stages: { "1224356378": 6, "1225118004": 5, "1244570040": 23 }, description: "Contactos que cambiaron de trabajo. Outreach por nuevo contexto." },
  { name: "EOY Message", total: 33, stages: { "1225118004": 28, "1244570040": 5 }, description: "Mensaje de fin de ano 2025. 25 emails enviados." },
  { name: "Referral Renew", total: 30, stages: { "1224356378": 4, "1244570040": 26 }, description: "Renovacion de referidos existentes." },
  { name: "Happy Current Customer", total: 19, stages: { "1244737059": 6, "1224356373": 1, "1244570040": 12 }, description: "Champions de proyectos cerrados 2025. Sentiment: Promoter. 18 contactos target." },
  { name: "NPS", total: 18, stages: { "1224356373": 1, "1224356374": 1, "1224356375": 7, "1224356378": 2, "1244570040": 4, "1244737059": 3 }, description: "Seguimiento Net Promoter Score. Meta: completar en 2 meses." },
  { name: "2025 Gift", total: 18, stages: { "1224356377": 18 }, description: "Regalos enviados a clientes 2025. 100% completado." },
  { name: "Showcase", total: 15, stages: { "1224356378": 4, "1225118004": 6, "1244570040": 5 }, description: "Showcase de proyectos a prospects." },
  { name: "CSAT", total: 11, stages: { "1224356373": 1, "1224356375": 3, "1224356377": 2, "1244570040": 3, "1244737059": 2 }, description: "Customer Satisfaction Score. Seguimiento agresivo multi-canal." },
  { name: "Sin Tipo", total: 8, stages: { "1224356372": 6, "1244570040": 2 }, description: "Deals sin outreach_type asignado." },
  { name: "VIP Referrers", total: 3, stages: { "1225118004": 2, "1244570040": 1 }, description: "Referrers VIP de alto valor." },
  { name: "Other/Regular", total: 3, stages: { "1225118004": 2, "1244570040": 1 }, description: "Outreach regular." },
  { name: "Branding Free Trial", total: 1, stages: { "1224356377": 1 }, description: "Prueba de branding gratuita." },
];

const PIPELINE_STAGES_REAL = [
  { id: "1224356372", name: "New Lead", count: 16, color: "#71717a", group: "pre" },
  { id: "1224356373", name: "Research + Tag", count: 6, color: "#8b5cf6", group: "pre" },
  { id: "1244737059", name: "Hold", count: 11, color: "#f97316", group: "pre" },
  { id: "1224356374", name: "Initial Outreach", count: 2, color: "#22c55e", group: "active" },
  { id: "1224356375", name: "Followup Seq.", count: 10, color: "#14b8a6", group: "active" },
  { id: "1224356377", name: "Won", count: 23, color: "#eab308", group: "won" },
  { id: "1224356378", name: "Lost (Nurture)", count: 47, color: "#ef4444", group: "lost" },
  { id: "1225118004", name: "Lost (No Resp.)", count: 113, color: "#dc2626", group: "lost" },
  { id: "1244570040", name: "Lost (Disqual.)", count: 215, color: "#991b1b", group: "lost" },
];

// Account Plannings from Granola
const ACCOUNT_PLANNINGS = [
  { company: "Santillana", date: "10 abr (jueves)", participants: ["Franco", "Nico", "Cecilia"], status: "proximo" },
  { company: "REMAX", date: "Semana del 14 abr", participants: ["Franco", "Nico", "Martin"], status: "planificado" },
];

// ====== SANTILLANA ACCOUNT PLANNING — Full Research ======
const SANTILLANA = {
  company: {
    name: "Santillana",
    domain: "santillana.com",
    industry: "E-Learning / EdTech",
    employees: 810,
    annualRevenue: "$250M",
    description: "Top educational content and services provider in Latin America. 60+ years driving education with innovation.",
    hubspotId: "52136602153",
  },
  deals: {
    total: 20,
    totalRevenue: "$1,048,300",
    active: [
      { name: "Santillana - Dev Adicional (Apr-Jun)", amount: "$25,000", stage: "In Progress", pipeline: "Inbound", modified: "7 abr" },
      { name: "iM-PROVE + Santillana - App Escaneo", amount: "TBD", stage: "Appointment Scheduled", pipeline: "Inbound", modified: "7 abr" },
      { name: "[SDR] Santillana (NPS)", amount: "—", stage: "Followup Sequence", pipeline: "SDR", modified: "7 abr" },
      { name: "[SDR] Santillana (NPS #2)", amount: "—", stage: "Research + Tagging", pipeline: "SDR", modified: "2 abr" },
      { name: "Santillana - SUMUN Branding", amount: "$35,000", stage: "In Progress", pipeline: "Inbound", modified: "31 mar" },
    ],
    won: [
      { name: "Santillana - Sumun 2026", amount: "$276,000", closedAt: "Feb 2026" },
      { name: "Santillana - Sumun Office Mantenimiento Anual", amount: "$130,000", closedAt: "Ene 2026" },
      { name: "Santillana - Teaching Assistant AI App Pod", amount: "$220,800", closedAt: "Abr 2025" },
      { name: "Santillana - Scan Cam Pleno", amount: "$45,000", closedAt: "Oct 2025" },
      { name: "Santillana - Sumun Office Brasil", amount: "$54,500", closedAt: "Nov 2025" },
    ],
    lost: [
      { name: "Santillana - Sumun Website", amount: "$180,000", reason: "Closed Lost" },
      { name: "Santillana - AI Tutor Discovery + UX/UI", amount: "$85,000", reason: "Closed Lost" },
    ],
  },
  keyContacts: [
    { name: "Ahana Datta", title: "Chief Innovation Officer", email: "adatta@santillana.com", role: "Champion", tier: "hot" },
    { name: "Jose Malaga Cochella", title: "Global CTO", email: "jmalaga@santillana.com", role: "Decision Maker", tier: "hot" },
    { name: "Victor Manuel Lomba Riego", title: "Director Global Negocio - Sumun", email: "vlomba@santillana.com", role: "Technical Buyer", tier: "hot" },
    { name: "Jose Manuel Prada Sierra", title: "Director EdTech, Brasil", email: "jprada@santillana.com", role: "Influencer", tier: "warm" },
    { name: "Leidy Andrea Munoz Skinner", title: "Directora Marketing Global", email: "anmunoz@santillana.com", role: "Influencer", tier: "warm" },
    { name: "Maria Araceli Vasquez Cruz", title: "Product Manager", email: "avasquezc@santillana.com", role: "Technical Buyer", tier: "warm" },
    { name: "Jose Santalla", title: "Gerente Arquitectura Tecnologica", email: "jsantallap@santillana.com", role: "Technical Buyer", tier: "warm" },
    { name: "Cristiano Dentello", title: "Product Manager", email: "cdentello@santillana.com", role: "Technical Buyer", tier: "warm" },
    { name: "Ernesto Nunez Mejia", title: "Director de Producto, Brasil", email: "enunezm@santillana.com", role: "Influencer", tier: "warm" },
    { name: "Milan Sahu", title: "Heading Strategic Initiatives", email: "msahu@santillana.com", role: "Influencer", tier: "warm" },
    { name: "Julio Gomez Belmonte", title: "Director of EdTech", email: "jgomezb@santillana.com", role: "Influencer", tier: "warm" },
    { name: "Camila Alvarado", title: "Gerente Marketing y Comunicacion", email: "malvaradon@santillana.com", role: "User", tier: "cold" },
    { name: "Maria Del Mar Cabornero Ramas", title: "—", email: "mcabornero@santillana.com", role: "User", tier: "cold" },
    { name: "Rodrigo Bittencourt", title: "—", email: "rbittencourt@santillana.com", role: "User", tier: "cold" },
  ],
  granolaNotes: {
    currentProject: "Timeline comprimido de 4 a 2 meses (Apr 20 → Jun 20). Ultimo deploy estimado Jun 29. Propuesta de extension a 2.5 meses pendiente — email a Hannah.",
    newOpportunity: "Reunion agendada con Cris (reemplaza a Bilun). Necesitan ballpark proposal para validar inversion. Franco referido por Jana — senal positiva.",
    relationshipInsight: "Intro Pablo → Ernesto desbloqueo revenue. Demuestra valor del relationship mapping para expandir dentro de la cuenta.",
    nextSteps: [
      "Participar en Account Planning (jueves 10 abr)",
      "Enviar email a Hannah sobre extension a 2.5 meses",
      "Reunion con Cris — presentar ballpark + validar nueva inversion",
      "Aprovechar referral de Jana como puente",
      "Continuar analisis org chart + relationship mapping",
    ],
  },
  sdrDeals: [
    { name: "[SDR] Santillana (NPS)", stage: "Followup Sequence", contact: "—", outreach: "NPS" },
    { name: "[SDR] Santillana (NPS #2)", stage: "Research + Tagging", contact: "—", outreach: "NPS" },
    { name: "[SDR] Julio Gomez Belmonte", stage: "Lost (Disqualified)", contact: "Julio Gomez B.", outreach: "Lost SQL" },
    { name: "[SDR] Milan Sahu", stage: "Lost (Disqualified)", contact: "Milan Sahu", outreach: "Lost SQL" },
    { name: "[SDR] Ahana Datta (Gift)", stage: "Lost (No Response)", contact: "Ahana Datta", outreach: "2025 Gift" },
    { name: "[SDR] Ahana Datta (HCC)", stage: "Lost (Disqualified)", contact: "Ahana Datta", outreach: "Happy Customer" },
    { name: "[SDR] Leidy Munoz", stage: "Lost (Disqualified)", contact: "Leidy Munoz", outreach: "Lost SQL" },
  ],
};

// Meetings from Granola this week
const MEETINGS = [
  { title: "[1:1] Franco / Nico", date: "7 abr, 10:00", participants: "Franco, Nico", id: "2c0e41e1" },
  { title: "[Sync.] Sales Funnel", date: "6 abr, 15:00", participants: "Nico, Cecilia, Martin, Mili, Franco", id: "e160336d" },
  { title: "[Weekly] Partnerships Team", date: "6 abr, 10:00", participants: "Franco, Nico, Martin", id: "5e444d6a" },
];

// Ecosystem Graph — Kauffman Fellows (real data)
const ECOSYSTEM = {
  org: "Kauffman Fellows",
  totalOrgs: 1,
  totalPeople: 32,
  totalEdges: 36,
  aeroTeam: [
    { name: "Milagros Avellaneda", title: "Head of Operations" },
    { name: "Nicolas Andronowicz", title: "Partnerships Director" },
    { name: "Cecilia Giraudo", title: "COO" },
    { name: "Roberto Gonzalez", title: "Co-Founder, Ventures" },
    { name: "Agustin Linenberg", title: "CEO" },
    { name: "Damian Lopez", title: "Head of Branding" },
  ],
  keyPeople: [
    { name: "Fernando Fabre", title: "CEO", tier: "hot", score: 90, roles: "Champion + Decision Maker" },
    { name: "Daniela Terminel", title: "VP, Network", tier: "hot", score: 83, roles: "Champion + Decision Maker" },
    { name: "Alana Chin", title: "Head of Brand & Comms", tier: "hot", score: 77, roles: "Influencer" },
    { name: "Katlyn Mease", title: "Head of Recruiting", tier: "warm", score: 65, roles: "Technical Buyer" },
  ],
  deals: [
    { name: "Network Directory Platform", amount: "$227,500", stage: "won" },
    { name: "Product Pod Extension", amount: "$32,625", stage: "won" },
  ],
  opportunities: [
    { name: "Homepage Redesign", champion: "Alana Chin" },
    { name: "Newsletter Component", champion: "Chloe LeValley" },
    { name: "LP Program Platform", champion: "Kirsten Owens" },
  ],
};

// Prioridades definidas por Nico — 1:1 del 7 abr
const PRIORIDADES = [
  { n: "1", label: "Campanas core + pipeline actualizado", color: "#3b82f6", detail: "Lost SQL + Nurture Stalled SQL. Enviar emails, trackear, reportar indices de respuesta." },
  { n: "2", label: "Warm-up LinkedIn (piloto)", color: "#a855f7", detail: "Batch 3/semana, tier B/C. 4 etapas: identificar > follow > engage > connect." },
  { n: "3", label: "CSAT / NPS agresivo", color: "#eab308", detail: "Multi-canal incl. WhatsApp. Meta: completar en 2 meses. Separar CSAT de NPS." },
  { n: "4", label: "Account Planning", color: "#22c55e", detail: "Santillana (jueves), REMAX (prox. semana). Mapeo relacional + oportunidades." },
];

// Pending actions (updated — warm-up pilot configured, Santillana research done)
const INITIAL_ACTIONS = [
  { id: 1, type: "campaign", action: "Armar campana Nurture Stalled SQL", target: "Nueva campana — SQLs que no llegaron a propuesta", priority: "alta" },
  { id: 2, type: "email", action: "Enviar batch Lost SQL", target: "3 deals pendientes en Ready to Ship", priority: "alta" },
  { id: 3, type: "csat", action: "Enviar WhatsApp CSAT", target: "Empatico AI, + 2 pendientes", priority: "alta" },
  { id: 5, type: "report", action: "Actualizar reporte de campanas", target: "Indices de respuesta por campana", priority: "media" },
  { id: 7, type: "warmup", action: "Follow a Naveed Janmohamed en LinkedIn", target: "Piloto warm-up — Asignado a Agustin", priority: "media" },
  { id: 8, type: "warmup", action: "Follow a Amanda Zhu en LinkedIn", target: "Piloto warm-up — Asignado a Nicolas", priority: "media" },
  { id: 9, type: "warmup", action: "Follow a Lior Alexander en LinkedIn", target: "Piloto warm-up — Asignado a Roberto", priority: "media" },
  { id: 10, type: "email", action: "Enviar email a Hannah (Santillana)", target: "Confirmar extension proyecto a 2.5 meses", priority: "media" },
  { id: 11, type: "planning", action: "Agendar reunion con Cris (Santillana)", target: "Presentar ballpark proposal nueva inversion", priority: "media" },
];

const ACTIVITY_FEED = [
  { time: "20:15", action: "Santillana research completo", type: "deal", detail: "20 deals, 29 contactos, contexto Granola — listo para jueves" },
  { time: "20:00", action: "Warm-up piloto configurado", type: "warmup", detail: "3 leads cargados en Asana: Naveed, Amanda, Lior" },
  { time: "19:30", action: "Scheduled tasks creadas", type: "sync", detail: "Morning briefing (9:01), Pipeline sync (3x/dia), Weekly report (vie 17:00)" },
  { time: "17:00", action: "Dashboard deployado", type: "sync", detail: "SDR Command Center v1 — data real de HubSpot" },
  { time: "14:32", action: "Sync HubSpot completado", type: "sync", detail: "443 deals SDR procesados, 15 campanas mapeadas" },
  { time: "10:30", action: "Reunion analizada", type: "meeting", detail: "[1:1] Franco/Nico — 4 prioridades definidas" },
];

// ============================================================
// COMPONENTS
// ============================================================

function Badge({ text, variant = "gray" }) {
  const colors = {
    blue: "bg-blue-500/15 text-blue-400",
    green: "bg-green-500/15 text-green-400",
    yellow: "bg-yellow-500/15 text-yellow-400",
    red: "bg-red-500/15 text-red-400",
    purple: "bg-purple-500/15 text-purple-400",
    orange: "bg-orange-500/15 text-orange-400",
    gray: "bg-zinc-500/10 text-zinc-400",
    hot: "bg-red-500/20 text-red-300",
    warm: "bg-orange-500/20 text-orange-300",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[variant] || colors.gray}`}>
      {text}
    </span>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5 hover:bg-[#1f1f35] hover:border-[#3a3a4e] transition-all">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</span>
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      </div>
      <div className="text-2xl font-bold tracking-tight" style={{ color }}>{value}</div>
      <div className="text-xs text-zinc-500 mt-1">{sub}</div>
    </div>
  );
}

function PipelineBar({ stages, showGroups = false }) {
  const total = stages.reduce((a, b) => a + b.count, 0);
  return (
    <div>
      <div className="flex rounded-lg overflow-hidden h-10 mb-4">
        {stages.map((s) => (
          <div key={s.id} className="flex items-center justify-center text-xs font-semibold transition-all hover:opacity-80 relative group"
            style={{ width: `${Math.max((s.count / total) * 100, 2)}%`, background: s.color, minWidth: "24px" }}>
            {s.count > 0 && <span>{s.count}</span>}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-[10px] text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {s.name}: {s.count} deals
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {stages.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
            <span className="text-xs text-zinc-400">{s.name}</span>
            <span className="text-xs text-zinc-600">({s.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignTable({ campaigns }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2a2a3e]">
            <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Campana</th>
            <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total</th>
            <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Activos</th>
            <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Won</th>
            <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Lost</th>
            <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Response %</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => {
            const activeStages = ["1224356374", "1275457612", "1224356375", "1224356376", "1225118002", "1225118003"];
            const active = Object.entries(c.stages).filter(([k]) => activeStages.includes(k) || k === "1224356372" || k === "1224356373" || k === "1244737059").reduce((a, [, v]) => a + v, 0);
            const won = c.stages["1224356377"] || 0;
            const lost = Object.entries(c.stages).filter(([k]) => ["1224356378", "1225118004", "1244570040"].includes(k)).reduce((a, [, v]) => a + v, 0);
            const responded = Object.entries(c.stages).filter(([k]) => ["1224356375", "1224356376", "1225118002", "1225118003", "1224356377", "1275457612"].includes(k)).reduce((a, [, v]) => a + v, 0);
            const rate = c.total > 0 ? Math.round(((responded + won) / c.total) * 100) : 0;
            return (
              <tr key={c.name} className="border-b border-[#2a2a3e]/50 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3.5">
                  <div className="font-medium text-sm text-zinc-200">{c.name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5 max-w-xs truncate">{c.description}</div>
                </td>
                <td className="px-4 py-3.5 text-sm text-zinc-300 text-center font-medium">{c.total}</td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`text-sm font-medium ${active > 0 ? "text-blue-400" : "text-zinc-600"}`}>{active}</span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`text-sm font-medium ${won > 0 ? "text-yellow-400" : "text-zinc-600"}`}>{won}</span>
                </td>
                <td className="px-4 py-3.5 text-center text-sm text-zinc-500">{lost}</td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`text-sm font-medium ${rate > 20 ? "text-green-400" : rate > 0 ? "text-yellow-400" : "text-zinc-600"}`}>
                    {rate > 0 ? `${rate}%` : "-"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ActivityFeed({ items }) {
  const typeColors = { sync: "#3b82f6", email: "#a855f7", response: "#22c55e", deal: "#eab308", warmup: "#f97316", meeting: "#ec4899" };
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div key={i} className="flex gap-3 py-3 border-b border-[#2a2a3e]/50 last:border-0">
          <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: typeColors[item.type] || "#71717a" }} />
          <div className="flex-1 min-w-0">
            <div className="text-sm text-zinc-300">{item.action}</div>
            <div className="text-xs text-zinc-500 mt-0.5">{item.detail}</div>
          </div>
          <span className="text-xs text-zinc-600 flex-shrink-0">{item.time}</span>
        </div>
      ))}
    </div>
  );
}

function ActionQueue({ actions, onApprove, onReject }) {
  const [expanded, setExpanded] = useState(null);
  const [instructions, setInstructions] = useState({});
  const typeIcons = { email: "\u2709\uFE0F", warmup: "\uD83D\uDD17", csat: "\u2B50", deal: "\uD83D\uDCC1", campaign: "\uD83D\uDE80", report: "\uD83D\uDCCA", planning: "\uD83D\uDCC5", general: "\u26A1" };
  const priorityColors = { alta: "red", media: "yellow", baja: "gray" };

  const handleExpand = (id) => setExpanded(expanded === id ? null : id);
  const handleInstructionChange = (id, val) => setInstructions(prev => ({ ...prev, [id]: val }));

  return (
    <div className="space-y-3">
      {actions.map((a) => (
        <div key={a.id} className={`bg-[#1a1a2e] border rounded-xl transition-all ${expanded === a.id ? "border-blue-500/40 shadow-lg shadow-blue-500/5" : "border-[#2a2a3e] hover:border-blue-500/20"}`}>
          {/* Header row */}
          <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => handleExpand(a.id)}>
            <span className="text-lg">{typeIcons[a.type] || "\u2022"}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-zinc-200 font-medium">{a.action}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{a.target}</div>
            </div>
            <Badge text={a.priority} variant={priorityColors[a.priority]} />
            <div className="flex gap-2">
              <button onClick={(e) => { e.stopPropagation(); onApprove(a.id, instructions[a.id]); }} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/30 hover:bg-green-500/25 transition-colors">
                Aprobar
              </button>
              <button onClick={(e) => { e.stopPropagation(); onReject(a.id, instructions[a.id]); }} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                Rechazar
              </button>
            </div>
            <span className={`text-zinc-600 text-xs transition-transform ${expanded === a.id ? "rotate-180" : ""}`}>&#9660;</span>
          </div>

          {/* Expanded: instructions panel */}
          {expanded === a.id && (
            <div className="px-4 pb-4 border-t border-[#2a2a3e] pt-3 space-y-3">
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-1.5">Instrucciones para ejecutar</label>
                <textarea
                  value={instructions[a.id] || ""}
                  onChange={(e) => handleInstructionChange(a.id, e.target.value)}
                  placeholder="Ej: 'Usar tono informal, mencionar el caso de Santillana como referencia, enviar desde mi email no el de Nico...'"
                  className="w-full bg-[#12121a] border border-[#2a2a3e] rounded-lg px-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 resize-none"
                  rows={3}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-zinc-600">
                  {a.source && <span>Fuente: {a.source}</span>}
                  {a.created_at && <span className="ml-3">Creada: {new Date(a.created_at).toLocaleDateString("es-AR")}</span>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onApprove(a.id, instructions[a.id])} className="px-4 py-2 rounded-lg text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors">
                    Aprobar con instrucciones
                  </button>
                  <button onClick={() => onReject(a.id, instructions[a.id])} className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// TABS
// ============================================================

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "campaigns", label: "Campanas" },
  { id: "pipeline", label: "Pipeline" },
  { id: "warmup", label: "Warm-up" },
  { id: "metrics", label: "CSAT / NPS" },
  { id: "planning", label: "Account Planning" },
  { id: "graph", label: "Ecosystem Graph" },
  { id: "actions", label: "Acciones" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [actions, setActions] = useState(INITIAL_ACTIONS);
  const [planningView, setPlanningView] = useState("Santillana");
  const [dbActions, setDbActions] = useState(null); // Actions from DB (null = not loaded yet)
  const [activityFeedLive, setActivityFeedLive] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(LAST_SYNC);
  const [apiStatus, setApiStatus] = useState("loading"); // loading, connected, offline

  // ---- API Connection: Fetch actions and activity from DB ----
  const fetchActions = useCallback(async () => {
    try {
      const res = await fetch("/api/actions");
      if (res.ok) {
        const data = await res.json();
        if (data.actions?.pending?.length > 0 || data.actions?.completed?.length > 0) {
          setDbActions(data.actions);
          setApiStatus("connected");
        }
      }
    } catch { /* DB not connected yet, use hardcoded */ }
  }, []);

  const fetchActivity = useCallback(async () => {
    try {
      const res = await fetch("/api/activity?limit=10");
      if (res.ok) {
        const data = await res.json();
        if (data.activity?.length > 0) {
          setActivityFeedLive(data.activity);
        }
      }
    } catch { /* fallback to hardcoded */ }
  }, []);

  // Poll every 30s for live updates
  useEffect(() => {
    fetchActions();
    fetchActivity();
    const interval = setInterval(() => {
      fetchActions();
      fetchActivity();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchActions, fetchActivity]);

  // ---- Action handlers: POST to API with instructions ----
  const handleApprove = async (id, instrucciones) => {
    try {
      const res = await fetch("/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", actionId: id, instructions: instrucciones || null }),
      });
      if (res.ok) fetchActions();
    } catch { /* offline fallback */ }
    setActions((p) => p.filter((a) => a.id !== id));
  };

  const handleReject = async (id, reason) => {
    try {
      const res = await fetch("/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", actionId: id, reason: reason || null }),
      });
      if (res.ok) fetchActions();
    } catch { /* offline fallback */ }
    setActions((p) => p.filter((a) => a.id !== id));
  };

  // Merge: use DB actions if available, otherwise hardcoded
  const displayActions = dbActions?.pending?.length > 0
    ? dbActions.pending.map((a, i) => ({ id: a.id, type: a.type, action: a.action, target: a.target, priority: a.priority }))
    : actions;

  const displayActivity = activityFeedLive
    ? activityFeedLive.map(a => ({ time: new Date(a.time).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }), action: a.action, type: a.type, detail: a.detail }))
    : ACTIVITY_FEED;

  // Computed stats
  const stats = useMemo(() => {
    const activeStageIds = ["1224356372", "1224356373", "1244737059", "1224356374", "1275457612", "1224356375", "1224356376", "1225118002", "1225118003"];
    const active = PIPELINE_STAGES_REAL.filter((s) => activeStageIds.includes(s.id)).reduce((a, b) => a + b.count, 0);
    const won = PIPELINE_STAGES_REAL.find((s) => s.id === "1224356377")?.count || 0;
    const csatTotal = 11;
    const csatDone = (CAMPAIGNS_DATA.find((c) => c.name === "CSAT")?.stages["1224356377"] || 0) + (CAMPAIGNS_DATA.find((c) => c.name === "CSAT")?.stages["1224356375"] || 0);
    const npsTotal = 18;
    const npsDone = (CAMPAIGNS_DATA.find((c) => c.name === "NPS")?.stages["1224356375"] || 0) + (CAMPAIGNS_DATA.find((c) => c.name === "NPS")?.stages["1224356377"] || 0);
    return { active, won, csatTotal, csatDone, npsTotal, npsDone };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#2a2a3e]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">SDR Command Center</h1>
            <p className="text-xs text-zinc-500">Aerolab &middot; Franco Rodriguez</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Sync: {lastSyncTime}
              {apiStatus === "connected" && <span className="ml-2 text-green-400">&middot; DB live</span>}
            </div>
            <div className="text-xs text-zinc-600">443 deals SDR &middot; 15 campanas</div>
            {displayActions.length > 0 && (
              <button onClick={() => setActiveTab("actions")}
                className="relative px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/25 transition-colors">
                {displayActions.length} pendientes
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tab Nav */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-[#12121a] rounded-xl p-1 border border-[#2a2a3e] overflow-x-auto">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-[#1a1a2e] text-zinc-100 shadow-sm shadow-black/20" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"}`}>
              {tab.label}
              {tab.id === "actions" && displayActions.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-400">{displayActions.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* ---- OVERVIEW ---- */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Deals Totales SDR" value="443" sub={`${stats.active} activos · ${stats.won} ganados`} color="#3b82f6" />
              <StatCard label="Campanas Activas" value="15" sub="Lost SQL + Nurture Stalled = prioridad" color="#a855f7" />
              <StatCard label="CSAT Completado" value={`${Math.round((stats.csatDone / stats.csatTotal) * 100)}%`} sub={`${stats.csatDone} de ${stats.csatTotal} respondidos`} color="#eab308" />
              <StatCard label="NPS Completado" value={`${Math.round((stats.npsDone / stats.npsTotal) * 100)}%`} sub={`${stats.npsDone} de ${stats.npsTotal} respondidos`} color="#22c55e" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-zinc-300 mb-4">Pipeline SDR — Todos los stages</h3>
                <PipelineBar stages={PIPELINE_STAGES_REAL} />
              </div>
              <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-zinc-300 mb-4">Prioridades (Nico — 7 abr)</h3>
                <div className="space-y-3">
                  {PRIORIDADES.map((p) => (
                    <div key={p.n}>
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: p.color + "22", color: p.color }}>{p.n}</span>
                        <span className="text-sm text-zinc-300">{p.label}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 ml-9">{p.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-zinc-300">Top Campanas por Volumen</h3>
                  <button onClick={() => setActiveTab("campaigns")} className="text-xs text-blue-400 hover:text-blue-300">Ver todas &rarr;</button>
                </div>
                <div className="space-y-3">
                  {CAMPAIGNS_DATA.slice(0, 5).map((c) => (
                    <div key={c.name} className="flex items-center justify-between py-2 border-b border-[#2a2a3e]/50 last:border-0">
                      <div>
                        <div className="text-sm text-zinc-200">{c.name}</div>
                        <div className="text-xs text-zinc-500">{c.total} deals</div>
                      </div>
                      <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(c.total / 133) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-zinc-300 mb-4">Actividad Reciente</h3>
                <ActivityFeed items={displayActivity} />
              </div>
            </div>

            {displayActions.length > 0 && (
              <div className="bg-[#1a1a2e] border border-blue-500/20 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-zinc-300">
                    Acciones Pendientes
                    <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-400">{displayActions.length}</span>
                  </h3>
                  <button onClick={() => setActiveTab("actions")} className="text-xs text-blue-400 hover:text-blue-300">Gestionar &rarr;</button>
                </div>
                <ActionQueue actions={displayActions.slice(0, 3)} onApprove={handleApprove} onReject={handleReject} />
              </div>
            )}
          </div>
        )}

        {/* ---- CAMPAIGNS ---- */}
        {activeTab === "campaigns" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Campanas de Outreach</h2>
              <div className="flex gap-2">
                <Badge text="443 deals totales" variant="blue" />
                <Badge text="15 campanas" variant="purple" />
              </div>
            </div>
            <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl overflow-hidden">
              <CampaignTable campaigns={CAMPAIGNS_DATA} />
            </div>
            <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">Insight de Response Rate</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                  <div className="text-lg font-bold text-green-400">51%</div>
                  <div className="text-xs text-zinc-500">Sweet spot: 31-75 palabras</div>
                </div>
                <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
                  <div className="text-lg font-bold text-yellow-400">30%+</div>
                  <div className="text-xs text-zinc-500">Rate promedio sector SDR</div>
                </div>
                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                  <div className="text-lg font-bold text-red-400">-83%</div>
                  <div className="text-xs text-zinc-500">Drop en emails &gt;150 palabras</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- PIPELINE ---- */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Pipeline SDR</h2>
              <Badge text="443 deals — Pipeline 826132498" variant="blue" />
            </div>

            <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-300 mb-4">Distribucion por Stage</h3>
              <PipelineBar stages={PIPELINE_STAGES_REAL} />
            </div>

            {/* Active vs Lost breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1a1a2e] border border-green-500/20 rounded-xl p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Pre-Outreach + Activos</div>
                <div className="text-3xl font-bold text-green-400">{stats.active}</div>
                <div className="text-xs text-zinc-500 mt-1">New Lead (16) + Research (6) + Hold (11) + Outreach (12)</div>
              </div>
              <div className="bg-[#1a1a2e] border border-yellow-500/20 rounded-xl p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Won</div>
                <div className="text-3xl font-bold text-yellow-400">{stats.won}</div>
                <div className="text-xs text-zinc-500 mt-1">Deals ganados (incl. 2025 Gift)</div>
              </div>
              <div className="bg-[#1a1a2e] border border-red-500/20 rounded-xl p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Lost (Total)</div>
                <div className="text-3xl font-bold text-red-400">375</div>
                <div className="text-xs text-zinc-500 mt-1">Nurture (47) + No Resp. (113) + Disqual. (215)</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PIPELINE_STAGES_REAL.map((s) => (
                <div key={s.id} className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded" style={{ background: s.color }} />
                    <span className="text-sm font-medium text-zinc-300">{s.name}</span>
                    <Badge text={s.group} variant={s.group === "active" ? "green" : s.group === "won" ? "yellow" : s.group === "lost" ? "red" : "gray"} />
                  </div>
                  <div className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- WARM-UP ---- */}
        {activeTab === "warmup" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Warm-up LinkedIn</h2>
              <Badge text="Piloto Activo — 3 Leads" variant="purple" />
            </div>

            <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-purple-300 mb-3">Estado del Piloto</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Batch 1 cargado: 3 leads tier A en etapa Identificar. Cada SDR tiene 1 lead asignado. Proximo paso: follow en LinkedIn. Aprobacion manual en cada etapa.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                {[
                  { stage: "Identificar", count: 3, color: "text-purple-400" },
                  { stage: "Follow", count: 0, color: "text-blue-400" },
                  { stage: "Engage", count: 0, color: "text-cyan-400" },
                  { stage: "Connect", count: 0, color: "text-green-400" },
                  { stage: "Ready", count: 0, color: "text-yellow-400" },
                  { stage: "Outreach", count: 0, color: "text-orange-400" },
                ].map(({stage, count, color}) => (
                  <div key={stage} className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-3 text-center">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{stage}</div>
                    <div className={`text-2xl font-bold ${count > 0 ? color : "text-zinc-700"}`}>{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pilot Leads */}
            <div className="space-y-3">
              {[
                { name: "Naveed Janmohamed", title: "CEO @ Unriddle / Anara", linkedin: "linkedin.com/in/naveedjanmohamed", assignee: "Agustin", stage: "Identificar", angle: "Unriddle YC-backed AI research tool. Scaling fast, brand needs to match ambition.", likes: 0, comments: 0, connected: false },
                { name: "Amanda Zhu", title: "Co-Founder @ Recall AI", linkedin: "linkedin.com/in/amandazhu", assignee: "Nicolas", stage: "Identificar", angle: "Recall AI competes with Gong/Fireflies. API-first brand needs trust + sophistication.", likes: 0, comments: 0, connected: false },
                { name: "Lior Alexander", title: "Founder @ Alpha Signal", linkedin: "linkedin.com/in/lioralexander", assignee: "Roberto", stage: "Identificar", angle: "500K subs, 7 cifras revenue. Web no refleja nivel de audiencia. Premium brand upgrade.", likes: 0, comments: 0, connected: false },
              ].map((lead) => (
                <div key={lead.name} className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-base font-semibold text-zinc-200">{lead.name}</span>
                      <span className="text-sm text-zinc-500 ml-2">{lead.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge text={lead.stage} variant="purple" />
                      <span className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-zinc-400">{lead.assignee}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">{lead.angle}</p>
                  <div className="flex items-center gap-6 text-xs text-zinc-500">
                    <span>Likes: {lead.likes}/5</span>
                    <span>Comments: {lead.comments}/3</span>
                    <span>Connected: {lead.connected ? "SI" : "NO"}</span>
                    <span className="text-zinc-600">{lead.linkedin}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">Configuracion del Piloto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm text-zinc-400">
                <div><span className="text-zinc-500 block text-xs uppercase mb-1">Batch semanal</span> 3 personas</div>
                <div><span className="text-zinc-500 block text-xs uppercase mb-1">Tier target</span> A/B unknowns</div>
                <div><span className="text-zinc-500 block text-xs uppercase mb-1">Aprobacion</span> Manual en cada paso</div>
                <div><span className="text-zinc-500 block text-xs uppercase mb-1">Deadline</span> 28 abr (3 semanas)</div>
              </div>
            </div>
          </div>
        )}

        {/* ---- CSAT / NPS ---- */}
        {activeTab === "metrics" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Seguimiento CSAT / NPS</h2>
              <Badge text="Meta: 2 meses" variant="yellow" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">CSAT</div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-yellow-400">{stats.csatDone}</span>
                  <span className="text-sm text-zinc-500 mb-1">/ {stats.csatTotal} respondidos</span>
                </div>
                <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(stats.csatDone / stats.csatTotal) * 100}%` }} />
                </div>
                <div className="text-xs text-zinc-500 mt-2">{Math.round((stats.csatDone / stats.csatTotal) * 100)}% completado</div>
                <div className="mt-3 text-xs text-zinc-400">
                  <div>Won: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1224356377"] || 0} &middot; Followup: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1224356375"] || 0} &middot; Hold: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1244737059"] || 0}</div>
                  <div>Lost: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1244570040"] || 0} &middot; Research: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1224356373"] || 0}</div>
                </div>
              </div>
              <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">NPS</div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-purple-400">{stats.npsDone}</span>
                  <span className="text-sm text-zinc-500 mb-1">/ {stats.npsTotal} respondidos</span>
                </div>
                <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(stats.npsDone / stats.npsTotal) * 100}%` }} />
                </div>
                <div className="text-xs text-zinc-500 mt-2">{Math.round((stats.npsDone / stats.npsTotal) * 100)}% completado</div>
                <div className="mt-3 text-xs text-zinc-400">
                  <div>Followup: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1224356375"] || 0} &middot; Research: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1224356373"] || 0} &middot; Outreach: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1224356374"] || 0}</div>
                  <div>Hold: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1244737059"] || 0} &middot; Nurture: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1224356378"] || 0} &middot; Lost: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1244570040"] || 0}</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">Estrategia de Seguimiento</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                  <div className="text-sm font-medium text-blue-400 mb-1">Canal primario: Email</div>
                  <div className="text-xs text-zinc-500">Primer y segundo intento via email. Sweet spot 31-75 palabras.</div>
                </div>
                <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                  <div className="text-sm font-medium text-green-400 mb-1">Canal alternativo: WhatsApp</div>
                  <div className="text-xs text-zinc-500">Para no respondedores despues de 2 intentos por email.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- ACCOUNT PLANNING ---- */}
        {activeTab === "planning" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Account Planning</h2>
              <div className="flex gap-2">
                {ACCOUNT_PLANNINGS.map((ap, i) => (
                  <button key={i} onClick={() => setPlanningView(ap.company)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${planningView === ap.company ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-zinc-800 text-zinc-400 border border-transparent hover:border-[#2a2a3e]"}`}>
                    {ap.company} <span className="ml-1 opacity-60">{ap.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* === SANTILLANA FULL DOSSIER === */}
            {planningView === "Santillana" && (
              <div className="space-y-5">
                {/* Company Header */}
                <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-zinc-100">{SANTILLANA.company.name}</span>
                      <span className="ml-3 text-sm text-zinc-500">{SANTILLANA.company.domain}</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge text={SANTILLANA.company.industry} variant="blue" />
                      <Badge text={`${SANTILLANA.company.employees} emp`} variant="gray" />
                      <Badge text={SANTILLANA.company.annualRevenue} variant="green" />
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4">{SANTILLANA.company.description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#12121a] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-400">{SANTILLANA.deals.total}</div>
                      <div className="text-xs text-zinc-500">Deals totales</div>
                    </div>
                    <div className="bg-[#12121a] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-400">{SANTILLANA.deals.totalRevenue}</div>
                      <div className="text-xs text-zinc-500">Revenue total</div>
                    </div>
                    <div className="bg-[#12121a] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-purple-400">{SANTILLANA.keyContacts.length}</div>
                      <div className="text-xs text-zinc-500">Contactos mapeados</div>
                    </div>
                  </div>
                </div>

                {/* Granola Context — What's happening NOW */}
                <div className="bg-gradient-to-r from-yellow-500/5 to-orange-500/5 border border-yellow-500/20 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-yellow-300 mb-3">Contexto Actual (Granola)</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs text-yellow-400/80 uppercase tracking-wider">Proyecto actual</span>
                      <p className="text-zinc-300 mt-1">{SANTILLANA.granolaNotes.currentProject}</p>
                    </div>
                    <div>
                      <span className="text-xs text-yellow-400/80 uppercase tracking-wider">Nueva oportunidad</span>
                      <p className="text-zinc-300 mt-1">{SANTILLANA.granolaNotes.newOpportunity}</p>
                    </div>
                    <div>
                      <span className="text-xs text-yellow-400/80 uppercase tracking-wider">Insight de relaciones</span>
                      <p className="text-zinc-300 mt-1">{SANTILLANA.granolaNotes.relationshipInsight}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-yellow-500/10">
                    <span className="text-xs text-yellow-400/80 uppercase tracking-wider">Next Steps (para jueves)</span>
                    <div className="mt-2 space-y-1">
                      {SANTILLANA.granolaNotes.nextSteps.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <span className="text-yellow-400 mt-0.5 text-xs">→</span> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deals Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Active Deals */}
                  <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">Deals Activos</h3>
                    <div className="space-y-2">
                      {SANTILLANA.deals.active.map((d, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-[#2a2a3e]/50 last:border-0">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-zinc-200 truncate">{d.name}</div>
                            <div className="flex gap-2 mt-0.5">
                              <span className="text-xs text-zinc-500">{d.stage}</span>
                              <span className="text-xs text-zinc-600">&middot;</span>
                              <span className="text-xs text-zinc-500">{d.pipeline}</span>
                            </div>
                          </div>
                          <div className="text-right ml-3">
                            <div className="text-sm font-medium text-green-400">{d.amount}</div>
                            <div className="text-xs text-zinc-600">{d.modified}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Won Deals */}
                  <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">Deals Ganados</h3>
                    <div className="space-y-2">
                      {SANTILLANA.deals.won.map((d, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-[#2a2a3e]/50 last:border-0">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-zinc-200 truncate">{d.name}</div>
                            <div className="text-xs text-zinc-500">{d.closedAt}</div>
                          </div>
                          <span className="text-sm font-medium text-green-400 ml-3">{d.amount}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#2a2a3e]">
                      <h4 className="text-xs text-red-400/80 mb-2">Deals Perdidos</h4>
                      {SANTILLANA.deals.lost.map((d, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5">
                          <span className="text-sm text-zinc-400 truncate">{d.name}</span>
                          <span className="text-sm text-red-400/70 ml-3">{d.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Contacts — Org Chart Style */}
                <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-zinc-300 mb-4">Contactos Clave ({SANTILLANA.keyContacts.length} mapeados)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {SANTILLANA.keyContacts.map((c, i) => (
                      <div key={i} className={`rounded-lg p-3 border ${c.tier === "hot" ? "bg-red-500/5 border-red-500/20" : c.tier === "warm" ? "bg-orange-500/5 border-orange-500/15" : "bg-zinc-800/30 border-[#2a2a3e]"}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-zinc-200">{c.name}</span>
                          <Badge text={c.tier} variant={c.tier === "hot" ? "hot" : c.tier === "warm" ? "warm" : "gray"} />
                        </div>
                        <div className="text-xs text-zinc-400">{c.title}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-zinc-500">{c.email}</span>
                          <Badge text={c.role} variant={c.role === "Champion" ? "green" : c.role === "Decision Maker" ? "blue" : c.role === "Technical Buyer" ? "purple" : "gray"} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SDR History */}
                <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-zinc-300 mb-3">Historial SDR</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-xs text-zinc-500 border-b border-[#2a2a3e]">
                        <th className="text-left py-2 font-medium">Deal</th>
                        <th className="text-left py-2 font-medium">Contacto</th>
                        <th className="text-left py-2 font-medium">Campana</th>
                        <th className="text-left py-2 font-medium">Estado</th>
                      </tr></thead>
                      <tbody>
                        {SANTILLANA.sdrDeals.map((d, i) => (
                          <tr key={i} className="border-b border-[#2a2a3e]/30">
                            <td className="py-2 text-zinc-300">{d.name}</td>
                            <td className="py-2 text-zinc-400">{d.contact}</td>
                            <td className="py-2"><Badge text={d.outreach} variant={d.outreach === "NPS" ? "yellow" : d.outreach === "Lost SQL" ? "red" : "gray"} /></td>
                            <td className="py-2"><Badge text={d.stage} variant={d.stage.includes("Lost") ? "red" : d.stage.includes("Followup") ? "green" : "blue"} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Reuniones Recientes */}
                <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-zinc-300 mb-4">Reuniones Recientes (Granola)</h3>
                  <div className="space-y-3">
                    {MEETINGS.map((m) => (
                      <div key={m.id} className="flex items-center justify-between py-2 border-b border-[#2a2a3e]/50 last:border-0">
                        <div>
                          <div className="text-sm text-zinc-200">{m.title}</div>
                          <div className="text-xs text-zinc-500">{m.participants}</div>
                        </div>
                        <span className="text-xs text-zinc-500">{m.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* === REMAX Placeholder === */}
            {planningView === "REMAX" && (
              <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-8 text-center">
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="text-lg font-semibold text-zinc-200 mb-2">REMAX — Account Planning</h3>
                <p className="text-sm text-zinc-400 mb-4">Semana del 14 de abril. Research pendiente.</p>
                <div className="flex justify-center gap-2">
                  {["Franco", "Nico", "Martin"].map((p) => (
                    <span key={p} className="px-3 py-1 rounded-md bg-zinc-800 text-xs text-zinc-400">{p}</span>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 mt-4">El dossier se generara automaticamente antes de la reunion.</p>
              </div>
            )}
          </div>
        )}

        {/* ---- ECOSYSTEM GRAPH ---- */}
        {activeTab === "graph" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Ecosystem Graph — Gran Neurona</h2>
              <div className="flex gap-2">
                <Badge text={`${ECOSYSTEM.totalOrgs} org`} variant="blue" />
                <Badge text={`${ECOSYSTEM.totalPeople} personas`} variant="purple" />
                <Badge text={`${ECOSYSTEM.totalEdges} conexiones`} variant="green" />
              </div>
            </div>

            <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-300 mb-4">{ECOSYSTEM.org}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Key Stakeholders</h4>
                  <div className="space-y-3">
                    {ECOSYSTEM.keyPeople.map((p) => (
                      <div key={p.name} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-zinc-200">{p.name}</div>
                          <div className="text-xs text-zinc-500">{p.title} &middot; {p.roles}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge text={p.tier} variant={p.tier === "hot" ? "hot" : "warm"} />
                          <span className="text-xs text-zinc-400">{p.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Deals</h4>
                  <div className="space-y-2">
                    {ECOSYSTEM.deals.map((d) => (
                      <div key={d.name} className="flex items-center justify-between py-2 border-b border-[#2a2a3e]/50">
                        <span className="text-sm text-zinc-300">{d.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-green-400">{d.amount}</span>
                          <Badge text={d.stage} variant="green" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xs text-zinc-500 uppercase tracking-wider mt-6 mb-3">Oportunidades Detectadas</h4>
                  <div className="space-y-2">
                    {ECOSYSTEM.opportunities.map((o) => (
                      <div key={o.name} className="flex items-center justify-between py-2 border-b border-[#2a2a3e]/50">
                        <span className="text-sm text-zinc-300">{o.name}</span>
                        <span className="text-xs text-zinc-500">{o.champion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2a2a3e]">
                <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Equipo Aerolab Conectado</h4>
                <div className="flex flex-wrap gap-2">
                  {ECOSYSTEM.aeroTeam.map((t) => (
                    <span key={t.name} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-xs text-blue-400 border border-blue-500/20">
                      {t.name} &middot; {t.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-blue-300 mb-2">Roadmap del Grafo</h3>
              <p className="text-sm text-zinc-400">Actualmente 1 org mapeada (Kauffman Fellows). Proximo paso: agregar Santillana (pre Account Planning del jueves) y REMAX. El grafo se expande con cada cuenta que se mapea.</p>
            </div>
          </div>
        )}

        {/* ---- ACTIONS ---- */}
        {activeTab === "actions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Cola de Acciones</h2>
              <div className="flex gap-2">
                <Badge text={apiStatus === "connected" ? "DB conectada" : "Modo local"} variant={apiStatus === "connected" ? "green" : "gray"} />
                <Badge text={`${displayActions.length} pendientes`} variant={displayActions.length > 0 ? "blue" : "green"} />
              </div>
            </div>
            {displayActions.length > 0 ? (
              <ActionQueue actions={displayActions} onApprove={handleApprove} onReject={handleReject} />
            ) : (
              <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-12 text-center">
                <div className="text-2xl mb-2">&#10003;</div>
                <div className="text-zinc-300 font-medium">Todo al dia</div>
                <div className="text-sm text-zinc-500 mt-1">No hay acciones pendientes de aprobacion</div>
              </div>
            )}

            {/* Approved actions — waiting execution */}
            {dbActions?.approved?.length > 0 && (
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-green-300 mb-3">Aprobadas — Esperando ejecucion ({dbActions.approved.length})</h3>
                <div className="space-y-2">
                  {dbActions.approved.map((a) => (
                    <div key={a.id} className="flex items-start justify-between py-2 border-b border-green-500/10 last:border-0">
                      <div className="flex-1">
                        <div className="text-sm text-zinc-200">{a.action}</div>
                        <div className="text-xs text-zinc-500">{a.target}</div>
                        {a.instructions && (
                          <div className="mt-1.5 px-2 py-1 bg-[#12121a] rounded text-xs text-blue-300 border-l-2 border-blue-500/40">
                            {a.instructions}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <Badge text="aprobada" variant="green" />
                        <span className="text-xs text-zinc-600 animate-pulse">ejecutando...</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-zinc-600">El proximo scheduled task va a ejecutar estas acciones segun tus instrucciones.</div>
              </div>
            )}

            {/* Completed actions from DB */}
            {dbActions?.completed?.length > 0 && (
              <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-zinc-300 mb-3">Completadas Recientes</h3>
                <div className="space-y-2">
                  {dbActions.completed.slice(0, 10).map((a) => (
                    <div key={a.id} className="flex items-start justify-between py-2 border-b border-[#2a2a3e]/30 last:border-0">
                      <div className="flex-1">
                        <div className="text-sm text-zinc-400 line-through">{a.action}</div>
                        <div className="text-xs text-zinc-600">{a.target}</div>
                        {a.instructions && <div className="mt-1 text-xs text-zinc-600 italic">Instrucciones: {a.instructions}</div>}
                        {a.execution_log && <div className="mt-1 text-xs text-green-400/60">Resultado: {typeof a.execution_log === 'string' ? a.execution_log : JSON.stringify(a.execution_log)}</div>}
                      </div>
                      <Badge text="completada" variant="green" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-[#2a2a3e] mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-zinc-600">SDR Command Center v1.0 &middot; Powered by Claude + Aerolab</span>
          <span className="text-xs text-zinc-600">Data: HubSpot (443 deals) &middot; Granola (4 meetings) &middot; Ecosystem (32 people)</span>
        </div>
      </footer>
    </div>
  );
}
