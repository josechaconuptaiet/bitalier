import { jsPDF } from 'jspdf'

const LIME = [165, 240, 0]
const DEEP = [3, 4, 94]
const WHITE = [255, 255, 255]
const BG_LIGHT = [248, 249, 250]
const BORDER = [200, 200, 210]
const TEXT_DARK = [30, 30, 40]
const TEXT_MUTED = [100, 100, 110]

function drawPersonBox(doc, x, y, w, h, title, name, fill, border, titleColor, nameColor) {
  doc.setFillColor(...fill)
  doc.setDrawColor(...border)
  doc.setLineWidth(0.5)
  doc.roundedRect(x, y, w, h, 2, 2, 'FD')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...titleColor)
  doc.text(title, x + w / 2, y + 6, { align: 'center' })
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...nameColor)
  doc.text(name, x + w / 2, y + 12, { align: 'center' })
}

function drawConnectorDown(doc, x1, y1, x2, y2) {
  doc.setDrawColor(170, 170, 180)
  doc.setLineWidth(0.4)
  const midY = (y1 + y2) / 2
  doc.line(x1, y1, x1, midY)
  doc.line(x1, midY, x2, midY)
  doc.line(x2, midY, x2, y2)
}

function drawDirectLine(doc, x1, y1, x2, y2) {
  doc.setDrawColor(170, 170, 180)
  doc.setLineWidth(0.4)
  doc.line(x1, y1, x2, y2)
}

const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

// ═══════════════════════════════════════════════
// PAGE 1 — ORG CHART (landscape)
// ═══════════════════════════════════════════════
doc.setFillColor(...BG_LIGHT)
doc.rect(0, 0, 297, 210, 'F')

// Header
doc.setFillColor(...DEEP)
doc.rect(0, 0, 297, 18, 'F')
doc.setFontSize(14)
doc.setFont('helvetica', 'bold')
doc.setTextColor(...LIME)
doc.text('BITALIER — Organigrama Jerárquico', 148.5, 7, { align: 'center' })
doc.setFontSize(7)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...WHITE)
doc.text('Modelo Stream-Aligned · Team Topologies · Empresa ficticia — Tarea académica', 148.5, 13, { align: 'center' })

// ── LEVEL 1A: CEO ──
const ceoX = 148.5 - 35
const ceoY = 23
drawPersonBox(doc, ceoX, ceoY, 70, 17, 'CEO — Director General', 'Alejandro Cárdenas', DEEP, DEEP, LIME, [200, 200, 210])

// ── LEVEL 1B: CTO · CCO · COO ──
const dirs = [
  { title: 'CTO', name: 'Mariana Vélez', subtitle: 'Director de Tecnología' },
  { title: 'CCO', name: 'Diego Rosales', subtitle: 'Director Creativo' },
  { title: 'COO', name: 'Carolina Montes', subtitle: 'Director de Operaciones' },
]
const dirW = 52
const dirH = 16
const dirGap = 15
const dirStart = (297 - 3 * dirW - 2 * dirGap) / 2
const dirY = 50
const dirCenters = []

dirs.forEach((d, i) => {
  const dx = dirStart + i * (dirW + dirGap)
  dirCenters.push(dx + dirW / 2)
  doc.setFillColor(...WHITE)
  doc.setDrawColor(...DEEP)
  doc.setLineWidth(0.8)
  doc.roundedRect(dx, dirY, dirW, dirH, 2, 2, 'FD')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...DEEP)
  doc.text(d.title, dx + dirW / 2, dirY + 5, { align: 'center' })
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 90)
  doc.text(d.name, dx + dirW / 2, dirY + 11.5, { align: 'center' })
})

// Connector: CEO → each director
const ceoCenter = 148.5
for (const dcx of dirCenters) {
  drawConnectorDown(doc, ceoCenter, ceoY + 17, dcx, dirY)
}
doc.setFontSize(5.5)
doc.setFont('helvetica', 'italic')
doc.setTextColor(...TEXT_MUTED)
doc.text('(reportan al CEO)', ceoCenter + 2, (ceoY + 17 + dirY) / 2 + 1, { align: 'left' })

// ── LEVEL 2: Jefaturas under each director ──
const l2y = 82
const l2h2 = 18

function drawLeadBox(doc, cx, y, w, title, subtitle, name) {
  const x = cx - w / 2
  doc.setFillColor(...WHITE)
  doc.setDrawColor(...BORDER)
  doc.setLineWidth(0.5)
  doc.roundedRect(x, y, w, l2h2, 2, 2, 'FD')
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...DEEP)
  doc.text(title, cx, y + 4.5, { align: 'center' })
  doc.setFontSize(5.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...TEXT_MUTED)
  doc.text(subtitle, cx, y + 8.5, { align: 'center' })
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 70)
  doc.text(name, cx, y + 14, { align: 'center' })
  return x
}

// CTO column (left)
const ctoL2w = 46
const ctoL2gap = 8
const plLeadCx = dirCenters[0] - ctoL2w / 2 - ctoL2gap / 2
const platLeadCx = dirCenters[0] + ctoL2w / 2 + ctoL2gap / 2
drawLeadBox(doc, plLeadCx, l2y, ctoL2w, 'Stream Lead', 'Plataformas y Sist.', 'Fernanda Rivas')
drawLeadBox(doc, platLeadCx, l2y, ctoL2w, 'Lead Platform', 'Soporte Interno', 'Hugo Paredes')

// CCO column (center)
const ccoL2w = 52
drawLeadBox(doc, dirCenters[1], l2y, ccoL2w, 'Stream Lead', 'Presencia Digital', 'Ricardo Luna')

// COO column (right)
const cooL2w = 46
const crecLeadCx = dirCenters[2] - cooL2w / 2 - ctoL2gap / 2
const enabLeadCx = dirCenters[2] + cooL2w / 2 + ctoL2gap / 2
drawLeadBox(doc, crecLeadCx, l2y, cooL2w, 'Stream Lead', 'Crecimiento y Marca', 'Gabriel Soto')
drawLeadBox(doc, enabLeadCx, l2y, cooL2w, 'Lead Enabling', 'Habilitación', 'Valeria Nava')

// Connectors: directors → leads
// CTO → both leads
drawConnectorDown(doc, dirCenters[0], dirY + dirH, plLeadCx, l2y)
drawConnectorDown(doc, dirCenters[0], dirY + dirH, platLeadCx, l2y)
// CCO → lead
drawDirectLine(doc, dirCenters[1], dirY + dirH, dirCenters[1], l2y)
// COO → both leads
drawConnectorDown(doc, dirCenters[2], dirY + dirH, crecLeadCx, l2y)
drawConnectorDown(doc, dirCenters[2], dirY + dirH, enabLeadCx, l2y)

// ── LEVEL 3: Team boxes under each director ──
function drawTeamBox(doc, cx, y, w, h, title, members) {
  const x = cx - w / 2
  doc.setFillColor(...WHITE)
  doc.setDrawColor(...BORDER)
  doc.setLineWidth(0.5)
  doc.roundedRect(x, y, w, h, 2, 2, 'FD')
  // Box header
  doc.setFillColor(235, 236, 240)
  doc.roundedRect(x, y, w, 9, 2, 2, 'F')
  doc.setFillColor(235, 236, 240)
  doc.rect(x, y + 5, w, 4, 'F')
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...DEEP)
  doc.text(title, cx, y + 6, { align: 'center' })
  // Members
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(70, 70, 80)
  members.forEach((m, mi) => {
    doc.text(`• ${m}`, cx, y + 13 + mi * 4, { align: 'center' })
  })
  return x
}

const l3y = 118
const l3h = 35

// CTO column: Plataformas + Platform
const tboxW = 44
drawTeamBox(doc, plLeadCx, l3y, tboxW, l3h, 'Plataformas', ['Backend Dev (3)', 'Mobile Dev (2)', 'DevOps (1)', 'Frontend (1)', 'QA (1)'])
drawTeamBox(doc, platLeadCx, l3y, tboxW, l3h, 'Platform', ['DevOps/Infra (2)', 'Seguridad (1)'])

// CCO column: Presencia Digital
drawTeamBox(doc, dirCenters[1], l3y, 52, l3h, 'Presencia Digital', ['Frontend Dev (3)', 'UX/UI Designer (2)', 'SEO Specialist (1)', 'Content Writer (1)', 'QA (1)'])

// COO column: Crecimiento + Enabling
drawTeamBox(doc, crecLeadCx, l3y, tboxW, l3h, 'Crecimiento y Marca', ['SEM Specialist (2)', 'Social Media (2)', 'Brand Designer (1)', 'Content Strat. (1)', 'Growth Analyst (1)'])
drawTeamBox(doc, enabLeadCx, l3y, tboxW, l3h, 'Enabling', ['Project Mgr (1)', 'Account Mgr (2)', 'R&D / Cap. (1)'])

// Connectors L2 → L3
const l2LeadCxs = [plLeadCx, platLeadCx, dirCenters[1], crecLeadCx, enabLeadCx]
for (const lcx of l2LeadCxs) {
  drawConnectorDown(doc, lcx, l2y + l2h2, lcx, l3y)
}

// ── Footer ──
doc.setFontSize(6)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...TEXT_MUTED)
doc.text('Total: 34 personas · Cada stream opera como Scrum Team (SM: Stream Lead · PO: Project/Account Mgr) · Platform y Enabling dan soporte transversal', 148.5, 185, { align: 'center' })

// ═══════════════════════════════════════════════
// PAGE 2 — TABLA DE PUESTOS (Nivel 1 y 2)
// ═══════════════════════════════════════════════
doc.addPage('a4', 'portrait')

doc.setFillColor(...DEEP)
doc.rect(0, 0, 210, 18, 'F')
doc.setFontSize(14)
doc.setFont('helvetica', 'bold')
doc.setTextColor(...LIME)
doc.text('BITALIER — Tabla de Puestos por Nivel Jerárquico', 105, 7, { align: 'center' })
doc.setFontSize(7)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...WHITE)
doc.text('Niveles 1 y 2 — Alta Dirección y Jefaturas', 105, 13.5, { align: 'center' })

let y = 26
const colW = [40, 40, 40, 40]
const colX = [15, 55, 95, 135]
const totalW = 175

function drawTableHeader(doc, labels, y) {
  doc.setFillColor(...DEEP)
  doc.setDrawColor(...DEEP)
  doc.setLineWidth(0.5)
  doc.rect(15, y, 175, 7, 'FD')
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...WHITE)
  labels.forEach((l, i) => {
    doc.text(l, colX[i] + colW[i] / 2, y + 4.5, { align: 'center' })
  })
  return y + 7
}

function drawTableRow(doc, cells, y, fill) {
  if (fill) {
    doc.setFillColor(...fill)
    doc.rect(15, y, 175, 6, 'F')
  }
  doc.setDrawColor(210, 210, 215)
  doc.setLineWidth(0.2)
  doc.line(15, y, 190, y)
  doc.setFontSize(6.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...TEXT_DARK)
  cells.forEach((c, i) => {
    doc.text(c, colX[i] + colW[i] / 2, y + 4, { align: 'center' })
  })
  return y + 6
}

function drawSectionLabel(doc, text, y) {
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...DEEP)
  doc.text(text, 15, y)
  doc.setDrawColor(...DEEP)
  doc.setLineWidth(0.3)
  doc.line(15, y + 0.5, 190, y + 0.5)
  return y + 5
}

y = drawSectionLabel(doc, 'NIVEL 1 — Alta Dirección', y)
const hLabels = ['Puesto', 'Titular', 'Reporta a', 'Supervisa a']
y = drawTableHeader(doc, hLabels, y)

const nivel1 = [
  ['CEO — Director General', 'Alejandro Cárdenas', '—', 'CTO, CCO, COO'],
  ['CTO — Dir. de Tecnología', 'Mariana Vélez', 'CEO', 'Stream Lead Plataformas, Lead Platform'],
  ['CCO — Dir. Creativo', 'Diego Rosales', 'CEO', 'Stream Lead Presencia Digital'],
  ['COO — Dir. de Operaciones', 'Carolina Montes', 'CEO', 'Stream Lead Crecimiento y Marca, Lead Enabling'],
]
nivel1.forEach((r, i) => {
  y = drawTableRow(doc, r, y, i % 2 === 0 ? [245, 246, 248] : null)
})

y = drawSectionLabel(doc, 'NIVEL 2 — Jefaturas de Stream y Soporte', y + 3)
y = drawTableHeader(doc, hLabels, y)

const nivel2 = [
  ['Stream Lead — Plataformas y Sist.', 'Fernanda Rivas', 'CTO', 'Equipo Plataformas (8 pers.)'],
  ['Lead — Equipo Platform', 'Hugo Paredes', 'CTO', 'Equipo Platform (3 pers.)'],
  ['Stream Lead — Presencia Digital', 'Ricardo Luna', 'CCO', 'Equipo Presencia Digital (8 pers.)'],
  ['Stream Lead — Crecimiento y Marca', 'Gabriel Soto', 'COO', 'Equipo Crecimiento y Marca (7 pers.)'],
  ['Lead — Equipo Enabling', 'Valeria Nava', 'COO', 'Equipo Enabling (4 pers.)'],
]
nivel2.forEach((r, i) => {
  y = drawTableRow(doc, r, y, i % 2 === 0 ? [245, 246, 248] : null)
})

// ═══════════════════════════════════════════════
// PAGE 3 — TABLA DE PUESTOS Nivel 3
// ═══════════════════════════════════════════════
doc.addPage('a4', 'portrait')

doc.setFillColor(...DEEP)
doc.rect(0, 0, 210, 18, 'F')
doc.setFontSize(14)
doc.setFont('helvetica', 'bold')
doc.setTextColor(...LIME)
doc.text('BITALIER — Tabla de Puestos por Nivel Jerárquico', 105, 7, { align: 'center' })
doc.setFontSize(7)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...WHITE)
doc.text('Nivel 3 — Especialistas', 105, 13.5, { align: 'center' })

y = 26

const streams_n3 = [
  {
    title: 'Stream Presencia Digital (8 pers.) — Lead: Ricardo Luna',
    data: [
      ['Frontend Developer', 'Andrés Molina'],
      ['Frontend Developer', 'Laura Peña'],
      ['Frontend Developer', 'Samuel Rojas'],
      ['UX/UI Designer', 'Camila Henríquez'],
      ['UX/UI Designer', 'Tomás Guerra'],
      ['SEO Specialist', 'Daniela Ortiz'],
      ['Content Writer', 'Pablo Aguilar'],
      ['QA', 'Andrea Cordero'],
    ],
  },
  {
    title: 'Stream Plataformas y Sistemas (8 pers.) — Lead: Fernanda Rivas',
    data: [
      ['Backend Developer', 'Javier Mendoza'],
      ['Backend Developer', 'Sofía Herrera'],
      ['Backend Developer', 'Mateo Castillo'],
      ['Mobile Developer', 'Isabella Torres'],
      ['Mobile Developer', 'Sebastián León'],
      ['DevOps', 'Emilio Vargas'],
      ['Frontend Developer', 'Valentina Ríos'],
      ['QA', 'Nicolás Vega'],
    ],
  },
  {
    title: 'Stream Crecimiento y Marca (7 pers.) — Lead: Gabriel Soto',
    data: [
      ['SEM Specialist', 'Luciana Díaz'],
      ['SEM Specialist', 'Martín Esquivel'],
      ['Social Media Manager', 'Paula Campos'],
      ['Social Media Manager', 'Felipe Navarro'],
      ['Brand Designer', 'Renata Gómez'],
      ['Content Strategist', 'Bruno Larios'],
      ['Growth Analyst', 'Adriana Solís'],
    ],
  },
  {
    title: 'Equipo Platform (3 pers.) — Lead: Hugo Paredes',
    data: [
      ['DevOps / Infraestructura', 'Omar Cruz'],
      ['DevOps / Infraestructura', 'Irene Sandoval'],
      ['Seguridad', 'Alan Romero'],
    ],
  },
  {
    title: 'Equipo Enabling (4 pers.) — Lead: Valeria Nava',
    data: [
      ['Project Manager', 'Regina Flores'],
      ['Account Manager', 'Esteban Méndez'],
      ['Account Manager', 'Ximena Delgado'],
      ['R&D / Capacitación', 'David Quintero'],
    ],
  },
]

const n3colW = [60, 60]
const n3colX = [45, 115]

function drawN3Table(doc, title, data, y) {
  if (y > 250) {
    doc.addPage('a4', 'portrait')
    doc.setFillColor(...DEEP)
    doc.rect(0, 0, 210, 18, 'F')
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...LIME)
    doc.text('BITALIER — Tabla de Puestos (continuación)', 105, 7, { align: 'center' })
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...WHITE)
    doc.text('Nivel 3 — Especialistas', 105, 13.5, { align: 'center' })
    y = 26
  }

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...DEEP)
  doc.text(title, 20, y)
  doc.setDrawColor(...DEEP)
  doc.setLineWidth(0.3)
  doc.line(20, y + 0.5, 190, y + 0.5)
  y += 5

  // Header
  doc.setFillColor(...DEEP)
  doc.setDrawColor(...DEEP)
  doc.setLineWidth(0.5)
  doc.rect(20, y, 160, 6, 'FD')
  doc.setFontSize(6.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...WHITE)
  doc.text('Puesto', 65, y + 4, { align: 'center' })
  doc.text('Titular', 125, y + 4, { align: 'center' })
  y += 6

  data.forEach((r, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(245, 246, 248)
      doc.rect(20, y, 160, 5.5, 'F')
    }
    doc.setDrawColor(215, 215, 220)
    doc.setLineWidth(0.2)
    doc.line(20, y, 180, y)
    doc.setFontSize(6.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...TEXT_DARK)
    doc.text(r[0], 65, y + 3.8, { align: 'center' })
    doc.text(r[1], 125, y + 3.8, { align: 'center' })
    y += 5.5
  })
  y += 4
  return y
}

for (const s of streams_n3) {
  y = drawN3Table(doc, s.title, s.data, y)
}

// ═══════════════════════════════════════════════
// PAGE 4 — METODOLOGÍA SCRUM
// ═══════════════════════════════════════════════
doc.addPage('a4', 'portrait')

doc.setFillColor(...DEEP)
doc.rect(0, 0, 210, 18, 'F')
doc.setFontSize(14)
doc.setFont('helvetica', 'bold')
doc.setTextColor(...LIME)
doc.text('BITALIER — Metodología de Trabajo: Scrum', 105, 7, { align: 'center' })
doc.setFontSize(7)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...WHITE)
doc.text('Cada stream opera como un Scrum Team autogestionado', 105, 13.5, { align: 'center' })

y = 26
const colWide = 170

function blurb(doc, text, y, size) {
  doc.setFontSize(size || 7.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...TEXT_DARK)
  const lines = doc.splitTextToSize(text, colWide)
  doc.text(lines, 20, y)
  return y + lines.length * ((size || 7.5) * 0.35) + 1.5
}

function stitle(doc, text, y) {
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...DEEP)
  doc.text(text, 20, y)
  doc.setDrawColor(...DEEP)
  doc.setLineWidth(0.3)
  doc.line(20, y + 0.5, 190, y + 0.5)
  return y + 5
}

y = stitle(doc, 'Ciclo del Sprint', y)
y = blurb(doc, 'Cada stream trabaja en sprints de 1 a 2 semanas. El ciclo comienza con Sprint Planning, seguido de Daily Standups durante la ejecución, y finaliza con Sprint Review y Retrospectiva.', y)

// Sprint cycle diagram
const boxW = 32
const boxH = 12
const arrowGap = 6
const diagramY = y + 2
const diagramStart = 20

const sprintSteps = ['Planning', 'Daily\nStandup', 'Review', 'Retro-', 'Feedback']
const sprintColors = [
  [3, 4, 94],
  [60, 70, 130],
  [3, 4, 94],
  [60, 70, 130],
  [165, 240, 0],
]

sprintSteps.forEach((step, i) => {
  const bx = diagramStart + i * (boxW + arrowGap)
  doc.setFillColor(...sprintColors[i])
  doc.setDrawColor(...sprintColors[i])
  doc.roundedRect(bx, diagramY, boxW, boxH, 2, 2, 'FD')
  doc.setFontSize(6)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...WHITE)
  const lines = step.split('\n')
  lines.forEach((l, li) => {
    doc.text(l, bx + boxW / 2, diagramY + 4 + li * 4, { align: 'center' })
  })

  // Arrow
  if (i < sprintSteps.length - 1) {
    const arrowX = bx + boxW
    doc.setDrawColor(150, 150, 160)
    doc.setLineWidth(0.5)
    doc.line(arrowX + 1, diagramY + boxH / 2, arrowX + arrowGap - 1, diagramY + boxH / 2)
    doc.setFontSize(8)
    doc.text('>', arrowX + arrowGap - 2, diagramY + boxH / 2 + 1.5, { align: 'center' })
  }
})

y = diagramY + boxH + 5

y = stitle(doc, 'Roles Scrum dentro de cada stream', y)

// Roles table
const roleColW = [35, 40, 100]
const roleColX = [20, 55, 95]
function roleHeader(doc, labels, y) {
  doc.setFillColor(...DEEP)
  doc.setDrawColor(...DEEP)
  doc.setLineWidth(0.5)
  doc.rect(20, y, 170, 6, 'FD')
  doc.setFontSize(6.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...WHITE)
  labels.forEach((l, i) => {
    doc.text(l, roleColX[i] + roleColW[i] / 2, y + 4, { align: 'center' })
  })
  return y + 6
}
function roleRow(doc, cells, y, fill) {
  if (fill) {
    doc.setFillColor(245, 246, 248)
    doc.rect(20, y, 170, 5.5, 'F')
  }
  doc.setDrawColor(210, 210, 215)
  doc.setLineWidth(0.2)
  doc.line(20, y, 190, y)
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...TEXT_DARK)
  cells.forEach((c, i) => {
    doc.text(c, roleColX[i] + roleColW[i] / 2, y + 3.8, { align: 'center' })
  })
  return y + 5.5
}

y = roleHeader(doc, ['Rol Scrum', 'Lo ejerce', 'Responsabilidad'], y)
const roleData = [
  ['Scrum Master', 'Stream Lead', 'Facilita ceremonias, elimina blockers, protege al equipo'],
  ['Product Owner', 'Project / Account Mgr', 'Gestiona backlog, prioriza, representa al cliente'],
  ['Development Team', 'Especialistas del stream', 'Ejecutan historias del sprint, se auto-organizan'],
]
roleData.forEach((r, i) => {
  y = roleRow(doc, r, y, i % 2 === 0)
})

y += 3
y = stitle(doc, 'Ceremonias', y)

const cerColW = [30, 28, 22, 90]
const cerColX = [20, 50, 78, 100]

function cerHeader(doc, labels, y) {
  doc.setFillColor(...DEEP)
  doc.setDrawColor(...DEEP)
  doc.setLineWidth(0.5)
  doc.rect(20, y, 170, 6, 'FD')
  doc.setFontSize(6.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...WHITE)
  labels.forEach((l, i) => {
    doc.text(l, cerColX[i] + cerColW[i] / 2, y + 4, { align: 'center' })
  })
  return y + 6
}

y = cerHeader(doc, ['Ceremonia', 'Frecuencia', 'Duración', 'Participan'], y)
const cerData = [
  ['Sprint Planning', 'Cada sprint', '1-2 h', 'Stream completo + PO'],
  ['Daily Standup', 'Diaria', '15 min', 'Stream completo'],
  ['Sprint Review', 'Fin de sprint', '1 h', 'Stream + PO + stakeholders'],
  ['Retrospectiva', 'Fin de sprint', '1 h', 'Solo stream (sin PO)'],
]
function cerRow(doc, cells, y, fill) {
  if (fill) {
    doc.setFillColor(245, 246, 248)
    doc.rect(20, y, 170, 5.5, 'F')
  }
  doc.setDrawColor(210, 210, 215)
  doc.setLineWidth(0.2)
  doc.line(20, y, 190, y)
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...TEXT_DARK)
  cells.forEach((c, i) => {
    doc.text(c, cerColX[i] + cerColW[i] / 2, y + 3.8, { align: 'center' })
  })
  return y + 5.5
}
cerData.forEach((r, i) => {
  y = cerRow(doc, r, y, i % 2 === 0)
})

y += 3
y = stitle(doc, 'Artefactos', y)
y = blurb(doc, '• Product Backlog: gestionado por el PO, priorizado por valor de negocio.', y)
y = blurb(doc, '• Sprint Backlog: compromiso del equipo para el sprint.', y)
y = blurb(doc, '• Incremento: entregable funcional al final de cada sprint.', y)

// ═══════════════════════════════════════════════
// PAGE 5 — ÁRBOL DE REPORTE + JUSTIFICACIÓN
// ═══════════════════════════════════════════════
doc.addPage('a4', 'portrait')

doc.setFillColor(...DEEP)
doc.rect(0, 0, 210, 18, 'F')
doc.setFontSize(14)
doc.setFont('helvetica', 'bold')
doc.setTextColor(...LIME)
doc.text('BITALIER — Líneas de Reporte y Justificación', 105, 7, { align: 'center' })
doc.setFontSize(7)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...WHITE)
doc.text('Estructura jerárquica completa y fundamentación académica', 105, 13.5, { align: 'center' })

y = 26

function sectionTitle2(doc, text, y) {
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...DEEP)
  doc.text(text, 20, y)
  doc.setDrawColor(...DEEP)
  doc.setLineWidth(0.3)
  doc.line(20, y + 0.5, 190, y + 0.5)
  return y + 5
}

function bodyText2(doc, text, y, size = 7) {
  doc.setFontSize(size)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...TEXT_DARK)
  const lines = doc.splitTextToSize(text, 170)
  doc.text(lines, 20, y)
  return y + lines.length * (size * 0.35) + 1.5
}

// ── Reporting tree ──
y = sectionTitle2(doc, 'Árbol de Reporte', y)

const reportLines = [
  'CEO (Alejandro Cárdenas)',
  '├── CTO (Mariana Vélez) — Director de Tecnología',
  '│   ├── Stream Lead Plataformas y Sist. (Fernanda Rivas)',
  '│   │   ├── Backend Devs (3): Javier, Sofía, Mateo',
  '│   │   ├── Mobile Devs (2): Isabella, Sebastián',
  '│   │   ├── DevOps (1): Emilio',
  '│   │   ├── Frontend Dev (1): Valentina',
  '│   │   └── QA (1): Nicolás',
  '│   └── Lead Platform (Hugo Paredes)',
  '│       ├── DevOps / Infra (2): Omar, Irene',
  '│       └── Seguridad (1): Alan',
  '├── CCO (Diego Rosales) — Director Creativo',
  '│   └── Stream Lead Presencia Digital (Ricardo Luna)',
  '│       ├── Frontend Devs (3): Andrés, Laura, Samuel',
  '│       ├── UX/UI Designers (2): Camila, Tomás',
  '│       ├── SEO Specialist (1): Daniela',
  '│       ├── Content Writer (1): Pablo',
  '│       └── QA (1): Andrea',
  '└── COO (Carolina Montes) — Director de Operaciones',
  '    ├── Stream Lead Crecimiento y Marca (Gabriel Soto)',
  '    │   ├── SEM Specialists (2): Luciana, Martín',
  '    │   ├── Social Media Mgrs (2): Paula, Felipe',
  '    │   ├── Brand Designer (1): Renata',
  '    │   ├── Content Strategist (1): Bruno',
  '    │   └── Growth Analyst (1): Adriana',
  '    └── Lead Enabling (Valeria Nava)',
  '        ├── Project Manager (1): Regina',
  '        ├── Account Managers (2): Esteban, Ximena',
  '        └── R&D / Capacitación (1): David',
]

doc.setFontSize(6)
doc.setFont('courier', 'normal')
doc.setTextColor(...TEXT_DARK)
for (const line of reportLines) {
  if (y > 270) {
    doc.addPage('a4', 'portrait')
    y = 20
  }
  doc.text(line, 22, y)
  y += 3.8
}

// ── Justification on same page if fits ──
y += 3
y = sectionTitle2(doc, 'Justificación Académica', y)
y = bodyText2(doc, 'Bitalier adopta una estructura stream-aligned (equipos alineados a flujo de valor) basada en "Team Topologies" (Skelton & Pais, 2019), combinada con Scrum como marco de trabajo ágil para la ejecución operativa de cada stream.', y)
y = bodyText2(doc, 'La elección responde a tres características: (1) catálogo diverso de 6 servicios agrupables en 3 flujos de valor; (2) filosofía "Bit + Atelier" que exige equipos multidisciplinarios autónomos; (3) tamaño óptimo de 15-40 personas donde los streams equilibran especialización y flexibilidad.', y)
y = bodyText2(doc, 'Sinergia: Stream-Aligned define equipos estables alineados a flujos de valor; Scrum proporciona el ritmo de trabajo con sprints, ceremonias y roles (Scrum Master = Stream Lead, PO = Project/Account Manager, Team = especialistas). Cada stream es un Scrum Team permanente.', y)
y = bodyText2(doc, 'Ventajas: autonomía real, reducción de dependencias cruzadas, alineación con tipos de necesidad del cliente, escalabilidad sin reestructurar, retención de talento y ritmo de entrega predecible gracias a los sprints.', y)
y = bodyText2(doc, 'Frente a la estructura funcional clásica, evita silos. Frente a la matricial, elimina la doble dependencia jerárquica. Frente a la plana pura, proporciona estabilidad sin caos.', y)

y = sectionTitle2(doc, 'Referencias', y + 2)
y = bodyText2(doc, 'Skelton, M. & Pais, M. (2019). Team Topologies: Organizing Business and Technology Teams for Fast Flow. IT Revolution Press.', y, 6.5)
y = bodyText2(doc, 'Hernández, S. (2023). Administración: Teoría y Práctica. McGraw-Hill.', y, 6.5)

// ── Footer all pages ──
const pages = doc.getNumberOfPages()
const RIF = 'J-40987654-2'
for (let i = 1; i <= pages; i++) {
  doc.setPage(i)
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(170, 170, 180)
  const pw = doc.internal.pageSize.width
  const ph = doc.internal.pageSize.height
  doc.text(`Página ${i} de ${pages}`, pw / 2, ph - 8, { align: 'center' })
  doc.text(`RIF: ${RIF}`, pw - 18, ph - 8, { align: 'right' })
  doc.text('Bitalier C.A.', 18, ph - 8, { align: 'left' })
}

doc.save('bitalier-organigrama.pdf')
console.log('PDF generado: bitalier-organigrama.pdf')
