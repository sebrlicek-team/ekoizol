import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const hash=data=>createHash('sha256').update(data).digest('hex');
let ready;
export function restoreMedia(){return ready ||= unpack();}
async function unpack(){
 const manifest=JSON.parse(await fs.readFile(path.join(root,'media/bundle.json'),'utf8'));
 const parts=[];
 for(const part of manifest.parts){
  if(!/^media\/ekoizol-images-\d{2}\.bin$/.test(part.path))throw new Error('Invalid media part');
  const data=await fs.readFile(path.join(root,part.path));
  if(hash(data)!==part.sha256)throw new Error('Media part checksum mismatch: '+part.path);
  parts.push(data);
 }
 const packed=Buffer.concat(parts);
 if(hash(packed)!==manifest.sha256)throw new Error('Media bundle checksum mismatch');
 const files=JSON.parse(gunzipSync(packed,{maxOutputLength:100*1024*1024}).toString('utf8'));
 if(files.length!==manifest.files)throw new Error('Media file count mismatch');
 const dir=path.join(root,'public/assets/ekoizol');await fs.mkdir(dir,{recursive:true});
 for(const file of files){
  if(!/^(?:[a-f0-9]{16}\.webp|logo\.png|favicon\.png)$/.test(file.name))throw new Error('Invalid media filename');
  const content=Buffer.from(file.content,'base64');
  if(hash(content)!==file.sha256||content.length>25*1024*1024)throw new Error('Invalid media data: '+file.name);
  const dest=path.join(dir,file.name);
  let existing;try{existing=await fs.readFile(dest);}catch(error){if(error.code!=='ENOENT')throw error;}
  if(existing&&hash(existing)===file.sha256)continue;
  const temp=dest+'.'+process.pid+'.tmp';await fs.writeFile(temp,content);await fs.rename(temp,dest);
 }
 return files.length;
}
if(process.argv[1]===fileURLToPath(import.meta.url))restoreMedia().then(count=>console.log(`Media ready: ${count} images.`)).catch(error=>{console.error(error);process.exitCode=1;});
