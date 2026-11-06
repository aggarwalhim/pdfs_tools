function srow(label,text){return '<div class="r"><b>'+esc(label)+'</b><div>'+esc(text)+'</div></div>';}
function gsearch(q){return 'https://www.google.com/search?tbm=isch&q='+encodeURIComponent(q);}
function wiki(q){return 'https://en.wikipedia.org/wiki/Special:Search?search='+encodeURIComponent(q);}
function pubchem(q){return 'https://pubchem.ncbi.nlm.nih.gov/#query='+encodeURIComponent(q);}
function link(href,text){return '<a href="'+href+'" target="_blank" rel="noopener noreferrer">'+text+'</a>';}
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);return true;}catch(e){return false;}}
function lsDel(k){try{localStorage.removeItem(k);}catch(e){}}
// own-photo slot: photo is shrunk and kept on this device only
function photoSlot(box,key,label){
  var img=document.createElement('img');img.className='ph';img.alt='Your photo';img.hidden=true;
  var saved=lsGet('ph:'+key);if(saved){img.src=saved;img.hidden=false;}
  var lab=document.createElement('label');lab.textContent='📷 '+label;
  var inp=document.createElement('input');inp.type='file';inp.accept='image/*';lab.appendChild(inp);
  var del=document.createElement('a');del.textContent='Remove photo';del.href='#';del.hidden=!saved;
  var note=document.createElement('div');note.className='note';
  inp.addEventListener('change',function(){
    var f=inp.files[0];if(!f)return;
    readImage(f).then(function(im){
      var s=Math.min(1,640/Math.max(im.width,im.height)),c=document.createElement('canvas');
      c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
      var x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);
      var url=c.toDataURL('image/jpeg',0.72);img.src=url;img.hidden=false;del.hidden=false;
      note.textContent=lsSet('ph:'+key,url)?'Saved on this phone only. Other people will not see it.':'Photo shown, but this browser could not save it.';
    }).catch(function(){note.textContent='This file is not a valid image.';});
  });
  del.addEventListener('click',function(e){e.preventDefault();lsDel('ph:'+key);img.hidden=true;img.removeAttribute('src');del.hidden=true;note.textContent='Photo removed.';});
  box.appendChild(lab);box.appendChild(del);box.insertAdjacentElement('afterend',img);box.parentNode.appendChild(note);
}
function fillSelect(sel,values,allLabel){
  sel.innerHTML='<option value="">'+allLabel+'</option>';
  values.forEach(function(v){var o=document.createElement('option');o.value=v;o.textContent=v;sel.appendChild(o);});
}
function uniq(a){return a.filter(function(v,i){return a.indexOf(v)===i;});}
