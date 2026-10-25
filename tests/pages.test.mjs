import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {buildPages} from '../scripts/build-pages.mjs';

for(const base of ['https://sebrlicek-team.github.io/ekoizol/','https://ccnplus.github.io/ekoizol/','https://ekoizol.seb-dev.cloud/']) {
 test(`GitHub Pages: ${base}`,async()=>{
  const out=await fs.mkdtemp(path.join(os.tmpdir(),'ekoizol-pages-'));
  try {
   await buildPages(base,out);
   const html=await fs.readFile(path.join(out,'index.html'),'utf8');
   const detail=await fs.readFile(path.join(out,'hydroizolace-zakladu-staveb/index.html'),'utf8');
   const contact=await fs.readFile(path.join(out,'kontakt/index.html'),'utf8');
   const pathname=new URL(base).pathname;
   assert(html.includes(`href="${pathname}assets/site.css"`));
   assert(html.includes(`href="${pathname}sluzby/"`));
   assert(html.includes(`rel="canonical" href="${base}"`));
   assert(detail.includes(`rel="canonical" href="${base}hydroizolace-zakladu-staveb/"`));
   assert(detail.includes(`href="${pathname}poptavka/"`));
   assert(html.includes('noindex,nofollow'));
   assert(contact.includes('data-mode="demo"'));
   const redirect=await fs.readFile(path.join(out,'hydroizolace-zakladu-staveb.htm'),'utf8');
   assert(redirect.includes(`url=${base}hydroizolace-zakladu-staveb/`));
   assert((await fs.readFile(path.join(out,'404.html'),'utf8')).includes(`href="${pathname}"`));
   assert((await fs.readFile(path.join(out,'sitemap.xml'),'utf8')).includes(`${base}hydroizolace-zakladu-staveb/`));
   await fs.access(path.join(out,'.nojekyll'));
  } finally {await fs.rm(out,{recursive:true,force:true});}
 });
}
