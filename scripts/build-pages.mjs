import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build, root, files} from './build.mjs';
import {selectProject} from './project.mjs';
import {escape} from '../src/lib/html.mjs';

// Keep the original project/Cloudflare configuration intact. Pages can be mounted
// under /repository/ or at the root of an existing custom domain.
export async function buildPages(value, out=path.join(root,'dist')) {
 const base=new URL(value);
 if(base.protocol!=='https:'||base.username||base.password||base.search||base.hash)throw new Error('PAGES_URL musí být HTTPS adresa bez přihlašovacích údajů, dotazu a fragmentu.');
 if(!base.pathname.endsWith('/'))base.pathname+='/';
 const name=await selectProject(root);
 const site=JSON.parse(await fs.readFile(path.join(root,'sites',name+'.json'),'utf8'));
 await build(name,out);
 const local=value=>value.startsWith('/')&&!value.startsWith('//')?base.pathname+value.slice(1):value;
 for(const file of await files(out)) {
  if(/\.html?$/.test(file)) {
   let html=await fs.readFile(file,'utf8');
   html=html.replace(/\b(href|src|poster|data-src|action)="([^"]*)"/g,(_,attr,value)=>`${attr}="${local(value)}"`);
   // Canonical and Open Graph URLs must identify this Pages deployment.
   html=html.replaceAll(site.url.replace(/\/$/,'')+'/',base.href);
   await fs.writeFile(file,html);
  } else if(file.endsWith('.css')) {
   const css=await fs.readFile(file,'utf8');
   await fs.writeFile(file,css.replace(/url\((['"]?)(\/(?!\/)[^)'"\s]*)\1\)/g,(_,quote,url)=>`url(${quote}${local(url)}${quote})`));
  }
 }
 const sitemap=site.pages.map(page=>`<url><loc>${escape(new URL(page.path.slice(1),base).href)}</loc></url>`).join('');
 await fs.writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`);
 await fs.writeFile(path.join(out,'robots.txt'),site.indexable?`User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml',base).href}\n`:'User-agent: *\nDisallow: /\n');
 await fs.writeFile(path.join(out,'.nojekyll'),'');
 // Fail the build if any local link, image, stylesheet or fragment escapes the
 // deployment path or points to a missing file after the Pages transformation.
 for(const file of (await files(out)).filter(file=>/\.html?$/.test(file))) {
  const html=await fs.readFile(file,'utf8');
  const current=new URL(path.relative(out,file).split(path.sep).join('/'),base);
  for(const match of html.matchAll(/\b(?:href|src|poster|data-src|action)="([^"]+)"/g)) {
   const target=new URL(match[1].replaceAll('&amp;','&'),current);
   if(target.origin!==base.origin)continue;
   if(!target.pathname.startsWith(base.pathname))throw new Error(`Odkaz mimo cestu Pages: ${target.href}`);
   const relative=target.pathname.slice(base.pathname.length);
   const dest=path.join(out,relative.endsWith('/')||!relative?relative+'index.html':relative);
   await fs.access(dest);
   if(target.hash&&/\.html?$/.test(dest)) {
    const ids=[...(await fs.readFile(dest,'utf8')).matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
    if(!ids.includes(decodeURIComponent(target.hash.slice(1))))throw new Error(`Chybějící kotva: ${target.href}`);
   }
  }
 }
 return {name,pages:site.pages.length,out,url:base.href};
}

if(process.argv[1]===fileURLToPath(import.meta.url)) {
 const value=process.env.PAGES_URL||(process.env.GITHUB_REPOSITORY?`https://${process.env.GITHUB_REPOSITORY.split('/')[0].toLowerCase()}.github.io/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`:null);
 if(!value){console.error('Nastavte PAGES_URL nebo GITHUB_REPOSITORY.');process.exitCode=1;}
 else buildPages(value).then(result=>console.log(`GitHub Pages: ${result.pages} stránek → ${result.url}`)).catch(error=>{console.error(error);process.exitCode=1;});
}
