import { readdir, readFile, mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { marked } from 'marked';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'docs');
const base = process.env.SITE_BASE ?? '/portfolio';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const files = (await readdir(path.join(root,'content/projects'))).filter(f => f.endsWith('.md'));
const projects = await Promise.all(files.map(async f => {
  const raw = await readFile(path.join(root,'content/projects',f),'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing front matter: ${f}`);
  const data = parseYaml(match[1]);
  const content = match[2];
  if (!data.title || !data.period || !data.summary || !Array.isArray(data.tags)) throw new Error(`Missing project metadata: ${f}`);
  return {...data, content, slug:f.replace(/\.md$/,'')};
}));
projects.sort((a,b) => a.order-b.order);
const tags=p=>p.tags.map(t=>`<span>${esc(t)}</span>`).join('');
function shell(title,description,body,url='/') {
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)} · 이윤병</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#ffffff"><link rel="canonical" href="https://yoon-bottle.github.io${base}${url}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css"></head><body><a class="skip" href="#main">본문으로 이동</a><header class="site-header"><a class="identity" href="/">이윤병 <span class="english-name">Yoonbyung Lee</span><span class="job-title">Data Scientist</span></a><div class="header-contact"><nav aria-label="연락처"><a class="social" href="https://github.com/yoon-bottle" aria-label="GitHub 프로필">GH</a><a class="social" href="https://www.linkedin.com/in/yoonbyung-lee-8784a1340" aria-label="LinkedIn 프로필">in</a><a class="social" href="mailto:lyb030414@gmail.com" aria-label="이메일 보내기">@</a></nav><a href="mailto:lyb030414@gmail.com">lyb030414@gmail.com</a><a href="https://github.com/yoon-bottle">github.com/yoon-bottle</a></div></header>${body}<footer><span>이윤병 · Yoonbyung Lee</span><div><a href="https://github.com/yoon-bottle">GitHub ↗</a><a href="https://www.linkedin.com/in/yoonbyung-lee-8784a1340">LinkedIn ↗</a><a href="mailto:lyb030414@gmail.com">Email ↗</a></div></footer></body></html>`.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`);
}
await rm(out,{recursive:true,force:true}); await mkdir(out,{recursive:true});
await cp(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
await writeFile(path.join(out,'.nojekyll'),'');
const rows = projects.map(p=>`<div class="project-row"><div class="project-label"><h3><a href="/projects/${p.slug}/">${esc(p.title)}</a></h3><span>${esc(p.period)}</span><a class="detail-link" href="/projects/${p.slug}/">상세 내용 →</a></div><div class="project-description"><p class="project-summary">${esc(p.summary)}</p><p class="project-role">${esc(p.role)} · ${esc(p.status)}</p><div class="tags">${tags(p)}</div></div></div>`).join('');
const home=`<main id="main"><h1 class="sr-only">이윤병의 데이터 사이언스 포트폴리오</h1><section id="about" class="resume-section"><h2 class="section-title">About Me</h2><div class="resume-row"><div class="profile-label"><strong>이윤병</strong><span>Data Scientist</span><span>Bagelcode · DATA&amp;AI</span></div><div><p>게임 유저의 행동을 예측하고, 그 결과를 실제 업무에 활용하는 데이터 사이언티스트입니다. 베이글코드 DATA&amp;AI 팀에서 예측 모델과 데이터 파이프라인, 실시간 서빙, 사내 분석 도구를 개발하고 있습니다.</p><p>모델링부터 서비스 구현까지 연결하는 일을 해왔고, 최근에는 LLM 평가와 게임 QA 에이전트를 다루고 있습니다.</p><div class="tags"><span>Python</span><span>SQL</span><span>TensorFlow</span><span>Databricks</span></div></div></div></section><section id="projects" class="resume-section"><h2 class="section-title">Projects</h2>${rows}</section><section class="resume-section"><h2 class="section-title">Experience</h2><div class="resume-row"><div class="project-label"><h3>Bagelcode</h3><span>2024.06–현재</span></div><div><p><strong>DATA&amp;AI Team</strong></p><p>Data Scientist · 2024.09–현재<br>Data Scientist Intern · 2024.06–2024.09</p><p class="muted">산업기능요원 복무 · 2024.09–2026.08 (복무 완료)</p></div></div></section><section class="resume-section"><h2 class="section-title">Education</h2><div class="resume-row"><div class="project-label"><h3>POSTECH</h3><span>2022.02–2028.02 졸업 예정</span></div><div><p><strong>포항공과대학교 컴퓨터공학과</strong></p><p>학사 과정 · 누적 평점 3.76 / 4.30</p></div></div></section><section class="resume-section"><h2 class="section-title">Publication</h2><div class="resume-row"><div class="project-label"><h3>WWW 2025</h3><span>Industry Track · 공동 2저자</span></div><div><p><a class="paper-link" href="https://doi.org/10.1145/3701716.3715267">TransForeCaster: In-and-Cross Categorized Feature Integration in User Representation Learning ↗</a></p><p>베이스라인·Ablation 실험, 도표 및 원고 작성 참여.</p></div></div></section><section class="resume-section"><h2 class="section-title">Activities</h2><div class="resume-row"><div class="project-label"><h3>컴퓨터공학과 학생회</h3><span>2024년</span></div><div><p><strong>포항공과대학교 컴퓨터공학과 학생회 총무</strong></p></div></div><div class="resume-row activity-row"><div class="project-label"><h3>새내기새로배움터</h3><span>2023·2024학년</span></div><div><p><strong>새내기새로배움터 준비위원회</strong></p><p>2024학년도 · 미션투어팀장<br>2023학년도 · 인솔자팀원</p></div></div><div class="resume-row activity-row"><div class="project-label"><h3>해맞이한마당</h3><span>2023학년</span></div><div><p><strong>해맞이한마당 준비위원회 총무</strong></p></div></div></section><section class="resume-section"><h2 class="section-title">Awards &amp; Certification</h2><div class="resume-row"><div class="project-label"><h3>수상 및 자격증</h3></div><div><p><strong><a href="/projects/guryongpo-damoa/">2025 디지털 트윈 구룡포 AI 해커톤</a></strong><br>장려상 (4위) · 2025.08–2025.09<br><a class="detail-link" href="/projects/guryongpo-damoa/">상세 내용 →</a></p><p><strong>AWS Certified Solutions Architect – Associate</strong><br>2026.05 취득 · 2029.05 만료 예정</p></div></div></section></main>`;
await writeFile(path.join(out,'index.html'),shell('Data Scientist Portfolio','이윤병의 데이터 사이언스 프로젝트. 예측 모델, 데이터 파이프라인, 분석 도구와 AI 에이전트.',home));
for (let i=0;i<projects.length;i++) {
 const p=projects[i];
 const headings=[...p.content.matchAll(/^## (.+)$/gm)].map((m,index)=>({text:m[1],id:`section-${index}`}));
 let index=0;
 const renderer=new marked.Renderer();
 renderer.heading=({tokens,depth})=>`<h${depth}${depth===2?` id="section-${index++}"`:''}>${renderer.parser.parseInline(tokens)}</h${depth}>`;
 const content=marked.parse(p.content,{renderer});
 const next=projects[(i+1)%projects.length];
 const body=`<main id="main" class="case"><a class="back" href="/#projects">← 모든 프로젝트</a><header class="case-header"><p class="eyebrow">${esc(p.category)}</p><h1>${esc(p.title)}</h1><p class="case-summary">${esc(p.summary)}</p><dl class="case-meta"><div><dt>기간</dt><dd>${esc(p.period)}</dd></div><div><dt>내 역할</dt><dd>${esc(p.role)}</dd></div><div><dt>진행 상태</dt><dd>${esc(p.status)}</dd></div></dl><div class="tags">${tags(p)}</div></header><div class="case-layout"><aside><nav aria-label="목차"><span class="eyebrow">이 프로젝트에서</span>${headings.map(h=>`<a href="#${h.id}">${esc(h.text)}</a>`).join('')}</nav></aside><article>${content}</article></div><a class="next-project" href="/projects/${next.slug}/"><span>다음 프로젝트</span><strong>${esc(next.title)} ↗</strong></a></main>`;
 const dir=path.join(out,'projects',p.slug);await mkdir(dir,{recursive:true});await writeFile(path.join(dir,'index.html'),shell(p.title,p.summary,body,`/projects/${p.slug}/`));
}
await writeFile(path.join(out,'404.html'),shell('페이지를 찾을 수 없습니다','페이지를 찾을 수 없습니다.',`<main id="main" class="hero"><p class="eyebrow">404</p><h1>페이지를 찾을 수 없습니다.</h1><a class="text-link" href="/">프로젝트 목록으로 돌아가기 →</a></main>`));
console.log(`Built home, ${projects.length} project pages and 404 page.`);
