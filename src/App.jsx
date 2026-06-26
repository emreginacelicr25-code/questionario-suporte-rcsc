import { useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// DADOS BASE
// ══════════════════════════════════════════════════════════════════════════════
const UNIDADE     = "E.M. Regina Celi da Silva Cerdeira";
const MUNICIPIO   = "Duque de Caxias – RJ";
const SME         = "Secretaria Municipal de Educação";
const ANO         = "2026";

const PROFISSIONAIS = [
  { id:"aai_luciana",   nome:"Luciana Teles Barbosa",                    tipo:"AAI1", vinculo:"PSS",        turno:["1°","2°"], turmas:["101","502"] },
  { id:"aai_annajulia", nome:"Anna Julia Martins dos Santos",            tipo:"AAI1", vinculo:"Estagiária", turno:["1°"],      turmas:["201"] },
  { id:"aai_solange",   nome:"Solange Pereira da Fonte",                 tipo:"AAI1", vinculo:"PSS",        turno:["1°","2°"], turmas:["202","302"] },
  { id:"aai_raiane",    nome:"Raiane Pedro da Conceição Nunes da Cruz",  tipo:"AAI1", vinculo:"Estagiária", turno:["1°","2°"], turmas:["301","402"] },
  { id:"aai_tassiane",  nome:"Tassiane Dias de Castro",                  tipo:"AAI1", vinculo:"Estagiária", turno:["1°"],      turmas:["401"] },
  { id:"aai_michelle",  nome:"Michelle da Silva Amaral Pereira",         tipo:"AAI1", vinculo:"Estagiária", turno:["1°"],      turmas:["501"] },
  { id:"aai_anapaula",  nome:"Ana Paula Gama de Souza Amanias",          tipo:"AAI1", vinculo:"Estagiária", turno:["2°"],      turmas:["102"] },
  { id:"aai_clara",     nome:"Clara Ludimilla",                          tipo:"AAI1", vinculo:"PSS",        turno:["1°"],      turmas:["51"] },
  { id:"aai_preciosa",  nome:"Preciosa",                                  tipo:"AAI2", vinculo:"PSS",        turno:["2°"],      turmas:["402"] },
  { id:"aai_adriane",   nome:"Adriane",                                   tipo:"AAI2", vinculo:"AAI",        turno:["1°"],      turmas:["401"] },
  { id:"axei_brenda",   nome:"Brenda da Costa Ferreira",                 tipo:"AxEI", vinculo:"Ax EI",      turno:["1°","2°"], turmas:["41","42"] },
  { id:"axei_messias",  nome:"Messias da Penha Ferreira Lourenço",       tipo:"AxEI", vinculo:"Ax EI",      turno:["1°","2°"], turmas:["41","42"] },
  { id:"axei_mariaedu", nome:"Maria Eduarda Barreto da Silva",           tipo:"AxEI", vinculo:"Ax EI",      turno:["1°","2°"], turmas:["51","52"] },
  { id:"axei_mariaana", nome:"Maria Ana da Conceição Ipolito Feliciano", tipo:"AxEI", vinculo:"Ax EI",      turno:["1°","2°"], turmas:["51","52"] },
];

const ALUNOS_POR_PROF = {
  aai_luciana:   [{nome:"Oliver Mikhael Corrêia de Santana",turma:"101",turno:"1°",suporte:"S1"},{nome:"Arthur Henrique de Freitas",turma:"101",turno:"1°",suporte:"S1"},{nome:"Arthur Nunes Miranda",turma:"502",turno:"2°",suporte:"S3"}],
  aai_annajulia: [{nome:"Maria Júlia do Nascimento Barbosa",turma:"201",turno:"1°",suporte:"S1"},{nome:"Renato Luiz de Souza Miranda Júnior",turma:"201",turno:"1°",suporte:"S1"}],
  aai_solange:   [{nome:"Luiz Arthur da Silva Rosa",turma:"202",turno:"1°",suporte:"S2"},{nome:"Vinicios Oliveira Fernandes",turma:"202",turno:"1°",suporte:"S2"},{nome:"Sophia Ketlyn da Silva Souza",turma:"302",turno:"2°",suporte:"S2"},{nome:"Nathaly Vitória Soares Cruz Bezerra",turma:"302",turno:"2°",suporte:"S2"}],
  aai_raiane:    [{nome:"Misael Oliveira Francisco",turma:"301",turno:"1°",suporte:"S2"},{nome:"Harry Sandro dos Santos Saldanha",turma:"301",turno:"1°",suporte:"S1"},{nome:"Samuel da Conceição Gomes",turma:"402",turno:"2°",suporte:"S2"}],
  aai_tassiane:  [{nome:"Ângelo Miguel Silva Lopes",turma:"401",turno:"1°",suporte:"S2"},{nome:"Ana Laura Rosa Leal",turma:"401",turno:"1°",suporte:"S2"}],
  aai_michelle:  [{nome:"Isaac Freire Dias",turma:"501",turno:"1°",suporte:"S2"},{nome:"Lucas Oliveira Crispim",turma:"501",turno:"1°",suporte:"S2"}],
  aai_anapaula:  [{nome:"Henrique Martins Barros",turma:"102",turno:"2°",suporte:"S2"},{nome:"Ana Vitória Guimarães Lacerda",turma:"102",turno:"2°",suporte:"S1"}],
  aai_clara:     [{nome:"Lara Vitória Lopes da Conceição Pereira",turma:"51",turno:"1°",suporte:"S1"}],
  aai_preciosa:  [{nome:"Tito Gouveia Monteiro",turma:"402",turno:"2°",suporte:"S1"}],
  aai_adriane:   [{nome:"Miguel Martins Sagrilo",turma:"401",turno:"1°",suporte:"S1"},{nome:"Emily Hellouise Lemos dos Santos",turma:"401",turno:"1°",suporte:"S2"},{nome:"Enzo Gabriel Braga Marques",turma:"401",turno:"1°",suporte:"S1"}],
  axei_brenda:   [{nome:"João Claudio Neves Gil Manhães",turma:"41",turno:"1°",suporte:"S1"},{nome:"Mariah Souza Soares",turma:"41",turno:"1°",suporte:"S1"},{nome:"Antonella Ponce de Leão Constant",turma:"42",turno:"2°",suporte:"S1"},{nome:"Mateus Cavalcante do Nascimento",turma:"42",turno:"2°",suporte:"S2"}],
  axei_messias:  [{nome:"José Octávio Pacheco da Silva",turma:"41",turno:"1°",suporte:"S1"},{nome:"Helena Mendes de Brito",turma:"42",turno:"2°",suporte:"S2"}],
  axei_mariaedu: [{nome:"Yasmin Lara Penna Lourenço",turma:"51",turno:"1°",suporte:"S2"},{nome:"Arthur Gomes de Andrade",turma:"52",turno:"2°",suporte:"S1"}],
  axei_mariaana: [{nome:"Tony da Cruz dos Santos",turma:"51",turno:"1°",suporte:"S1"},{nome:"João Victor Barbosa",turma:"51",turno:"1°",suporte:"S2"},{nome:"Oliver Barbosa Coelho",turma:"52",turno:"2°",suporte:"S1"}],
};

const TIPO_LABEL = { AAI1:"AAI 1 – Mediador", AAI2:"AAI 2 – Cuidador", AxEI:"Aux. Ed. Infantil" };
const TIPO_COR   = { AAI1:"#1A3A6E", AAI2:"#2E7D32", AxEI:"#6A0572" };
const TIPO_BG    = { AAI1:"#E8F4FD", AAI2:"#E8F5E9", AxEI:"#F3E5F5" };
const SUP_COR    = { S1:"#C62828", S2:"#E65100", S3:"#2E7D32" };
const AREAS      = ["Atividade Pedagógica","Alimentação","Higiene / Banheiro","Interação Social","Deslocamento / Pátio"];
const TIPOS_NAT  = ["Crise de Agitação Psicomotora (TEA/Outros)","Crise Convulsiva / Emergência de Saúde","Comportamento de Autolesão","Agressividade direcionada a terceiros","Outro"];
const INTV_OPS   = ["Uso de comandos verbais curtos/calmos","Condução para Sala de Autorregulação","Retirada da turma (preservação da imagem)","Manobra de Primeiros Socorros (posição lateral)","Contenção física de proteção (risco iminente)","Acionamento de Socorro Externo (SAMU/Bombeiros)"];
const DIAS       = ["Segunda","Terça","Quarta","Quinta","Sexta"];

const STORAGE = { registros:"rcsc_reg_v3", ocorrencias:"rcsc_oco_v3", escalas:"rcsc_esc_v3" };
const load = k => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
const save = (k,v) => localStorage.setItem(k, JSON.stringify(v));
const hoje = () => new Date().toLocaleDateString("pt-BR");
const agora = () => new Date().toLocaleString("pt-BR");
const padNum = (n,digits=5) => String(n).padStart(digits,"0");

// ── Estilos base ──────────────────────────────────────────────────────────────
const card = { background:"#fff", borderRadius:12, boxShadow:"0 1px 8px rgba(0,0,0,0.08)", padding:"20px 24px" };
const inp  = { width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #D0D5DD", fontSize:13, fontFamily:"inherit", boxSizing:"border-box", outline:"none" };
const lbl  = { fontSize:12, fontWeight:700, color:"#344054", marginBottom:5, display:"block" };
const btn  = (cor="#1A3A6E", dis=false) => ({
  padding:"9px 18px", borderRadius:8, border:"none", cursor:dis?"not-allowed":"pointer",
  background:dis?"#ccc":cor, color:"#fff", fontWeight:700, fontSize:13, fontFamily:"inherit",
  transition:"opacity .15s",
});

// ══════════════════════════════════════════════════════════════════════════════
// PRINT STYLES (injetado uma vez)
// ══════════════════════════════════════════════════════════════════════════════
const PRINT_CSS = `
@media print {
  body * { visibility: hidden !important; }
  #print-area, #print-area * { visibility: visible !important; }
  #print-area {
    position: fixed !important; left: 0; top: 0;
    width: 100%; height: auto;
    padding: 0 !important; margin: 0 !important;
  }
  @page { size: A4 portrait; margin: 14mm 16mm 16mm 16mm; }
}
`;

function injectPrintCSS() {
  if (!document.getElementById("rcsc-print-css")) {
    const s = document.createElement("style");
    s.id = "rcsc-print-css";
    s.innerHTML = PRINT_CSS;
    document.head.appendChild(s);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// CABEÇALHO INSTITUCIONAL (impresso)
// ══════════════════════════════════════════════════════════════════════════════
function CabecalhoImpresso({ titulo, numero, tipo }) {
  const corFaixa = TIPO_COR[tipo] || "#1A3A6E";
  return (
    <div style={{ fontFamily:"Arial,sans-serif", marginBottom:12 }}>
      {/* Faixa de topo */}
      <div style={{ background:corFaixa, color:"#fff", padding:"7px 14px", borderRadius:"6px 6px 0 0",
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:.5 }}>
          Estado do Rio de Janeiro · Prefeitura Municipal de Duque de Caxias · {SME}
        </div>
        <div style={{ fontSize:9, fontWeight:700, letterSpacing:.5 }}>
          {UNIDADE} – Centro de Referência em Educação Inclusiva
        </div>
      </div>
      {/* Linha título + número */}
      <div style={{ border:`1px solid ${corFaixa}`, borderTop:"none", padding:"10px 14px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        background:"#FAFAFA", borderRadius:"0 0 6px 6px" }}>
        <div style={{ fontSize:14, fontWeight:800, color:corFaixa }}>{titulo}</div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:9, color:"#888" }}>Nº DO DOCUMENTO</div>
          <div style={{ fontSize:13, fontWeight:800, color:corFaixa, letterSpacing:1 }}>
            {numero}
          </div>
          <div style={{ fontSize:9, color:"#888" }}>Ano Letivo {ANO}</div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// RODAPÉ DE ASSINATURAS (impresso)
// ══════════════════════════════════════════════════════════════════════════════
function RodapeAssinaturas({ campos }) {
  return (
    <div style={{ marginTop:28, borderTop:"1px solid #ccc", paddingTop:16,
      display:"grid", gridTemplateColumns:`repeat(${campos.length},1fr)`, gap:20,
      fontFamily:"Arial,sans-serif" }}>
      {campos.map((c,i) => (
        <div key={i} style={{ textAlign:"center" }}>
          <div style={{ borderBottom:"1px solid #333", marginBottom:6, height:36 }} />
          <div style={{ fontSize:10, fontWeight:700, color:"#1A3A6E" }}>{c.titulo}</div>
          {c.sub && <div style={{ fontSize:9, color:"#666" }}>{c.sub}</div>}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MODAL DE IMPRESSÃO
// ══════════════════════════════════════════════════════════════════════════════
function PrintModal({ children, onClose, titulo }) {
  useEffect(() => { injectPrintCSS(); }, []);

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
      zIndex:9999, display:"flex", alignItems:"flex-start", justifyContent:"center",
      overflowY:"auto", padding:"20px 10px" }}>
      {/* Barra de controle – NÃO imprime */}
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:10000,
        background:"#1A3A6E", color:"#fff", padding:"10px 20px",
        display:"flex", justifyContent:"space-between", alignItems:"center" }}
        className="no-print">
        <div style={{ fontWeight:700 }}>🖨️ Pré-visualização de Impressão – {titulo}</div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>window.print()}
            style={{ background:"#fff", color:"#1A3A6E", border:"none",
              padding:"7px 18px", borderRadius:7, fontWeight:700, cursor:"pointer", fontSize:13 }}>
            🖨️ Imprimir / Salvar PDF
          </button>
          <button onClick={onClose}
            style={{ background:"rgba(255,255,255,0.15)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)",
              padding:"7px 16px", borderRadius:7, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>
            ✕ Fechar
          </button>
        </div>
      </div>

      {/* Área impressa */}
      <div id="print-area" style={{ background:"#fff", width:"210mm", minHeight:"297mm",
        padding:"8mm 10mm", marginTop:56, boxShadow:"0 8px 32px rgba(0,0,0,0.25)",
        fontFamily:"Arial,sans-serif", fontSize:11 }}>
        {children}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VISUALIZAÇÃO IMPRESSA – REGISTRO DIÁRIO
// ══════════════════════════════════════════════════════════════════════════════
function ImpressaoRegistro({ reg, numero, onClose }) {
  const p = PROFISSIONAIS.find(x=>x.id===reg.prof_id);
  const cor = TIPO_COR[reg.prof_tipo] || "#1A3A6E";
  const alunoData = (ALUNOS_POR_PROF[reg.prof_id]||[]).find(a=>a.nome===reg.aluno);

  const secTit = (txt) => (
    <div style={{ background:"#F0F4FF", borderLeft:`3px solid ${cor}`,
      padding:"4px 10px", fontWeight:700, fontSize:10, color:cor,
      marginBottom:6, marginTop:10, textTransform:"uppercase", letterSpacing:.5 }}>
      {txt}
    </div>
  );

  return (
    <PrintModal titulo="Registro Diário de Acompanhamento" onClose={onClose}>
      <CabecalhoImpresso
        titulo="Registro de Acompanhamento – Inclusão"
        numero={numero}
        tipo={reg.prof_tipo}
      />

      {/* Identificação */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:8, marginBottom:4 }}>
        {[
          ["Aluno(a)", reg.aluno],
          ["Turma", alunoData?.turma || "–"],
          ["Nível de Suporte", alunoData?.suporte || "–"],
          ["Profissional Responsável", p?.nome || "–"],
          ["Função", TIPO_LABEL[reg.prof_tipo] || "–"],
          ["Data", reg.data],
        ].map(([l,v],i)=>(
          <div key={i} style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"5px 8px" }}>
            <div style={{ fontSize:8, color:"#888", fontWeight:700, textTransform:"uppercase" }}>{l}</div>
            <div style={{ fontSize:11, fontWeight:600, color:"#1A3A6E", marginTop:2 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* 1. Frequência */}
      {secTit("1. Frequência e Horário")}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        <div style={{ fontSize:11 }}>
          <strong>Entrada:</strong>{" "}
          {reg.entradaOk ? "✅ No horário" : `⚠️ Atraso (${reg.atraso})`}
        </div>
        <div style={{ fontSize:11 }}>
          <strong>Saída:</strong>{" "}
          {reg.saidaOk ? "✅ No horário" : `⚠️ Antecipada – ${reg.saidaMot}`}
        </div>
      </div>

      {/* 2. Atividades */}
      {secTit("2. Atividades e Participação")}
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:10 }}>
        <thead>
          <tr style={{ background:"#F0F4FF" }}>
            {["Área","✅ Realizada","❌ Dificuldade","Observação"].map(h=>(
              <th key={h} style={{ padding:"4px 8px", textAlign:"left", border:"1px solid #E0E0E0",
                color:"#1A3A6E", fontSize:9, fontWeight:700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AREAS.map((area,i)=>{
            const a = reg.areas?.[area] || {};
            return (
              <tr key={area} style={{ background: i%2===0?"#fff":"#F8FAFC" }}>
                <td style={{ padding:"4px 8px", border:"1px solid #E0E0E0", fontWeight:500 }}>{area}</td>
                <td style={{ padding:"4px 8px", border:"1px solid #E0E0E0", textAlign:"center" }}>
                  {a.ok ? "✅" : "☐"}
                </td>
                <td style={{ padding:"4px 8px", border:"1px solid #E0E0E0", textAlign:"center" }}>
                  {a.dif ? "❌" : "☐"}
                </td>
                <td style={{ padding:"4px 8px", border:"1px solid #E0E0E0", fontSize:9, color:"#555" }}>
                  {a.obs_r || ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 3. Comportamento */}
      {secTit("3. Comportamento e Bem-Estar")}
      <div style={{ fontSize:11, marginBottom:4 }}>
        <strong>Humor predominante:</strong>{" "}
        {["Calmo","Agitado","Apático","Responsivo"].map(h=>(
          <span key={h} style={{ marginRight:14 }}>
            {reg.humor===h ? "● " : "○ "}{h}
          </span>
        ))}
      </div>
      <div style={{ fontSize:11, marginBottom:4 }}>
        <strong>Ocorreu alguma crise?</strong>{" "}
        {reg.crise ? "● Sim" : "○ Não"}{" "}
        <span style={{ marginLeft:20 }}>
          <strong>Intervenção da Direção:</strong>{" "}
          {reg.intervExt ? "● Sim" : "○ Não"}
        </span>
      </div>
      {reg.crise && reg.criseDesc && (
        <div style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"6px 8px",
          fontSize:10, color:"#444", background:"#FFF5F5", marginTop:4 }}>
          <strong>Descrição da crise:</strong> {reg.criseDesc}
        </div>
      )}

      {/* 4. Observações */}
      {secTit("4. Relato de Intercorrências / Observações Relevantes")}
      <div style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"8px 10px",
        fontSize:10, color:"#333", minHeight:48, lineHeight:1.7 }}>
        {reg.obs || <span style={{ color:"#ccc" }}>Sem observações registradas.</span>}
        {/* linhas extras para anotação manual */}
        {!reg.obs && ["","",""].map((_,i)=>(
          <div key={i} style={{ borderBottom:"1px solid #E0E0E0", marginTop:14 }} />
        ))}
      </div>

      {/* 5. Protocolo de Transição */}
      {secTit("5. Protocolo de Transição – \"Mão Segura\"")}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        <div style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"5px 8px" }}>
          <div style={{ fontSize:8, color:"#888", fontWeight:700, textTransform:"uppercase" }}>Aluno entregue para</div>
          <div style={{ fontSize:11, color:"#1A3A6E", marginTop:2, fontWeight:600 }}>
            {reg.entregue || <span style={{ color:"#ccc" }}>________________________</span>}
          </div>
        </div>
        <div style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"5px 8px" }}>
          <div style={{ fontSize:8, color:"#888", fontWeight:700, textTransform:"uppercase" }}>Horário</div>
          <div style={{ fontSize:11, color:"#1A3A6E", marginTop:2, fontWeight:600 }}>
            {reg.horSaida || <span style={{ color:"#ccc" }}>_______</span>}
          </div>
        </div>
      </div>

      <RodapeAssinaturas campos={[
        { titulo:"Profissional Responsável", sub:p?.nome },
        { titulo:"Direção / Coordenação Pedagógica" },
        { titulo:"Ciência do Responsável pelo Aluno" },
      ]} />

      {/* Metadados de arquivo */}
      <div style={{ marginTop:16, borderTop:"1px dashed #E0E0E0", paddingTop:8,
        display:"flex", justifyContent:"space-between", fontSize:8, color:"#aaa" }}>
        <span>Documento Nº {numero} · {UNIDADE} · {ANO}</span>
        <span>Gerado em: {reg.criado_em}</span>
        <span>Arquivar em: Pasta de Registros de Acompanhamento</span>
      </div>
    </PrintModal>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VISUALIZAÇÃO IMPRESSA – ATA DE OCORRÊNCIA
// ══════════════════════════════════════════════════════════════════════════════
function ImpressaoOcorrencia({ oco, numero, onClose }) {
  const p = PROFISSIONAIS.find(x=>x.id===oco.prof_id);

  return (
    <PrintModal titulo="Ata de Ocorrência Crítica" onClose={onClose}>
      <CabecalhoImpresso
        titulo="Ata de Registro de Ocorrência Crítica e Intervenção"
        numero={numero}
        tipo="AAI1"
      />

      <div style={{ background:"#FFF8E1", border:"1px solid #FFD54F", borderRadius:4,
        padding:"6px 10px", fontSize:9, color:"#7B5800", marginBottom:8 }}>
        ⚖️ Este documento é proteção jurídica e pedagógica da escola. Registra que os protocolos foram seguidos e subsidia ajustes no PEI do aluno.
      </div>

      {/* 1. Identificação */}
      <div style={{ fontWeight:700, fontSize:10, color:"#1A3A6E", textTransform:"uppercase",
        letterSpacing:.5, marginBottom:5, borderLeft:"3px solid #D32F2F", paddingLeft:6 }}>
        1. Identificação
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:6, marginBottom:8 }}>
        {[
          ["Aluno(a)", oco.aluno],
          ["Turma", oco.turma],
          ["Data", oco.data],
          ["Início", oco.horaIni],
          ["Fim", oco.horaFim],
        ].map(([l,v])=>(
          <div key={l} style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"4px 7px" }}>
            <div style={{ fontSize:8, color:"#888", fontWeight:700, textTransform:"uppercase" }}>{l}</div>
            <div style={{ fontSize:10, fontWeight:600, color:"#1A3A6E", marginTop:1 }}>{v||"–"}</div>
          </div>
        ))}
      </div>
      <div style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"4px 8px", marginBottom:8 }}>
        <div style={{ fontSize:8, color:"#888", fontWeight:700, textTransform:"uppercase" }}>Profissional(is) Envolvido(s)</div>
        <div style={{ fontSize:10, fontWeight:600, color:"#1A3A6E", marginTop:1 }}>{p?.nome || "–"}</div>
      </div>

      {/* 2. Natureza */}
      <div style={{ fontWeight:700, fontSize:10, color:"#1A3A6E", textTransform:"uppercase",
        letterSpacing:.5, marginBottom:5, borderLeft:"3px solid #D32F2F", paddingLeft:6 }}>
        2. Natureza da Ocorrência
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
        {TIPOS_NAT.map(n=>(
          <span key={n} style={{ fontSize:9, padding:"2px 8px", borderRadius:10,
            background: (oco.naturezas||[]).includes(n) ? "#FFE0E0":"#F5F5F5",
            border: `1px solid ${(oco.naturezas||[]).includes(n) ? "#D32F2F":"#E0E0E0"}`,
            color: (oco.naturezas||[]).includes(n) ? "#D32F2F":"#999",
            fontWeight:(oco.naturezas||[]).includes(n)?700:400 }}>
            {(oco.naturezas||[]).includes(n) ? "● " : "○ "}{n}
          </span>
        ))}
      </div>

      {/* 3. Antecedentes */}
      <div style={{ fontWeight:700, fontSize:10, color:"#1A3A6E", textTransform:"uppercase",
        letterSpacing:.5, marginBottom:4, borderLeft:"3px solid #D32F2F", paddingLeft:6 }}>
        3. Antecedentes e Gatilhos
      </div>
      <div style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"6px 8px", minHeight:36,
        fontSize:10, color:"#333", lineHeight:1.6, marginBottom:8 }}>
        {oco.antecedentes || <span style={{color:"#ccc"}}>__________________________________________</span>}
      </div>

      {/* 4. Intervenção */}
      <div style={{ fontWeight:700, fontSize:10, color:"#1A3A6E", textTransform:"uppercase",
        letterSpacing:.5, marginBottom:4, borderLeft:"3px solid #D32F2F", paddingLeft:6 }}>
        4. Protocolo de Intervenção Aplicado
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, marginBottom:8 }}>
        {INTV_OPS.map(n=>(
          <div key={n} style={{ fontSize:9, display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ color: (oco.intervencoes||[]).includes(n) ? "#D32F2F":"#999", fontSize:11 }}>
              {(oco.intervencoes||[]).includes(n) ? "●":"○"}
            </span>
            <span style={{ color:(oco.intervencoes||[]).includes(n)?"#333":"#999",
              fontWeight:(oco.intervencoes||[]).includes(n)?600:400 }}>{n}</span>
          </div>
        ))}
      </div>

      {/* 5. Desfecho */}
      <div style={{ fontWeight:700, fontSize:10, color:"#1A3A6E", textTransform:"uppercase",
        letterSpacing:.5, marginBottom:4, borderLeft:"3px solid #D32F2F", paddingLeft:6 }}>
        5. Desfecho e Comunicação
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:6, marginBottom:8 }}>
        {[
          ["Responsável Notificado", oco.responsavel],
          ["Via", oco.viaContato],
          ["Hora do Contato", oco.horContato],
          ["Hora da Retirada", oco.horRetirada],
        ].map(([l,v])=>(
          <div key={l} style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"4px 7px" }}>
            <div style={{ fontSize:8, color:"#888", fontWeight:700, textTransform:"uppercase" }}>{l}</div>
            <div style={{ fontSize:10, fontWeight:600, color:"#1A3A6E", marginTop:1 }}>{v||"–"}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:12, marginBottom:8 }}>
        {["Retornou à aula","Foi para casa","Encaminhado ao Hospital"].map(e=>(
          <span key={e} style={{ fontSize:9 }}>
            {oco.encaminhamento===e ? "● ":"○ "}
            <strong style={{ color: oco.encaminhamento===e ? "#D32F2F":"#999" }}>{e}</strong>
          </span>
        ))}
      </div>

      {/* 6. Relato */}
      <div style={{ fontWeight:700, fontSize:10, color:"#1A3A6E", textTransform:"uppercase",
        letterSpacing:.5, marginBottom:4, borderLeft:"3px solid #D32F2F", paddingLeft:6 }}>
        6. Relato Circunstanciado (dados objetivos, sem juízo de valor)
      </div>
      <div style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"8px 10px",
        minHeight:64, fontSize:10, color:"#333", lineHeight:1.8, marginBottom:8 }}>
        {oco.relato}
        {[...Array(4)].map((_,i)=>(
          <div key={i} style={{ borderBottom:"1px solid #E0E0E0", marginTop:14 }} />
        ))}
      </div>

      <RodapeAssinaturas campos={[
        { titulo:"Profissional Responsável (Relator)", sub:p?.nome },
        { titulo:"Direção / Coordenação Pedagógica" },
        { titulo:"Responsável pelo Aluno (Ciente do Fato)" },
      ]} />

      <div style={{ marginTop:14, borderTop:"1px dashed #E0E0E0", paddingTop:6,
        display:"flex", justifyContent:"space-between", fontSize:8, color:"#aaa" }}>
        <span>Ocorrência Nº {numero} · {UNIDADE} · {ANO}</span>
        <span>Gerado em: {oco.criado_em}</span>
        <span>Arquivar em: Pasta de Ocorrências Críticas</span>
      </div>
    </PrintModal>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VISUALIZAÇÃO IMPRESSA – ESCALA SEMANAL
// ══════════════════════════════════════════════════════════════════════════════
function ImpressaoEscala({ esc, numero, onClose }) {
  const horarios = esc.turno==="Manhã"
    ? [{hora:"08:00–08:15",ativ:"Entrada/Chegada",de:"Monitores",para:"Mediadores/Prof.",local:"Sala de Aula"},
       {hora:"09:30–10:00",ativ:"Lanche/Recreio", de:"Mediadores",para:"Cuidadores",local:"Refeitório/Pátio"},
       {hora:"10:00–10:15",ativ:"Retorno à Sala", de:"Cuidadores",para:"Mediadores",local:"Sala de Aula"},
       {hora:"11:45–12:00",ativ:"Saída/Embarque", de:"Mediadores",para:"Monitores",local:"Portão/Ônibus"}]
    : [{hora:"13:00–13:15",ativ:"Entrada/Chegada",de:"Monitores",para:"Mediadores/Prof.",local:"Sala de Aula"},
       {hora:"14:30–15:00",ativ:"Lanche/Recreio", de:"Mediadores",para:"Cuidadores",local:"Refeitório/Pátio"},
       {hora:"15:00–15:15",ativ:"Retorno à Sala", de:"Cuidadores",para:"Mediadores",local:"Sala de Aula"},
       {hora:"16:45–17:00",ativ:"Saída/Embarque", de:"Mediadores",para:"Monitores",local:"Portão/Ônibus"}];

  const secTit = txt => (
    <div style={{ background:"#E8F5E9", borderLeft:"3px solid #2E7D32",
      padding:"4px 10px", fontWeight:700, fontSize:9, color:"#2E7D32",
      marginBottom:5, marginTop:10, textTransform:"uppercase", letterSpacing:.5 }}>
      {txt}
    </div>
  );

  return (
    <PrintModal titulo="Escala Semanal" onClose={onClose}>
      <CabecalhoImpresso
        titulo="Escala Semanal de Apoio à Inclusão"
        numero={numero}
        tipo="AAI1"
      />

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
        <div style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"5px 8px" }}>
          <div style={{ fontSize:8, color:"#888", fontWeight:700, textTransform:"uppercase" }}>Semana</div>
          <div style={{ fontSize:11, fontWeight:600, color:"#1A3A6E" }}>{esc.semana || "________________________"}</div>
        </div>
        <div style={{ border:"1px solid #E0E0E0", borderRadius:4, padding:"5px 8px" }}>
          <div style={{ fontSize:8, color:"#888", fontWeight:700, textTransform:"uppercase" }}>Turno</div>
          <div style={{ fontSize:11, fontWeight:600, color:"#2E7D32" }}>
            {esc.turno==="Manhã" ? "☀️ Manhã (08h–12h)":"🌙 Tarde (13h–17h)"}
          </div>
        </div>
      </div>

      {secTit("Grade de Alocação por Aluno")}
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:9 }}>
        <thead>
          <tr style={{ background:"#1A3A6E", color:"#fff" }}>
            {["Aluno (PcD)","Suporte","Mediador (AAI 1) – Pedagógico","Cuidador (AAI 2) – Vida Diária","Turma"].map(h=>(
              <th key={h} style={{ padding:"5px 7px", textAlign:"left", fontSize:8 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(ALUNOS_POR_PROF).flat()
            .filter((a,i,arr)=>arr.findIndex(x=>x.nome===a.nome)===i)
            .filter(a=>a.turno===(esc.turno==="Manhã"?"1°":"2°"))
            .slice(0,12)
            .map((a,i)=>{
              const med = PROFISSIONAIS.find(pr=>pr.tipo==="AAI1"&&(ALUNOS_POR_PROF[pr.id]||[]).some(al=>al.nome===a.nome));
              const cui = PROFISSIONAIS.find(pr=>pr.tipo==="AAI2"&&(ALUNOS_POR_PROF[pr.id]||[]).some(al=>al.nome===a.nome));
              return (
                <tr key={a.nome} style={{ background:i%2===0?"#fff":"#F8FAFC" }}>
                  <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8", fontWeight:500 }}>
                    {a.nome.split(" ").slice(0,3).join(" ")}
                  </td>
                  <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8", textAlign:"center" }}>
                    <span style={{ fontSize:8, fontWeight:700, color:SUP_COR[a.suporte] }}>{a.suporte}</span>
                  </td>
                  <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8", color:"#1A3A6E", fontSize:8 }}>
                    {med?.nome?.split(" ").slice(0,2).join(" ") || "–"}
                  </td>
                  <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8", color:"#2E7D32", fontSize:8 }}>
                    {cui?.nome?.split(" ").slice(0,2).join(" ") || "–"}
                  </td>
                  <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8", textAlign:"center" }}>
                    {a.turma}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {secTit(`Cronograma de Rotina – Momentos Críticos (${esc.turno})`)}
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:9 }}>
        <thead>
          <tr style={{ background:"#2E7D32", color:"#fff" }}>
            {["Horário","Atividade","De","Para","Local"].map(h=>(
              <th key={h} style={{ padding:"5px 7px", textAlign:"left", fontSize:8 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map((h,i)=>(
            <tr key={i} style={{ background:i%2===0?"#F0FFF4":"#fff" }}>
              <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8", fontWeight:700 }}>{h.hora}</td>
              <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8" }}>{h.ativ}</td>
              <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8", color:"#666" }}>{h.de}</td>
              <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8", color:"#2E7D32", fontWeight:600 }}>→ {h.para}</td>
              <td style={{ padding:"5px 7px", border:"1px solid #E8E8E8" }}>{h.local}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {secTit("Observações por Dia")}
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:9 }}>
        <tbody>
          {DIAS.map((d,i)=>(
            <tr key={d} style={{ background:i%2===0?"#fff":"#F8FAFC" }}>
              <td style={{ padding:"5px 8px", border:"1px solid #E8E8E8", fontWeight:700,
                width:70, color:"#1A3A6E" }}>{d}</td>
              <td style={{ padding:"5px 8px", border:"1px solid #E8E8E8", color:"#333" }}>
                {esc.obsD?.[d] || <span style={{ borderBottom:"1px solid #E0E0E0", display:"block", height:14 }}/>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <RodapeAssinaturas campos={[
        { titulo:"Coordenação Pedagógica" },
        { titulo:"Secretaria Escolar" },
        { titulo:"Direção" },
      ]} />

      <div style={{ marginTop:12, borderTop:"1px dashed #E0E0E0", paddingTop:6,
        display:"flex", justifyContent:"space-between", fontSize:8, color:"#aaa" }}>
        <span>Escala Nº {numero} · {UNIDADE} · {ANO}</span>
        <span>Gerado em: {esc.criado_em}</span>
        <span>Arquivar em: Pasta de Escalas Semanais</span>
      </div>
    </PrintModal>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TELA DE GESTÃO DE IMPRESSÃO (Secretaria Escolar)
// ══════════════════════════════════════════════════════════════════════════════
function GestaoImpressao({ registros, ocorrencias, escalas }) {
  const [aba, setAba] = useState("registros");
  const [printReg, setPrintReg] = useState(null);
  const [printOco, setPrintOco] = useState(null);
  const [printEsc, setPrintEsc] = useState(null);
  const [busca, setBusca] = useState("");

  const filtrar = (lista) => !busca ? lista
    : lista.filter(r=>(r.aluno||r.semana||"").toLowerCase().includes(busca.toLowerCase())
      || (r.prof_nome||"").toLowerCase().includes(busca.toLowerCase()));

  const abas = [
    { id:"registros",  label:`📋 Registros Diários (${registros.length})` },
    { id:"ocorrencias",label:`⚠️ Ocorrências (${ocorrencias.length})` },
    { id:"escalas",    label:`📅 Escalas Semanais (${escalas.length})` },
  ];

  function DocCard({ label, num, sub, tipo, onPrint }) {
    const cor = tipo==="oco" ? "#D32F2F" : tipo==="esc" ? "#2E7D32" : "#1A3A6E";
    return (
      <div style={{ background:"#fff", borderRadius:10, boxShadow:"0 1px 6px rgba(0,0,0,0.08)",
        padding:"14px 16px", borderLeft:`4px solid ${cor}`,
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontWeight:700, color:"#1A3A6E", fontSize:13 }}>{label}</div>
          <div style={{ fontSize:11, color:"#888", marginTop:3 }}>{sub}</div>
          <div style={{ fontSize:10, color:"#aaa", marginTop:2 }}>
            Documento Nº <strong style={{ color:cor }}>{num}</strong>
          </div>
        </div>
        <button onClick={onPrint} style={{...btn(cor), display:"flex", alignItems:"center", gap:6 }}>
          🖨️ Imprimir
        </button>
      </div>
    );
  }

  return (
    <div>
      {printReg && <ImpressaoRegistro reg={printReg} numero={printReg.docNum} onClose={()=>setPrintReg(null)} />}
      {printOco && <ImpressaoOcorrencia oco={printOco} numero={printOco.docNum} onClose={()=>setPrintOco(null)} />}
      {printEsc && <ImpressaoEscala esc={printEsc} numero={printEsc.docNum} onClose={()=>setPrintEsc(null)} />}

      <div style={{ display:"flex", gap:2, marginBottom:18, flexWrap:"wrap" }}>
        {abas.map(a=>(
          <button key={a.id} onClick={()=>setAba(a.id)} style={{
            padding:"8px 18px", borderRadius:8, border:"none", cursor:"pointer",
            background: aba===a.id ? "#1A3A6E":"#fff",
            color: aba===a.id ? "#fff":"#555",
            fontWeight: aba===a.id ? 700:500, fontSize:13, fontFamily:"inherit",
            boxShadow:"0 1px 4px rgba(0,0,0,0.08)",
          }}>{a.label}</button>
        ))}
      </div>

      <input placeholder="🔍 Buscar por aluno, profissional ou semana..." value={busca}
        onChange={e=>setBusca(e.target.value)}
        style={{...inp, maxWidth:400, marginBottom:16}} />

      {aba==="registros" && (
        filtrar(registros).length===0
          ? <div style={{...card, textAlign:"center", color:"#999", padding:40}}>📭 Nenhum registro encontrado.</div>
          : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {filtrar(registros).sort((a,b)=>b.id-a.id).map((r,i)=>(
                <DocCard key={r.id}
                  label={r.aluno}
                  sub={`${r.prof_nome} · ${r.data} · Humor: ${r.humor}`}
                  num={`RD-${padNum(registros.length-i)}`}
                  tipo="reg"
                  onPrint={()=>setPrintReg({...r, docNum:`RD-${padNum(registros.length-i)}`})} />
              ))}
            </div>
      )}

      {aba==="ocorrencias" && (
        filtrar(ocorrencias).length===0
          ? <div style={{...card, textAlign:"center", color:"#999", padding:40}}>✅ Nenhuma ocorrência.</div>
          : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {filtrar(ocorrencias).sort((a,b)=>b.id-a.id).map((o,i)=>(
                <DocCard key={o.id}
                  label={o.aluno}
                  sub={`${o.prof_nome} · ${o.data} · ${(o.naturezas||[]).join(", ")}`}
                  num={`OC-${padNum(ocorrencias.length-i)}`}
                  tipo="oco"
                  onPrint={()=>setPrintOco({...o, docNum:`OC-${padNum(ocorrencias.length-i)}`})} />
              ))}
            </div>
      )}

      {aba==="escalas" && (
        filtrar(escalas).length===0
          ? <div style={{...card, textAlign:"center", color:"#999", padding:40}}>📭 Nenhuma escala registrada.</div>
          : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {filtrar(escalas).sort((a,b)=>b.id-a.id).map((e,i)=>(
                <DocCard key={e.id}
                  label={`Escala – ${e.semana||"semana não informada"}`}
                  sub={`Turno ${e.turno} · Gerado em ${e.criado_em}`}
                  num={`ES-${padNum(escalas.length-i)}`}
                  tipo="esc"
                  onPrint={()=>setPrintEsc({...e, docNum:`ES-${padNum(escalas.length-i)}`})} />
              ))}
            </div>
      )}

      {/* Legenda numeração */}
      <div style={{ marginTop:24, background:"#F0F4FF", borderRadius:10, padding:"14px 18px" }}>
        <div style={{ fontWeight:700, color:"#1A3A6E", fontSize:13, marginBottom:8 }}>
          📁 Sistema de Numeração para Arquivamento
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {[
            { pref:"RD-", desc:"Registros Diários de Acompanhamento", pasta:"Pasta de Registros de Acompanhamento", cor:"#1A3A6E" },
            { pref:"OC-", desc:"Atas de Ocorrência Crítica e Intervenção", pasta:"Pasta de Ocorrências Críticas", cor:"#D32F2F" },
            { pref:"ES-", desc:"Escalas Semanais de Apoio à Inclusão", pasta:"Pasta de Escalas Semanais", cor:"#2E7D32" },
          ].map(x=>(
            <div key={x.pref} style={{ background:"#fff", borderRadius:8, padding:"10px 12px",
              borderTop:`3px solid ${x.cor}` }}>
              <div style={{ fontWeight:800, fontSize:14, color:x.cor }}>{x.pref}NNNNN</div>
              <div style={{ fontSize:11, color:"#333", marginTop:4 }}>{x.desc}</div>
              <div style={{ fontSize:10, color:"#888", marginTop:4 }}>📂 {x.pasta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TELA DE LOGIN
// ══════════════════════════════════════════════════════════════════════════════
function LoginScreen({ onLogin }) {
  const [sel, setSel]     = useState("");
  const [modo, setModo]   = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro]   = useState(false);

  function entrar() {
    if (modo==="direcao"||modo==="secretaria") {
      if (senha==="direcao2026") onLogin(modo==="secretaria" ? "secretaria" : null);
      else { setErro(true); setTimeout(()=>setErro(false),2000); }
    } else if (sel) onLogin(sel);
  }

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#1A3A6E,#2E75B6)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"32px 36px", width:"100%", maxWidth:520,
        boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:40 }}>🏫</div>
          <div style={{ fontWeight:800, fontSize:17, color:"#1A3A6E" }}>{UNIDADE}</div>
          <div style={{ fontSize:12, color:"#888", marginTop:3 }}>
            Sistema de Acompanhamento da Inclusão · {ANO}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:20 }}>
          {[
            {id:"prof",       icon:"👤", label:"Profissional"},
            {id:"secretaria", icon:"🗂️", label:"Secretaria Escolar"},
            {id:"direcao",    icon:"🔑", label:"Equipe Diretiva"},
          ].map(m=>(
            <button key={m.id} onClick={()=>{setModo(m.id);setSel("");setSenha("");}}
              style={{ padding:"12px 8px", borderRadius:10, border:"2px solid",
                borderColor:modo===m.id?"#1A3A6E":"#E0E0E0",
                background:modo===m.id?"#E8F4FD":"#fff",
                color:modo===m.id?"#1A3A6E":"#666",
                fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit",
                textAlign:"center", lineHeight:1.5 }}>
              <div style={{ fontSize:22 }}>{m.icon}</div>
              {m.label}
            </button>
          ))}
        </div>

        {modo==="prof" && (
          <>
            {["AAI1","AAI2","AxEI"].map(t=>(
              <div key={t} style={{ marginBottom:14 }}>
                <div style={{ fontSize:10, fontWeight:700, color:TIPO_COR[t],
                  textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>
                  {TIPO_LABEL[t]}
                </div>
                {PROFISSIONAIS.filter(p=>p.tipo===t).map(p=>(
                  <button key={p.id} onClick={()=>setSel(p.id)}
                    style={{ display:"block", width:"100%", padding:"8px 12px", marginBottom:4,
                      borderRadius:8, border:"2px solid",
                      borderColor:sel===p.id?TIPO_COR[t]:"#E0E0E0",
                      background:sel===p.id?TIPO_BG[t]:"#fff",
                      color:sel===p.id?TIPO_COR[t]:"#333",
                      textAlign:"left", cursor:"pointer", fontSize:12,
                      fontWeight:sel===p.id?700:400, fontFamily:"inherit" }}>
                    {p.nome}
                    <span style={{ fontSize:10, color:"#999", marginLeft:8 }}>
                      Turmas {p.turmas.join(", ")} · {p.turno.join("/")} turno
                    </span>
                  </button>
                ))}
              </div>
            ))}
            <button onClick={entrar} disabled={!sel}
              style={{...btn("#1A3A6E",!sel), width:"100%", marginTop:6, padding:"12px"}}>
              Acessar meu painel →
            </button>
          </>
        )}

        {(modo==="direcao"||modo==="secretaria") && (
          <>
            <label style={lbl}>
              {modo==="secretaria" ? "Senha da Secretaria Escolar":"Senha da Equipe Diretiva"}
            </label>
            <input type="password" value={senha} onChange={e=>setSenha(e.target.value)}
              placeholder="Digite a senha" style={{...inp, marginBottom:12}}
              onKeyDown={e=>e.key==="Enter"&&entrar()} />
            {erro && <div style={{ color:"#D32F2F", fontSize:12, marginBottom:10 }}>
              ❌ Senha incorreta.
            </div>}
            <button onClick={entrar}
              style={{...btn(modo==="secretaria"?"#6A0572":"#1A3A6E"), width:"100%", padding:"12px"}}>
              {modo==="secretaria" ? "Acessar Gestão de Impressão →":"Acessar Painel da Direção →"}
            </button>
            <div style={{ fontSize:10, color:"#aaa", textAlign:"center", marginTop:6 }}>
              Senha padrão: direcao2026
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HEADER
// ══════════════════════════════════════════════════════════════════════════════
function Header({ prof, view, setView, onLogout }) {
  const isSecretaria = prof==="secretaria";
  const isDirecao    = prof===null;
  const p = (!isSecretaria&&!isDirecao) ? PROFISSIONAIS.find(x=>x.id===prof) : null;
  const cor = isSecretaria ? "#6A0572" : isDirecao ? "#1A3A6E" : TIPO_COR[p?.tipo]||"#1A3A6E";

  const tabs = isSecretaria
    ? [{ id:"impressao", label:"🖨️ Gestão de Impressão e Arquivo" }]
    : isDirecao
      ? [
          {id:"painel",         label:"📊 Painel"},
          {id:"profissionais",  label:"👥 Profissionais"},
          {id:"escala_dir",     label:"📅 Escala"},
          {id:"historico",      label:"📚 Histórico"},
          {id:"ocorrencias_dir",label:"⚠️ Ocorrências"},
          {id:"plano_acao",     label:"📘 Plano de Ação"},
          {id:"impressao",      label:"🖨️ Impressão"},
        ]
      : p?.tipo==="AAI1"
        ? [{id:"meu_painel",label:"Meu Painel"},{id:"registro",label:"📝 Registro Diário"},{id:"ocorrencia",label:"⚠️ Ocorrência"},{id:"escala",label:"📅 Escala"}]
        : p?.tipo==="AAI2"
          ? [{id:"meu_painel",label:"Meu Painel"},{id:"registro",label:"📝 Registro Diário"},{id:"ocorrencia",label:"⚠️ Ocorrência"}]
          : [{id:"meu_painel",label:"Meu Painel"},{id:"registro",label:"📝 Registro Diário"},{id:"ocorrencia",label:"⚠️ Ocorrência"}];

  return (
    <header style={{ background:`linear-gradient(135deg,${cor} 0%,${cor}BB 100%)`,
      color:"#fff", boxShadow:"0 2px 10px rgba(0,0,0,0.18)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"12px 20px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:28 }}>🏫</span>
            <div>
              <div style={{ fontSize:9, opacity:.75, textTransform:"uppercase", letterSpacing:1 }}>
                Centro de Referência em Educação Inclusiva · {ANO}
              </div>
              <div style={{ fontWeight:800, fontSize:14 }}>{UNIDADE}</div>
              {isSecretaria && <div style={{ fontSize:11, opacity:.9 }}>🗂️ Secretaria Escolar – Gestão de Impressão</div>}
              {isDirecao    && <div style={{ fontSize:11, opacity:.9 }}>🔑 Equipe Diretiva</div>}
              {p            && <div style={{ fontSize:11, opacity:.9 }}>{p.nome} · {TIPO_LABEL[p.tipo]}</div>}
            </div>
          </div>
          <button onClick={onLogout} style={{ background:"rgba(255,255,255,0.15)",
            border:"1px solid rgba(255,255,255,0.3)", color:"#fff",
            borderRadius:7, padding:"5px 12px", cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>
            Sair
          </button>
        </div>
        <nav style={{ display:"flex", gap:2, overflowX:"auto" }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setView(t.id)} style={{
              background:view===t.id?"#fff":"transparent",
              color:view===t.id?cor:"rgba(255,255,255,0.85)",
              border:"none", cursor:"pointer", padding:"6px 14px",
              borderRadius:"8px 8px 0 0", fontWeight:view===t.id?700:500,
              fontSize:12, whiteSpace:"nowrap", fontFamily:"inherit",
            }}>{t.label}</button>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// FORMULÁRIOS SIMPLIFICADOS (reutilizados da v2)
// ══════════════════════════════════════════════════════════════════════════════
function MeuPainel({ profId, registros, ocorrencias, setView }) {
  const p = PROFISSIONAIS.find(x=>x.id===profId);
  const alunos = ALUNOS_POR_PROF[profId]||[];
  const cor = TIPO_COR[p.tipo];
  const FOCO = {
    AAI1:{foco:"Suporte pedagógico direto e fomento à autonomia do aluno em sala.",nao:"Demandas exclusivas de higiene e alimentação.",icon:"📚"},
    AAI2:{foco:"Bem-estar básico: higiene, alimentação e conforto físico.",nao:"Mediação pedagógica ou intervenções educacionais.",icon:"🤝"},
    AxEI:{foco:"Auxílio colaborativo sob supervisão do professor regente.",nao:"Decisões pedagógicas sem supervisão.",icon:"🌟"},
  };
  const f=FOCO[p.tipo];
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
      <div style={{...card, gridColumn:"1/-1", borderTop:`4px solid ${cor}`}}>
        <div style={{ fontSize:20, fontWeight:800, color:cor }}>{f.icon} {p.nome}</div>
        <div style={{ fontSize:12, color:"#666", marginTop:4 }}>{p.vinculo} · Turno {p.turno.join("/")} · Turmas {p.turmas.join(", ")}</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:12 }}>
          <div style={{ background:"#F0FFF4", borderRadius:8, padding:"10px 12px", borderLeft:"3px solid #2E7D32" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#2E7D32" }}>✅ MEU FOCO</div>
            <div style={{ fontSize:12, color:"#333", marginTop:3 }}>{f.foco}</div>
          </div>
          <div style={{ background:"#FFF5F5", borderRadius:8, padding:"10px 12px", borderLeft:"3px solid #D32F2F" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#D32F2F" }}>⛔ NÃO É MEU PAPEL</div>
            <div style={{ fontSize:12, color:"#333", marginTop:3 }}>{f.nao}</div>
          </div>
        </div>
      </div>
      {[
        {icon:"📋",val:registros.filter(r=>r.prof_id===profId).length,label:"Registros",cor:"#1565C0"},
        {icon:"📅",val:registros.filter(r=>r.prof_id===profId&&r.data===hoje()).length,label:"Hoje",cor:"#2E7D32"},
        {icon:"⚠️",val:ocorrencias.filter(r=>r.prof_id===profId).length,label:"Ocorrências",cor:"#D32F2F"},
        {icon:"👦",val:alunos.length,label:"Alunos",cor},
      ].map((c,i)=>(
        <div key={i} style={{...card, borderTop:`4px solid ${c.cor}`, textAlign:"center"}}>
          <div style={{ fontSize:24 }}>{c.icon}</div>
          <div style={{ fontSize:28, fontWeight:800, color:c.cor }}>{c.val}</div>
          <div style={{ fontSize:11, color:"#666" }}>{c.label}</div>
        </div>
      ))}
      <div style={{...card, gridColumn:"1/-1"}}>
        <div style={{ fontWeight:700, fontSize:14, color:cor, marginBottom:10 }}>👦 Meus Alunos</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {alunos.map((a,i)=>(
            <div key={i} style={{ background:TIPO_BG[p.tipo], borderRadius:8, padding:"8px 12px", border:`1px solid ${cor}22` }}>
              <div style={{ fontWeight:700, fontSize:12, color:"#1A3A6E" }}>{a.nome}</div>
              <div style={{ fontSize:10, color:"#666" }}>Turma {a.turma} · {a.suporte}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{...card, gridColumn:"1/-1"}}>
        <div style={{ fontWeight:700, fontSize:13, color:"#1A3A6E", marginBottom:10 }}>⚡ Ações Rápidas</div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button onClick={()=>setView("registro")} style={btn(cor)}>📝 Novo Registro Diário</button>
          <button onClick={()=>setView("ocorrencia")} style={btn("#D32F2F")}>⚠️ Registrar Ocorrência</button>
          {p.tipo==="AAI1"&&<button onClick={()=>setView("escala")} style={btn("#2E7D32")}>📅 Escala Semanal</button>}
        </div>
      </div>
    </div>
  );
}

// Lista global de todos os alunos (para modo cobertura)
const TODOS_ALUNOS = Object.values(ALUNOS_POR_PROF)
  .flat()
  .filter((a,i,arr) => arr.findIndex(x=>x.nome===a.nome)===i)
  .sort((a,b)=>a.nome.localeCompare(b.nome));

function RegistroDiario({ profId, onSave, registros }) {
  const p = PROFISSIONAIS.find(x=>x.id===profId);
  const meus_alunos = ALUNOS_POR_PROF[profId]||[];
  const cor = TIPO_COR[p.tipo];

  // ── modo cobertura ─────────────────────────────────────────────────────────
  const [modoCob, setModoCob]   = useState(false); // false = aluno normal, true = cobertura
  const [aluno,   setAluno]     = useState("");
  const [alunoNomeLivre, setAlunoNomeLivre] = useState(""); // para aluno não cadastrado
  const [motivoCob, setMotivoCob] = useState("");

  // decide a lista de alunos conforme o modo
  const listaAlunos = modoCob ? TODOS_ALUNOS : meus_alunos;
  const alunoFinal  = aluno;

  // profissional original do aluno selecionado (para notificação na tela da direção)
  const profOriginal = modoCob && aluno
    ? PROFISSIONAIS.find(pr => (ALUNOS_POR_PROF[pr.id]||[]).some(a=>a.nome===aluno))
    : null;

  // ── demais estados ─────────────────────────────────────────────────────────
  const [data,setData]=useState(hoje());
  const [entradaOk,setEntradaOk]=useState(true); const [atraso,setAtraso]=useState("");
  const [saidaOk,setSaidaOk]=useState(true); const [saidaMot,setSaidaMot]=useState("");
  const [humor,setHumor]=useState(""); const [crise,setCrise]=useState(false);
  const [criseDesc,setCriseDesc]=useState(""); const [intervExt,setIntervExt]=useState(false);
  const [obs,setObs]=useState(""); const [entregue,setEntregue]=useState(""); const [horSaida,setHorSaida]=useState("");
  const [areas,setAreas]=useState(AREAS.reduce((a,k)=>({...a,[k]:{ok:false,dif:false,obs_r:""}}),{}));
  const [ok,setOk]=useState(false);

  function toggle(area,campo){setAreas(prev=>({...prev,[area]:{...prev[area],[campo]:!prev[area][campo]}}))}

  function resetForm(){
    setAluno("");setHumor("");setObs("");setCriseDesc("");setEntregue("");setHorSaida("");
    setCrise(false);setIntervExt(false);setEntradaOk(true);setSaidaOk(true);
    setMotivoCob("");setAlunoNomeLivre("");
    setAreas(AREAS.reduce((a,k)=>({...a,[k]:{ok:false,dif:false,obs_r:""}}),{}));
  }

  function handleSave(){
    const nomeAluno = aluno || alunoNomeLivre;
    if(!nomeAluno||!humor)return;
    onSave({
      id:Date.now(), prof_id:profId, prof_nome:p.nome, prof_tipo:p.tipo,
      aluno:nomeAluno, data,
      cobertura: modoCob,
      motivo_cobertura: modoCob ? motivoCob : "",
      prof_original: profOriginal ? profOriginal.nome : "",
      entradaOk, atraso, saidaOk, saidaMot,
      areas, humor, crise, criseDesc, intervExt, obs, entregue, horSaida,
      criado_em:agora(),
    },"registros");
    resetForm();
    setOk(true); setTimeout(()=>setOk(false),3500);
  }

  const canSave = (aluno||alunoNomeLivre) && humor && (!modoCob || motivoCob);

  return (
    <div style={{maxWidth:720,margin:"0 auto"}}>
      {ok&&<div style={{background:"#E8F5E9",border:"1px solid #A5D6A7",borderRadius:8,padding:"12px 16px",marginBottom:14,color:"#2E7D32",fontWeight:600}}>
        ✅ Registro salvo!{modoCob?" A direção foi notificada sobre o atendimento de cobertura.":""} Disponível para impressão na Secretaria Escolar.
      </div>}

      <div style={{...card,borderTop:`4px solid ${cor}`}}>
        <div style={{fontWeight:800,fontSize:15,color:cor,marginBottom:14}}>📝 Registro de Acompanhamento (Inclusão)</div>

        {/* ── SELETOR DE MODO ────────────────────────────────────────────── */}
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          <button onClick={()=>{setModoCob(false);setAluno("");setAlunoNomeLivre("");}}
            style={{flex:1,padding:"10px",borderRadius:8,border:"2px solid",
              borderColor:!modoCob?cor:"#E0E0E0",
              background:!modoCob?TIPO_BG[p.tipo]:"#fff",
              color:!modoCob?cor:"#666",
              fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
            👦 Meu aluno designado
          </button>
          <button onClick={()=>{setModoCob(true);setAluno("");}}
            style={{flex:1,padding:"10px",borderRadius:8,border:"2px solid",
              borderColor:modoCob?"#E65100":"#E0E0E0",
              background:modoCob?"#FFF3E0":"#fff",
              color:modoCob?"#E65100":"#666",
              fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
            🔄 Cobertura / Substituição
          </button>
        </div>

        {/* Banner de aviso cobertura */}
        {modoCob && (
          <div style={{background:"#FFF3E0",border:"1px solid #FFB74D",borderRadius:8,
            padding:"10px 14px",marginBottom:14,fontSize:13,color:"#7B4800"}}>
            <strong>⚠️ Modo Cobertura ativo.</strong> Este registro ficará marcado como atendimento fora da designação oficial e será destacado no painel da direção para ciência.
          </div>
        )}

        {/* ── SELEÇÃO DE ALUNO ───────────────────────────────────────────── */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          <div>
            <label style={lbl}>
              Aluno(a) * {modoCob && <span style={{color:"#E65100",fontSize:11}}>(qualquer aluno da escola)</span>}
            </label>
            <select value={aluno} onChange={e=>setAluno(e.target.value)} style={{...inp,background:"#fff"}}>
              <option value="">Selecione...</option>
              {modoCob ? (
                <>
                  <optgroup label="── Selecione o aluno ──">
                    {listaAlunos.map(a=>{
                      const dono = PROFISSIONAIS.find(pr=>(ALUNOS_POR_PROF[pr.id]||[]).some(al=>al.nome===a.nome));
                      return <option key={a.nome} value={a.nome}>{a.nome} (T{a.turma}·{a.suporte}{dono?` · ${dono.nome.split(" ")[0]}`:""})
                      </option>;
                    })}
                  </optgroup>
                  <optgroup label="── Aluno não encontrado na lista ──">
                    <option value="__livre__">Digitar nome manualmente...</option>
                  </optgroup>
                </>
              ) : (
                meus_alunos.map(a=><option key={a.nome} value={a.nome}>{a.nome} (T{a.turma}·{a.suporte})</option>)
              )}
            </select>
            {/* campo livre se aluno não estiver cadastrado */}
            {modoCob && aluno==="__livre__" && (
              <input value={alunoNomeLivre} onChange={e=>setAlunoNomeLivre(e.target.value)}
                placeholder="Nome completo do aluno" style={{...inp,marginTop:6}}/>
            )}
            {/* info do profissional original */}
            {modoCob && aluno && aluno!=="__livre__" && profOriginal && (
              <div style={{marginTop:5,fontSize:11,color:"#E65100",background:"#FFF3E0",
                borderRadius:6,padding:"4px 8px"}}>
                👤 Profissional designado: <strong>{profOriginal.nome}</strong>
              </div>
            )}
          </div>
          <div>
            <label style={lbl}>Data</label>
            <input value={data} onChange={e=>setData(e.target.value)} style={inp}/>
          </div>
        </div>

        {/* Motivo da cobertura */}
        {modoCob && (
          <div style={{background:"#FFF3E0",borderRadius:8,padding:"12px 14px",marginBottom:14,
            border:"1px solid #FFB74D"}}>
            <label style={{...lbl,color:"#E65100"}}>Motivo da cobertura / substituição *</label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
              {["Falta do profissional designado","Remanejamento pela secretaria",
                "Emergência / ausência imprevista","Solicitação da direção","Outro"].map(m=>(
                <label key={m} style={{cursor:"pointer",fontSize:12,padding:"5px 11px",borderRadius:16,
                  background:motivoCob===m?"#FFE0B2":"#fff",
                  border:`1px solid ${motivoCob===m?"#E65100":"#ddd"}`,
                  color:motivoCob===m?"#E65100":"#555",fontFamily:"inherit"}}>
                  <input type="radio" checked={motivoCob===m} onChange={()=>setMotivoCob(m)} style={{display:"none"}}/>
                  {m}
                </label>
              ))}
            </div>
          </div>
        )}

        <div style={{background:"#F8FAFC",borderRadius:8,padding:"12px 14px",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:12,color:"#1A3A6E",marginBottom:8}}>1. Frequência e Horário</div>
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            <div><span style={{fontSize:12,color:"#666"}}>Entrada: </span>
              {[{v:true,l:"No horário"},{v:false,l:"Atraso"}].map(o=>(
                <label key={o.l} style={{cursor:"pointer",fontSize:12,marginRight:10}}><input type="radio" checked={entradaOk===o.v} onChange={()=>setEntradaOk(o.v)}/> {o.l}</label>
              ))}{!entradaOk&&<input value={atraso} onChange={e=>setAtraso(e.target.value)} placeholder="tempo?" style={{...inp,width:"auto",marginLeft:6,fontSize:11,padding:"3px 8px"}}/>}
            </div>
            <div><span style={{fontSize:12,color:"#666"}}>Saída: </span>
              {[{v:true,l:"No horário"},{v:false,l:"Antecipada"}].map(o=>(
                <label key={o.l} style={{cursor:"pointer",fontSize:12,marginRight:10}}><input type="radio" checked={saidaOk===o.v} onChange={()=>setSaidaOk(o.v)}/> {o.l}</label>
              ))}{!saidaOk&&<input value={saidaMot} onChange={e=>setSaidaMot(e.target.value)} placeholder="motivo?" style={{...inp,width:"auto",marginLeft:6,fontSize:11,padding:"3px 8px"}}/>}
            </div>
          </div>
        </div>
        <div style={{background:"#F8FAFC",borderRadius:8,padding:"12px 14px",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:12,color:"#1A3A6E",marginBottom:8}}>2. Atividades e Participação</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{background:"#EEF2FF"}}>
              {["Área","✅ Realizada","❌ Dificuldade","Obs. rápida"].map(h=><th key={h} style={{padding:"5px 8px",textAlign:"left",fontSize:11}}>{h}</th>)}
            </tr></thead>
            <tbody>{AREAS.map((area,i)=>(
              <tr key={area} style={{background:i%2===0?"#fff":"#F8FAFC"}}>
                <td style={{padding:"5px 8px"}}>{area}</td>
                <td style={{padding:"5px 8px",textAlign:"center"}}><input type="checkbox" checked={areas[area].ok} onChange={()=>toggle(area,"ok")}/></td>
                <td style={{padding:"5px 8px",textAlign:"center"}}><input type="checkbox" checked={areas[area].dif} onChange={()=>toggle(area,"dif")}/></td>
                <td style={{padding:"5px 8px"}}><input value={areas[area].obs_r} onChange={e=>setAreas(p=>({...p,[area]:{...p[area],obs_r:e.target.value}}))} style={{...inp,padding:"3px 7px",fontSize:11}}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{background:"#F8FAFC",borderRadius:8,padding:"12px 14px",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:12,color:"#1A3A6E",marginBottom:8}}>3. Comportamento e Bem-Estar</div>
          <div style={{marginBottom:8}}>
            {["Calmo","Agitado","Apático","Responsivo"].map(h=>(
              <label key={h} style={{cursor:"pointer",marginRight:14,fontSize:12,padding:"4px 10px",borderRadius:16,background:humor===h?"#E8F4FD":"#fff",border:`1px solid ${humor===h?cor:"#ddd"}`,color:humor===h?cor:"#555"}}>
                <input type="radio" checked={humor===h} onChange={()=>setHumor(h)} style={{display:"none"}}/>{h}
              </label>
            ))}
          </div>
          <div style={{display:"flex",gap:16}}>
            <label style={{fontSize:12,cursor:"pointer"}}><input type="checkbox" checked={crise} onChange={e=>setCrise(e.target.checked)}/> Ocorreu crise?</label>
            <label style={{fontSize:12,cursor:"pointer"}}><input type="checkbox" checked={intervExt} onChange={e=>setIntervExt(e.target.checked)}/> Intervenção da Direção?</label>
          </div>
          {crise&&<textarea value={criseDesc} onChange={e=>setCriseDesc(e.target.value)} rows={2} placeholder="Descreva brevemente..." style={{...inp,marginTop:8,resize:"vertical"}}/>}
        </div>
        <div style={{marginBottom:12}}>
          <label style={lbl}>4. Relato de Intercorrências / Observações</label>
          <textarea value={obs} onChange={e=>setObs(e.target.value)} rows={3} placeholder="Saúde, material, recados, mudanças de comportamento..." style={{...inp,resize:"vertical"}}/>
        </div>
        <div style={{background:"#F0FFF4",borderRadius:8,padding:"12px 14px",marginBottom:16,border:"1px solid #A5D6A7"}}>
          <div style={{fontWeight:700,fontSize:12,color:"#2E7D32",marginBottom:8}}>5. Protocolo de Transição – "Mão Segura"</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><label style={lbl}>Entregue para</label><input value={entregue} onChange={e=>setEntregue(e.target.value)} placeholder="Nome do próximo responsável" style={inp}/></div>
            <div><label style={lbl}>Horário</label><input value={horSaida} onChange={e=>setHorSaida(e.target.value)} placeholder="HH:MM" style={inp}/></div>
          </div>
        </div>
        <div style={{background:"#FFF8E1",borderRadius:6,padding:"8px 12px",marginBottom:14,fontSize:11,color:"#555",borderLeft:"3px solid #FFD54F"}}>
          💡 Seja descritivo, não opinativo. Registre também conquistas e pequenas autonomias!
        </div>
        <button onClick={handleSave} disabled={!canSave}
          style={{...btn(modoCob?"#E65100":cor,!canSave),width:"100%",padding:"12px"}}>
          {modoCob?"🔄 Salvar Registro de Cobertura":"Salvar Registro"}
        </button>
      </div>
    </div>
  );
}

function OcorrenciaForm({ profId, onSave }) {
  const p = PROFISSIONAIS.find(x=>x.id===profId);
  const alunos = ALUNOS_POR_PROF[profId]||[];
  const [aluno,setAluno]=useState(""); const [turma,setTurma]=useState(""); const [data,setData]=useState(hoje());
  const [horaIni,setHoraIni]=useState(""); const [horaFim,setHoraFim]=useState("");
  const [naturezas,setNat]=useState([]); const [natOutro,setNatOutro]=useState("");
  const [antecedentes,setAnt]=useState(""); const [intervencoes,setIntv]=useState([]);
  const [horSocExt,setHorSocExt]=useState(""); const [responsavel,setResp]=useState("");
  const [viaContato,setVia]=useState(""); const [horContato,setHorCont]=useState("");
  const [horRetirada,setHorRet]=useState(""); const [encaminhamento,setEnc]=useState(""); const [relato,setRelato]=useState("");
  const [ok,setOk]=useState(false);
  const toggle=(arr,set,n)=>set(p=>p.includes(n)?p.filter(x=>x!==n):[...p,n]);
  function handleSave(){
    if(!aluno||!relato)return;
    onSave({id:Date.now(),prof_id:profId,prof_nome:p.nome,prof_tipo:p.tipo,aluno,turma,data,horaIni,horaFim,naturezas,natOutro,antecedentes,intervencoes,horSocExt,responsavel,viaContato,horContato,horRetirada,encaminhamento,relato,criado_em:agora()},"ocorrencias");
    setAluno("");setRelato("");setAnt("");setNat([]);setIntv([]);setOk(true);setTimeout(()=>setOk(false),3000);
  }
  return (
    <div style={{maxWidth:720,margin:"0 auto"}}>
      {ok&&<div style={{background:"#E8F5E9",border:"1px solid #A5D6A7",borderRadius:8,padding:"12px 16px",marginBottom:14,color:"#2E7D32",fontWeight:600}}>✅ Ata registrada! Disponível para impressão na Secretaria Escolar.</div>}
      <div style={{background:"#FFF8E1",border:"1px solid #FFD54F",borderRadius:8,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#7B5800"}}>⚖️ Este documento é proteção jurídica. Registre apenas dados objetivos observáveis.</div>
      <div style={{...card,borderTop:"4px solid #D32F2F"}}>
        <div style={{fontWeight:800,fontSize:15,color:"#D32F2F",marginBottom:16}}>⚠️ Ata de Registro de Ocorrência Crítica e Intervenção</div>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10,marginBottom:12}}>
          <div><label style={lbl}>Aluno *</label>
            <select value={aluno} onChange={e=>{setAluno(e.target.value);const a=alunos.find(x=>x.nome===e.target.value);if(a)setTurma(a.turma)}} style={{...inp,background:"#fff"}}>
              <option value="">Selecione...</option>{alunos.map(a=><option key={a.nome} value={a.nome}>{a.nome}</option>)}
            </select></div>
          <div><label style={lbl}>Turma</label><input value={turma} onChange={e=>setTurma(e.target.value)} style={inp}/></div>
          <div><label style={lbl}>Data</label><input value={data} onChange={e=>setData(e.target.value)} style={inp}/></div>
          <div><label style={lbl}>Início</label><input value={horaIni} onChange={e=>setHoraIni(e.target.value)} placeholder="HH:MM" style={inp}/></div>
          <div><label style={lbl}>Fim</label><input value={horaFim} onChange={e=>setHoraFim(e.target.value)} placeholder="HH:MM" style={inp}/></div>
        </div>
        <div style={{marginBottom:12}}>
          <label style={lbl}>Natureza da Ocorrência</label>
          {TIPOS_NAT.map(n=><label key={n} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,cursor:"pointer",marginBottom:5}}><input type="checkbox" checked={naturezas.includes(n)} onChange={()=>toggle(naturezas,setNat,n)}/>{n}</label>)}
          {naturezas.includes("Outro")&&<input value={natOutro} onChange={e=>setNatOutro(e.target.value)} placeholder="Descreva..." style={{...inp,marginTop:5}}/>}
        </div>
        <div style={{marginBottom:12}}>
          <label style={lbl}>Antecedentes e Gatilhos</label>
          <textarea value={antecedentes} onChange={e=>setAnt(e.target.value)} rows={2} placeholder="O que ocorreu antes? Barulho, mudança na rotina..." style={{...inp,resize:"vertical"}}/>
        </div>
        <div style={{marginBottom:12}}>
          <label style={lbl}>Protocolo de Intervenção Aplicado</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
            {INTV_OPS.map(n=><label key={n} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,cursor:"pointer"}}><input type="checkbox" checked={intervencoes.includes(n)} onChange={()=>toggle(intervencoes,setIntv,n)}/>{n}</label>)}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:12}}>
          <div><label style={lbl}>Responsável Notificado</label><input value={responsavel} onChange={e=>setResp(e.target.value)} style={inp}/></div>
          <div><label style={lbl}>Via</label><select value={viaContato} onChange={e=>setVia(e.target.value)} style={{...inp,background:"#fff"}}><option value="">...</option><option>Ligação</option><option>Presencial</option><option>WhatsApp</option></select></div>
          <div><label style={lbl}>Hora do Contato</label><input value={horContato} onChange={e=>setHorCont(e.target.value)} placeholder="HH:MM" style={inp}/></div>
          <div><label style={lbl}>Hora da Retirada</label><input value={horRetirada} onChange={e=>setHorRet(e.target.value)} placeholder="HH:MM" style={inp}/></div>
        </div>
        <div style={{marginBottom:12}}>
          <label style={lbl}>Encaminhamento</label>
          <div style={{display:"flex",gap:10}}>
            {["Retornou à aula","Foi para casa","Encaminhado ao Hospital"].map(e=>(
              <label key={e} style={{cursor:"pointer",fontSize:12,padding:"5px 12px",borderRadius:16,background:encaminhamento===e?"#FFE0E0":"#fff",border:`1px solid ${encaminhamento===e?"#D32F2F":"#ddd"}`,color:encaminhamento===e?"#D32F2F":"#555"}}>
                <input type="radio" checked={encaminhamento===e} onChange={()=>setEnc(e)} style={{display:"none"}}/>{e}
              </label>
            ))}
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <label style={lbl}>Relato Circunstanciado * (dados objetivos apenas)</label>
          <textarea value={relato} onChange={e=>setRelato(e.target.value)} rows={4} placeholder="Descreva os fatos cronologicamente e sem juízo de valor..." style={{...inp,resize:"vertical"}}/>
        </div>
        <button onClick={handleSave} disabled={!aluno||!relato} style={{...btn("#D32F2F",!aluno||!relato),width:"100%",padding:"12px"}}>Registrar Ocorrência</button>
      </div>
    </div>
  );
}

function EscalaSemanal({ profId, onSave }) {
  const p = profId ? PROFISSIONAIS.find(x=>x.id===profId) : null;
  const [turno,setTurno]=useState(p?(p.turno[0]==="1°"?"Manhã":"Tarde"):"Manhã");
  const [semana,setSemana]=useState("");
  const [obsD,setObsD]=useState(DIAS.reduce((a,d)=>({...a,[d]:""}),{}));
  const [ok,setOk]=useState(false);
  function handleSave(){
    onSave({id:Date.now(),prof_id:profId,turno,semana,obsD,criado_em:agora()},"escalas");
    setOk(true);setTimeout(()=>setOk(false),3000);
  }
  const horarios=turno==="Manhã"?[{hora:"08:00–08:15",ativ:"Entrada/Chegada",de:"Monitores",para:"Mediadores",local:"Sala de Aula"},{hora:"09:30–10:00",ativ:"Lanche/Recreio",de:"Mediadores",para:"Cuidadores",local:"Refeitório/Pátio"},{hora:"10:00–10:15",ativ:"Retorno à Sala",de:"Cuidadores",para:"Mediadores",local:"Sala de Aula"},{hora:"11:45–12:00",ativ:"Saída/Embarque",de:"Mediadores",para:"Monitores",local:"Portão/Ônibus"}]:[{hora:"13:00–13:15",ativ:"Entrada/Chegada",de:"Monitores",para:"Mediadores",local:"Sala de Aula"},{hora:"14:30–15:00",ativ:"Lanche/Recreio",de:"Mediadores",para:"Cuidadores",local:"Refeitório/Pátio"},{hora:"15:00–15:15",ativ:"Retorno à Sala",de:"Cuidadores",para:"Mediadores",local:"Sala de Aula"},{hora:"16:45–17:00",ativ:"Saída/Embarque",de:"Mediadores",para:"Monitores",local:"Portão/Ônibus"}];
  return (
    <div style={{maxWidth:800,margin:"0 auto"}}>
      {ok&&<div style={{background:"#E8F5E9",border:"1px solid #A5D6A7",borderRadius:8,padding:"12px 16px",marginBottom:14,color:"#2E7D32",fontWeight:600}}>✅ Escala salva! Disponível para impressão na Secretaria Escolar.</div>}
      <div style={{...card,borderTop:"4px solid #2E7D32"}}>
        <div style={{fontWeight:800,fontSize:15,color:"#2E7D32",marginBottom:16}}>📅 Escala Semanal de Apoio à Inclusão</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          <div><label style={lbl}>Semana de</label><input value={semana} onChange={e=>setSemana(e.target.value)} placeholder="Ex: 23/06 a 27/06/2026" style={inp}/></div>
          <div><label style={lbl}>Turno</label>
            <div style={{display:"flex",gap:10}}>
              {["Manhã","Tarde"].map(t=>(
                <label key={t} style={{cursor:"pointer",padding:"8px 16px",borderRadius:8,background:turno===t?"#E8F5E9":"#fff",border:`2px solid ${turno===t?"#2E7D32":"#ddd"}`,color:turno===t?"#2E7D32":"#555",fontWeight:turno===t?700:400,fontSize:13}}>
                  <input type="radio" checked={turno===t} onChange={()=>setTurno(t)} style={{display:"none"}}/>{t==="Manhã"?"☀️ Manhã":"🌙 Tarde"}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div style={{fontWeight:700,fontSize:12,color:"#1A3A6E",marginBottom:8}}>⏱️ Cronograma de Momentos Críticos</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,marginBottom:16}}>
          <thead><tr style={{background:"#2E7D32",color:"#fff"}}>{["Horário","Atividade","De","Para","Local"].map(h=><th key={h} style={{padding:"6px 10px",textAlign:"left"}}>{h}</th>)}</tr></thead>
          <tbody>{horarios.map((h,i)=><tr key={i} style={{background:i%2===0?"#F0FFF4":"#fff"}}>
            <td style={{padding:"5px 10px",border:"1px solid #E8E8E8",fontWeight:700}}>{h.hora}</td>
            <td style={{padding:"5px 10px",border:"1px solid #E8E8E8"}}>{h.ativ}</td>
            <td style={{padding:"5px 10px",border:"1px solid #E8E8E8",color:"#666"}}>{h.de}</td>
            <td style={{padding:"5px 10px",border:"1px solid #E8E8E8",color:"#2E7D32",fontWeight:600}}>→ {h.para}</td>
            <td style={{padding:"5px 10px",border:"1px solid #E8E8E8"}}>{h.local}</td>
          </tr>)}</tbody>
        </table>
        <div style={{fontWeight:700,fontSize:12,color:"#1A3A6E",marginBottom:8}}>📝 Observações da Semana</div>
        {DIAS.map(d=>(
          <div key={d} style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:8,marginBottom:6,alignItems:"center"}}>
            <span style={{fontSize:12,fontWeight:700,color:"#555"}}>{d}:</span>
            <input value={obsD[d]} onChange={e=>setObsD(p=>({...p,[d]:e.target.value}))} placeholder="Ausências, trocas, destaques..." style={inp}/>
          </div>
        ))}
        <button onClick={handleSave} style={{...btn("#2E7D32"),width:"100%",padding:"12px",marginTop:14}}>Salvar Escala da Semana</button>
      </div>
    </div>
  );
}

function Historico({ registros, profId }) {
  const [filtroCob, setFiltroCob] = useState(false);
  const base = (profId&&profId!=="secretaria"&&profId!==null
    ? registros.filter(r=>r.prof_id===profId)
    : registros).sort((a,b)=>b.id-a.id);
  const lista = filtroCob ? base.filter(r=>r.cobertura) : base;
  const cor = profId&&PROFISSIONAIS.find(x=>x.id===profId) ? TIPO_COR[PROFISSIONAIS.find(x=>x.id===profId).tipo] : "#1A3A6E";
  const totalCob = base.filter(r=>r.cobertura).length;

  return (
    <div>
      {totalCob > 0 && (
        <div style={{display:"flex",gap:10,marginBottom:14,alignItems:"center"}}>
          <button onClick={()=>setFiltroCob(false)}
            style={{padding:"6px 14px",borderRadius:8,border:"2px solid",
              borderColor:!filtroCob?"#1A3A6E":"#E0E0E0",
              background:!filtroCob?"#E8F4FD":"#fff",
              color:!filtroCob?"#1A3A6E":"#666",
              fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
            Todos ({base.length})
          </button>
          <button onClick={()=>setFiltroCob(true)}
            style={{padding:"6px 14px",borderRadius:8,border:"2px solid",
              borderColor:filtroCob?"#E65100":"#E0E0E0",
              background:filtroCob?"#FFF3E0":"#fff",
              color:filtroCob?"#E65100":"#666",
              fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
            🔄 Somente coberturas ({totalCob})
          </button>
        </div>
      )}
      {lista.length===0
        ? <div style={{...card,textAlign:"center",color:"#999",padding:40}}>📭 Nenhum registro.</div>
        : lista.map(r=>(
          <div key={r.id} style={{...card,
            borderLeft:`4px solid ${r.cobertura?"#E65100":TIPO_COR[r.prof_tipo]||cor}`,
            background: r.cobertura?"#FFFAF5":"#fff",
            marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <div style={{fontWeight:700,color:"#1A3A6E"}}>{r.aluno}</div>
                  {r.cobertura && (
                    <span style={{background:"#FFF3E0",color:"#E65100",border:"1px solid #FFB74D",
                      borderRadius:20,padding:"1px 8px",fontSize:10,fontWeight:700}}>
                      🔄 Cobertura
                    </span>
                  )}
                </div>
                <div style={{fontSize:12,color:"#666",marginTop:2}}>
                  {r.prof_nome} · {r.data}
                  {r.cobertura && r.prof_original && (
                    <span style={{color:"#E65100"}}> · Designado: {r.prof_original}</span>
                  )}
                </div>
                {r.cobertura && r.motivo_cobertura && (
                  <div style={{fontSize:11,color:"#888",marginTop:1}}>
                    Motivo: {r.motivo_cobertura}
                  </div>
                )}
              </div>
              <div style={{display:"flex",gap:6,alignItems:"flex-start",flexWrap:"wrap"}}>
                {r.humor&&<span style={{background:"#F0F4FF",color:"#1A3A6E",borderRadius:6,padding:"2px 8px",fontSize:11}}>{r.humor}</span>}
                {r.crise&&<span style={{background:"#FFE0E0",color:"#D32F2F",borderRadius:6,padding:"2px 8px",fontSize:11}}>⚠️ Crise</span>}
              </div>
            </div>
            {r.obs&&<div style={{fontSize:12,color:"#444",marginTop:8,background:"#F8FAFC",borderRadius:6,padding:"7px 10px"}}>{r.obs}</div>}
          </div>
        ))
      }
    </div>
  );
}

function OcorrenciasDirecao({ ocorrencias }) {
  return (
    <div>
      {ocorrencias.length===0
        ? <div style={{...card,textAlign:"center",color:"#999",padding:40}}>✅ Nenhuma ocorrência registrada.</div>
        : ocorrencias.sort((a,b)=>b.id-a.id).map(o=>(
          <div key={o.id} style={{...card,borderLeft:"4px solid #D32F2F",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:6}}>
              <div>
                <div style={{fontWeight:700,color:"#D32F2F",fontSize:14}}>⚠️ {o.aluno}</div>
                <div style={{fontSize:12,color:"#666"}}>{o.prof_nome} · Turma {o.turma} · {o.data}</div>
              </div>
              {o.encaminhamento&&<span style={{background:"#FFF5F5",color:"#D32F2F",borderRadius:6,padding:"3px 10px",fontSize:12,fontWeight:600}}>{o.encaminhamento}</span>}
            </div>
            {o.naturezas?.length>0&&<div style={{fontSize:12,marginBottom:6}}><strong>Natureza:</strong> {o.naturezas.join(", ")}</div>}
            {o.relato&&<div style={{fontSize:12,color:"#444",background:"#F8FAFC",borderRadius:6,padding:"8px 10px"}}>{o.relato}</div>}
          </div>
        ))
      }
    </div>
  );
}

function PainelDirecao({ registros, ocorrencias, setView }) {
  const hoje_str = hoje();
  const coberturas_hoje = registros.filter(r => r.cobertura && r.data === hoje_str);
  const sem_registro    = PROFISSIONAIS.filter(p => !registros.some(r => r.prof_id === p.id));
  const por = PROFISSIONAIS.map(p => ({
    ...p,
    count:     registros.filter(r => r.prof_id === p.id).length,
    oco:       ocorrencias.filter(r => r.prof_id === p.id).length,
    cobertura: registros.filter(r => r.prof_id === p.id && r.cobertura).length,
  }));

  return (
    <div>
      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
        {[
          {icon:"📋", val:registros.length,                                  label:"Total registros",  cor:"#1565C0"},
          {icon:"📅", val:registros.filter(r=>r.data===hoje_str).length,     label:"Hoje",             cor:"#2E7D32"},
          {icon:"🔄", val:coberturas_hoje.length,                            label:"Coberturas hoje",  cor:"#E65100"},
          {icon:"⚠️", val:ocorrencias.length,                                label:"Ocorrências",      cor:"#D32F2F"},
          {icon:"👥", val:PROFISSIONAIS.length,                              label:"Profissionais",    cor:"#6A0572"},
        ].map((c,i)=>(
          <div key={i} style={{...card,borderTop:`4px solid ${c.cor}`,textAlign:"center"}}>
            <div style={{fontSize:22}}>{c.icon}</div>
            <div style={{fontSize:26,fontWeight:800,color:c.cor}}>{c.val}</div>
            <div style={{fontSize:11,color:"#666"}}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Alerta coberturas do dia */}
      {coberturas_hoje.length > 0 && (
        <div style={{background:"#FFF3E0",border:"2px solid #FFB74D",
          borderRadius:10,padding:"14px 18px",marginBottom:16}}>
          <div style={{fontWeight:700,color:"#E65100",marginBottom:10,fontSize:14}}>
            🔄 {coberturas_hoje.length} atendimento(s) de cobertura / substituição hoje
          </div>
          {coberturas_hoje.map((r,i)=>(
            <div key={i} style={{background:"#fff",borderRadius:8,padding:"10px 12px",
              marginBottom:6,borderLeft:"3px solid #E65100",fontSize:12}}>
              <div style={{fontWeight:700,color:"#1A202C"}}>{r.aluno}</div>
              <div style={{color:"#555",marginTop:2}}>
                Atendido por: <strong>{r.prof_nome}</strong>
                {r.prof_original&&<> · Designado original: <strong>{r.prof_original}</strong></>}
              </div>
              <div style={{color:"#888",marginTop:1}}>Motivo: {r.motivo_cobertura||"não informado"}</div>
            </div>
          ))}
        </div>
      )}

      {/* Alerta sem registro */}
      {sem_registro.length > 0 && (
        <div style={{background:"#FFF8E1",border:"1px solid #FFD54F",
          borderRadius:10,padding:"12px 16px",marginBottom:16}}>
          <div style={{fontWeight:700,color:"#F57F17",marginBottom:4}}>
            ⚠️ {sem_registro.length} profissional(is) ainda sem nenhum registro
          </div>
          <div style={{fontSize:12,color:"#555"}}>{sem_registro.map(p=>p.nome).join(" · ")}</div>
        </div>
      )}

      {/* Cards por profissional */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
        {por.map(p=>(
          <div key={p.id} style={{...card,borderLeft:`4px solid ${TIPO_COR[p.tipo]}`}}>
            <div style={{fontWeight:700,color:"#1A3A6E",fontSize:12,marginBottom:4}}>{p.nome}</div>
            <div style={{fontSize:10,color:"#888"}}>Turmas {p.turmas.join(",")} · Turno {p.turno.join("/")}</div>
            <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
              <span style={{background:p.count===0?"#FFF3E0":"#E8F5E9",
                color:p.count===0?"#E65100":"#2E7D32",
                borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:700}}>
                {p.count} reg.
              </span>
              {p.cobertura>0&&(
                <span style={{background:"#FFF3E0",color:"#E65100",
                  borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:700}}>
                  🔄 {p.cobertura} cob.
                </span>
              )}
              {p.oco>0&&(
                <span style={{background:"#FFF5F5",color:"#D32F2F",
                  borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:700}}>
                  {p.oco} ocorr.
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanoAcao() {
  return (
    <div style={{maxWidth:900,margin:"0 auto"}}>
      <div style={{...card,borderTop:"4px solid #1A3A6E",marginBottom:16,textAlign:"center",padding:"20px 24px"}}>
        <div style={{fontWeight:800,fontSize:20,color:"#1A3A6E"}}>📘 Plano de Ação: Inclusão em Foco</div>
        <div style={{fontSize:13,color:"#666",marginTop:4}}>Otimização de rotinas e responsabilidades – {UNIDADE}</div>
      </div>
      <div style={{...card,marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:14,color:"#1A3A6E",marginBottom:12}}>👥 Matriz de Responsabilidades</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {[
            {tipo:"AAI1",icon:"📚",titulo:"AAI 1 – Mediador",foco:"Suporte pedagógico direto e fomento à autonomia em sala.",nao:"Demandas exclusivas de higiene e alimentação."},
            {tipo:"AAI2",icon:"🤝",titulo:"AAI 2 – Cuidador",foco:"Bem-estar básico: higiene, alimentação e conforto físico.",nao:"Mediação pedagógica ou intervenções educacionais."},
            {tipo:"AxEI",icon:"🌟",titulo:"Aux. Ed. Infantil",foco:"Auxílio colaborativo sob supervisão do professor regente.",nao:"Decisões pedagógicas sem supervisão."},
          ].map(m=>(
            <div key={m.tipo} style={{borderRadius:8,overflow:"hidden",border:"1px solid #E0E0E0"}}>
              <div style={{background:TIPO_COR[m.tipo],color:"#fff",padding:"8px 12px",fontWeight:700,fontSize:12}}>{m.icon} {m.titulo}</div>
              <div style={{padding:"10px 12px"}}>
                <div style={{fontSize:11,color:"#2E7D32",fontWeight:600,marginBottom:3}}>✅ FOCO</div>
                <div style={{fontSize:11,color:"#333",marginBottom:8}}>{m.foco}</div>
                <div style={{fontSize:11,color:"#D32F2F",fontWeight:600,marginBottom:3}}>⛔ NÃO FAZ</div>
                <div style={{fontSize:11,color:"#555"}}>{m.nao}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{textAlign:"center",padding:"20px",background:"linear-gradient(135deg,#1A3A6E,#2E75B6)",borderRadius:12}}>
        <div style={{fontWeight:800,fontSize:16,color:"#fff",lineHeight:1.6}}>
          "A inclusão não é um favor, é um direito.<br/>Nossa organização é a ferramenta que viabiliza esse direito."
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [prof, setProf]           = useState(undefined);
  const [view, setView]           = useState("");
  const [registros, setRegistros] = useState([]);
  const [ocorrencias, setOcorrencias] = useState([]);
  const [escalas, setEscalas]     = useState([]);

  useEffect(()=>{
    const s=localStorage.getItem("rcsc_login_v3");
    if(s!==null){const v=JSON.parse(s);setProf(v);setView(v==="secretaria"?"impressao":v===null?"painel":"meu_painel");}
    else setProf(undefined);
    setRegistros(load(STORAGE.registros));
    setOcorrencias(load(STORAGE.ocorrencias));
    setEscalas(load(STORAGE.escalas));
  },[]);

  function handleLogin(id){
    setProf(id);localStorage.setItem("rcsc_login_v3",JSON.stringify(id));
    setView(id==="secretaria"?"impressao":id===null?"painel":"meu_painel");
  }
  function handleLogout(){setProf(undefined);localStorage.removeItem("rcsc_login_v3");setView("");}

  function handleSave(item,tipo){
    if(tipo==="registros"){const n=[...registros,item];setRegistros(n);save(STORAGE.registros,n);}
    else if(tipo==="ocorrencias"){const n=[...ocorrencias,item];setOcorrencias(n);save(STORAGE.ocorrencias,n);}
    else{const n=[...escalas,item];setEscalas(n);save(STORAGE.escalas,n);}
  }

  if(prof===undefined) return <LoginScreen onLogin={handleLogin}/>;

  const isSecretaria=prof==="secretaria";
  const isDirecao=prof===null;

  return (
    <div style={{minHeight:"100vh",background:"#F4F6FB",fontFamily:"'Segoe UI',Arial,sans-serif"}}>
      <Header prof={prof} view={view} setView={setView} onLogout={handleLogout}/>
      <main style={{maxWidth:1200,margin:"0 auto",padding:"22px 18px 48px"}}>
        {/* SECRETARIA */}
        {isSecretaria && <GestaoImpressao registros={registros} ocorrencias={ocorrencias} escalas={escalas}/>}

        {/* PROFISSIONAL */}
        {!isSecretaria&&!isDirecao&&view==="meu_painel"  && <MeuPainel profId={prof} registros={registros} ocorrencias={ocorrencias} setView={setView}/>}
        {!isSecretaria&&!isDirecao&&view==="registro"    && <RegistroDiario profId={prof} onSave={handleSave} registros={registros}/>}
        {!isSecretaria&&!isDirecao&&view==="ocorrencia"  && <OcorrenciaForm profId={prof} onSave={handleSave}/>}
        {!isSecretaria&&!isDirecao&&view==="escala"      && <EscalaSemanal profId={prof} onSave={handleSave}/>}

        {/* DIREÇÃO */}
        {isDirecao&&view==="painel"          && <PainelDirecao registros={registros} ocorrencias={ocorrencias} setView={setView}/>}
        {isDirecao&&view==="profissionais"   && <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>{["AAI1","AAI2","AxEI"].map(t=><div key={t}><div style={{background:TIPO_COR[t],color:"#fff",borderRadius:"8px 8px 0 0",padding:"10px 14px",fontWeight:800,fontSize:13}}>{TIPO_LABEL[t]}</div><div style={{borderRadius:"0 0 8px 8px",overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>{PROFISSIONAIS.filter(p=>p.tipo===t).map((p,i)=><div key={p.id} style={{background:i%2===0?"#fff":"#F8FAFC",padding:"12px 14px",borderBottom:"1px solid #F0F0F0"}}><div style={{fontWeight:700,fontSize:12,color:"#1A3A6E"}}>{p.nome}</div><div style={{fontSize:10,color:"#888"}}>{p.vinculo}·Turmas {p.turmas.join(",")}·Turno {p.turno.join("/")}</div><div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:4}}>{(ALUNOS_POR_PROF[p.id]||[]).map(a=><span key={a.nome} style={{background:TIPO_BG[t],color:TIPO_COR[t],borderRadius:20,padding:"2px 7px",fontSize:10}}>{a.nome.split(" ")[0]} ({a.suporte})</span>)}</div></div>)}</div></div>)}</div>}
        {isDirecao&&view==="escala_dir"      && <EscalaSemanal profId={null} onSave={handleSave}/>}
        {isDirecao&&view==="historico"       && <Historico registros={registros} profId={null}/>}
        {isDirecao&&view==="ocorrencias_dir" && <OcorrenciasDirecao ocorrencias={ocorrencias}/>}
        {isDirecao&&view==="plano_acao"      && <PlanoAcao/>}
        {isDirecao&&view==="impressao"       && <GestaoImpressao registros={registros} ocorrencias={ocorrencias} escalas={escalas}/>}
      </main>
    </div>
  );
}
