import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../docs');
async function walk(dir){const result=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())result.push(...await walk(p));else if(p.endsWith('.html'))result.push(p);}return result;}
const pages=await walk(root);const errors=[];
for(const file of pages){const html=await readFile(file,'utf8');
 if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${file}: expected one H1`);
 if(!html.includes('lang="ko"'))errors.push(`${file}: missing language`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length)errors.push(`${file}: duplicate anchors`);
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const ref=m[1];if(/^(https?:|mailto:|data:)/.test(ref))continue;
  const [url,hash]=ref.split('#');
  let target=url?path.resolve(root,'.'+url):file;
  try { if((await stat(target)).isDirectory())target=path.join(target,'index.html');
   const targetText=await readFile(target,'utf8');if(hash&&!targetText.includes(`id="${hash}"`))errors.push(`${file}: missing anchor ${ref}`);
  }catch{errors.push(`${file}: broken link ${ref}`);}
 }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Checked ${pages.length} pages: local links, section anchors, H1 and language OK.`);
