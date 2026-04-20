"use client";

import { useState, useMemo, useEffect, useCallback } from "react";

// Aerolab wordmark — extracted from aerolab.co static/images/aerolab.svg
// Stroke-safe scalable version. White "aerolab" text + orange isotype (F75000).
function AerolabWordmark({ className = "h-5 w-auto" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="106"
      height="26"
      viewBox="0 0 106 26"
      fill="none"
      className={className}
      aria-label="Aerolab"
      role="img"
    >
      <g clipPath="url(#aerolab-clip)">
        <path
          fill="currentColor"
          d="M92.374 8.716h2.31v6.146h.047c.924-1.448 2.795-2.091 4.597-2.091 3.65 0 6.583 2.321 6.583 6.364 0 4.044-2.934 6.365-6.583 6.365-1.779 0-3.696-.69-4.597-1.953h-.046v1.768h-2.31V8.716Zm6.653 5.985c-2.703 0-4.481 1.677-4.481 4.434 0 2.276 1.34 4.435 4.481 4.435 3.119 0 4.436-2.16 4.436-4.434 0-2.758-1.756-4.435-4.436-4.435ZM91 25.315h-2.31v-1.77h-.047c-.901 1.265-2.818 1.955-4.597 1.955-3.65 0-6.584-2.322-6.584-6.368 0-4.047 2.935-6.369 6.584-6.369 1.801 0 3.672.643 4.597 2.092h.046v-1.956H91v12.416Zm-11.09-6.183c0 2.276 1.317 4.436 4.436 4.436 3.142 0 4.481-2.161 4.481-4.436 0-2.759-1.779-4.437-4.481-4.437-2.68 0-4.436 1.678-4.436 4.437Zm-58.383-2.228c.3-2.98 2.38-4.14 6.007-4.14 2.471 0 5.567.614 5.567 3.39v6.55c0 .704.324 1.023 1.04 1.023.254 0 .577-.045.808-.091v1.591a11.98 11.98 0 0 1-1.802.137c-1.155 0-1.917-.454-2.079-1.797-.923 1.228-3.188 1.933-5.151 1.933-4.02 0-4.92-2.047-4.92-3.593 0-2.183 1.317-3.298 5.198-3.707l2.633-.273c1.293-.136 2.102-.363 2.102-1.432 0-1.638-1.617-1.956-3.488-1.956-1.987 0-3.673.523-3.742 2.365h-2.172Zm9.402 1.955c-.346.386-.97.546-2.263.705l-2.61.319c-1.802.227-2.75.705-2.75 1.955 0 1.114 1.132 1.888 2.819 1.888 2.61 0 4.805-1.365 4.805-3.343v-1.524Zm6.527.955c.185 2.457 2.403 3.776 4.458 3.776 1.317 0 3.119-.433 3.904-2.116h2.45c-1.157 2.866-3.86 4.026-6.238 4.026-4.712 0-7.022-2.934-7.022-6.368 0-3.435 2.31-6.369 7.022-6.369 3.188 0 6.56 1.82 6.56 6.755v.296H37.457Zm8.686-1.774c-.346-2.16-2.055-3.365-4.228-3.365-2.125 0-4.042 1.227-4.389 3.365h8.617Zm18.624-5.276c4.712 0 7.022 2.934 7.022 6.369 0 3.434-2.31 6.368-7.022 6.368s-7.023-2.934-7.023-6.368c0-3.435 2.31-6.369 7.023-6.369Zm0 1.91c-3.35 0-4.574 2.297-4.574 4.458 0 2.16 1.224 4.458 4.574 4.458 3.35 0 4.574-2.297 4.574-4.458 0-2.16-1.225-4.458-4.574-4.458Zm-12.535-1.785h-.544c-.98 0-1.774.794-1.774 1.774v10.655h2.318V14.982l5.512.07v-2.094l-5.512-.07Zm25.547-4.173h-2.395c0 5.534-3.017 11.068-3.017 16.602h2.395c0-5.535 3.017-11.068 3.017-16.602Z"
        />
        <path
          fill="#F75000"
          d="M21.494 8.707 15.721.5 7.506 6.279l4.033 10.07c-.759.525-1.465.7-2.25.562-2.505-.436-2.892-2.053-3.36-4.876-.238-1.43-.484-2.91-1.222-4.19C3.816 6.302 2.401 5.38.38 5.028L0 7.21c1.371.238 2.231.775 2.788 1.742.537.932.74 2.153.955 3.446.229 1.376.465 2.8 1.147 4.013.83 1.48 2.144 2.357 4.02 2.683 1.214.212 2.357-.003 3.468-.655a7.138 7.138 0 0 0 1.064-.765c.317-.27.61-.566.887-.877l7.17-8.082-.005-.008Z"
        />
      </g>
      <defs>
        <clipPath id="aerolab-clip">
          <path fill="#fff" d="M0 .5h105.911v25H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

// Just the orange isotype — for nav collapsed states, avatars, favicons
function AerolabMark({ className = "h-4 w-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#F75000"
        d="M21.494 8.207 15.721 0 7.506 5.779l4.033 10.07c-.759.525-1.465.7-2.25.562-2.505-.436-2.892-2.053-3.36-4.876-.238-1.43-.484-2.91-1.222-4.19C3.816 5.802 2.401 4.88.38 4.528L0 6.71c1.371.238 2.231.775 2.788 1.742.537.932.74 2.153.955 3.446.229 1.376.465 2.8 1.147 4.013.83 1.48 2.144 2.357 4.02 2.683 1.214.212 2.357-.003 3.468-.655a7.138 7.138 0 0 0 1.064-.765c.317-.27.61-.566.887-.877l7.17-8.082-.005-.008Z"
      />
    </svg>
  );
}

// ============================================================
// REAL DATA — Extracted from HubSpot, Asana, Granola, Ecosystem Graph
// Last sync: 2026-04-20 ~15:35 UTC
// ============================================================

const LAST_SYNC = "20 abr 2026, 15:35";

// Pipeline stages — closed Aerolab palette.
// Pre-outreach: warm cream tones. Active: orange spectrum (hot = moving forward).
// Won: brand orange. Lost: muted browns (less visual noise for low-value states).
const STAGE_MAP = {
  "1224356372": { name: "New Lead", group: "pre", color: "#C7BEB1", order: 0 },
  "1224356373": { name: "Research + Tagging", group: "pre", color: "#A8C1E8", order: 1 },
  "1232050606": { name: "Ready to Ship", group: "pre", color: "#7FA0DB", order: 2 },
  "1308810585": { name: "Ready to Ship by Owner", group: "pre", color: "#203B83", order: 3 },
  "1244737059": { name: "Hold", group: "pre", color: "#8A8276", order: 4 },
  "1282557052": { name: "On Review", group: "pre", color: "#FFB088", order: 4.5 },
  "1224356374": { name: "Initial Outreach", group: "active", color: "#FF7A3C", order: 5 },
  "1275457612": { name: "1st Email Answered", group: "active", color: "#FF5005", order: 6 },
  "1224356375": { name: "Followup Sequence", group: "active", color: "#FF5005", order: 7 },
  "1224356376": { name: "Conversation", group: "active", color: "#F75000", order: 8 },
  "1225118002": { name: "Requalification", group: "active", color: "#C13C00", order: 9 },
  "1225118003": { name: "Handoff", group: "active", color: "#7FA0DB", order: 10 },
  "1224356377": { name: "Won", group: "won", color: "#FF5005", order: 11 },
  "1224356378": { name: "Lost (Nurture Loop)", group: "lost", color: "#8A8276", order: 12 },
  "1225118004": { name: "Lost (No Response)", group: "lost", color: "#5C5548", order: 13 },
  "1244570040": { name: "Lost (Disqualified)", group: "lost", color: "#3A342C", order: 14 },
};

// Real data from HubSpot SDR pipeline (826132498) — 446 deals total (refresh 20-Apr-2026)
const CAMPAIGNS_DATA = [
  { name: "Lost SQL", total: 141, stages: { "1224356374": 1, "1224356377": 1, "1224356378": 5, "1225118004": 15, "1244570040": 117, "1282557052": 2 }, description: "Deals que recibieron propuesta y se perdieron. Timing minimo 2 meses post-perdida." },
  { name: "AI/Branding Outreach", total: 79, stages: { "1224356377": 2, "1224356378": 17, "1225118004": 47, "1244570040": 13 }, description: "Case studies de AI compartidos. Campana hiperpersonalizada completada." },
  { name: "Referrers", total: 40, stages: { "1224356377": 1, "1224356378": 4, "1225118004": 19, "1244570040": 16 }, description: "Partners de referidos. Emails enviados a todos los contactos." },
  { name: "Job change", total: 34, stages: { "1224356378": 11, "1225118004": 14, "1244570040": 9 }, description: "Contactos que cambiaron de trabajo. Outreach por nuevo contexto." },
  { name: "Referral renew", total: 30, stages: { "1224356378": 4, "1244570040": 26 }, description: "Renovacion de referidos existentes." },
  { name: "EOY message", total: 26, stages: { "1225118004": 18, "1244570040": 8 }, description: "Mensaje de fin de ano 2025. Cohort cerrado." },
  { name: "Happy Current Customer", total: 19, stages: { "1224356378": 1, "1225118004": 1, "1244570040": 17 }, description: "Champions de proyectos cerrados 2025. Sentiment: Promoter." },
  { name: "NPS", total: 18, stages: { "1224356374": 1, "1224356375": 1, "1224356378": 2, "1244570040": 7, "1282557052": 7 }, description: "Seguimiento Net Promoter Score. Meta: completar en 2 meses." },
  { name: "2025 Gift", total: 18, stages: { "1224356377": 14, "1225118004": 1, "1244570040": 3 }, description: "Regalos enviados a clientes 2025. 100% completado." },
  { name: "Showcase", total: 15, stages: { "1225118004": 14, "1244570040": 1 }, description: "Showcase de proyectos a prospects." },
  { name: "CSAT", total: 11, stages: { "1224356375": 3, "1224356377": 2, "1244570040": 6 }, description: "Customer Satisfaction Score. Seguimiento agresivo multi-canal." },
  { name: "Sin Tipo", total: 8, stages: { "1224356378": 1, "1225118004": 6, "1244570040": 1 }, description: "Deals sin outreach_type asignado." },
  { name: "Other/Regular", total: 3, stages: { "1224356377": 2, "1244570040": 1 }, description: "Outreach regular." },
  { name: "VIP Referrers", total: 3, stages: { "1225118004": 2, "1244570040": 1 }, description: "Referrers VIP de alto valor." },
  { name: "Branding free trial", total: 1, stages: { "1224356377": 1 }, description: "Prueba de branding gratuita." },
];

const PIPELINE_STAGES_REAL = [
  { id: "1282557052", name: "On Review", count: 9, color: "#FFB088", group: "pre" },
  { id: "1224356374", name: "Initial Outreach", count: 2, color: "#FF7A3C", group: "active" },
  { id: "1224356375", name: "Followup Seq.", count: 4, color: "#FF5005", group: "active" },
  { id: "1224356377", name: "Won", count: 23, color: "#F75000", group: "won" },
  { id: "1224356378", name: "Lost (Nurture)", count: 45, color: "#8A8276", group: "lost" },
  { id: "1225118004", name: "Lost (No Resp.)", count: 137, color: "#5C5548", group: "lost" },
  { id: "1244570040", name: "Lost (Disqual.)", count: 226, color: "#3A342C", group: "lost" },
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
  { n: "1", label: "Campanas core + pipeline actualizado", color: "#FF5005", detail: "Lost SQL + Nurture Stalled SQL. Enviar emails, trackear, reportar indices de respuesta." },
  { n: "2", label: "Warm-up LinkedIn (piloto)", color: "#203B83", detail: "Batch 3/semana, tier B/C. 4 etapas: identificar > follow > engage > connect." },
  { n: "3", label: "CSAT / NPS agresivo", color: "#FFB088", detail: "Multi-canal incl. WhatsApp. Meta: completar en 2 meses. Separar CSAT de NPS." },
  { n: "4", label: "Account Planning", color: "#7FA0DB", detail: "Santillana (jueves), REMAX (prox. semana). Mapeo relacional + oportunidades." },
];

// Pending actions — enriched with owner, deadline, origen, deal link, estimated time.
// Consumed by ActionQueue which groups warmup actions into a batch card.
const INITIAL_ACTIONS = [
  { id: 1, type: "campaign", action: "Armar campana Nurture Stalled SQL", target: "Nueva campana — SQLs que no llegaron a propuesta",
    priority: "alta", owner: "Franco",  origen: "1:1 Nico", deadline: "22 abr", eta: "2 h",  linkedItem: { kind: "campaign", label: "Nurture Stalled SQL" } },
  { id: 2, type: "email",    action: "Enviar batch Lost SQL",              target: "3 deals pendientes en Ready to Ship",
    priority: "alta", owner: "Franco",  origen: "HubSpot",   deadline: "hoy",   eta: "30 min", linkedItem: { kind: "campaign", label: "Lost SQL · 3 deals" } },
  { id: 3, type: "csat",     action: "Enviar WhatsApp CSAT",                target: "Empatico AI + 2 pendientes",
    priority: "alta", owner: "Franco",  origen: "Asana",     deadline: "hoy",   eta: "20 min", linkedItem: { kind: "campaign", label: "CSAT" } },
  { id: 5, type: "report",   action: "Actualizar reporte de campanas",      target: "Indices de respuesta por campana",
    priority: "media", owner: "Franco", origen: "Weekly",    deadline: "24 abr", eta: "45 min" },
  { id: 7, type: "warmup",   action: "Follow a Naveed Janmohamed en LinkedIn", target: "Piloto warm-up",
    priority: "media", owner: "Agustin", origen: "Warm-up piloto", deadline: "hoy", eta: "2 min",
    linkedItem: { kind: "person", label: "Naveed Janmohamed · CEO @ Unriddle" } },
  { id: 8, type: "warmup",   action: "Follow a Amanda Zhu en LinkedIn",     target: "Piloto warm-up",
    priority: "media", owner: "Nicolas", origen: "Warm-up piloto", deadline: "hoy", eta: "2 min",
    linkedItem: { kind: "person", label: "Amanda Zhu · Co-Founder @ Recall AI" } },
  { id: 9, type: "warmup",   action: "Follow a Lior Alexander en LinkedIn", target: "Piloto warm-up",
    priority: "media", owner: "Roberto", origen: "Warm-up piloto", deadline: "hoy", eta: "2 min",
    linkedItem: { kind: "person", label: "Lior Alexander · Founder @ Alpha Signal" } },
  { id: 10, type: "email",   action: "Enviar email a Hannah (Santillana)",  target: "Confirmar extension proyecto a 2.5 meses",
    priority: "media", owner: "Franco",  origen: "Granola · Account Planning", deadline: "21 abr", eta: "15 min",
    linkedItem: { kind: "deal", label: "Santillana - Dev Adicional" } },
  { id: 11, type: "planning",action: "Agendar reunion con Cris (Santillana)", target: "Presentar ballpark proposal nueva inversion",
    priority: "media", owner: "Franco",  origen: "Granola · Account Planning", deadline: "25 abr", eta: "30 min",
    linkedItem: { kind: "deal", label: "Santillana - Nueva oportunidad" } },
];

// Activity feed — rich context format.
// Shape: {time, type, actor, verb, target, targetType, targetId?, reason?}
// Back-compat: older {time, action, detail, type} still render via ActivityFeed fallback.
const ACTIVITY_FEED = [
  { time: "hace 15 min", type: "sync", actor: "Sistema", verb: "refrescó", target: "Pipeline SDR", targetType: "pipeline", reason: "446 deals · 23 won · 6 activos · 408 lost · 9 en on review" },
  { time: "hace 20 min", type: "deploy", actor: "Franco", verb: "redeployó", target: "SDR Command Center", targetType: "system", reason: "Aerolab wordmark + typography + paleta cerrada" },
  { time: "hoy 11:00", type: "report", actor: "Franco", verb: "generó", target: "Reporte Abril 2026", targetType: "report", targetId: "sdr-report.html", reason: "446 deals, cohort mensual" },
  { time: "hoy 09:42", type: "warmup", actor: "Agustín", verb: "hizo follow a", target: "Naveed Janmohamed", targetType: "person", targetId: "naveedjanmohamed" },
  { time: "hoy 09:38", type: "warmup", actor: "Nicolás", verb: "hizo follow a", target: "Amanda Zhu", targetType: "person", targetId: "amandazhu" },
  { time: "hoy 09:30", type: "warmup", actor: "Roberto", verb: "hizo follow a", target: "Lior Alexander", targetType: "person", targetId: "lioralexander" },
  { time: "ayer 18:15", type: "email", actor: "Franco", verb: "envió batch", target: "Lost SQL (3 deals)", targetType: "campaign", reason: "Ready to Ship → Initial Outreach" },
  { time: "ayer 16:04", type: "response", actor: "Jose Malaga", verb: "respondió en", target: "Santillana - Dev Adicional", targetType: "deal", reason: "Pidió ballpark para nueva oportunidad" },
  { time: "17 abr", type: "sync", actor: "Sistema", verb: "ejecutó sync previo", target: "HubSpot + Asana", targetType: "system", reason: "443 deals — delta de 3 nuevos antes del refresh de hoy" },
];

// ============================================================
// COMPONENTS
// ============================================================

function Badge({ text, variant = "gray" }) {
  const colors = {
    blue: "bg-[#FF5005]/15 text-[#FF7A3C]",
    green: "bg-[#7FA0DB]/12 text-[#7FA0DB]",
    yellow: "bg-[#FFB088]/12 text-[#FFB088]",
    red: "bg-[#8A8276]/15 text-[#C7BEB1]",
    purple: "bg-[#203B83]/25 text-[#7FA0DB]",
    orange: "bg-[#FFB088]/15 text-[#FFB088]",
    gray: "bg-zinc-500/10 text-zinc-400",
    hot: "bg-[#FF5005]/25 text-[#FF7A3C]",
    warm: "bg-[#FFB088]/20 text-[#FFB088]",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[variant] || colors.gray}`}>
      {text}
    </span>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5 hover:bg-[#211D18] hover:border-[#3A342C] transition-all">
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
          <tr className="border-b border-[#2D2822]">
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
              <tr key={c.name} className="border-b border-[#2D2822]/50 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3.5">
                  <div className="font-medium text-sm text-zinc-200">{c.name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5 max-w-xs truncate">{c.description}</div>
                </td>
                <td className="px-4 py-3.5 text-sm text-zinc-300 text-center font-medium">{c.total}</td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`text-sm font-medium ${active > 0 ? "text-[#FF7A3C]" : "text-zinc-600"}`}>{active}</span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`text-sm font-medium ${won > 0 ? "text-[#FFB088]" : "text-zinc-600"}`}>{won}</span>
                </td>
                <td className="px-4 py-3.5 text-center text-sm text-zinc-500">{lost}</td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`text-sm font-medium ${rate > 20 ? "text-[#7FA0DB]" : rate > 0 ? "text-[#FFB088]" : "text-zinc-600"}`}>
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

// Human-readable relative time for activity feed.
// "hace 3 min", "hace 2 h", "hoy 14:20", "ayer 18:04", "12 abr"
function formatRelativeTime(ts) {
  if (!ts) return "";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return String(ts);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.round(diffMs / 60000);
  const diffHr = Math.round(diffMs / 3600000);
  const hhmm = date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  if (diffMs < 0) return hhmm; // future / clock skew
  if (diffMin < 1) return "ahora";
  if (diffMin < 60) return `hace ${diffMin} min`;
  if (diffHr < 6) return `hace ${diffHr} h`;
  const sameDay = date.toDateString() === now.toDateString();
  if (sameDay) return `hoy ${hhmm}`;
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return `ayer ${hhmm}`;
  return date.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

// Actor → avatar config. Uses initials + warm palette hue.
const ACTOR_AVATARS = {
  "Franco":   { initials: "FR", bg: "#FF5005", fg: "#FFF5EE" },
  "Nicolás":  { initials: "NA", bg: "#203B83", fg: "#E8EEFB" },
  "Nicolas":  { initials: "NA", bg: "#203B83", fg: "#E8EEFB" },
  "Nico":     { initials: "NA", bg: "#203B83", fg: "#E8EEFB" },
  "Agustín":  { initials: "AL", bg: "#7FA0DB", fg: "#0F0D0A" },
  "Agustin":  { initials: "AL", bg: "#7FA0DB", fg: "#0F0D0A" },
  "Roberto":  { initials: "RG", bg: "#FF7A3C", fg: "#0F0D0A" },
  "Milagros": { initials: "MA", bg: "#C13C00", fg: "#FFF5EE" },
  "Cecilia":  { initials: "CG", bg: "#A8C1E8", fg: "#0F0D0A" },
  "Sistema":  { initials: "•",  bg: "#2D2822", fg: "#C7BEB1" },
};

// Target-type → tiny icon + color.
const TARGET_CHIP = {
  deal:     { color: "#FF5005", symbol: "◆" },
  campaign: { color: "#FF7A3C", symbol: "▲" },
  person:   { color: "#A8C1E8", symbol: "●" },
  pipeline: { color: "#FFB088", symbol: "≡" },
  report:   { color: "#7FA0DB", symbol: "▦" },
  system:   { color: "#8A8276", symbol: "◌" },
};

function ActorAvatar({ name, size = 24 }) {
  const cfg = ACTOR_AVATARS[name] || { initials: (name || "?").slice(0, 2).toUpperCase(), bg: "#2D2822", fg: "#C7BEB1" };
  return (
    <span
      className="rounded-full flex items-center justify-center font-semibold flex-shrink-0 font-mono"
      style={{
        width: size, height: size,
        background: cfg.bg, color: cfg.fg,
        fontSize: Math.floor(size * 0.4),
        letterSpacing: "-0.02em",
      }}
      title={name}
      aria-label={name}
    >
      {cfg.initials}
    </span>
  );
}

function ActivityFeed({ items }) {
  return (
    <div className="space-y-0">
      {items.map((item, i) => {
        // Back-compat: if the item only has legacy {action, detail}, render the old shape.
        const isLegacy = !item.actor && !item.verb;
        const chip = TARGET_CHIP[item.targetType] || TARGET_CHIP.system;
        return (
          <div key={i} className="flex gap-3 py-3 border-b border-[#2D2822]/50 last:border-0 group">
            {isLegacy ? (
              <>
                <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-[#8A8276]" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#C7BEB1]">{item.action}</div>
                  {item.detail && <div className="text-xs text-[#8A8276] mt-0.5">{item.detail}</div>}
                </div>
                <span className="text-xs text-[#5C5548] flex-shrink-0 tabular">{item.time}</span>
              </>
            ) : (
              <>
                <ActorAvatar name={item.actor} size={26} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#C7BEB1] leading-snug">
                    <span className="font-medium text-[#F9F7F1]">{item.actor}</span>{" "}
                    <span className="text-[#8A8276]">{item.verb}</span>{" "}
                    <span
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-medium transition-colors hover:bg-[#211D18]"
                      style={{ color: chip.color, background: `${chip.color}11`, border: `1px solid ${chip.color}22` }}
                      title={item.targetType}
                    >
                      <span className="text-[10px] opacity-70" aria-hidden="true">{chip.symbol}</span>
                      {item.target}
                    </span>
                  </div>
                  {item.reason && (
                    <div className="text-xs text-[#8A8276] mt-1 leading-relaxed pl-0.5">
                      {item.reason}
                    </div>
                  )}
                </div>
                <span className="text-xs text-[#5C5548] flex-shrink-0 tabular whitespace-nowrap pt-0.5">{item.time}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// ACTION PREVIEW — renders output preview per action type
// ============================================================
function ActionPreview({ type, metadata }) {
  let meta = {};
  try { meta = typeof metadata === "string" ? JSON.parse(metadata || "{}") : (metadata || {}); } catch {}

  const empty = !meta || Object.keys(meta).length === 0;

  const wrapper = (label, color, children) => (
    <div className={`bg-[#14110D] border rounded-lg p-4 space-y-2`} style={{ borderColor: color + "33" }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>{label}</span>
      </div>
      {children}
    </div>
  );

  if (type === "email") return wrapper("Preview — Email Draft", "#FF5005",
    empty
      ? <p className="text-xs text-zinc-600 italic">El draft se genera al ejecutar. Podés agregar instrucciones abajo para guiar el tono y contenido.</p>
      : <>
          {meta.to && <div className="text-xs"><span className="text-zinc-500">Para:</span> <span className="text-zinc-300 ml-1">{meta.to}</span></div>}
          {meta.from && <div className="text-xs"><span className="text-zinc-500">De:</span> <span className="text-zinc-300 ml-1">{meta.from}</span></div>}
          {meta.subject && <div className="text-xs"><span className="text-zinc-500">Asunto:</span> <span className="text-zinc-200 font-medium ml-1">{meta.subject}</span></div>}
          {meta.body && <div className="mt-2 p-3 bg-[#14110D] rounded-lg text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed border-l-2 border-[#FF5005]/45">{meta.body}</div>}
        </>
  );

  if (type === "asana") return wrapper("Preview — Tarea Asana", "#FFB088",
    empty
      ? <p className="text-xs text-zinc-600 italic">La tarea se crea al ejecutar. Podés especificar asignado, fecha y proyecto en las instrucciones.</p>
      : <>
          {meta.task_name && <div className="text-xs"><span className="text-zinc-500">Tarea:</span> <span className="text-zinc-200 font-medium ml-1">{meta.task_name}</span></div>}
          {meta.project && <div className="text-xs"><span className="text-zinc-500">Proyecto:</span> <span className="text-zinc-300 ml-1">{meta.project}</span></div>}
          {meta.assignee && <div className="text-xs"><span className="text-zinc-500">Asignado a:</span> <span className="text-zinc-300 ml-1">{meta.assignee}</span></div>}
          {meta.due_date && <div className="text-xs"><span className="text-zinc-500">Vencimiento:</span> <span className="text-zinc-300 ml-1">{meta.due_date}</span></div>}
          {meta.notes && <div className="mt-2 p-2 bg-[#14110D] rounded text-xs text-zinc-400 leading-relaxed">{meta.notes}</div>}
        </>
  );

  if (type === "notion") return wrapper("Preview — Página Notion", "#C7BEB1",
    empty
      ? <p className="text-xs text-zinc-600 italic">La página se crea al ejecutar. Podés indicar la base de datos y estructura en las instrucciones.</p>
      : <>
          {meta.page_title && <div className="text-xs"><span className="text-zinc-500">Título:</span> <span className="text-zinc-200 font-medium ml-1">{meta.page_title}</span></div>}
          {meta.database && <div className="text-xs"><span className="text-zinc-500">Base de datos:</span> <span className="text-zinc-300 ml-1">{meta.database}</span></div>}
          {meta.content && <div className="mt-2 p-2 bg-[#14110D] rounded text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed">{meta.content.length > 400 ? meta.content.slice(0, 400) + "…" : meta.content}</div>}
        </>
  );

  if (type === "slack") return wrapper("Preview — Mensaje Slack", "#203B83",
    empty
      ? <p className="text-xs text-zinc-600 italic">El mensaje se redacta al ejecutar. Podés indicar canal y tono en las instrucciones.</p>
      : <>
          {meta.channel && <div className="text-xs"><span className="text-zinc-500">Canal:</span> <span className="text-zinc-300 ml-1">#{meta.channel}</span></div>}
          {meta.to && <div className="text-xs"><span className="text-zinc-500">Para:</span> <span className="text-zinc-300 ml-1">@{meta.to}</span></div>}
          {meta.message && <div className="mt-2 p-3 bg-[#1A1713] rounded-lg text-xs text-zinc-300 leading-relaxed border-l-[3px] border-[#203B83]/60">{meta.message}</div>}
        </>
  );

  if (type === "warmup") return wrapper("Preview — LinkedIn Warm-up", "#A8C1E8",
    <div className="text-xs space-y-1">
      {meta.person && <div><span className="text-zinc-500">Persona:</span> <span className="text-zinc-300 ml-1">{meta.person}</span></div>}
      {meta.company && <div><span className="text-zinc-500">Empresa:</span> <span className="text-zinc-300 ml-1">{meta.company}</span></div>}
      {meta.step && <div><span className="text-zinc-500">Etapa:</span> <span className="text-[#A8C1E8] ml-1 font-medium">{meta.step}</span></div>}
      {meta.linkedin_url && <div><span className="text-zinc-500">LinkedIn:</span> <span className="text-zinc-400 ml-1">{meta.linkedin_url}</span></div>}
      {empty && <p className="text-zinc-600 italic">Acción de warm-up — se ejecuta en LinkedIn según el step del pipeline.</p>}
    </div>
  );

  if (type === "campaign") return wrapper("Preview — Campaña SDR", "#FF7A3C",
    <div className="text-xs space-y-1">
      {meta.campaign_name && <div><span className="text-zinc-500">Campaña:</span> <span className="text-zinc-300 font-medium ml-1">{meta.campaign_name}</span></div>}
      {meta.segment && <div><span className="text-zinc-500">Segmento:</span> <span className="text-zinc-300 ml-1">{meta.segment}</span></div>}
      {meta.count && <div><span className="text-zinc-500">Contactos:</span> <span className="text-[#FF7A3C] ml-1 font-bold">{meta.count}</span></div>}
      {meta.description && <div className="mt-1 text-zinc-500 leading-relaxed">{meta.description}</div>}
      {empty && <p className="text-zinc-600 italic">Se armará la campaña con los parámetros definidos al ejecutar.</p>}
    </div>
  );

  // Generic / csat / report / planning / general
  return wrapper("Preview — Acción", "#8A8276",
    empty
      ? <p className="text-xs text-zinc-600 italic">Output se genera al ejecutar. Usá las instrucciones para personalizar el resultado.</p>
      : <div className="space-y-1">
          {Object.entries(meta).map(([k, v]) => (
            <div key={k} className="text-xs flex gap-2">
              <span className="text-zinc-600 capitalize">{k.replace(/_/g, " ")}:</span>
              <span className="text-zinc-400">{typeof v === "object" ? JSON.stringify(v) : String(v)}</span>
            </div>
          ))}
        </div>
  );
}

// ============================================================
// DATE FILTER BAR
// ============================================================
function DateFilterBar({ value, onChange }) {
  const opts = [
    { id: "30d", label: "Últ. 30 días" },
    { id: "mes", label: "Mes corriente" },
    { id: "3m", label: "Últ. 3 meses" },
    { id: "total", label: "Total" },
  ];
  return (
    <div className="flex gap-1.5 flex-wrap">
      {opts.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            value === o.id
              ? "bg-[#FF5005]/20 text-[#FF7A3C] border border-[#FF5005]/40"
              : "text-zinc-500 border border-[#2D2822] hover:text-zinc-300 hover:border-zinc-600"
          }`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// Type glyphs — monochrome SVGs feel less "emoji casino" than mixed Unicode faces.
const TYPE_GLYPHS = {
  email:    "M3.5 5.5h13v9h-13z M3.5 5.5l6.5 4.5 6.5-4.5",
  warmup:   "M5.5 10a4.5 4.5 0 1 1 4.5 4.5v-1.5 M10 10v1.5a4.5 4.5 0 1 0 4.5-4.5",
  csat:     "M10 3l2 5.5 5.5.2-4.4 3.4 1.6 5.3-4.7-3-4.7 3 1.6-5.3L2.5 8.7l5.5-.2z",
  deal:     "M3 6h14v9H3z M3 6l7 5 7-5",
  campaign: "M4 10l12-5v10zM3 10h1v3H3z",
  report:   "M5 4h10v12H5z M7 7h6 M7 10h6 M7 13h4",
  planning: "M5 5h10v10H5z M7 3v3 M13 3v3 M5 8h10",
  general:  "M10 4v6l4 2",
};

const OWNER_TAG_COLOR = {
  "Franco":  "#FF5005",
  "Nicolas": "#203B83", "Nicolás": "#203B83", "Nico": "#203B83",
  "Agustin": "#7FA0DB", "Agustín": "#7FA0DB",
  "Roberto": "#FF7A3C",
  "Milagros": "#C13C00",
  "Cecilia": "#A8C1E8",
  "Sistema": "#8A8276",
};

function TypeGlyph({ type, className = "w-4 h-4" }) {
  const d = TYPE_GLYPHS[type] || TYPE_GLYPHS.general;
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

// Human-friendly labels for filter chips
const TYPE_LABELS = {
  email: "Email",
  warmup: "Warm-up",
  csat: "CSAT",
  deal: "Deal",
  campaign: "Campaña",
  report: "Reporte",
  planning: "Planning",
  general: "General",
};

// Small, reusable pill-shaped filter chip.
function FilterChip({ active, onClick, children, color, title }) {
  const base = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all border cursor-pointer select-none whitespace-nowrap";
  const style = active
    ? { background: `${color || "#FF5005"}22`, color: color || "#FF7A3C", borderColor: `${color || "#FF5005"}55` }
    : { background: "transparent", color: "#8A8276", borderColor: "#2D2822" };
  return (
    <button type="button" onClick={onClick} title={title} className={`${base} hover:border-[#3A342C] hover:text-[#C7BEB1]`} style={style}>
      {children}
    </button>
  );
}

function LinkedItemChip({ item }) {
  if (!item) return null;
  const cfg = TARGET_CHIP[item.kind] || TARGET_CHIP.system;
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-medium"
      style={{ color: cfg.color, background: `${cfg.color}12`, border: `1px solid ${cfg.color}25` }}
    >
      <span className="text-[9px] opacity-70" aria-hidden="true">{cfg.symbol}</span>
      {item.label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const cfg = {
    alta:  { bg: "#FF5005", text: "#FFF5EE" },
    media: { bg: "#FFB088", text: "#1A1713" },
    baja:  { bg: "#3A342C", text: "#C7BEB1" },
  }[priority] || { bg: "#2D2822", text: "#C7BEB1" };
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider tabular" style={{ background: cfg.bg, color: cfg.text }}>
      {priority}
    </span>
  );
}

function ActionMeta({ a }) {
  return (
    <div className="flex items-center gap-3 flex-wrap mt-2 text-[11px] text-[#8A8276]">
      {a.deadline && (
        <span className="inline-flex items-center gap-1">
          <svg viewBox="0 0 14 14" width="11" height="11" className="opacity-70" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.3"/><path d="M7 4v3l2 1.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span className={a.deadline === "hoy" ? "text-[#FF7A3C] font-medium" : ""}>{a.deadline}</span>
        </span>
      )}
      {a.eta && (
        <span className="inline-flex items-center gap-1">
          <span className="opacity-70">≈</span> {a.eta}
        </span>
      )}
      {a.owner && (
        <span className="inline-flex items-center gap-1.5">
          <ActorAvatar name={a.owner} size={16} />
          <span style={{ color: OWNER_TAG_COLOR[a.owner] || "#C7BEB1" }}>{a.owner}</span>
        </span>
      )}
      {a.origen && (
        <span className="inline-flex items-center gap-1 text-[#5C5548]">
          <span className="opacity-60">·</span>
          <span>{a.origen}</span>
        </span>
      )}
      {a.linkedItem && <LinkedItemChip item={a.linkedItem} />}
    </div>
  );
}

function ActionQueue({ actions, onApprove, onReject, onHold }) {
  const [expanded, setExpanded] = useState(null);
  const [instructions, setInstructions] = useState({});
  const [batchOpen, setBatchOpen] = useState({});

  const handleExpand = (id) => setExpanded(expanded === id ? null : id);
  const handleInstructionChange = (id, val) => setInstructions(prev => ({ ...prev, [id]: val }));

  // Group warmup actions into batch cards (one per verb-root, e.g. "Follow ... en LinkedIn").
  const warmupActions = actions.filter(a => a.type === "warmup");
  const otherActions = actions.filter(a => a.type !== "warmup");
  const warmupGroup = warmupActions.length >= 2 ? warmupActions : [];
  const warmupInline = warmupActions.length < 2 ? warmupActions : [];
  const ordered = [...otherActions, ...warmupInline];

  const approveAll = (ids) => ids.forEach(id => onApprove(id, instructions[id]));

  return (
    <div className="space-y-3">
      {warmupGroup.length > 0 && (() => {
        const groupId = "warmup-batch";
        const open = !!batchOpen[groupId];
        return (
          <div className="bg-[#1A1713] border border-[#7FA0DB]/30 rounded-xl overflow-hidden">
            <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-[#211D18]" onClick={() => setBatchOpen(prev => ({ ...prev, [groupId]: !open }))}>
              <div className="w-8 h-8 rounded-lg bg-[#7FA0DB]/15 text-[#7FA0DB] flex items-center justify-center flex-shrink-0">
                <TypeGlyph type="warmup" className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[#F9F7F1] font-medium">Warm-up LinkedIn · {warmupGroup.length} personas</div>
                <div className="text-xs text-[#8A8276] mt-0.5">{warmupGroup.map(a => a.linkedItem?.label.split(" · ")[0] || a.action).join(" · ")}</div>
                <div className="flex items-center gap-3 flex-wrap mt-2 text-[11px] text-[#8A8276]">
                  <span className="inline-flex items-center gap-1">
                    <svg viewBox="0 0 14 14" width="11" height="11" className="opacity-70" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.3"/><path d="M7 4v3l2 1.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <span className="text-[#FF7A3C] font-medium">hoy</span>
                  </span>
                  <span className="inline-flex items-center gap-1"><span className="opacity-70">≈</span> {warmupGroup.length * 2} min total</span>
                  <span className="inline-flex items-center -space-x-1.5">
                    {[...new Set(warmupGroup.map(a => a.owner))].map(o => <ActorAvatar key={o} name={o} size={18} />)}
                  </span>
                  <span className="text-[#5C5548]">Batch · piloto warm-up</span>
                </div>
              </div>
              <PriorityBadge priority="media" />
              <button
                onClick={(e) => { e.stopPropagation(); approveAll(warmupGroup.map(a => a.id)); }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FF5005]/15 text-[#FF7A3C] border border-[#FF5005]/30 hover:bg-[#FF5005]/25 transition-colors whitespace-nowrap"
              >
                Aprobar todas
              </button>
              <span className={`text-[#5C5548] text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
            </div>
            {open && (
              <div className="border-t border-[#2D2822] divide-y divide-[#2D2822]/60">
                {warmupGroup.map((a) => (
                  <div key={a.id} className="px-4 py-3 flex items-center gap-3">
                    <ActorAvatar name={a.owner} size={22} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#F9F7F1]">{a.linkedItem?.label || a.action}</div>
                      <div className="text-[11px] text-[#8A8276] mt-0.5">{a.owner} · {a.eta}</div>
                    </div>
                    <button onClick={() => onApprove(a.id, instructions[a.id])} className="px-2.5 py-1 rounded text-[11px] font-medium bg-[#FF5005]/12 text-[#FF7A3C] border border-[#FF5005]/25 hover:bg-[#FF5005]/25">Aprobar</button>
                    <button onClick={() => onHold && onHold(a.id)} className="px-2.5 py-1 rounded text-[11px] font-medium bg-[#FFB088]/10 text-[#FFB088] border border-[#FFB088]/25 hover:bg-[#FFB088]/20">Hold</button>
                    <button onClick={() => onReject(a.id)} className="px-2.5 py-1 rounded text-[11px] font-medium bg-[#8A8276]/10 text-[#C7BEB1] border border-[#3A342C] hover:bg-[#8A8276]/20">Rechazar</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {ordered.map((a) => (
        <div key={a.id} className={`bg-[#1A1713] border rounded-xl transition-all ${expanded === a.id ? "border-[#FF5005]/45 shadow-lg shadow-[#FF5005]/5" : "border-[#2D2822] hover:border-[#FF5005]/25"}`}>
          {/* Header row */}
          <div className="p-4 flex items-start gap-4 cursor-pointer" onClick={() => handleExpand(a.id)}>
            <div className="w-8 h-8 rounded-lg bg-[#211D18] text-[#C7BEB1] flex items-center justify-center flex-shrink-0 mt-0.5">
              <TypeGlyph type={a.type} className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-[#F9F7F1] font-medium leading-snug">{a.action}</div>
              <div className="text-xs text-[#8A8276] mt-0.5">{a.target}</div>
              <ActionMeta a={a} />
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <PriorityBadge priority={a.priority} />
              <div className="flex gap-1.5">
                <button onClick={(e) => { e.stopPropagation(); onApprove(a.id, instructions[a.id]); }} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#FF5005]/12 text-[#FF7A3C] border border-[#FF5005]/30 hover:bg-[#FF5005]/22 transition-colors">
                  Aprobar
                </button>
                <button onClick={(e) => { e.stopPropagation(); onHold && onHold(a.id, instructions[a.id]); }} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#FFB088]/10 text-[#FFB088] border border-[#FFB088]/25 hover:bg-[#FFB088]/20 transition-colors">
                  Hold
                </button>
                <button onClick={(e) => { e.stopPropagation(); onReject(a.id, instructions[a.id]); }} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#8A8276]/10 text-[#C7BEB1] border border-[#3A342C] hover:bg-[#8A8276]/20 transition-colors">
                  Rechazar
                </button>
              </div>
            </div>
            <span className={`text-[#5C5548] text-xs transition-transform mt-1 ${expanded === a.id ? "rotate-180" : ""}`}>▾</span>
          </div>

          {/* Expanded: preview + instructions panel */}
          {expanded === a.id && (
            <div className="px-4 pb-4 border-t border-[#2D2822] pt-4 space-y-4">
              <ActionPreview type={a.type} metadata={a.metadata} />

              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-1.5">Instrucciones / ajustes antes de ejecutar</label>
                <textarea
                  value={instructions[a.id] || ""}
                  onChange={(e) => handleInstructionChange(a.id, e.target.value)}
                  placeholder="Ej: 'Usar tono informal, mencionar el caso de Santillana, enviar desde mi email...'"
                  className="w-full bg-[#14110D] border border-[#2D2822] rounded-lg px-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#FF5005]/45 resize-none"
                  rows={2}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#5C5548]">
                  {a.source && <span>Fuente: {a.source}</span>}
                  {a.created_at && <span className="ml-3">Creada: {new Date(a.created_at).toLocaleDateString("es-AR")}</span>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onApprove(a.id, instructions[a.id])} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#FF5005]/20 text-[#FF7A3C] border border-[#FF5005]/40 hover:bg-[#FF5005]/30 transition-colors">
                    ✓ Aprobar
                  </button>
                  <button onClick={() => onHold && onHold(a.id, instructions[a.id])} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#FFB088]/10 text-[#FFB088] border border-[#FFB088]/25 hover:bg-[#FFB088]/20 transition-colors">
                    Hold
                  </button>
                  <button onClick={() => onReject(a.id, instructions[a.id])} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#8A8276]/10 text-[#C7BEB1] border border-[#3A342C] hover:bg-[#8A8276]/20 transition-colors">
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
  const [dealsDateFilter, setDealsDateFilter] = useState("total");
  const [emailsDateFilter, setEmailsDateFilter] = useState("total");
  const [emailsReport, setEmailsReport] = useState(null); // live email actions from DB
  const [asnCampaigns, setAsnCampaigns] = useState(null);   // live campaigns from Asana via DB
  const [campaignsSyncedAt, setCampaignsSyncedAt] = useState(null);

  // ---- Actions tab: filters + sort (QW4) ----
  const [actionFilterPriority, setActionFilterPriority] = useState("all"); // all | alta | media | baja
  const [actionFilterType, setActionFilterType] = useState("all");         // all | warmup | outreach | review | research | followup | other
  const [actionFilterOwner, setActionFilterOwner] = useState("all");       // all | <owner name> | mine
  const [actionFilterOrigen, setActionFilterOrigen] = useState("all");     // all | <origen>
  const [actionSortBy, setActionSortBy] = useState("priority");            // priority | deadline | created

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

  const handleHold = async (id, reason) => {
    try {
      const res = await fetch("/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "hold", actionId: id, reason: reason || null }),
      });
      if (res.ok) fetchActions();
    } catch { /* offline fallback */ }
    setActions((p) => p.filter((a) => a.id !== id));
  };

  const handleUnhold = async (id) => {
    try {
      const res = await fetch("/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unhold", actionId: id }),
      });
      if (res.ok) fetchActions();
    } catch { /* offline fallback */ }
  };

  // Fetch completed email actions for the emails report
  const fetchEmailsReport = useCallback(async () => {
    try {
      const res = await fetch("/api/actions?status=completed");
      if (res.ok) {
        const data = await res.json();
        setEmailsReport(data.actions || []);
      }
    } catch {}
  }, []);

  // Fetch live campaigns from Asana (via DB)
  const fetchCampaigns = useCallback(async () => {
    try {
      const res = await fetch("/api/campaigns");
      if (res.ok) {
        const data = await res.json();
        if (data.campaigns?.length > 0) {
          setAsnCampaigns(data.campaigns);
          setCampaignsSyncedAt(data.synced_at);
          setApiStatus("connected");
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchEmailsReport();
    fetchCampaigns();
  }, [fetchEmailsReport, fetchCampaigns]);

  // Helper: filter records by date range
  const filterByDate = (items, dateField, range) => {
    if (range === "total") return items;
    const now = new Date();
    const start = new Date();
    if (range === "30d") start.setDate(now.getDate() - 30);
    else if (range === "mes") start.setDate(1);
    else if (range === "3m") start.setMonth(now.getMonth() - 3);
    return items.filter(i => {
      const d = new Date(i[dateField]);
      return !isNaN(d) && d >= start;
    });
  };

  // Merge: use DB actions if available, otherwise hardcoded
  const displayActions = dbActions?.pending?.length > 0
    ? dbActions.pending.map((a) => ({
        id: a.id, type: a.type, action: a.action, target: a.target,
        priority: a.priority, metadata: a.metadata, source: a.source, created_at: a.created_at,
        owner: a.metadata?.owner, origen: a.metadata?.origen, deadline: a.metadata?.deadline,
        eta: a.metadata?.eta, linkedItem: a.metadata?.linkedItem,
      }))
    : actions;

  // ---- QW4: derive filter vocab from current action list ----
  const actionVocab = useMemo(() => {
    const owners = new Set();
    const origenes = new Set();
    const types = new Set();
    for (const a of displayActions) {
      if (a.owner) owners.add(a.owner);
      if (a.origen) origenes.add(a.origen);
      if (a.type) types.add(a.type);
    }
    return {
      owners: Array.from(owners).sort(),
      origenes: Array.from(origenes).sort(),
      types: Array.from(types).sort(),
    };
  }, [displayActions]);

  // ---- QW4: filter + sort pipeline ----
  const filteredActions = useMemo(() => {
    const me = "Franco";
    const priOrder = { alta: 0, media: 1, baja: 2 };
    const parseDeadline = (d) => {
      if (!d) return 9e15;
      const s = String(d).toLowerCase();
      if (s === "hoy" || s === "today") return Date.now();
      if (s === "mañana" || s === "manana" || s === "tomorrow") return Date.now() + 864e5;
      // Try "DD mes" (es) like "22 abr"
      const esMonths = { ene:0, feb:1, mar:2, abr:3, may:4, jun:5, jul:6, ago:7, sep:8, oct:9, nov:10, dic:11 };
      const m = s.match(/^(\d{1,2})\s+([a-z]{3})/);
      if (m) {
        const day = parseInt(m[1]);
        const mon = esMonths[m[2]];
        if (mon !== undefined) {
          const year = new Date().getFullYear();
          return new Date(year, mon, day).getTime();
        }
      }
      const t = Date.parse(d);
      return isNaN(t) ? 9e15 : t;
    };

    let rows = displayActions.filter((a) => {
      if (actionFilterPriority !== "all" && a.priority !== actionFilterPriority) return false;
      if (actionFilterType !== "all" && a.type !== actionFilterType) return false;
      if (actionFilterOwner === "mine") {
        if (!a.owner || a.owner.toLowerCase() !== me.toLowerCase()) return false;
      } else if (actionFilterOwner !== "all" && a.owner !== actionFilterOwner) return false;
      if (actionFilterOrigen !== "all" && a.origen !== actionFilterOrigen) return false;
      return true;
    });

    rows = [...rows].sort((a, b) => {
      if (actionSortBy === "priority") {
        const pa = priOrder[a.priority] ?? 3;
        const pb = priOrder[b.priority] ?? 3;
        if (pa !== pb) return pa - pb;
        return parseDeadline(a.deadline) - parseDeadline(b.deadline);
      }
      if (actionSortBy === "deadline") {
        return parseDeadline(a.deadline) - parseDeadline(b.deadline);
      }
      if (actionSortBy === "created") {
        const ta = a.created_at ? Date.parse(a.created_at) : 0;
        const tb = b.created_at ? Date.parse(b.created_at) : 0;
        return tb - ta;
      }
      return 0;
    });

    return rows;
  }, [displayActions, actionFilterPriority, actionFilterType, actionFilterOwner, actionFilterOrigen, actionSortBy]);

  const actionFiltersActive = actionFilterPriority !== "all"
    || actionFilterType !== "all"
    || actionFilterOwner !== "all"
    || actionFilterOrigen !== "all";

  const clearActionFilters = () => {
    setActionFilterPriority("all");
    setActionFilterType("all");
    setActionFilterOwner("all");
    setActionFilterOrigen("all");
  };

  // Live activity: detail column may contain either plain text (legacy) or a JSON blob
  // with rich shape {actor, verb, target, targetType, targetId, reason}.
  const displayActivity = activityFeedLive
    ? activityFeedLive.map(a => {
        const time = formatRelativeTime(a.time);
        let rich = null;
        if (a.detail && typeof a.detail === "string" && a.detail.trim().startsWith("{")) {
          try { rich = JSON.parse(a.detail); } catch { rich = null; }
        } else if (a.detail && typeof a.detail === "object") {
          rich = a.detail;
        }
        if (rich && (rich.actor || rich.verb)) {
          return {
            time, type: a.type,
            actor: rich.actor || "Sistema",
            verb: rich.verb || a.action,
            target: rich.target || "",
            targetType: rich.targetType || "system",
            targetId: rich.targetId,
            reason: rich.reason,
          };
        }
        return { time, action: a.action, type: a.type, detail: typeof a.detail === "string" ? a.detail : "" };
      })
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
      <header className="sticky top-0 z-50 bg-[#0F0D0A]/80 backdrop-blur-xl border-b border-[#2D2822]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AerolabWordmark className="h-[22px] w-auto text-[#F9F7F1]" />
            <div className="h-7 w-px bg-[#2D2822]" aria-hidden="true" />
            <div className="leading-tight">
              <h1 className="text-[15px] font-semibold tracking-tight text-[#F9F7F1]">SDR Command Center</h1>
              <p className="text-[11px] text-[#8A8276] tabular">Franco Rodriguez &middot; Aerolab</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-[#FF5005] animate-pulse" />
              Sync: {lastSyncTime}
              {apiStatus === "connected" && <span className="ml-2 text-[#7FA0DB]">&middot; DB live</span>}
            </div>
            <div className="text-xs text-zinc-600">446 deals SDR &middot; 15 campanas</div>
            <a href="/graph"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FF5005]/10 text-[#FF7A3C] border border-[#FF5005]/30 hover:bg-[#FF5005]/20 transition-colors">
              🧠 Ecosistema
            </a>
            {displayActions.length > 0 && (
              <button onClick={() => setActiveTab("actions")}
                className="relative px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FF5005]/15 text-[#FF7A3C] border border-[#FF5005]/40 hover:bg-[#FF5005]/25 transition-colors">
                {displayActions.length} pendientes
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tab Nav */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-[#14110D] rounded-xl p-1 border border-[#2D2822] overflow-x-auto">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-[#1A1713] text-zinc-100 shadow-sm shadow-black/20" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"}`}>
              {tab.label}
              {tab.id === "actions" && displayActions.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-[#FF5005]/20 text-[#FF7A3C]">{displayActions.length}</span>
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
              <StatCard label="Deals Totales SDR" value="446" sub={`${stats.active} activos · ${stats.won} ganados`} color="#FF5005" />
              <StatCard label="Campanas Activas" value="15" sub="Lost SQL + Nurture Stalled = prioridad" color="#203B83" />
              <StatCard label="CSAT Completado" value={`${Math.round((stats.csatDone / stats.csatTotal) * 100)}%`} sub={`${stats.csatDone} de ${stats.csatTotal} respondidos`} color="#FFB088" />
              <StatCard label="NPS Completado" value={`${Math.round((stats.npsDone / stats.npsTotal) * 100)}%`} sub={`${stats.npsDone} de ${stats.npsTotal} respondidos`} color="#7FA0DB" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-zinc-300 mb-4">Pipeline SDR — Todos los stages</h3>
                <PipelineBar stages={PIPELINE_STAGES_REAL} />
              </div>
              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
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
              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-zinc-300">Top Campanas por Volumen</h3>
                  <button onClick={() => setActiveTab("campaigns")} className="text-xs text-[#FF7A3C] hover:text-[#FF9A63]">Ver todas &rarr;</button>
                </div>
                <div className="space-y-3">
                  {CAMPAIGNS_DATA.slice(0, 5).map((c) => (
                    <div key={c.name} className="flex items-center justify-between py-2 border-b border-[#2D2822]/50 last:border-0">
                      <div>
                        <div className="text-sm text-zinc-200">{c.name}</div>
                        <div className="text-xs text-zinc-500">{c.total} deals</div>
                      </div>
                      <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF5005] rounded-full" style={{ width: `${(c.total / 141) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-zinc-300 mb-4">Actividad Reciente</h3>
                <ActivityFeed items={displayActivity} />
              </div>
            </div>

            {displayActions.length > 0 && (
              <div className="bg-[#1A1713] border border-[#FF5005]/25 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-zinc-300">
                    Acciones Pendientes
                    <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-[#FF5005]/20 text-[#FF7A3C]">{displayActions.length}</span>
                  </h3>
                  <button onClick={() => setActiveTab("actions")} className="text-xs text-[#FF7A3C] hover:text-[#FFB088]">Gestionar &rarr;</button>
                </div>
                <ActionQueue actions={displayActions.slice(0, 3)} onApprove={handleApprove} onReject={handleReject} />
              </div>
            )}
          </div>
        )}

        {/* ---- CAMPAIGNS ---- */}
        {activeTab === "campaigns" && (() => {
          // Use live Asana data if available, otherwise show loading
          const campaigns = asnCampaigns || [];

          const STATUS_CONFIG = {
            "In Progress": { color: "#FF5005", bg: "bg-[#FF5005]/15",   text: "text-[#FF7A3C]",  border: "border-[#FF5005]/30", dot: "#FF5005" },
            "Planning":    { color: "#FF7A3C", bg: "bg-[#FF7A3C]/15",   text: "text-[#FFB088]",  border: "border-[#FF7A3C]/25", dot: "#FF7A3C" },
            "On Hold":     { color: "#FFB088", bg: "bg-[#FFB088]/15",   text: "text-[#FFB088]",  border: "border-[#FFB088]/25", dot: "#FFB088" },
            "Not Started": { color: "#8A8276", bg: "bg-[#8A8276]/10",   text: "text-[#8A8276]",  border: "border-[#3A342C]",    dot: "#8A8276" },
            "Completed":   { color: "#7FA0DB", bg: "bg-[#7FA0DB]/15",   text: "text-[#A8C1E8]",  border: "border-[#7FA0DB]/25", dot: "#7FA0DB" },
            "Killed":      { color: "#5C5548", bg: "bg-[#5C5548]/15",   text: "text-[#5C5548]",  border: "border-[#3A342C]",    dot: "#5C5548" },
          };

          // Filter by status period
          const campaignInPeriod = (c, f) => {
            if (f === "total") return true;
            if (f === "30d") return c.status === "In Progress";
            if (f === "mes") return ["In Progress", "Planning"].includes(c.status);
            if (f === "3m") return !["Not Started", "Killed"].includes(c.status);
            return true;
          };

          const filtered = campaigns.filter(c => campaignInPeriod(c, emailsDateFilter));
          const periodLabel = { "30d": "Últ. 30 días", "mes": "Mes corriente", "3m": "Últ. 3 meses", "total": "Total" }[emailsDateFilter];

          const countByStatus = (status) => campaigns.filter(c => c.status === status).length;
          const filteredCountByStatus = (status) => filtered.filter(c => c.status === status).length;

          return (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-semibold">Campañas SDR</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Fuente: Asana · Proyecto SDR
                  {campaignsSyncedAt && ` · Sync: ${new Date(campaignsSyncedAt).toLocaleDateString("es-AR", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" })}`}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <DateFilterBar value={emailsDateFilter} onChange={setEmailsDateFilter} />
                <a href="https://app.asana.com/1/333378374105320/project/1213364902097317" target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#203B83]/20 text-[#7FA0DB] border border-[#203B83]/40 hover:bg-[#203B83]/30 transition-colors">
                  ↗ Abrir en Asana
                </a>
              </div>
            </div>

            {campaigns.length === 0 ? (
              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-12 text-center">
                <div className="text-2xl mb-2">🔄</div>
                <div className="text-zinc-300">Cargando campañas desde Asana...</div>
              </div>
            ) : (
              <>
                {/* Summary stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "En Progreso", status: "In Progress", cfg: STATUS_CONFIG["In Progress"] },
                    { label: "Planificando", status: "Planning",    cfg: STATUS_CONFIG["Planning"] },
                    { label: "En Pausa",    status: "On Hold",      cfg: STATUS_CONFIG["On Hold"] },
                    { label: "Completadas", status: "Completed",    cfg: STATUS_CONFIG["Completed"] },
                  ].map(({ label, status, cfg }) => (
                    <div key={status} className={`bg-[#1A1713] border rounded-xl p-4 text-center ${cfg.border}`}>
                      <div className={`text-3xl font-bold ${cfg.text}`}>
                        {emailsDateFilter === "total" ? countByStatus(status) : filteredCountByStatus(status)}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Campaign cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filtered.map((c) => {
                    const cfg = STATUS_CONFIG[c.status] || STATUS_CONFIG["Not Started"];
                    return (
                      <div key={c.id} className={`bg-[#1A1713] border border-[#2D2822] rounded-xl p-5 hover:border-zinc-600 transition-colors`}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-zinc-100">{c.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                                {c.status}
                              </span>
                              {c.frequency && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-zinc-800 text-zinc-500 border border-zinc-700">
                                  {c.frequency}
                                </span>
                              )}
                            </div>
                          </div>
                          {c.asana_url && (
                            <a href={c.asana_url} target="_blank" rel="noopener noreferrer"
                              className="text-zinc-600 hover:text-zinc-400 text-xs flex-shrink-0">↗</a>
                          )}
                        </div>

                        {c.goal && (
                          <div className="mb-2">
                            <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Goal · </span>
                            <span className="text-xs text-zinc-400">{c.goal}</span>
                          </div>
                        )}
                        {c.cta && (
                          <div className="mb-2 p-2 bg-[#FF5005]/5 border border-[#FF5005]/15 rounded-lg">
                            <span className="text-[10px] text-[#FF7A3C] uppercase tracking-wider">CTA · </span>
                            <span className="text-xs text-zinc-400 italic">"{c.cta.slice(0, 100)}{c.cta.length > 100 ? '…' : ''}"</span>
                          </div>
                        )}

                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#2D2822]">
                          {c.due_on && (
                            <span className="text-xs text-zinc-600">
                              📅 {new Date(c.due_on).toLocaleDateString("es-AR", { day:"2-digit", month:"short", year:"numeric" })}
                            </span>
                          )}
                          {c.assignee && (
                            <span className="text-xs text-zinc-600">👤 {c.assignee.split(" ")[0]}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filtered.length === 0 && (
                  <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-10 text-center">
                    <div className="text-zinc-500">Sin campañas en {periodLabel}</div>
                  </div>
                )}
              </>
            )}

            <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">Insight de Response Rate</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-[#7FA0DB]/5 border border-[#7FA0DB]/15 rounded-lg">
                  <div className="text-lg font-bold text-[#7FA0DB]">51%</div>
                  <div className="text-xs text-zinc-500">Sweet spot: 31-75 palabras</div>
                </div>
                <div className="p-3 bg-[#FFB088]/5 border border-[#FFB088]/15 rounded-lg">
                  <div className="text-lg font-bold text-[#FFB088]">30%+</div>
                  <div className="text-xs text-zinc-500">Rate promedio sector SDR</div>
                </div>
                <div className="p-3 bg-[#8A8276]/5 border border-[#8A8276]/15 rounded-lg">
                  <div className="text-lg font-bold text-[#C7BEB1]">-83%</div>
                  <div className="text-xs text-zinc-500">Drop en emails &gt;150 palabras</div>
                </div>
              </div>
            </div>
          </div>
          );
        })()}

        {/* ---- PIPELINE ---- */}
        {activeTab === "pipeline" && (() => {
          // Stages visible per filter — based on recency of activity
          const stageGroups = {
            "30d": ["active"],                        // 12 deals in active outreach RIGHT NOW
            "mes":  ["pre", "active"],                // 57 deals currently in pipeline
            "3m":   ["pre", "active", "won"],         // 80 deals with positive signals
            "total": ["pre", "active", "won", "lost"],// all 443
          };
          const visibleGroups = stageGroups[dealsDateFilter];
          const visibleStages = PIPELINE_STAGES_REAL.filter(s => visibleGroups.includes(s.group));
          const visibleTotal = visibleStages.reduce((s, st) => s + st.count, 0);

          const summaryByFilter = {
            "30d":  { active: 12, won: 0,  lost: 0,   note: "deals en outreach activo ahora mismo" },
            "mes":  { active: 12, won: 0,  lost: 0,   pre: 33, note: "deals en pipeline activo (pre-outreach + outreach)" },
            "3m":   { active: 12, won: 23, lost: 0,   pre: 33, note: "deals con señales positivas (sin contar lost)" },
            "total":{ active: 42, won: 23, lost: 381, note: "446 deals históricos en el pipeline SDR" },
          };
          const summary = summaryByFilter[dealsDateFilter];
          const periodLabel = { "30d": "Últ. 30 días", "mes": "Mes corriente", "3m": "Últ. 3 meses", "total": "Total histórico" }[dealsDateFilter];

          return (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-semibold">Pipeline SDR</h2>
                <p className="text-xs text-zinc-500 mt-0.5">{periodLabel} · {visibleTotal} deals · Pipeline 826132498</p>
              </div>
              <DateFilterBar value={dealsDateFilter} onChange={setDealsDateFilter} />
            </div>

            {/* Summary stat cards — change per filter */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#1A1713] border border-[#FF5005]/25 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#FF7A3C]">{visibleTotal}</div>
                <div className="text-xs text-zinc-500 mt-1">Deals en vista</div>
              </div>
              <div className="bg-[#1A1713] border border-[#7FA0DB]/22 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#7FA0DB]">{visibleStages.filter(s=>s.group==="active").reduce((s,st)=>s+st.count,0)}</div>
                <div className="text-xs text-zinc-500 mt-1">En outreach activo</div>
              </div>
              <div className="bg-[#1A1713] border border-[#FFB088]/22 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#FFB088]">{visibleStages.filter(s=>s.group==="won").reduce((s,st)=>s+st.count,0)}</div>
                <div className="text-xs text-zinc-500 mt-1">Won</div>
              </div>
              <div className="bg-[#1A1713] border border-[#8A8276]/25 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#C7BEB1]">{visibleStages.filter(s=>s.group==="lost").reduce((s,st)=>s+st.count,0)}</div>
                <div className="text-xs text-zinc-500 mt-1">Lost</div>
              </div>
            </div>

            <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-300 mb-1">Distribución por Stage</h3>
              <p className="text-xs text-zinc-600 mb-4">{summary.note}</p>
              <PipelineBar stages={visibleStages} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleStages.map((s) => (
                <div key={s.id} className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-4">
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
          );
        })()}

        {/* ---- WARM-UP ---- */}
        {activeTab === "warmup" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Warm-up LinkedIn</h2>
              <Badge text="Piloto Activo — 3 Leads" variant="purple" />
            </div>

            <div className="bg-[#203B83]/10 border border-[#203B83]/40 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#A8C1E8] mb-3">Estado del Piloto</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Batch 1 cargado: 3 leads tier A en etapa Identificar. Cada SDR tiene 1 lead asignado. Proximo paso: follow en LinkedIn. Aprobacion manual en cada etapa.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                {[
                  { stage: "Identificar", count: 3, color: "text-[#7FA0DB]" },
                  { stage: "Follow", count: 0, color: "text-[#FF7A3C]" },
                  { stage: "Engage", count: 0, color: "text-[#A8C1E8]" },
                  { stage: "Connect", count: 0, color: "text-[#7FA0DB]" },
                  { stage: "Ready", count: 0, color: "text-[#FFB088]" },
                  { stage: "Outreach", count: 0, color: "text-[#FF5005]" },
                ].map(({stage, count, color}) => (
                  <div key={stage} className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-3 text-center">
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
                <div key={lead.name} className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
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

            <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
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
              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">CSAT</div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-[#FFB088]">{stats.csatDone}</span>
                  <span className="text-sm text-zinc-500 mb-1">/ {stats.csatTotal} respondidos</span>
                </div>
                <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFB088] rounded-full" style={{ width: `${(stats.csatDone / stats.csatTotal) * 100}%` }} />
                </div>
                <div className="text-xs text-zinc-500 mt-2">{Math.round((stats.csatDone / stats.csatTotal) * 100)}% completado</div>
                <div className="mt-3 text-xs text-zinc-400">
                  <div>Won: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1224356377"] || 0} &middot; Followup: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1224356375"] || 0} &middot; Hold: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1244737059"] || 0}</div>
                  <div>Lost: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1244570040"] || 0} &middot; Research: {CAMPAIGNS_DATA.find(c => c.name === "CSAT")?.stages["1224356373"] || 0}</div>
                </div>
              </div>
              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">NPS</div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-[#7FA0DB]">{stats.npsDone}</span>
                  <span className="text-sm text-zinc-500 mb-1">/ {stats.npsTotal} respondidos</span>
                </div>
                <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#203B83] rounded-full" style={{ width: `${(stats.npsDone / stats.npsTotal) * 100}%` }} />
                </div>
                <div className="text-xs text-zinc-500 mt-2">{Math.round((stats.npsDone / stats.npsTotal) * 100)}% completado</div>
                <div className="mt-3 text-xs text-zinc-400">
                  <div>Followup: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1224356375"] || 0} &middot; Research: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1224356373"] || 0} &middot; Outreach: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1224356374"] || 0}</div>
                  <div>Hold: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1244737059"] || 0} &middot; Nurture: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1224356378"] || 0} &middot; Lost: {CAMPAIGNS_DATA.find(c => c.name === "NPS")?.stages["1244570040"] || 0}</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">Estrategia de Seguimiento</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-[#FF5005]/5 border border-[#FF5005]/15 rounded-lg">
                  <div className="text-sm font-medium text-[#FF7A3C] mb-1">Canal primario: Email</div>
                  <div className="text-xs text-zinc-500">Primer y segundo intento via email. Sweet spot 31-75 palabras.</div>
                </div>
                <div className="p-3 bg-[#7FA0DB]/5 border border-[#7FA0DB]/15 rounded-lg">
                  <div className="text-sm font-medium text-[#7FA0DB] mb-1">Canal alternativo: WhatsApp</div>
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
                  <button key={i} onClick={() => setPlanningView(ap.company)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${planningView === ap.company ? "bg-[#FF5005]/20 text-[#FFB088] border border-[#FF5005]/40" : "bg-zinc-800 text-zinc-400 border border-transparent hover:border-[#2D2822]"}`}>
                    {ap.company} <span className="ml-1 opacity-60">{ap.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* === SANTILLANA FULL DOSSIER === */}
            {planningView === "Santillana" && (
              <div className="space-y-5">
                {/* Company Header */}
                <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
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
                    <div className="bg-[#14110D] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-[#FF7A3C]">{SANTILLANA.deals.total}</div>
                      <div className="text-xs text-zinc-500">Deals totales</div>
                    </div>
                    <div className="bg-[#14110D] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-[#7FA0DB]">{SANTILLANA.deals.totalRevenue}</div>
                      <div className="text-xs text-zinc-500">Revenue total</div>
                    </div>
                    <div className="bg-[#14110D] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-[#7FA0DB]">{SANTILLANA.keyContacts.length}</div>
                      <div className="text-xs text-zinc-500">Contactos mapeados</div>
                    </div>
                  </div>
                </div>

                {/* Granola Context — What's happening NOW */}
                <div className="bg-gradient-to-r from-[#FFB088]/5 to-[#FF5005]/5 border border-[#FFB088]/25 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-[#FFB088] mb-3">Contexto Actual (Granola)</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs text-[#FFB088]/80 uppercase tracking-wider">Proyecto actual</span>
                      <p className="text-zinc-300 mt-1">{SANTILLANA.granolaNotes.currentProject}</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#FFB088]/80 uppercase tracking-wider">Nueva oportunidad</span>
                      <p className="text-zinc-300 mt-1">{SANTILLANA.granolaNotes.newOpportunity}</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#FFB088]/80 uppercase tracking-wider">Insight de relaciones</span>
                      <p className="text-zinc-300 mt-1">{SANTILLANA.granolaNotes.relationshipInsight}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#FFB088]/15">
                    <span className="text-xs text-[#FFB088]/80 uppercase tracking-wider">Next Steps (para jueves)</span>
                    <div className="mt-2 space-y-1">
                      {SANTILLANA.granolaNotes.nextSteps.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <span className="text-[#FFB088] mt-0.5 text-xs">→</span> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deals Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Active Deals */}
                  <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">Deals Activos</h3>
                    <div className="space-y-2">
                      {SANTILLANA.deals.active.map((d, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-[#2D2822]/50 last:border-0">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-zinc-200 truncate">{d.name}</div>
                            <div className="flex gap-2 mt-0.5">
                              <span className="text-xs text-zinc-500">{d.stage}</span>
                              <span className="text-xs text-zinc-600">&middot;</span>
                              <span className="text-xs text-zinc-500">{d.pipeline}</span>
                            </div>
                          </div>
                          <div className="text-right ml-3">
                            <div className="text-sm font-medium text-[#7FA0DB]">{d.amount}</div>
                            <div className="text-xs text-zinc-600">{d.modified}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Won Deals */}
                  <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">Deals Ganados</h3>
                    <div className="space-y-2">
                      {SANTILLANA.deals.won.map((d, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-[#2D2822]/50 last:border-0">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-zinc-200 truncate">{d.name}</div>
                            <div className="text-xs text-zinc-500">{d.closedAt}</div>
                          </div>
                          <span className="text-sm font-medium text-[#7FA0DB] ml-3">{d.amount}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#2D2822]">
                      <h4 className="text-xs text-[#C7BEB1]/80 mb-2">Deals Perdidos</h4>
                      {SANTILLANA.deals.lost.map((d, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5">
                          <span className="text-sm text-zinc-400 truncate">{d.name}</span>
                          <span className="text-sm text-[#C7BEB1]/70 ml-3">{d.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Contacts — Org Chart Style */}
                <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-zinc-300 mb-4">Contactos Clave ({SANTILLANA.keyContacts.length} mapeados)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {SANTILLANA.keyContacts.map((c, i) => (
                      <div key={i} className={`rounded-lg p-3 border ${c.tier === "hot" ? "bg-[#FF5005]/5 border-[#FF5005]/25" : c.tier === "warm" ? "bg-[#FFB088]/5 border-[#FFB088]/20" : "bg-[#1A1713]/60 border-[#2D2822]"}`}>
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
                <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-zinc-300 mb-3">Historial SDR</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-xs text-zinc-500 border-b border-[#2D2822]">
                        <th className="text-left py-2 font-medium">Deal</th>
                        <th className="text-left py-2 font-medium">Contacto</th>
                        <th className="text-left py-2 font-medium">Campana</th>
                        <th className="text-left py-2 font-medium">Estado</th>
                      </tr></thead>
                      <tbody>
                        {SANTILLANA.sdrDeals.map((d, i) => (
                          <tr key={i} className="border-b border-[#2D2822]/30">
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
                <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-zinc-300 mb-4">Reuniones Recientes (Granola)</h3>
                  <div className="space-y-3">
                    {MEETINGS.map((m) => (
                      <div key={m.id} className="flex items-center justify-between py-2 border-b border-[#2D2822]/50 last:border-0">
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
              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-8 text-center">
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

            <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
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
                      <div key={d.name} className="flex items-center justify-between py-2 border-b border-[#2D2822]/50">
                        <span className="text-sm text-zinc-300">{d.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#7FA0DB]">{d.amount}</span>
                          <Badge text={d.stage} variant="green" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xs text-zinc-500 uppercase tracking-wider mt-6 mb-3">Oportunidades Detectadas</h4>
                  <div className="space-y-2">
                    {ECOSYSTEM.opportunities.map((o) => (
                      <div key={o.name} className="flex items-center justify-between py-2 border-b border-[#2D2822]/50">
                        <span className="text-sm text-zinc-300">{o.name}</span>
                        <span className="text-xs text-zinc-500">{o.champion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2D2822]">
                <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Equipo Aerolab Conectado</h4>
                <div className="flex flex-wrap gap-2">
                  {ECOSYSTEM.aeroTeam.map((t) => (
                    <span key={t.name} className="px-3 py-1.5 rounded-lg bg-[#FF5005]/10 text-xs text-[#FF7A3C] border border-[#FF5005]/25">
                      {t.name} &middot; {t.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#FF5005]/5 border border-[#FF5005]/25 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#FFB088] mb-2">Roadmap del Grafo</h3>
              <p className="text-sm text-zinc-400">Actualmente 1 org mapeada (Kauffman Fellows). Proximo paso: agregar Santillana (pre Account Planning del jueves) y REMAX. El grafo se expande con cada cuenta que se mapea.</p>
            </div>
          </div>
        )}

        {/* ---- ACTIONS ---- */}
        {activeTab === "actions" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Cola de Acciones</h2>
                <p className="text-xs text-[#8A8276] mt-0.5 tabular">
                  {filteredActions.length === displayActions.length
                    ? `${displayActions.length} pendientes`
                    : `${filteredActions.length} de ${displayActions.length} pendientes`}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge text={apiStatus === "connected" ? "DB conectada" : "Modo local"} variant={apiStatus === "connected" ? "green" : "gray"} />
                <Badge text={`${displayActions.length} totales`} variant={displayActions.length > 0 ? "blue" : "green"} />
              </div>
            </div>

            {/* Filter bar (QW4) */}
            {displayActions.length > 0 && (
              <div className="bg-[#14110D] border border-[#2D2822] rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wider text-[#5C5548] font-semibold mr-1">Prioridad</span>
                  <FilterChip active={actionFilterPriority === "all"} onClick={() => setActionFilterPriority("all")} color="#C7BEB1">Todas</FilterChip>
                  <FilterChip active={actionFilterPriority === "alta"} onClick={() => setActionFilterPriority("alta")} color="#FF5005">Alta</FilterChip>
                  <FilterChip active={actionFilterPriority === "media"} onClick={() => setActionFilterPriority("media")} color="#FFB088">Media</FilterChip>
                  <FilterChip active={actionFilterPriority === "baja"} onClick={() => setActionFilterPriority("baja")} color="#8A8276">Baja</FilterChip>

                  <span className="w-px h-5 bg-[#2D2822] mx-1" aria-hidden="true" />

                  <span className="text-[10px] uppercase tracking-wider text-[#5C5548] font-semibold mr-1">Scope</span>
                  <FilterChip active={actionFilterOwner === "all"} onClick={() => setActionFilterOwner("all")} color="#C7BEB1">Todo el equipo</FilterChip>
                  <FilterChip active={actionFilterOwner === "mine"} onClick={() => setActionFilterOwner("mine")} color="#FF5005">
                    <ActorAvatar name="Franco" size={12} /> Mías
                  </FilterChip>

                  <span className="w-px h-5 bg-[#2D2822] mx-1" aria-hidden="true" />

                  <span className="text-[10px] uppercase tracking-wider text-[#5C5548] font-semibold mr-1">Ordenar</span>
                  <FilterChip active={actionSortBy === "priority"} onClick={() => setActionSortBy("priority")} color="#FF7A3C">Prioridad</FilterChip>
                  <FilterChip active={actionSortBy === "deadline"} onClick={() => setActionSortBy("deadline")} color="#FF7A3C">Deadline</FilterChip>
                  <FilterChip active={actionSortBy === "created"} onClick={() => setActionSortBy("created")} color="#FF7A3C">Más reciente</FilterChip>

                  {actionFiltersActive && (
                    <>
                      <span className="flex-1" />
                      <button onClick={clearActionFilters} className="text-[11px] text-[#FF7A3C] hover:text-[#FF5005] underline underline-offset-2 ml-auto">
                        Limpiar filtros
                      </button>
                    </>
                  )}
                </div>

                {(actionVocab.types.length > 1 || actionVocab.owners.length > 1 || actionVocab.origenes.length > 1) && (
                  <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#2D2822]">
                    {actionVocab.types.length > 1 && (
                      <>
                        <span className="text-[10px] uppercase tracking-wider text-[#5C5548] font-semibold mr-1">Tipo</span>
                        <FilterChip active={actionFilterType === "all"} onClick={() => setActionFilterType("all")} color="#C7BEB1">Todos</FilterChip>
                        {actionVocab.types.map((t) => (
                          <FilterChip key={t} active={actionFilterType === t} onClick={() => setActionFilterType(t)} color="#7FA0DB">
                            <TypeGlyph type={t} className="w-3 h-3" /> {TYPE_LABELS[t] || t}
                          </FilterChip>
                        ))}
                        <span className="w-px h-5 bg-[#2D2822] mx-1" aria-hidden="true" />
                      </>
                    )}
                    {actionVocab.owners.length > 1 && actionFilterOwner !== "mine" && (
                      <>
                        <span className="text-[10px] uppercase tracking-wider text-[#5C5548] font-semibold mr-1">Owner</span>
                        {actionVocab.owners.map((o) => (
                          <FilterChip key={o} active={actionFilterOwner === o} onClick={() => setActionFilterOwner(actionFilterOwner === o ? "all" : o)} color={OWNER_TAG_COLOR[o] || "#C7BEB1"}>
                            <ActorAvatar name={o} size={12} /> {o}
                          </FilterChip>
                        ))}
                        <span className="w-px h-5 bg-[#2D2822] mx-1" aria-hidden="true" />
                      </>
                    )}
                    {actionVocab.origenes.length > 1 && (
                      <>
                        <span className="text-[10px] uppercase tracking-wider text-[#5C5548] font-semibold mr-1">Origen</span>
                        <FilterChip active={actionFilterOrigen === "all"} onClick={() => setActionFilterOrigen("all")} color="#C7BEB1">Todos</FilterChip>
                        {actionVocab.origenes.map((o) => (
                          <FilterChip key={o} active={actionFilterOrigen === o} onClick={() => setActionFilterOrigen(actionFilterOrigen === o ? "all" : o)} color="#A8C1E8">{o}</FilterChip>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {filteredActions.length > 0 ? (
              <ActionQueue actions={filteredActions} onApprove={handleApprove} onReject={handleReject} onHold={handleHold} />
            ) : displayActions.length > 0 ? (
              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-10 text-center">
                <div className="text-sm text-[#C7BEB1] font-medium">Ninguna acción matchea los filtros</div>
                <button onClick={clearActionFilters} className="mt-3 inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-[#FF5005]/15 text-[#FF7A3C] border border-[#FF5005]/30 hover:bg-[#FF5005]/25">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-12 text-center">
                <div className="text-2xl mb-2">&#10003;</div>
                <div className="text-zinc-300 font-medium">Todo al dia</div>
                <div className="text-sm text-zinc-500 mt-1">No hay acciones pendientes de aprobacion</div>
              </div>
            )}

            {/* Approved actions — waiting execution */}
            {dbActions?.approved?.length > 0 && (
              <div className="bg-[#FF5005]/5 border border-[#FF5005]/25 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-[#FF7A3C] mb-3">Aprobadas — Esperando ejecucion ({dbActions.approved.length})</h3>
                <div className="space-y-2">
                  {dbActions.approved.map((a) => (
                    <div key={a.id} className="flex items-start justify-between py-2 border-b border-[#FF5005]/12 last:border-0">
                      <div className="flex-1">
                        <div className="text-sm text-zinc-200">{a.action}</div>
                        <div className="text-xs text-zinc-500">{a.target}</div>
                        {a.instructions && (
                          <div className="mt-1.5 px-2 py-1 bg-[#14110D] rounded text-xs text-[#FFB088] border-l-2 border-[#FF5005]/45">
                            {a.instructions}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <Badge text="aprobada" variant="green" />
                        <button onClick={() => handleHold(a.id, "Movida desde aprobadas")} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FFB088]/10 text-[#FFB088] border border-[#FFB088]/25 hover:bg-[#FFB088]/20 transition-colors">
                          Hold
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-zinc-600">El proximo scheduled task va a ejecutar estas acciones segun tus instrucciones.</div>
              </div>
            )}

            {/* Hold actions — parked for later */}
            {dbActions?.hold?.length > 0 && (
              <div className="bg-[#FFB088]/5 border border-[#FFB088]/25 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-[#FFB088] mb-3">En Hold ({dbActions.hold.length})</h3>
                <div className="space-y-2">
                  {dbActions.hold.map((a) => (
                    <div key={a.id} className="flex items-start justify-between py-2 border-b border-[#FFB088]/12 last:border-0">
                      <div className="flex-1">
                        <div className="text-sm text-zinc-200">{a.action}</div>
                        <div className="text-xs text-zinc-500">{a.target}</div>
                        {a.instructions && (
                          <div className="mt-1.5 px-2 py-1 bg-[#14110D] rounded text-xs text-[#FFB088] border-l-2 border-[#FFB088]/50">
                            {a.instructions}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <Badge text="hold" variant="yellow" />
                        <button onClick={() => handleUnhold(a.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FF5005]/10 text-[#FF7A3C] border border-[#FF5005]/25 hover:bg-[#FF5005]/20 transition-colors">
                          Reactivar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-zinc-600">Estas acciones estan pausadas. Usa Reactivar para moverlas a pendientes.</div>
              </div>
            )}

            {/* Completed actions from DB */}
            {dbActions?.completed?.length > 0 && (
              <div className="bg-[#1A1713] border border-[#2D2822] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-zinc-300 mb-3">Completadas Recientes</h3>
                <div className="space-y-2">
                  {dbActions.completed.slice(0, 10).map((a) => (
                    <div key={a.id} className="flex items-start justify-between py-2 border-b border-[#2D2822]/30 last:border-0">
                      <div className="flex-1">
                        <div className="text-sm text-zinc-400 line-through">{a.action}</div>
                        <div className="text-xs text-zinc-600">{a.target}</div>
                        {a.instructions && <div className="mt-1 text-xs text-zinc-600 italic">Instrucciones: {a.instructions}</div>}
                        {a.execution_log && <div className="mt-1 text-xs text-[#7FA0DB]/60">Resultado: {typeof a.execution_log === 'string' ? a.execution_log : JSON.stringify(a.execution_log)}</div>}
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

      <footer className="border-t border-[#2D2822] mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-zinc-600">SDR Command Center v1.0 &middot; Powered by Claude + Aerolab</span>
          <span className="text-xs text-zinc-600">Data: HubSpot (446 deals) &middot; Granola (4 meetings) &middot; Ecosystem (32 people)</span>
        </div>
      </footer>
    </div>
  );
}
