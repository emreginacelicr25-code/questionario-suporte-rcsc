import { supabase } from "./supabaseClient.js";
import { useState, useRef } from "react";

// ── DADOS DE REFERÊNCIA ────────────────────────────────────────────────────────
const UNIDADE = "E.M. Regina Celi da Silva Cerdeira";
const ANO = "2026";

// Dimensões avaliadas por domínio
const DOMINIOS = [
  {
    id: "cognitivoComportamental",
    titulo: "Domínio Cognitivo e Comportamental",
    descricao: "Avalia a capacidade de aprendizagem, comunicação e regulação emocional/comportamental do aluno.",
    cor: "#1A3A6E",
    bg: "#E8F4FD",
    perguntas: [
      {
        id: "cc1",
        texto: "O aluno consegue acompanhar as instruções orais da professora durante a aula?",
        opcoes: [
          { valor: 3, texto: "Não acompanha — precisa de instrução individualizada e constante" },
          { valor: 2, texto: "Acompanha parcialmente — precisa de repetição ou suporte visual" },
          { valor: 1, texto: "Acompanha com pequenas adaptações ou reforços pontuais" },
        ],
      },
      {
        id: "cc2",
        texto: "Como o aluno reage a mudanças de rotina ou situações inesperadas em sala?",
        opcoes: [
          { valor: 3, texto: "Crises frequentes ou comportamentos que interrompem a turma" },
          { valor: 2, texto: "Apresenta resistência ou agitação, mas se recupera com apoio" },
          { valor: 1, texto: "Adapta-se com leve desconforto ou não reage significativamente" },
        ],
      },
      {
        id: "cc3",
        texto: "O aluno consegue realizar atividades pedagógicas propostas em sala?",
        opcoes: [
          { valor: 3, texto: "Não realiza sem mediação presencial e direta do profissional de apoio" },
          { valor: 2, texto: "Realiza parcialmente — precisa de adaptação de material ou orientação próxima" },
          { valor: 1, texto: "Realiza com mínimas adaptações ou sem necessidade de suporte contínuo" },
        ],
      },
      {
        id: "cc4",
        texto: "O aluno se comunica com a professora e os colegas?",
        opcoes: [
          { valor: 3, texto: "Não se comunica verbalmente; usa gestos, choro ou comportamento para expressar necessidades" },
          { valor: 2, texto: "Comunica-se com limitações — vocabulário restrito, CAA ou comunicação alternativa" },
          { valor: 1, texto: "Comunica-se de forma compreensível, mesmo com particularidades" },
        ],
      },
    ],
  },
  {
    id: "autonomiaFisica",
    titulo: "Domínio de Autonomia e Vida Diária",
    descricao: "Avalia a independência do aluno em higiene, alimentação, deslocamento e autocuidado.",
    cor: "#2E7D32",
    bg: "#E8F5E9",
    perguntas: [
      {
        id: "af1",
        texto: "O aluno necessita de apoio para higiene pessoal (troca, banheiro, higiene oral)?",
        opcoes: [
          { valor: 3, texto: "Sim — depende totalmente de um adulto para todos os cuidados de higiene" },
          { valor: 2, texto: "Necessita de auxílio parcial ou supervisão próxima" },
          { valor: 1, texto: "É autônomo ou necessita apenas de lembretes pontuais" },
        ],
      },
      {
        id: "af2",
        texto: "O aluno consegue se alimentar de forma independente?",
        opcoes: [
          { valor: 3, texto: "Não — precisa de assistência direta na alimentação" },
          { valor: 2, texto: "Alimenta-se com alguma assistência (abrir embalagens, adaptações)" },
          { valor: 1, texto: "Alimenta-se de forma independente" },
        ],
      },
      {
        id: "af3",
        texto: "Como é o deslocamento do aluno dentro da escola (corredores, pátio, refeitório)?",
        opcoes: [
          { valor: 3, texto: "Depende totalmente de acompanhamento — usa cadeira de rodas, andador ou não tem segurança sozinho" },
          { valor: 2, texto: "Desloca-se com supervisão próxima ou apoio parcial" },
          { valor: 1, texto: "Desloca-se de forma independente ou com orientação leve" },
        ],
      },
    ],
  },
  {
    id: "participacaoSocial",
    titulo: "Domínio de Participação e Interação Social",
    descricao: "Avalia como o aluno interage com colegas e participa das atividades coletivas.",
    cor: "#6A0572",
    bg: "#F3E5F5",
    perguntas: [
      {
        id: "ps1",
        texto: "O aluno participa das atividades coletivas da turma (recreio, projetos, rodas)?",
        opcoes: [
          { valor: 3, texto: "Não participa — fica à margem ou recusa categoricamente as atividades coletivas" },
          { valor: 2, texto: "Participa com mediação ativa do profissional de apoio" },
          { valor: 1, texto: "Participa com pequenas adaptações ou naturalmente" },
        ],
      },
      {
        id: "ps2",
        texto: "O aluno apresenta comportamentos que coloquem a si mesmo ou a colegas em risco?",
        opcoes: [
          { valor: 3, texto: "Sim, com frequência — autolesão, agressividade física ou situações de risco constante" },
          { valor: 2, texto: "Ocasionalmente — episódios pontuais que requerem intervenção" },
          { valor: 1, texto: "Raramente ou nunca" },
        ],
      },
      {
        id: "ps3",
        texto: "Como é a interação do aluno com os colegas de turma?",
        opcoes: [
          { valor: 3, texto: "Isola-se completamente ou provoca conflitos frequentes com colegas" },
          { valor: 2, texto: "Interage com limitações — precisa de mediação para relações positivas" },
          { valor: 1, texto: "Interage de forma razoável, mesmo com peculiaridades sociais" },
        ],
      },
    ],
  },
  {
    id: "impactoTurma",
    titulo: "Impacto na Dinâmica da Turma",
    descricao: "Avalia o quanto a presença do aluno sem apoio adequado impacta o andamento da turma.",
    cor: "#B45309",
    bg: "#FEF3C7",
    perguntas: [
      {
        id: "it1",
        texto: "Sem um profissional de apoio presente, o aluno consegue permanecer na sala com segurança?",
        opcoes: [
          { valor: 3, texto: "Não — sai da sala, coloca-se em risco ou inviabiliza a aula para os demais" },
          { valor: 2, texto: "Permanece, mas com dificuldade — demanda atenção constante da professora" },
          { valor: 1, texto: "Permanece com tranquilidade — a professora consegue atender a turma normalmente" },
        ],
      },
      {
        id: "it2",
        texto: "Com que frequência o aluno demanda atenção individualizada da professora durante o tempo de aula?",
        opcoes: [
          { valor: 3, texto: "Continuamente — a professora não consegue atender os demais alunos" },
          { valor: 2, texto: "Com frequência — interrompe o andamento da aula várias vezes" },
          { valor: 1, texto: "Raramente — a professora consegue conduzir a turma normalmente" },
        ],
      },
    ],
  },
];

// Total máximo de pontos possível
const PONTOS_MAX = DOMINIOS.reduce((t, d) => t + d.perguntas.length * 3, 0);

// ── CÁLCULO DO SUPORTE ────────────────────────────────────────────────────────
function calcularSuporte(respostas, totalPerguntas) {
  const soma = Object.values(respostas).reduce((t, v) => t + v, 0);
  const pct = soma / (totalPerguntas * 3);
  if (pct >= 0.65) return { nivel: 1, cor: "#C62828", bg: "#FFEBEE", emoji: "🔴", label: "Suporte 1 – Totalmente Dependente" };
  if (pct >= 0.35) return { nivel: 2, cor: "#E65100", bg: "#FFF3E0", emoji: "🟠", label: "Suporte 2 – Autonomia Limitada" };
  return        { nivel: 3, cor: "#2E7D32", bg: "#E8F5E9", emoji: "🟢", label: "Suporte 3 – Autonomia Considerável" };
}

// Peso para ordenação de prioridade (considera suporte + pontuação bruta)
function pesoPrioridade(resultado) {
  return resultado.suporte.nivel === 1 ? resultado.pontos + 1000
       : resultado.suporte.nivel === 2 ? resultado.pontos + 500
       : resultado.pontos;
}

// ── ESTILOS BASE ──────────────────────────────────────────────────────────────
const s = {
  inp: { width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #D0D5DD",
    fontSize:13, fontFamily:"inherit", boxSizing:"border-box", outline:"none" },
  lbl: { fontSize:12, fontWeight:700, color:"#344054", marginBottom:5, display:"block" },
  card: { background:"#fff", borderRadius:14, boxShadow:"0 1px 8px rgba(0,0,0,0.08)", padding:"22px 26px" },
  btn: (cor="#1A3A6E", dis=false) => ({
    padding:"10px 22px", borderRadius:9, border:"none",
    cursor: dis ? "not-allowed" : "pointer",
    background: dis ? "#D0D5DD" : cor,
    color: "#fff", fontWeight:700, fontSize:14, fontFamily:"inherit",
  }),
};

// ── COMPONENTE INSTRUCIONAL ───────────────────────────────────────────────────
function PainelInstrucional({ onComecar }) {
  return (
    <div style={{ maxWidth:780, margin:"0 auto", padding:"0 0 48px" }}>
      {/* Cabeçalho */}
      <div style={{ background:"linear-gradient(135deg,#1A3A6E,#2E75B6)", borderRadius:16,
        padding:"32px 36px", marginBottom:24, color:"#fff" }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:2,
          opacity:.75, marginBottom:8 }}>
          E.M. Regina Celi da Silva Cerdeira · Centro de Referência em Educação Inclusiva · {ANO}
        </div>
        <div style={{ fontSize:26, fontWeight:900, lineHeight:1.2, marginBottom:10 }}>
          📋 Instrumento de Avaliação e Classificação<br/>de Suporte para Alunos com Deficiência
        </div>
        <div style={{ fontSize:14, opacity:.88, lineHeight:1.6 }}>
          Destinado ao Professor Regente · Baseado no Plano de Ação: Inclusão em Foco (RCSC/2026)
        </div>
      </div>

      {/* Para que serve */}
      <div style={{ ...s.card, borderLeft:"4px solid #1A3A6E", marginBottom:16 }}>
        <div style={{ fontWeight:800, fontSize:16, color:"#1A3A6E", marginBottom:10 }}>
          🎯 Para que serve este instrumento?
        </div>
        <p style={{ fontSize:14, color:"#4A5568", lineHeight:1.8, marginBottom:10 }}>
          Este questionário foi elaborado para que você, professor(a) regente, possa <strong>avaliar cada aluno com deficiência da sua turma</strong> e indicar o <strong>nível de suporte pedagógico e de vida diária</strong> que ele necessita.
        </p>
        <p style={{ fontSize:14, color:"#4A5568", lineHeight:1.8 }}>
          Ao final, o sistema gera automaticamente um <strong>relatório de prioridade de atendimento</strong> da sua turma, ordenando os alunos do maior para o menor grau de necessidade de apoio especializado. Esse relatório orienta a Secretaria Escolar e a Equipe Diretiva na designação dos profissionais de apoio à inclusão (AAI 1, AAI 2 e Ax EI).
        </p>
      </div>

      {/* Os três níveis explicados */}
      <div style={{ fontWeight:800, fontSize:16, color:"#1A202C", marginBottom:14 }}>
        📊 Os três níveis de suporte — entenda antes de avaliar
      </div>

      {[
        {
          emoji:"🔴", nivel:"Suporte 1", subtitulo:"Totalmente Dependente",
          cor:"#C62828", bg:"#FFEBEE", borda:"#EF9A9A",
          descricao:"O aluno apresenta limitações físicas e/ou cognitivas graves, ou comportamentos que inviabilizam a rotina escolar sem suporte contínuo e direto de um profissional de apoio.",
          exemplos:[
            "Necessita de acompanhamento ininterrupto em sala para não se machucar ou prejudicar a turma",
            "Não realiza nenhuma atividade pedagógica sem mediação individualizada direta",
            "Depende totalmente de adulto para higiene, alimentação e deslocamento",
            "Crises frequentes com agressividade, autolesão ou fuga da sala",
            "Sem comunicação verbal funcional — expressa-se apenas por comportamento ou CAA",
          ],
          implicacao:"Exige profissional de apoio designado exclusivamente para este aluno, presente durante todo o período.",
        },
        {
          emoji:"🟠", nivel:"Suporte 2", subtitulo:"Autonomia Limitada",
          cor:"#E65100", bg:"#FFF3E0", borda:"#FFCC80",
          descricao:"O aluno apresenta habilidades básicas, mas requer auxílio moderado em atividades físicas ou adaptações pedagógicas. Consegue participar da turma com mediação pontual.",
          exemplos:[
            "Consegue realizar atividades com adaptação de material ou instrução próxima",
            "Alimenta-se com alguma assistência; higiene com supervisão",
            "Comunica-se com limitações, mas estabelece contato funcional",
            "Episódios ocasionais de agitação que requerem intervenção, mas não contínuos",
            "Participa de atividades coletivas com mediação, não de forma espontânea",
          ],
          implicacao:"Exige profissional de apoio disponível e atento, mas pode atender mais de um aluno S2 na mesma turma dependendo do contexto.",
        },
        {
          emoji:"🟢", nivel:"Suporte 3", subtitulo:"Autonomia Considerável",
          cor:"#2E7D32", bg:"#E8F5E9", borda:"#A5D6A7",
          descricao:"O aluno acompanha a rotina escolar com mínimas adaptações. Desafios comportamentais leves que não impedem a participação nas atividades.",
          exemplos:[
            "Realiza atividades pedagógicas com pequenas adaptações de material",
            "Autônomo em higiene e alimentação, ou precisa apenas de lembretes",
            "Comunica-se de forma compreensível com a turma e a professora",
            "Deslocamento independente pela escola",
            "Não apresenta riscos a si ou aos colegas",
          ],
          implicacao:"O apoio de um profissional beneficia o aluno, mas não precisa ser exclusivo. Pode ser atendido por profissional volante ou compartilhado.",
        },
      ].map((n, i) => (
        <div key={i} style={{ background:n.bg, border:`1px solid ${n.borda}`,
          borderRadius:12, padding:"18px 22px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <span style={{ fontSize:26 }}>{n.emoji}</span>
            <div>
              <div style={{ fontWeight:800, fontSize:16, color:n.cor }}>{n.nivel} – {n.subtitulo}</div>
            </div>
          </div>
          <p style={{ fontSize:13, color:"#333", lineHeight:1.7, marginBottom:10 }}>{n.descricao}</p>
          <div style={{ marginBottom:10 }}>
            <div style={{ fontSize:11, fontWeight:700, color:n.cor, textTransform:"uppercase",
              letterSpacing:.5, marginBottom:6 }}>Exemplos de indicadores neste nível:</div>
            <ul style={{ paddingLeft:18, margin:0 }}>
              {n.exemplos.map((e, j) => (
                <li key={j} style={{ fontSize:12, color:"#444", marginBottom:4, lineHeight:1.6 }}>{e}</li>
              ))}
            </ul>
          </div>
          <div style={{ background:"rgba(0,0,0,0.04)", borderRadius:8, padding:"8px 12px",
            fontSize:12, color:n.cor, fontWeight:600 }}>
            💡 Implicação para o apoio: {n.implicacao}
          </div>
        </div>
      ))}

      {/* Como responder */}
      <div style={{ ...s.card, marginTop:8, marginBottom:24, borderLeft:"4px solid #B45309" }}>
        <div style={{ fontWeight:800, fontSize:15, color:"#B45309", marginBottom:12 }}>
          📌 Como responder com precisão
        </div>
        {[
          { icone:"🔍", titulo:"Observe antes de responder", texto:"Base suas respostas no que você observa cotidianamente em sala, não em diagnósticos ou laudos. O que importa é o funcionamento real do aluno no ambiente escolar." },
          { icone:"🎯", titulo:"Responda pensando no dia típico", texto:"Considere como o aluno se comporta em um dia comum de aula, não nos dias excepcionalmente bons nem nos muito difíceis." },
          { icone:"⚖️", titulo:"Seja fiel, não generoso nem rígido", texto:"Não subestime as dificuldades por receio de \"rotular\" o aluno, nem superestime por querer mais apoio. A classificação correta garante o apoio adequado." },
          { icone:"🔄", titulo:"A classificação pode mudar", texto:"Este instrumento deve ser reaplicado ao longo do ano. O suporte classificado hoje pode ser revisto à medida que o aluno evolui ou apresenta novas demandas." },
          { icone:"👥", titulo:"Avalie aluno por aluno", texto:"Cada aluno com deficiência da sua turma deve ser avaliado individualmente. O sistema somará as avaliações e gerará a ordem de prioridade da turma." },
        ].map((d, i) => (
          <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12,
            paddingBottom:12, borderBottom: i < 4 ? "1px solid #F0F0F0":"none" }}>
            <span style={{ fontSize:20, flexShrink:0 }}>{d.icone}</span>
            <div>
              <div style={{ fontWeight:700, fontSize:13, color:"#1A202C", marginBottom:2 }}>{d.titulo}</div>
              <div style={{ fontSize:12, color:"#4A5568", lineHeight:1.6 }}>{d.texto}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:"#1A3A6E", borderRadius:12, padding:"18px 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
        <div style={{ color:"#fff" }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>Pronto para começar?</div>
          <div style={{ fontSize:13, opacity:.8 }}>
            Você avaliará cada aluno em {DOMINIOS.reduce((t,d)=>t+d.perguntas.length,0)} perguntas distribuídas em 4 domínios.
          </div>
        </div>
        <button onClick={onComecar} style={{ ...s.btn("#fff"), color:"#1A3A6E",
          fontSize:15, padding:"12px 28px" }}>
          Iniciar avaliação →
        </button>
      </div>
    </div>
  );
}

// ── FORMULÁRIO DE IDENTIFICAÇÃO ───────────────────────────────────────────────
function FormIdentificacao({ onProximo }) {
  const [prof, setProf]   = useState("");
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [data, setData]   = useState(new Date().toLocaleDateString("pt-BR"));

  const ok = prof && turma && turno;

  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"0 0 48px" }}>
      <div style={{ ...s.card, borderTop:"4px solid #1A3A6E" }}>
        <div style={{ fontWeight:800, fontSize:18, color:"#1A3A6E", marginBottom:6 }}>
          👩‍🏫 Identificação do Professor e da Turma
        </div>
        <p style={{ fontSize:13, color:"#888", marginBottom:22 }}>
          Estas informações aparecerão no relatório final para arquivamento.
        </p>

        <div style={{ marginBottom:16 }}>
          <label style={s.lbl}>Nome completo do(a) Professor(a) *</label>
          <input value={prof} onChange={e=>setProf(e.target.value)}
            placeholder="Ex: Profª Marcelle Souza" style={s.inp} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
          <div>
            <label style={s.lbl}>Turma *</label>
            <input value={turma} onChange={e=>setTurma(e.target.value)}
              placeholder="Ex: 3° Ano – Turma 301" style={s.inp} />
          </div>
          <div>
            <label style={s.lbl}>Data *</label>
            <input value={data} onChange={e=>setData(e.target.value)} style={s.inp} />
          </div>
        </div>

        <div style={{ marginBottom:22 }}>
          <label style={s.lbl}>Turno *</label>
          <div style={{ display:"flex", gap:10 }}>
            {["1° Turno – Manhã (08h-12h)", "2° Turno – Tarde (13h-17h)"].map(t => (
              <label key={t} style={{ cursor:"pointer", flex:1, padding:"10px 14px",
                borderRadius:9, border:`2px solid ${turno===t?"#1A3A6E":"#E0E0E0"}`,
                background:turno===t?"#E8F4FD":"#fff",
                color:turno===t?"#1A3A6E":"#555",
                fontWeight:turno===t?700:400, fontSize:13, textAlign:"center" }}>
                <input type="radio" checked={turno===t} onChange={()=>setTurno(t)} style={{display:"none"}}/>
                {t}
              </label>
            ))}
          </div>
        </div>

        <button onClick={()=>onProximo({prof,turma,turno,data})} disabled={!ok}
          style={{ ...s.btn("#1A3A6E",!ok), width:"100%", padding:"13px" }}>
          Continuar → Adicionar alunos
        </button>
      </div>
    </div>
  );
}

// ── QUESTIONÁRIO DE UM ALUNO ──────────────────────────────────────────────────
function FormAluno({ aluno, onSalvar, onCancelar }) {
  const totalPerguntas = DOMINIOS.reduce((t,d)=>t+d.perguntas.length,0);
  const [respostas, setRespostas] = useState({});
  const respondidas = Object.keys(respostas).length;
  const completo = respondidas === totalPerguntas;

  function handleSalvar() {
    if (!completo) return;
    const pontos = Object.values(respostas).reduce((t,v)=>t+v,0);
    const suporte = calcularSuporte(respostas, totalPerguntas);
    onSalvar({ ...aluno, respostas, pontos, suporte, totalPerguntas });
  }

  return (
    <div style={{ maxWidth:760, margin:"0 auto", padding:"0 0 48px" }}>
      {/* Cabeçalho aluno */}
      <div style={{ background:"#F0F4FF", border:"1px solid #BDD7EE", borderRadius:12,
        padding:"16px 20px", marginBottom:20,
        display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontWeight:800, fontSize:17, color:"#1A3A6E" }}>{aluno.nome}</div>
          <div style={{ fontSize:12, color:"#666", marginTop:2 }}>
            {aluno.deficiencia && `${aluno.deficiencia} · `}Avaliação individual de suporte
          </div>
        </div>
        <div style={{ background:"#1A3A6E", color:"#fff", borderRadius:8, padding:"6px 14px",
          fontSize:12, fontWeight:700 }}>
          {respondidas}/{totalPerguntas} respondidas
        </div>
      </div>

      {/* Barra de progresso */}
      <div style={{ background:"#E0E0E0", borderRadius:10, height:6, marginBottom:24 }}>
        <div style={{ background:"#1A3A6E", borderRadius:10, height:6,
          width:`${(respondidas/totalPerguntas)*100}%`, transition:"width .3s" }} />
      </div>

      {DOMINIOS.map((dom, di) => (
        <div key={dom.id} style={{ ...s.card, borderLeft:`4px solid ${dom.cor}`,
          marginBottom:16 }}>
          <div style={{ display:"flex", align:"center", gap:10, marginBottom:6 }}>
            <div style={{ fontWeight:800, fontSize:15, color:dom.cor }}>{dom.titulo}</div>
          </div>
          <p style={{ fontSize:12, color:"#666", marginBottom:16, lineHeight:1.6 }}>
            {dom.descricao}
          </p>

          {dom.perguntas.map((perg, pi) => (
            <div key={perg.id} style={{ marginBottom: pi < dom.perguntas.length-1 ? 20 : 0,
              paddingBottom: pi < dom.perguntas.length-1 ? 20 : 0,
              borderBottom: pi < dom.perguntas.length-1 ? "1px solid #F0F0F0" : "none" }}>
              <div style={{ fontWeight:600, fontSize:13, color:"#1A202C", marginBottom:10,
                lineHeight:1.6 }}>
                <span style={{ background:dom.bg, color:dom.cor, borderRadius:4,
                  padding:"1px 7px", fontSize:10, fontWeight:700, marginRight:7 }}>
                  {di+1}.{pi+1}
                </span>
                {perg.texto}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                {perg.opcoes.map((op, oi) => {
                  const sel = respostas[perg.id] === op.valor;
                  const corOp = op.valor===3?"#C62828":op.valor===2?"#E65100":"#2E7D32";
                  return (
                    <label key={oi} style={{ display:"flex", alignItems:"flex-start", gap:10,
                      cursor:"pointer", padding:"10px 13px", borderRadius:9,
                      border:`2px solid ${sel ? corOp : "#E0E0E0"}`,
                      background: sel ? `${corOp}14` : "#F9FAFB",
                      transition:"all .15s" }}>
                      <input type="radio"
                        checked={sel}
                        onChange={() => setRespostas(prev => ({ ...prev, [perg.id]: op.valor }))}
                        style={{ marginTop:2, flexShrink:0 }} />
                      <span style={{ fontSize:13, color: sel ? corOp : "#444",
                        fontWeight: sel ? 700 : 400, lineHeight:1.6 }}>
                        {op.texto}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ display:"flex", gap:12, marginTop:8 }}>
        <button onClick={onCancelar} style={{ ...s.btn("#6B7280"), padding:"11px 22px" }}>
          ← Cancelar
        </button>
        <button onClick={handleSalvar} disabled={!completo}
          style={{ ...s.btn("#1A3A6E", !completo), flex:1, padding:"13px" }}>
          {completo ? "✅ Salvar avaliação deste aluno" : `Responda mais ${totalPerguntas-respondidas} pergunta(s) para salvar`}
        </button>
      </div>
    </div>
  );
}

// ── TELA DE GESTÃO DE ALUNOS ──────────────────────────────────────────────────
function GestaoAlunos({ identificacao, alunos, setAlunos, onGerarRelatorio }) {
  const [modo, setModo]         = useState("lista"); // "lista" | "novo" | "avaliando"
  const [nomeNovo, setNomeNovo] = useState("");
  const [defNova, setDefNova]   = useState("");
  const [alunoAtual, setAlunoAtual] = useState(null);

  function iniciarAvaliacao(al) {
    setAlunoAtual(al);
    setModo("avaliando");
  }

  function salvarAvaliacao(resultado) {
    setAlunos(prev => {
      const idx = prev.findIndex(a => a.id === resultado.id);
      if (idx >= 0) {
        const novo = [...prev];
        novo[idx] = resultado;
        return novo;
      }
      return [...prev, resultado];
    });
    setModo("lista");
    setAlunoAtual(null);
  }

  function adicionarAluno() {
    if (!nomeNovo.trim()) return;
    const novo = { id: Date.now(), nome: nomeNovo.trim(), deficiencia: defNova.trim() };
    setAlunos(prev => [...prev, novo]);
    setNomeNovo(""); setDefNova("");
    setModo("lista");
  }

  function removerAluno(id) {
    setAlunos(prev => prev.filter(a => a.id !== id));
  }

  if (modo === "avaliando" && alunoAtual) {
    return <FormAluno aluno={alunoAtual} onSalvar={salvarAvaliacao} onCancelar={()=>setModo("lista")} />;
  }

  const avaliados = alunos.filter(a => a.suporte);

  return (
    <div style={{ maxWidth:760, margin:"0 auto", padding:"0 0 48px" }}>
      {/* Info da turma */}
      <div style={{ background:"#F0F4FF", borderRadius:12, padding:"14px 20px",
        marginBottom:20, display:"flex", gap:14, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, color:"#1A3A6E", fontSize:14 }}>
            👩‍🏫 {identificacao.prof}
          </div>
          <div style={{ fontSize:12, color:"#666" }}>
            {identificacao.turma} · {identificacao.turno} · {identificacao.data}
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ background:"#1A3A6E", color:"#fff", borderRadius:8,
            padding:"6px 12px", fontSize:12, fontWeight:700, textAlign:"center" }}>
            {alunos.length} aluno(s)
          </div>
          <div style={{ background: avaliados.length===alunos.length && alunos.length>0
            ? "#2E7D32":"#E65100", color:"#fff", borderRadius:8,
            padding:"6px 12px", fontSize:12, fontWeight:700, textAlign:"center" }}>
            {avaliados.length}/{alunos.length} avaliado(s)
          </div>
        </div>
      </div>

      {/* Adicionar aluno */}
      {modo === "novo" ? (
        <div style={{ ...s.card, marginBottom:16, borderLeft:"4px solid #2E7D32" }}>
          <div style={{ fontWeight:700, fontSize:15, color:"#2E7D32", marginBottom:14 }}>
            ➕ Adicionar aluno com deficiência
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
            <div>
              <label style={s.lbl}>Nome completo do aluno *</label>
              <input value={nomeNovo} onChange={e=>setNomeNovo(e.target.value)}
                placeholder="Nome do aluno" style={s.inp}
                onKeyDown={e=>e.key==="Enter"&&adicionarAluno()} />
            </div>
            <div>
              <label style={s.lbl}>Deficiência / CID (opcional)</label>
              <input value={defNova} onChange={e=>setDefNova(e.target.value)}
                placeholder="Ex: TEA / F84.0" style={s.inp} />
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setModo("lista")} style={s.btn("#6B7280")}>Cancelar</button>
            <button onClick={adicionarAluno} disabled={!nomeNovo.trim()}
              style={{ ...s.btn("#2E7D32",!nomeNovo.trim()), flex:1 }}>
              Adicionar aluno
            </button>
          </div>
        </div>
      ) : (
        <button onClick={()=>setModo("novo")}
          style={{ ...s.btn("#2E7D32"), width:"100%", marginBottom:16, padding:"12px" }}>
          ➕ Adicionar aluno com deficiência à turma
        </button>
      )}

      {/* Lista de alunos */}
      {alunos.length === 0 ? (
        <div style={{ ...s.card, textAlign:"center", padding:"40px 20px", color:"#999" }}>
          <div style={{ fontSize:32, marginBottom:10 }}>👦</div>
          Adicione os alunos com deficiência da sua turma para iniciar as avaliações.
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
          {alunos.map(al => (
            <div key={al.id} style={{ ...s.card,
              borderLeft: al.suporte ? `4px solid ${al.suporte.cor}` : "4px solid #D0D5DD" }}>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", flexWrap:"wrap", gap:10 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:"#1A202C" }}>{al.nome}</div>
                  {al.deficiencia && (
                    <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{al.deficiencia}</div>
                  )}
                  {al.suporte && (
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6 }}>
                      <span style={{ background:al.suporte.bg, color:al.suporte.cor,
                        border:`1px solid ${al.suporte.cor}44`, borderRadius:20,
                        padding:"2px 10px", fontSize:12, fontWeight:700 }}>
                        {al.suporte.emoji} {al.suporte.label}
                      </span>
                      <span style={{ fontSize:11, color:"#888" }}>
                        {al.pontos} pts
                      </span>
                    </div>
                  )}
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>iniciarAvaliacao(al)}
                    style={{ ...s.btn(al.suporte?"#1A3A6E":"#2E7D32"), fontSize:12, padding:"7px 14px" }}>
                    {al.suporte ? "✏️ Reeditar" : "📝 Avaliar"}
                  </button>
                  <button onClick={()=>removerAluno(al.id)}
                    style={{ ...s.btn("#D32F2F"), fontSize:12, padding:"7px 12px" }}>
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gerar relatório */}
      {avaliados.length > 0 && (
        <div style={{ background: avaliados.length===alunos.length
          ? "linear-gradient(135deg,#1A3A6E,#2E75B6)"
          : "#F0F4FF",
          borderRadius:12, padding:"16px 20px",
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ color: avaliados.length===alunos.length?"#fff":"#1A3A6E" }}>
            {avaliados.length < alunos.length ? (
              <>
                <div style={{ fontWeight:700 }}>⚠️ {alunos.length-avaliados.length} aluno(s) ainda sem avaliação</div>
                <div style={{ fontSize:12, opacity:.8 }}>Você pode gerar o relatório parcial ou completar todas as avaliações.</div>
              </>
            ) : (
              <>
                <div style={{ fontWeight:700, fontSize:15 }}>✅ Todos os alunos avaliados!</div>
                <div style={{ fontSize:12, opacity:.8 }}>O relatório incluirá a ordem de prioridade completa da turma.</div>
              </>
            )}
          </div>
          <button onClick={onGerarRelatorio}
            style={{ ...s.btn("#fff"), color:"#1A3A6E", fontSize:14, padding:"11px 24px" }}>
            📊 Gerar Relatório de Prioridade →
          </button>
        </div>
      )}
    </div>
  );
}

// ── RELATÓRIO FINAL ───────────────────────────────────────────────────────────
function Relatorio({ identificacao, alunos, onVoltar }) {
  const printRef = useRef();
  const avaliados = alunos
    .filter(a => a.suporte)
    .sort((a, b) => pesoPrioridade(b) - pesoPrioridade(a));

  const s1 = avaliados.filter(a=>a.suporte.nivel===1);
  const s2 = avaliados.filter(a=>a.suporte.nivel===2);
  const s3 = avaliados.filter(a=>a.suporte.nivel===3);

  function imprimir() { window.print(); }

  const style_print = `
    @media print {
      body * { visibility: hidden !important; }
      #relatorio-print, #relatorio-print * { visibility: visible !important; }
      #relatorio-print { position: fixed; left: 0; top: 0; width: 100%; }
      @page { size: A4; margin: 12mm 14mm; }
    }
  `;

  return (
    <div style={{ maxWidth:820, margin:"0 auto", padding:"0 0 48px" }}>
      <style>{style_print}</style>

      {/* Barra de ações */}
      <div style={{ background:"#1A3A6E", borderRadius:12, padding:"12px 20px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        marginBottom:20, flexWrap:"wrap", gap:10 }} className="no-print">
        <div style={{ color:"#fff", fontWeight:700 }}>
          📊 Relatório de Prioridade gerado — {avaliados.length} aluno(s)
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onVoltar} style={{ background:"rgba(255,255,255,0.15)",
            border:"1px solid rgba(255,255,255,0.3)", color:"#fff",
            borderRadius:8, padding:"7px 16px", cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>
            ← Voltar
          </button>
          <button onClick={imprimir} style={{ ...s.btn("#fff"), color:"#1A3A6E",
            fontSize:13, padding:"7px 18px" }}>
            🖨️ Imprimir / PDF
          </button>
        </div>
      </div>

      {/* CONTEÚDO IMPRIMÍVEL */}
      <div id="relatorio-print" ref={printRef}>

        {/* Cabeçalho institucional */}
        <div style={{ background:"#1A3A6E", color:"#fff", borderRadius:"10px 10px 0 0",
          padding:"10px 16px", fontSize:9, fontWeight:700, textAlign:"center" }}>
          ESTADO DO RIO DE JANEIRO · PREFEITURA MUNICIPAL DE DUQUE DE CAXIAS · SECRETARIA MUNICIPAL DE EDUCAÇÃO<br/>
          ESCOLA MUNICIPAL REGINA CELI DA SILVA CERDEIRA – CENTRO DE REFERÊNCIA EM EDUCAÇÃO INCLUSIVA
        </div>
        <div style={{ border:"1px solid #1A3A6E", borderTop:"none",
          borderRadius:"0 0 10px 10px", padding:"14px 18px", marginBottom:16,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:"#1A3A6E" }}>
              Relatório de Prioridade de Apoio à Inclusão
            </div>
            <div style={{ fontSize:11, color:"#666", marginTop:3 }}>
              Instrumento de Avaliação e Classificação de Suporte · {ANO}
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:9, color:"#888" }}>DATA DE GERAÇÃO</div>
            <div style={{ fontWeight:700, color:"#1A3A6E" }}>{identificacao.data}</div>
          </div>
        </div>

        {/* Dados da turma */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
          {[
            ["Professor(a)", identificacao.prof],
            ["Turma", identificacao.turma],
            ["Turno", identificacao.turno],
          ].map(([l,v]) => (
            <div key={l} style={{ border:"1px solid #E0E0E0", borderRadius:8, padding:"8px 12px" }}>
              <div style={{ fontSize:9, color:"#888", fontWeight:700, textTransform:"uppercase" }}>{l}</div>
              <div style={{ fontSize:13, fontWeight:700, color:"#1A3A6E", marginTop:2 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Resumo quantitativo */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10, marginBottom:20 }}>
          {[
            { label:"Total avaliado",   val:avaliados.length, cor:"#1A3A6E", bg:"#E8F4FD" },
            { label:"🔴 Suporte 1",       val:s1.length,        cor:"#C62828", bg:"#FFEBEE" },
            { label:"🟠 Suporte 2",       val:s2.length,        cor:"#E65100", bg:"#FFF3E0" },
            { label:"🟢 Suporte 3",       val:s3.length,        cor:"#2E7D32", bg:"#E8F5E9" },
          ].map((c,i) => (
            <div key={i} style={{ background:c.bg, borderRadius:10, padding:"12px 14px", textAlign:"center" }}>
              <div style={{ fontSize:26, fontWeight:900, color:c.cor }}>{c.val}</div>
              <div style={{ fontSize:11, color:c.cor, fontWeight:600 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Ordem de prioridade */}
        <div style={{ fontWeight:800, fontSize:14, color:"#1A3A6E", marginBottom:10,
          paddingBottom:6, borderBottom:"2px solid #1A3A6E" }}>
          📋 Ordem de Prioridade de Atendimento
        </div>
        <p style={{ fontSize:11, color:"#666", marginBottom:14, lineHeight:1.6 }}>
          Os alunos estão ordenados do maior para o menor grau de necessidade de apoio especializado.
          A ordenação considera o nível de suporte (S1 &gt; S2 &gt; S3) e, dentro do mesmo nível, a pontuação obtida nas avaliações.
          Esta ordem deve orientar a designação prioritária dos profissionais de apoio à inclusão (AAI 1, AAI 2, Ax EI).
        </p>

        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11, marginBottom:20 }}>
          <thead>
            <tr style={{ background:"#1A3A6E", color:"#fff" }}>
              <th style={{ padding:"8px 10px", textAlign:"center", width:36 }}>Prioridade</th>
              <th style={{ padding:"8px 10px", textAlign:"left" }}>Aluno(a)</th>
              <th style={{ padding:"8px 10px", textAlign:"left" }}>Deficiência/CID</th>
              <th style={{ padding:"8px 10px", textAlign:"center" }}>Classificação de Suporte</th>
              <th style={{ padding:"8px 10px", textAlign:"center" }}>Pontuação</th>
              <th style={{ padding:"8px 10px", textAlign:"left" }}>Tipo de apoio indicado</th>
            </tr>
          </thead>
          <tbody>
            {avaliados.map((al, i) => {
              const tipoApoio = al.suporte.nivel===1
                ? "AAI 1 exclusivo (dedicação integral)"
                : al.suporte.nivel===2
                  ? "AAI 1 ou Ax EI (compartilhado possível)"
                  : "Apoio volante ou compartilhado";
              return (
                <tr key={al.id} style={{ background: i%2===0?"#fff":"#F8FAFC" }}>
                  <td style={{ padding:"8px 10px", textAlign:"center", fontWeight:800,
                    fontSize:16, color:"#1A3A6E" }}>{i+1}º</td>
                  <td style={{ padding:"8px 10px", fontWeight:700, color:"#1A202C" }}>
                    {al.nome}
                  </td>
                  <td style={{ padding:"8px 10px", color:"#555", fontSize:10 }}>
                    {al.deficiencia || "—"}
                  </td>
                  <td style={{ padding:"8px 10px", textAlign:"center" }}>
                    <span style={{ background:al.suporte.bg, color:al.suporte.cor,
                      border:`1px solid ${al.suporte.cor}55`, borderRadius:20,
                      padding:"3px 10px", fontWeight:700, fontSize:10, whiteSpace:"nowrap" }}>
                      {al.suporte.emoji} {al.suporte.label}
                    </span>
                  </td>
                  <td style={{ padding:"8px 10px", textAlign:"center",
                    fontWeight:700, color:al.suporte.cor }}>
                    {al.pontos}/{al.totalPerguntas*3}
                  </td>
                  <td style={{ padding:"8px 10px", fontSize:10, color:"#444" }}>
                    {tipoApoio}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Detalhamento por domínio */}
        <div style={{ fontWeight:800, fontSize:13, color:"#1A3A6E", marginBottom:10,
          paddingBottom:6, borderBottom:"2px solid #1A3A6E" }}>
          🔍 Detalhamento por Domínio de Avaliação
        </div>

        {avaliados.map((al, i) => (
          <div key={al.id} style={{ marginBottom:14, pageBreakInside:"avoid" }}>
            <div style={{ background:al.suporte.bg, border:`1px solid ${al.suporte.cor}44`,
              borderRadius:8, padding:"8px 14px", marginBottom:6,
              display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontWeight:700, fontSize:12, color:al.suporte.cor }}>
                {i+1}º · {al.nome} {al.deficiencia ? `— ${al.deficiencia}` : ""}
              </div>
              <span style={{ fontWeight:700, fontSize:11, color:al.suporte.cor }}>
                {al.suporte.emoji} {al.suporte.label} · {al.pontos} pts
              </span>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:10 }}>
              <thead>
                <tr style={{ background:"#F0F4F8" }}>
                  <th style={{ padding:"5px 8px", textAlign:"left", color:"#555" }}>Domínio</th>
                  <th style={{ padding:"5px 8px", textAlign:"center", color:"#555" }}>Pts obtidos</th>
                  <th style={{ padding:"5px 8px", textAlign:"center", color:"#555" }}>Pts máx.</th>
                  <th style={{ padding:"5px 8px", textAlign:"left", color:"#555" }}>Nível de demanda</th>
                </tr>
              </thead>
              <tbody>
                {DOMINIOS.map(dom => {
                  const ptsDom = dom.perguntas.reduce((t,p)=>t+(al.respostas?.[p.id]||0),0);
                  const maxDom = dom.perguntas.length*3;
                  const pctDom = ptsDom/maxDom;
                  const demanda = pctDom>=0.67?"Alta":pctDom>=0.34?"Moderada":"Baixa";
                  const corDem  = pctDom>=0.67?"#C62828":pctDom>=0.34?"#E65100":"#2E7D32";
                  return (
                    <tr key={dom.id} style={{ borderBottom:"1px solid #F0F0F0" }}>
                      <td style={{ padding:"5px 8px", fontWeight:500 }}>{dom.titulo}</td>
                      <td style={{ padding:"5px 8px", textAlign:"center", fontWeight:700, color:corDem }}>
                        {ptsDom}
                      </td>
                      <td style={{ padding:"5px 8px", textAlign:"center", color:"#888" }}>{maxDom}</td>
                      <td style={{ padding:"5px 8px" }}>
                        <span style={{ background:`${corDem}18`, color:corDem,
                          borderRadius:10, padding:"1px 8px", fontWeight:700 }}>
                          {demanda}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}

        {/* Orientações para a secretaria */}
        <div style={{ background:"#FFF8E1", border:"1px solid #FFD54F",
          borderRadius:10, padding:"14px 18px", marginTop:16, marginBottom:20 }}>
          <div style={{ fontWeight:700, fontSize:12, color:"#B45309", marginBottom:8 }}>
            📌 Orientações para a Secretaria Escolar e Equipe Diretiva
          </div>
          <ul style={{ paddingLeft:18, margin:0 }}>
            {[
              "Alunos classificados como Suporte 1 (S1) devem ter profissional de apoio designado exclusivamente para eles, com presença integral no turno.",
              "Alunos classificados como Suporte 2 (S2) podem, a critério da Equipe Técnico-Pedagógica (ETP), compartilhar um profissional de apoio — desde que os dois alunos estejam na mesma turma.",
              "Alunos classificados como Suporte 3 (S3) podem ser atendidos por apoio volante ou profissional compartilhado entre turmas.",
              "Toda alteração de classificação de suporte deve passar por avaliação da ETP, deferimento da Direção e monitoramento da Secretaria Escolar.",
              "Este relatório deve ser arquivado na pasta do aluno e revisado ao final de cada bimestre ou sempre que houver mudança significativa no quadro do aluno.",
            ].map((o,i)=>(
              <li key={i} style={{ fontSize:11, color:"#444", marginBottom:5, lineHeight:1.6 }}>{o}</li>
            ))}
          </ul>
        </div>

        {/* Assinaturas */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20, marginTop:20 }}>
          {[
            { titulo:"Professor(a) Responsável", sub:identificacao.prof },
            { titulo:"Coordenação Pedagógica" },
            { titulo:"Direção" },
          ].map((a,i)=>(
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ borderBottom:"1px solid #333", marginBottom:5, height:36 }}/>
              <div style={{ fontSize:10, fontWeight:700, color:"#1A3A6E" }}>{a.titulo}</div>
              {a.sub && <div style={{ fontSize:9, color:"#666" }}>{a.sub}</div>}
            </div>
          ))}
        </div>

        <div style={{ marginTop:16, paddingTop:10, borderTop:"1px dashed #ccc",
          display:"flex", justifyContent:"space-between", fontSize:9, color:"#aaa" }}>
          <span>Instrumento de Avaliação de Suporte · {UNIDADE} · {ANO}</span>
          <span>Gerado em: {identificacao.data} · Arquivar na pasta do aluno</span>
        </div>
      </div>
    </div>
  );
}

// ── APP PRINCIPAL ─────────────────────────────────────────────────────────────
export default function App() {
  const [etapa, setEtapa]               = useState("instrucoes");
  const [identificacao, setIdentificacao] = useState(null);
  const [alunos, setAlunos]             = useState([]);
  const [salvando, setSalvando]         = useState(false);
  const [salvoId, setSalvoId]           = useState(null);
  const [erroSalvo, setErroSalvo]       = useState(false);

  async function salvarNoSupabase(alunosAvaliados) {
    setSalvando(true);
    setErroSalvo(false);
    try {
      const payload = {
        professor:    identificacao.prof,
        turma:        identificacao.turma,
        turno:        identificacao.turno,
        data_aval:    identificacao.data,
        total_alunos: alunosAvaliados.filter(a => a.suporte).length,
        s1_count:     alunosAvaliados.filter(a => a.suporte?.nivel === 1).length,
        s2_count:     alunosAvaliados.filter(a => a.suporte?.nivel === 2).length,
        s3_count:     alunosAvaliados.filter(a => a.suporte?.nivel === 3).length,
        resultados:   alunosAvaliados.filter(a => a.suporte).map(a => ({
          nome:          a.nome,
          deficiencia:   a.deficiencia || "",
          suporte_nivel: a.suporte.nivel,
          suporte_label: a.suporte.label,
          pontos:        a.pontos,
          respostas:     a.respostas,
        })),
        criado_em: new Date().toLocaleString("pt-BR"),
      };
      const { data, error } = await supabase
        .from("avaliacoes")
        .insert([payload])
        .select("id")
        .single();
      if (error) throw error;
      setSalvoId(data.id);
    } catch (e) {
      console.error(e);
      setErroSalvo(true);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"#F4F6FB",
      fontFamily:"'Segoe UI',Arial,sans-serif" }}>

      <header style={{ background:"linear-gradient(135deg,#1A3A6E,#2E75B6)",
        padding:"14px 24px", display:"flex", alignItems:"center",
        justifyContent:"space-between", boxShadow:"0 2px 10px rgba(0,0,0,0.15)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:26 }}>🏫</span>
          <div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:15 }}>
              Instrumento de Classificação de Suporte
            </div>
            <div style={{ color:"rgba(255,255,255,0.75)", fontSize:11 }}>
              {UNIDADE} · Inclusão em Foco · {ANO}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {[
            { id:"instrucoes", label:"Instruções" },
            { id:"identificacao", label:"Identificação" },
            { id:"alunos", label:"Avaliação" },
            { id:"relatorio", label:"Relatório" },
          ].map((e,i) => (
            <div key={e.id} style={{ display:"flex", alignItems:"center", gap:6 }}>
              {i>0 && <span style={{ color:"rgba(255,255,255,0.4)", fontSize:12 }}>›</span>}
              <div style={{ padding:"4px 10px", borderRadius:20,
                background: etapa===e.id ? "rgba(255,255,255,0.25)" : "transparent",
                color: etapa===e.id ? "#fff" : "rgba(255,255,255,0.5)",
                fontSize:11, fontWeight: etapa===e.id ? 700 : 400 }}>
                {e.label}
              </div>
            </div>
          ))}
        </div>
      </header>

      <main style={{ padding:"28px 20px" }}>
        {etapa === "instrucoes" && (
          <PainelInstrucional onComecar={() => setEtapa("identificacao")} />
        )}
        {etapa === "identificacao" && (
          <FormIdentificacao onProximo={dados => {
            setIdentificacao(dados);
            setEtapa("alunos");
          }} />
        )}
        {etapa === "alunos" && (
          <GestaoAlunos
            identificacao={identificacao}
            alunos={alunos}
            setAlunos={setAlunos}
            onGerarRelatorio={async () => {
              await salvarNoSupabase(alunos);
              setEtapa("relatorio");
            }}
          />
        )}
        {etapa === "relatorio" && (
          <div>
            {salvando && (
              <div style={{ background:"#E8F4FD", border:"1px solid #90CAF9",
                borderRadius:10, padding:"12px 18px", marginBottom:16,
                maxWidth:820, margin:"0 auto 16px",
                color:"#1A3A6E", fontWeight:600, display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:20 }}>⏳</span>
                Salvando avaliação no banco de dados...
              </div>
            )}
            {salvoId && !salvando && (
              <div style={{ background:"#E8F5E9", border:"1px solid #A5D6A7",
                borderRadius:10, padding:"12px 18px", marginBottom:16,
                maxWidth:820, margin:"0 auto 16px",
                color:"#2E7D32", fontWeight:600, display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:20 }}>✅</span>
                Avaliação salva com sucesso! A equipe diretiva já pode acessar este relatório.
              </div>
            )}
            {erroSalvo && !salvando && (
              <div style={{ background:"#FFEBEE", border:"1px solid #EF9A9A",
                borderRadius:10, padding:"12px 18px", marginBottom:16,
                maxWidth:820, margin:"0 auto 16px",
                color:"#C62828", fontWeight:600, display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:20 }}>⚠️</span>
                Não foi possível salvar automaticamente. Use o botão Imprimir para guardar o relatório.
              </div>
            )}
            <Relatorio
              identificacao={identificacao}
              alunos={alunos}
              onVoltar={() => setEtapa("alunos")}
            />
          </div>
        )}
      </main>
    </div>
  );
}
