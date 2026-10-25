import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {root} from '../scripts/build.mjs';
import path from 'node:path';
import {restoreMedia} from '../scripts/unpack-media.mjs';

test('Ekoizol migration preserves distinct references, source metadata and offline media',async()=>{
 await restoreMedia();
 const site=JSON.parse(await fs.readFile(path.join(root,'sites/ekoizol.json'),'utf8'));
 const references=site.pages.filter(page=>page.sections.some(section=>section.id==='fotografie'));
 assert.equal(references.length,44);
 for(const suffix of ['','-192'])assert(site.pages.some(page=>page.path===`/reference/parkovaci-dum-jana-gayera-hradec-kralove${suffix}/`));
 const school=site.pages.find(page=>page.path==='/reference/skolni-jidelna-hradec-kralove/');
 const values=school.sections.find(section=>section.type==='specs').items.map(item=>item.value);
 assert(values.includes('2020'));assert(values.includes('1500 m²'));
 for(const page of site.pages){
  assert.equal(page.sections.filter(section=>section.type==='hero').length,1);
  for(const section of page.sections){
   if(section.type==='contact'&&section.form)assert.equal(section.form.mode,'demo');
   if(section.type==='gallery')for(const image of section.images){
    assert(image.src.startsWith('/assets/ekoizol/'));assert(image.alt.trim());
    await fs.access(path.join(root,'public',image.src));
   }
  }
 }
 assert.equal(site.indexable,false);
 assert(!JSON.stringify(site).includes('kontakt@example.invalid'));
});
