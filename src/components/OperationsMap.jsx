import { useState, Fragment } from 'react';
import { useLang } from '../LangContext.jsx';
import { mapData } from '../data/mapData.js';

export default function OperationsMap() {
  const { lang } = useLang();
  const d = mapData[lang];
  const [level, setLevel] = useState(1);
  const [activeBpmn, setActiveBpmn] = useState(null);

  const crumb = () => {
    const parts = [{ label: d.breadcrumbRoot, lvl: 1 }];
    if (level >= 2) parts.push({ label: d.l2.title, lvl: 2 });
    if (level >= 3) parts.push({ label: d.l3.title, lvl: 3 });
    return parts;
  };

  return (
    <div className="opmap-panel" aria-label={d.title}>
      <div className="opmap-header">
        <span className="opmap-dot" />
        <span className="opmap-dot" />
        <span className="opmap-dot" />
        <span className="opmap-title">{d.url}</span>
        <span className="opmap-pill">
          <span className="opmap-pill-dot" />
          {d.footer.live}
        </span>
      </div>

      <div className="opmap-bar">
        <div className="opmap-crumb">
          {crumb().map((c, i, arr) => (
            <Fragment key={i}>
              {i > 0 && <span className="sep">›</span>}
              {i === arr.length - 1 ? (
                <span className="cur">{c.label}</span>
              ) : (
                <button
                  type="button"
                  className="c"
                  onClick={() => { setLevel(c.lvl); setActiveBpmn(null); }}
                >
                  {c.label}
                </button>
              )}
            </Fragment>
          ))}
        </div>
        {level > 1 && (
          <button
            type="button"
            className="opmap-back"
            onClick={() => { setLevel(Math.max(1, level - 1)); setActiveBpmn(null); }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {d.back}
          </button>
        )}
      </div>

      <div className="opmap-stage">
        {level === 1 && <Level1 d={d} onPick={(n) => { if (n.drilldown) setLevel(2); }} />}
        {level === 2 && <Level2 d={d} onPick={(s) => { if (s.drilldown) setLevel(3); }} />}
        {level === 3 && (
          <Level3
            d={d}
            activeBpmn={activeBpmn}
            setActiveBpmn={setActiveBpmn}
          />
        )}
      </div>

      <div className="opmap-footnote">
        <span>
          {d.l1.kpis[0].k} {d.l1.kpis[0].v.toLowerCase()} · {d.l1.kpis[2].k} {d.l1.kpis[2].v.toLowerCase()} · {d.footer.updated}
        </span>
        <span className="opmap-pulse">
          <span className="opmap-pulse-dot" />
          {d.footer.pulse}
        </span>
      </div>

      <style>{css}</style>
    </div>
  );
}

function Level1({ d, onPick }) {
  return (
    <div className="opmap-l1 opmap-fade">
      <div className="opmap-graph">
        {d.l1.clusters.map((c) => (
          <div key={c.id} className={`opmap-cluster k-${c.kind}`}>
            <div className="opmap-cluster-h">{c.label}</div>
            <div className="opmap-nodes">
              {c.nodes.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`opmap-node ${n.drilldown ? 'on' : ''}`}
                  onClick={() => onPick(n)}
                >
                  <span className="opmap-node-label">{n.label}</span>
                  <span className="opmap-node-desc">{n.desc}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="opmap-tip">{d.l1.tip}</div>
    </div>
  );
}

function Level2({ d, onPick }) {
  return (
    <div className="opmap-l2 opmap-fade">
      <div className="opmap-h2-title">{d.l2.title}</div>
      <div className="opmap-h2-sub">{d.l2.description}</div>
      <div className="opmap-steps-scroll">
        <div className="opmap-steps">
          {d.l2.steps.map((s, i) => (
            <Fragment key={s.id}>
              <button
                type="button"
                className={`opmap-step ${s.drilldown ? 'on' : ''}`}
                onClick={() => onPick(s)}
              >
                {s.flag && <span className="opmap-step-flag">{s.flag}</span>}
                <span className="opmap-step-n">{`0${i + 1}`}</span>
                <span className="opmap-step-label">{s.label}</span>
                <span className="opmap-step-desc">{s.desc}</span>
              </button>
              {i < d.l2.steps.length - 1 && <span className="opmap-step-arrow">→</span>}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="opmap-tip">{d.l2.tip}</div>
    </div>
  );
}

function Level3({ d, activeBpmn, setActiveBpmn }) {
  const L = d.l3;
  return (
    <div className="opmap-l3 opmap-fade">
      <div className="opmap-l3-left">
        <div className="opmap-l3-block">
          <h4>{L.labels.objective}</h4>
          <p>{L.objective}</p>
        </div>
        <div className="opmap-l3-block warn">
          <h4>{L.labels.pains}</h4>
          <ul>
            {L.pains.slice(0, 3).map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div className="opmap-l3-block">
          <h4>{L.labels.tools}</h4>
          <div className="opmap-tools">
            {L.tools.map((t) => <span key={t} className="opmap-tool">{t}</span>)}
          </div>
        </div>
      </div>
      <div className="opmap-l3-right">
        <Bpmn
          flow={L.flow}
          edges={L.edges}
          activeId={activeBpmn}
          onPick={(id) => setActiveBpmn(activeBpmn === id ? null : id)}
        />
      </div>
    </div>
  );
}

function Bpmn({ flow, edges, activeId, onPick }) {
  const GX = 110, GY = 82, PAD = 30;
  const maxX = Math.max(...flow.map(n => n.x));
  const maxY = Math.max(...flow.map(n => n.y));
  const W = PAD * 2 + maxX * GX + 120;
  const H = PAD * 2 + maxY * GY + 40;
  const pos = (n) => ({ cx: PAD + n.x * GX, cy: PAD + n.y * GY });
  const byId = Object.fromEntries(flow.map(n => [n.id, n]));

  const path = new Set();
  if (activeId) {
    const q = [activeId]; const seen = new Set();
    while (q.length) {
      const id = q.shift();
      if (seen.has(id)) continue;
      seen.add(id); path.add(id);
      edges.filter(e => e.from === id).forEach(e => q.push(e.to));
    }
  }
  const eOn = (e) => activeId && path.has(e.from) && path.has(e.to);

  return (
    <svg className="opmap-bpmn" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <marker id="opmap-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#B5B8BF" />
        </marker>
        <marker id="opmap-arr-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#0171E1" />
        </marker>
      </defs>
      {edges.map((e, i) => {
        const a = pos(byId[e.from]), b = pos(byId[e.to]);
        const mx = (a.cx + b.cx) / 2;
        const dPath = `M ${a.cx} ${a.cy} L ${mx} ${a.cy} L ${mx} ${b.cy} L ${b.cx} ${b.cy}`;
        const on = eOn(e);
        return (
          <g key={i}>
            <path
              d={dPath}
              className={`opmap-edge ${on ? 'on' : ''}`}
              markerEnd={on ? 'url(#opmap-arr-on)' : 'url(#opmap-arr)'}
            />
            {e.label && <text x={mx + 4} y={(a.cy + b.cy) / 2} className="opmap-edge-l">{e.label}</text>}
          </g>
        );
      })}
      {flow.map((n) => {
        const p = pos(n);
        const on = activeId === n.id || path.has(n.id);
        if (n.kind === 'start' || n.kind === 'end') {
          return (
            <g key={n.id} className={`opmap-bn ${n.kind} ${on ? 'on' : ''}`} onClick={() => onPick(n.id)}>
              <circle cx={p.cx} cy={p.cy} r={n.kind === 'end' ? 13 : 12} />
              <text x={p.cx} y={p.cy + 30} textAnchor="middle">{n.label}</text>
            </g>
          );
        }
        if (n.kind === 'xor') {
          const s = 18;
          return (
            <g key={n.id} className={`opmap-bn xor ${on ? 'on' : ''}`} onClick={() => onPick(n.id)}>
              <polygon points={`${p.cx},${p.cy - s} ${p.cx + s},${p.cy} ${p.cx},${p.cy + s} ${p.cx - s},${p.cy}`} />
              <text x={p.cx} y={p.cy + 3} textAnchor="middle">×</text>
              <text x={p.cx} y={p.cy + s + 12} textAnchor="middle">{n.label}</text>
            </g>
          );
        }
        return (
          <g key={n.id} className={`opmap-bn action ${on ? 'on' : ''}`} onClick={() => onPick(n.id)}>
            <rect x={p.cx - 46} y={p.cy - 16} width="92" height="32" rx="6" />
            <text x={p.cx} y={p.cy + 4} textAnchor="middle">{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

const css = `
.opmap-panel {
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid var(--border-1);
  border-radius: var(--r-panel);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  font-family: var(--font-sans);
}

/* Header — browser chrome */
.opmap-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--gray-50);
  border-bottom: 1px solid var(--border-1);
}
.opmap-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gray-300);
  display: inline-block;
}
.opmap-dot:nth-child(1) { background: #ff5f57; }
.opmap-dot:nth-child(2) { background: #febc2e; }
.opmap-dot:nth-child(3) { background: #28c840; }
.opmap-title {
  margin-left: 12px;
  font-size: 12px;
  color: var(--fg-2);
  font-weight: 500;
  letter-spacing: 0.01em;
}
.opmap-pill {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #047857;
  background: #d1fae5;
  border-radius: var(--r-pill);
}
.opmap-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

/* Breadcrumb bar */
.opmap-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-1);
  background: #fff;
}
.opmap-crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  flex-wrap: wrap;
}
.opmap-crumb .sep { color: var(--fg-3); }
.opmap-crumb .cur {
  color: var(--fg-1);
  font-weight: 600;
}
.opmap-crumb .c {
  background: none;
  border: 0;
  padding: 0;
  color: var(--brand-blue);
  font: inherit;
  cursor: pointer;
}
.opmap-crumb .c:hover { text-decoration: underline; }
.opmap-back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  font-size: 12px;
  color: var(--fg-2);
  background: var(--gray-100);
  border: 1px solid var(--border-1);
  border-radius: 8px;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-std);
}
.opmap-back:hover {
  background: var(--gray-200);
  color: var(--fg-1);
}

/* Stage */
.opmap-stage {
  padding: 28px 24px;
  background: var(--gray-50);
  min-height: 360px;
}
@keyframes opmapFade {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.opmap-fade { animation: opmapFade 280ms var(--ease-out); }

/* LEVEL 1 — 3 clusters */
.opmap-graph {
  display: grid;
  grid-template-columns: 1fr 1fr 1.4fr;
  gap: 16px;
  align-items: start;
}
.opmap-cluster {
  background: #fff;
  border: 1px solid var(--border-1);
  border-radius: 14px;
  padding: 14px 14px 16px;
  box-shadow: var(--shadow-xs);
  position: relative;
}
.opmap-cluster::before {
  content: '';
  position: absolute;
  top: 0; left: 14px; right: 14px;
  height: 3px;
  border-radius: 0 0 3px 3px;
}
.k-support::before { background: #10b981; }
.k-mgmt::before    { background: #f59e0b; }
.k-core::before    { background: var(--brand-blue); }

.opmap-cluster-h {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-2);
  margin: 4px 0 12px;
}
.k-support .opmap-cluster-h { color: #047857; }
.k-mgmt .opmap-cluster-h    { color: #b45309; }
.k-core .opmap-cluster-h    { color: var(--blue-700); }

.opmap-nodes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.opmap-node {
  text-align: left;
  padding: 10px 12px;
  border: 1px solid var(--border-1);
  border-radius: 10px;
  background: var(--gray-50);
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: transform var(--dur-fast) var(--ease-std), box-shadow var(--dur-fast) var(--ease-std);
}
.opmap-node-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--fg-1);
}
.opmap-node-desc {
  font-size: 11px;
  color: var(--fg-3);
}
.opmap-node.on {
  cursor: pointer;
  border-color: var(--brand-blue);
  background: var(--blue-50);
  box-shadow: 0 0 0 3px rgba(1, 113, 225, 0.12), var(--shadow-xs);
  position: relative;
}
.opmap-node.on::after {
  content: '';
  position: absolute;
  top: 10px; right: 10px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--brand-blue);
  box-shadow: 0 0 0 0 rgba(1, 113, 225, 0.5);
  animation: opmapPulse 1.6s ease-out infinite;
}
.opmap-node.on:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px rgba(1, 113, 225, 0.18), var(--shadow-sm);
}
@keyframes opmapPulse {
  0%   { box-shadow: 0 0 0 0 rgba(1, 113, 225, 0.45); }
  70%  { box-shadow: 0 0 0 10px rgba(1, 113, 225, 0); }
  100% { box-shadow: 0 0 0 0 rgba(1, 113, 225, 0); }
}

.opmap-tip {
  margin-top: 16px;
  font-size: 12px;
  color: var(--fg-3);
  text-align: center;
  font-style: italic;
}

/* LEVEL 2 — horizontal steps */
.opmap-h2-title {
  font-family: var(--font-serif);
  font-size: 22px;
  color: var(--fg-1);
  margin-bottom: 4px;
}
.opmap-h2-sub {
  font-size: 13px;
  color: var(--fg-2);
  margin-bottom: 20px;
}
.opmap-steps-scroll {
  position: relative;
  margin: 0 -8px 16px;
}
.opmap-steps-scroll::after {
  content: '';
  position: absolute;
  top: 18px; bottom: 18px; right: 0;
  width: 32px;
  background: linear-gradient(to right, rgba(250,250,250,0), var(--gray-50));
  pointer-events: none;
}
.opmap-steps {
  display: flex;
  align-items: stretch;
  gap: 8px;
  overflow-x: auto;
  overflow-y: visible;
  padding: 18px 24px 14px 8px;
  scrollbar-width: thin;
  scrollbar-color: var(--gray-300) transparent;
}
.opmap-steps::-webkit-scrollbar { height: 6px; }
.opmap-steps::-webkit-scrollbar-track { background: transparent; }
.opmap-steps::-webkit-scrollbar-thumb {
  background: var(--gray-300);
  border-radius: 999px;
}
.opmap-steps::-webkit-scrollbar-thumb:hover { background: var(--gray-400); }
.opmap-step {
  position: relative;
  flex: 0 0 132px;
  text-align: left;
  background: #fff;
  border: 1px solid var(--border-1);
  border-radius: 10px;
  padding: 12px 12px 14px;
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: default;
  transition: transform var(--dur-fast) var(--ease-std), box-shadow var(--dur-fast) var(--ease-std);
}
.opmap-step-n {
  font-family: var(--font-serif);
  font-size: 13px;
  color: var(--brand-blue);
}
.opmap-step-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--fg-1);
}
.opmap-step-desc {
  font-size: 11px;
  color: var(--fg-3);
  line-height: 1.4;
}
.opmap-step-flag {
  position: absolute;
  top: -9px;
  left: 10px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brand-blue);
  background: #fff;
  padding: 2px 7px;
  border-radius: var(--r-pill);
  border: 1px solid var(--blue-100);
}
.opmap-step.on {
  cursor: pointer;
  border-color: var(--brand-blue);
  background: var(--blue-50);
  box-shadow: 0 0 0 3px rgba(1, 113, 225, 0.12), var(--shadow-xs);
}
.opmap-step.on::after {
  content: '';
  position: absolute;
  top: 10px; right: 10px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--brand-blue);
  animation: opmapPulse 1.6s ease-out infinite;
}
.opmap-step.on:hover { transform: translateY(-1px); }
.opmap-step-arrow {
  align-self: center;
  color: var(--gray-300);
  font-size: 18px;
  flex: 0 0 auto;
}

/* LEVEL 3 — detail + BPMN */
.opmap-l3 {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 20px;
}
.opmap-l3-left {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.opmap-l3-block {
  background: #fff;
  border: 1px solid var(--border-1);
  border-radius: 10px;
  padding: 12px 14px;
}
.opmap-l3-block h4 {
  margin: 0 0 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-2);
}
.opmap-l3-block p {
  margin: 0;
  font-size: 13px;
  color: var(--fg-1);
  line-height: 1.5;
}
.opmap-l3-block ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
  color: var(--fg-1);
  line-height: 1.55;
}
.opmap-l3-block.warn { border-color: #fde68a; background: #fffbeb; }
.opmap-l3-block.warn h4 { color: #b45309; }

.opmap-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.opmap-tool {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border: 1px solid var(--border-1);
  border-radius: var(--r-pill);
  color: var(--fg-2);
  background: var(--gray-50);
}

.opmap-l3-right {
  background: #fff;
  border: 1px solid var(--border-1);
  border-radius: 10px;
  padding: 12px;
  overflow-x: auto;
}
.opmap-bpmn {
  width: 100%;
  height: auto;
  display: block;
  font-family: var(--font-sans);
}
.opmap-edge {
  fill: none;
  stroke: #B5B8BF;
  stroke-width: 1.5;
  transition: stroke var(--dur-fast) var(--ease-std);
}
.opmap-edge.on { stroke: var(--brand-blue); stroke-width: 2; }
.opmap-edge-l {
  font-size: 10px;
  fill: var(--fg-3);
}
.opmap-bn { cursor: pointer; }
.opmap-bn text {
  font-size: 11px;
  fill: var(--fg-1);
  pointer-events: none;
}
.opmap-bn.start circle, .opmap-bn.end circle {
  fill: #fff;
  stroke: var(--gray-400);
  stroke-width: 1.5;
}
.opmap-bn.end circle { stroke-width: 2.5; }
.opmap-bn.action rect {
  fill: #fff;
  stroke: var(--gray-400);
  stroke-width: 1.5;
  transition: fill var(--dur-fast) var(--ease-std), stroke var(--dur-fast) var(--ease-std);
}
.opmap-bn.xor polygon {
  fill: #fff;
  stroke: var(--gray-400);
  stroke-width: 1.5;
}
.opmap-bn.xor text:first-of-type { font-size: 14px; fill: var(--fg-2); }
.opmap-bn.on circle,
.opmap-bn.on rect,
.opmap-bn.on polygon {
  fill: var(--blue-50);
  stroke: var(--brand-blue);
}

/* Footnote */
.opmap-footnote {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-top: 1px solid var(--border-1);
  font-size: 11px;
  color: var(--fg-3);
  background: #fff;
}
.opmap-pulse {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--fg-2);
}
.opmap-pulse-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
  animation: opmapPulse 1.6s ease-out infinite;
}

@media (max-width: 860px) {
  .opmap-graph {
    grid-template-columns: 1fr;
  }
  .opmap-l3 {
    grid-template-columns: 1fr;
  }
  .opmap-stage { padding: 20px 14px; }
}
@media (max-width: 600px) {
  .opmap-bar { padding: 12px 14px; }
  .opmap-footnote { padding: 10px 14px; flex-direction: column; gap: 4px; align-items: flex-start; }
  .opmap-title { font-size: 11px; }
  .opmap-step { flex: 0 0 124px; }
}
`;
