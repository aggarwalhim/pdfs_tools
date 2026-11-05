function $(id){return document.getElementById(id);}
function setMsg(t,c){var m=$('msg');if(!m)return;m.textContent=t;m.className=c||'';}
function download(blobOrUrl,name){var a=document.createElement('a');a.href=(typeof blobOrUrl==='string')?blobOrUrl:URL.createObjectURL(blobOrUrl);a.download=name;document.body.appendChild(a);a.click();a.remove();}
function kb(n){return (n/1024).toFixed(1)+' KB';}
function readImage(file){return new Promise(function(res,rej){var u=URL.createObjectURL(file);var i=new Image();i.onload=function(){res(i);};i.onerror=function(){rej(new Error('bad image'));};i.src=u;});}
function toBlob(canvas,type,q){return new Promise(function(r){canvas.toBlob(r,type,q);});}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function tabs(root){var bs=root.querySelectorAll('.tabs button');bs.forEach(function(b){b.addEventListener('click',function(){bs.forEach(function(x){x.classList.remove('on');});b.classList.add('on');root.querySelectorAll('[data-pane]').forEach(function(p){p.hidden=p.getAttribute('data-pane')!==b.getAttribute('data-tab');});});});}
