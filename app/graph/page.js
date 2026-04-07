"use client";
import { useEffect, useState } from "react";

export default function EcosystemGraph() {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/graph")
      .then(r => r.json())
      .then(data => { setGraphData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const tierColor = { hot: "#ff6b6b", warm: "#f97316", cold: "#4a9eff", lost: "#666" };
  const typeColor = { client: "#34c759", prospect: "#f97316", partner: "#4a9eff" };

  const allPeople = graphData ? [...(graphData.people || []), ...(graphData.aeroTeam || []).map(m => ({ ...m, org: "aerolab", group: "aerolab", tier: "hot" }))] : [];
  const filtered = allPeople.filter(p => {
    if (filter !== "all" && p.group !== filter) return false;
    if (search && !p.name?.toLowerCase().includes(search.toLowerCase()) && !p.org?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const orgMap = {};
  (graphData?.orgs || []).forEach(o => { orgMap[o.id] = o; });

  const palette = ['#ff6b6b','#ffa500','#34c759','#4a9eff','#e8c547','#ff85c8','#00d4aa','#c084fc','#f97316','#06b6d4','#a3e635','#fb7185','#818cf8'];

  if (loading) return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "system-ui" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🧠</div>
        <div style={{ fontSize: 18, color: "#888" }}>Cargando super neurona...</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", color: "#fff" }}>
      {/* Header */}
      <div style={{ background: "#111", borderBottom: "1px solid #222", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ color: "#666", textDecoration: "none", fontSize: 14 }}>← Dashboard</a>
        <div style={{ width: 1, height: 20, background: "#333" }} />
        <span style={{ fontSize: 20 }}>🧠</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Aerolab Ecosystem Graph</div>
          <div style={{ fontSize: 12, color: "#666" }}>
            {graphData?.orgs?.length || 0} orgs · {allPeople.length} personas · {graphData?.edges?.length || 0} conexiones
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <input
            placeholder="Buscar persona u org..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, width: 220, outline: "none" }}
          />
          {["all","staff","board","aerolab"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "#fff" : "#1a1a1a",
              color: filter === f ? "#000" : "#888",
              border: "1px solid #333", borderRadius: 8,
              padding: "8px 14px", fontSize: 12, cursor: "pointer", fontWeight: filter === f ? 700 : 400
            }}>
              {f === "all" ? "Todos" : f === "staff" ? "Staff" : f === "board" ? "Board" : "Aerolab"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 65px)" }}>
        {/* Left sidebar: orgs */}
        <div style={{ width: 260, background: "#111", borderRight: "1px solid #222", overflowY: "auto", padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Organizaciones</div>

          {/* Aerolab hub */}
          <div style={{ background: "#1a1a1a", borderRadius: 10, padding: 12, marginBottom: 8, border: "1px solid #34c759" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#34c759" }} />
              <div style={{ fontWeight: 700, fontSize: 13 }}>Aerolab</div>
              <div style={{ marginLeft: "auto", background: "rgba(52,199,89,0.15)", color: "#34c759", borderRadius: 4, padding: "2px 6px", fontSize: 10, fontWeight: 700 }}>HUB</div>
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>{graphData?.aeroTeam?.length || 0} team members</div>
          </div>

          {(graphData?.orgs || []).map((org, i) => {
            const color = org.color || palette[i % palette.length];
            const orgPeople = (graphData?.people || []).filter(p => p.org === org.id);
            const aeroEdges = (graphData?.edges || []).filter(e => e.type === "aerolab" && orgPeople.some(p => p.id === e.to || p.id === e.from));
            return (
              <div key={org.id} style={{ background: "#1a1a1a", borderRadius: 10, padding: 12, marginBottom: 8, border: "1px solid #222", cursor: "pointer" }}
                onClick={() => setSelectedNode({ type: "org", ...org, people: orgPeople, edgeCount: aeroEdges.length })}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <div style={{ fontWeight: 600, fontSize: 13, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{org.name}</div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#555" }}>{orgPeople.length} personas · {aeroEdges.length} links Aerolab</span>
                  {org.dealValue > 0 && <span style={{ marginLeft: "auto", background: "rgba(52,199,89,0.1)", color: "#34c759", borderRadius: 4, padding: "1px 5px", fontSize: 10 }}>${(org.dealValue/1000).toFixed(0)}K</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main: people grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {filtered.map(person => {
              const org = person.org === "aerolab" ? { name: "Aerolab", color: "#34c759" } : (orgMap[person.org] || { name: person.org, color: "#666" });
              const color = tierColor[person.tier] || "#666";
              const personEdges = (graphData?.edges || []).filter(e => e.from === person.id || e.to === person.id);
              return (
                <div key={person.id}
                  onClick={() => setSelectedNode({ type: "person", ...person, orgName: org.name, orgColor: org.color, edges: personEdges })}
                  style={{ background: "#111", border: `1px solid #222`, borderRadius: 10, padding: 14, cursor: "pointer", transition: "border-color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#222"}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${color}22`, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color, flexShrink: 0 }}>
                      {(person.name || "?")[0]}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{person.name}</div>
                      <div style={{ fontSize: 11, color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.title}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ background: `${org.color || "#666"}22`, color: org.color || "#666", borderRadius: 4, padding: "2px 6px", fontSize: 10, fontWeight: 600 }}>{org.name}</span>
                    {person.tier && person.tier !== "lost" && (
                      <span style={{ background: `${color}22`, color, borderRadius: 4, padding: "2px 6px", fontSize: 10 }}>{person.tier}</span>
                    )}
                    {personEdges.length > 0 && (
                      <span style={{ background: "rgba(255,255,255,0.05)", color: "#888", borderRadius: 4, padding: "2px 6px", fontSize: 10 }}>{personEdges.length} links</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel: selected node detail */}
        {selectedNode && (
          <div style={{ width: 320, background: "#111", borderLeft: "1px solid #222", padding: 20, overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{selectedNode.type === "org" ? "Organización" : "Persona"}</div>
              <button onClick={() => setSelectedNode(null)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 18 }}>×</button>
            </div>

            {selectedNode.type === "org" ? (
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{selectedNode.name}</div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>{selectedNode.description}</div>
                {selectedNode.dealValue > 0 && <div style={{ background: "rgba(52,199,89,0.1)", color: "#34c759", borderRadius: 8, padding: "8px 12px", fontSize: 13, marginBottom: 12 }}>💰 ${(selectedNode.dealValue/1000).toFixed(0)}K deal value</div>}
                <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Equipo ({selectedNode.people?.length})</div>
                {selectedNode.people?.map(p => (
                  <div key={p.id} onClick={() => setSelectedNode({ type: "person", ...p, orgName: selectedNode.name })}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #1a1a1a", cursor: "pointer" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${tierColor[p.tier] || "#666"}22`, border: `1px solid ${tierColor[p.tier] || "#666"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: tierColor[p.tier] || "#666" }}>{(p.name||"?")[0]}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div><div style={{ fontSize: 11, color: "#555" }}>{p.title}</div></div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${tierColor[selectedNode.tier] || "#666"}22`, border: `2px solid ${tierColor[selectedNode.tier] || "#666"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: tierColor[selectedNode.tier] || "#666" }}>{(selectedNode.name||"?")[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{selectedNode.name}</div>
                    <div style={{ fontSize: 13, color: "#888" }}>{selectedNode.title}</div>
                    <div style={{ fontSize: 12, color: selectedNode.orgColor || "#666", marginTop: 2 }}>{selectedNode.orgName}</div>
                  </div>
                </div>
                {selectedNode.roles && <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#aaa", marginBottom: 12 }}>🎭 {selectedNode.roles}</div>}
                {selectedNode.email && <div style={{ fontSize: 12, color: "#4a9eff", marginBottom: 8 }}>✉️ {selectedNode.email}</div>}
                {selectedNode.career && <div style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>{selectedNode.career}</div>}
                {selectedNode.score && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>Relationship score</div>
                    <div style={{ background: "#1a1a1a", borderRadius: 8, height: 6, overflow: "hidden" }}>
                      <div style={{ width: `${selectedNode.score}%`, height: "100%", background: tierColor[selectedNode.tier] || "#666", borderRadius: 8 }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>{selectedNode.score}/100</div>
                  </div>
                )}
                {selectedNode.edges?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Conexiones ({selectedNode.edges.length})</div>
                    {selectedNode.edges.map((e, i) => (
                      <div key={i} style={{ fontSize: 12, color: "#666", padding: "4px 0", borderBottom: "1px solid #1a1a1a" }}>
                        {e.type === "aerolab" ? "🔗 Aerolab" : e.type === "hierarchy" ? "📊 Reporta" : "🌐 Cross-org"} · strength {e.strength}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
