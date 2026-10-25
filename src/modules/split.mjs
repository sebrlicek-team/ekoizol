import {escape,image,link,section} from '../lib/html.mjs';
export default s=>section(s,`<div class="${s.layout==='text'?'prose':'split'}">${s.layout==='text'?'':image(s.image)}<div>${s.paragraphs.map(x=>`<p>${escape(x)}</p>`).join('')}${s.link?link(s.link):''}${s.links?.length?`<div class="related-links">${s.links.map(x=>link(x,'text-link')).join('')}</div>`:''}</div></div>`);
