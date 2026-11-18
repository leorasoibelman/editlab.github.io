(() => {
  'use strict';
  const WEEKS = window.EDIT_LAB_WEEKS;
  const STORAGE_KEY = 'edit-lab-progress-v1';
  const $ = (selector) => document.querySelector(selector);
  const html = (str) => String(str ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const validWeek = n => Number.isInteger(n) && n >= 1 && n <= WEEKS.length;
  const defaultState = () => ({ watched:[], assignments:[], steps:{}, notes:{}, custom:{} });
  const safeString = (v,limit=6000) => typeof v === 'string' ? v.slice(0,limit) : '';
  const normalizeState = (input) => {
    const value = input && typeof input === 'object' ? input : {};
    const data = defaultState();
    data.watched = Array.isArray(value.watched) ? [...new Set(value.watched.filter(x => typeof x==='string' && x.length<100))] : [];
    data.assignments = Array.isArray(value.assignments) ? [...new Set(value.assignments.map(Number).filter(validWeek))] : [];
    WEEKS.forEach(w => {
      const k = String(w.id);
      data.steps[k] = Array.isArray(value.steps?.[k]) ? [...new Set(value.steps[k].map(Number).filter(n=>Number.isInteger(n)&&n>=0&&n<w.assignment.steps.length))] : [];
      data.notes[k] = safeString(value.notes?.[k]);
      data.custom[k] = Array.isArray(value.custom?.[k]) ? value.custom[k].filter(v=>v && /^[a-zA-Z0-9_-]{11}$/.test(v.mediaId) && typeof v.title==='string').slice(0,30).map((v,i)=>({id: safeString(v.id,64)||`import-${k}-${i}`,mediaId:v.mediaId,title:safeString(v.title,120),channel:'Your playlist',why:'Custom lesson you added to this week.'})) : [];
    });
    return data;
  };
  let state;
  try { state = normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')); } catch { state = normalizeState({}); }
  let selectedWeek = (()=> {const match=location.hash.match(/^#week-(\d+)$/);return match&&validWeek(Number(match[1]))?Number(match[1]):1})();
  let selectedKey = null;
  let playerLoaded = false;
  let toastTimer;
  let viewingOverview = false;
  const week = () => WEEKS[selectedWeek-1];
  const lessons = w => [...w.videos,...(state.custom[String(w.id)]||[])];
  const lessonKey = (w,v,i) => `${w.id}:${v.id}:${v.start||0}:${i}`;
  const displayId = v => v.mediaId || v.id;
  const lessonData = (w,key) => lessons(w).map((v,i)=>({video:v,key:lessonKey(w,v,i),index:i})).find(l=>l.key===key);
  const percent = (n,total) => total ? Math.round(n/total*100) : 0;
  const progress = () => {
    let all=0,done=0,completedWeeks=0;
    WEEKS.forEach(w => {
      const list=lessons(w);
      all+=list.length+1;
      const watched=list.filter((v,i)=>state.watched.includes(lessonKey(w,v,i))).length;
      const assigned=state.assignments.includes(w.id);
      done+=watched+Number(assigned);
      if(assigned && watched===list.length) completedWeeks++;
    });
    return {all,done,completedWeeks,watched:done-state.assignments.length,lessons:all-WEEKS.length,assignments:state.assignments.length,percentage:percent(done,all)};
  };
  const save = () => { try {localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch{toast('Browser storage is unavailable. Export your progress to keep a copy.');return false;} };
  const toast = message => {const node=$('#toast'); node.textContent=message;node.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('show'),3300);};
  const isWatched = key => state.watched.includes(key);

  function renderNav(){
    $('#week-nav').innerHTML=WEEKS.map(w=>{
      const list=lessons(w), watched=list.filter((v,i)=>isWatched(lessonKey(w,v,i))).length;
      const completed=state.assignments.includes(w.id) && watched===list.length;
      return `<button type="button" class="week-nav-item ${selectedWeek===w.id?'active':''}" data-action="week" data-week="${w.id}" ${selectedWeek===w.id?'aria-current="page"':''}>
      <span class="week-no">${String(w.id).padStart(2,'0')}</span><span class="week-nav-info"><strong>${html(w.short)}</strong><small>${html(w.category)} · ${watched}/${list.length} lessons</small></span><span class="week-nav-check">${completed?'✓':''}</span></button>`;
    }).join('');
  }
  function renderStats(){
    const p=progress();
    $('#stats-lessons').textContent=p.watched;
    $('#stats-lessons-total').textContent=`/ ${p.lessons}`;
    $('#stats-assignments').textContent=p.assignments;
    $('#stats-weeks').textContent=p.completedWeeks;
    $('#stats-overall').textContent=`${p.percentage}%`;
    $('#sidebar-percent').textContent=`${p.percentage}%`;
    $('#sidebar-progress').style.width=`${p.percentage}%`;
  }
  function renderOverview(){
    $('#weeks-overview').classList.toggle('hidden',!viewingOverview);
    $('#overview-grid').innerHTML=WEEKS.map(w=>{
      const list=lessons(w),done=list.filter((v,i)=>isWatched(lessonKey(w,v,i))).length;
      return `<button class="overview-card" type="button" data-action="week" data-week="${w.id}"><div class="overview-card-top"><span>WEEK ${String(w.id).padStart(2,'0')}</span><span>${done}/${list.length} ↗</span></div><strong>${html(w.title)}</strong><small>${html(w.category)} · ${state.assignments.includes(w.id)?'Assignment done':'Assignment to do'}</small></button>`;
    }).join('');
  }
  function renderLessons(){
    const w=week(), items=lessons(w), only=$('#unwatched-toggle').checked;
    $('#watch-count').textContent=`${items.filter((v,i)=>isWatched(lessonKey(w,v,i))).length}/${items.length}`;
    const rendered=items.map((v,i)=>({v,i,key:lessonKey(w,v,i)})).filter(v=>!only||!isWatched(v.key));
    $('#lesson-list').innerHTML=rendered.length?rendered.map(({v,i,key})=>{
      const watched=isWatched(key), selected=selectedKey===key, thumb=`https://i.ytimg.com/vi/${encodeURIComponent(displayId(v))}/hqdefault.jpg`;
      return `<article class="lesson ${selected?'selected':''}"><button class="lesson-thumb" data-action="select-video" data-key="${html(key)}" aria-label="Play ${html(v.title)}"><img alt="" loading="lazy" src="${thumb}" /><span class="play-arrow">▶</span></button><div class="lesson-body"><div class="lesson-meta">LESSON ${String(i+1).padStart(2,'0')} <span> · ${html(v.channel)}</span></div><button class="lesson-title" data-action="select-video" data-key="${html(key)}">${html(v.title)}</button><p class="lesson-why">${html(v.why)}</p></div><button class="lesson-check ${watched?'checked':''}" type="button" data-action="toggle-video" data-key="${html(key)}" aria-label="${watched?'Mark not watched':'Mark watched'}: ${html(v.title)}" title="${watched?'Mark not watched':'Mark watched'}">${watched?'✓':'○'}</button></article>`;
    }).join(''):'<div class="empty-state">All lessons watched for this week. Nice work.</div>';
  }
  function renderPlayer(){
    const w=week(), items=lessons(w);
    if (!items.length) return;
    if (!lessonData(w,selectedKey))selectedKey=lessonKey(w,items[0],0);
    const item=lessonData(w,selectedKey), v=item.video, id=displayId(v), url=`https://www.youtube.com/watch?v=${encodeURIComponent(id)}${v.start?`&t=${v.start}s`:''}`;
    $('#player-position').textContent=`${String(item.index+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
    $('#player-title').textContent=v.title;
    $('#player-eyebrow').textContent=v.channel;
    $('#player-desc').textContent=v.why;
    $('#youtube-link').href=url;
    const mark=$('#player-mark'), watched=isWatched(item.key);
    mark.textContent=watched?'✓ Watched — undo':'✓ Mark as watched';mark.classList.toggle('is-done',watched);
    const stage=$('#player-stage');
    if(playerLoaded){
      const iframe=document.createElement('iframe');
      iframe.title=`YouTube: ${v.title}`;
      iframe.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&autoplay=1${v.start?`&start=${v.start}`:''}`;
      iframe.referrerPolicy='strict-origin-when-cross-origin';
      iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen=true;stage.replaceChildren(iframe);
    } else {
      const poster=document.createElement('button');
      poster.type='button';poster.className='player-poster';poster.dataset.action='play';
      poster.setAttribute('aria-label',`Load and play ${v.title} on YouTube`);
      poster.style.backgroundImage=`linear-gradient(0deg,#17233166,#17233166),url("https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg")`;
      poster.innerHTML='<span>▶</span><b>PLAY LESSON · EMBEDDED YOUTUBE</b>';
      stage.replaceChildren(poster);
    }
  }
  function renderAssignment(){
    const w=week(), a=w.assignment, done=state.assignments.includes(w.id), steps=state.steps[String(w.id)]||[];
    $('#assignment-card').innerHTML=`<div class="assignment-top"><span class="label-overline">THE PRACTICAL / WEEK ${String(w.id).padStart(2,'0')}</span><span class="label-overline">${steps.length}/${a.steps.length} STEPS</span></div><h3 id="assignment-title">${html(a.title)}</h3><p>${html(a.brief)}</p><div>${a.steps.map((s,i)=>`<label class="assignment-step"><input type="checkbox" data-step="${i}" ${steps.includes(i)?'checked':''}/><span>${html(s)}</span></label>`).join('')}</div><div class="assignment-output"><strong>DELIVERABLE:</strong> ${html(a.deliverable)}</div><button type="button" class="assignment-btn ${done?'completed':''}" data-action="toggle-assignment">${done?'✓ Assignment completed — undo':'Mark assignment complete →'}</button>`;
  }
  function renderResources(){
    const links=week().resources||[];
    $('#resources').innerHTML=`<h3>Further reading & references</h3>${links.map(l=>`<a class="resource-link" href="${html(l.url)}" target="_blank" rel="noopener noreferrer"><span>${html(l.label)}</span><span>↗</span></a>`).join('')}`;
  }
  function renderWeek(){
    const w=week();
    $('#breadcrumb-week').textContent=`WEEK ${String(w.id).padStart(2,'0')}`;
    $('#week-label').textContent=`WEEK ${String(w.id).padStart(2,'0')} / ${w.category}`;
    $('#week-title').textContent=w.title;
    $('#week-desc').textContent=w.description;
    $('#page-numbers').textContent=`${String(w.id).padStart(2,'0')} / 08`;
    $('[data-action="previous"]').disabled=w.id===1;
    $('[data-action="next"]').disabled=w.id===WEEKS.length;
    $('#week-notes').value=state.notes[String(w.id)]||'';
    $('#save-status').textContent='Saved locally';
    $('#tip-card').innerHTML=`<strong>EDITING NOTE / ${html(w.category)}</strong><p>${html(w.tip)}</p>`;
    renderLessons();renderPlayer();renderAssignment();renderResources();
  }
  function render(){renderNav();renderStats();renderOverview();renderWeek();}
  function goToWeek(n,scroll=true){
    if(!validWeek(n))return;
    selectedWeek=n;playerLoaded=false;selectedKey=null;
    const w=week();const items=lessons(w);const i=items.findIndex((v,index)=>!isWatched(lessonKey(w,v,index)));
    selectedKey=lessonKey(w,items[Math.max(i,0)],Math.max(i,0));
    viewingOverview=false;$('#unwatched-toggle').checked=false;
    history.replaceState(null,'',`#week-${n}`);render();
    $('#sidebar').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');
    if(scroll)$('#workspace').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function toggleWatched(key){
    state.watched= isWatched(key)?state.watched.filter(x=>x!==key):[...state.watched,key];
    save();renderStats();renderNav();renderOverview();renderLessons();renderPlayer();
    toast(isWatched(key)?'Lesson marked as watched':'Lesson moved back to unwatched');
  }
  function setSelected(key){if(!lessonData(week(),key))return;selectedKey=key;playerLoaded=false;renderLessons();renderPlayer();}
  function toggleAssignment(){const n=selectedWeek;state.assignments=state.assignments.includes(n)?state.assignments.filter(x=>x!==n):[...state.assignments,n];save();renderStats();renderNav();renderOverview();renderAssignment();toast(state.assignments.includes(n)?'Assignment completed — great work':'Assignment marked incomplete');}
  function handleImport(file){
    if(!file)return;
    if(file.size>1_000_000){toast('That backup file is too large.');return;}
    const reader=new FileReader();
    reader.onload=()=>{try{
      const parsed=JSON.parse(String(reader.result));
      if(!parsed || parsed.app!=='edit-lab' || parsed.version!==1 || typeof parsed.progress!=='object')throw new Error('Invalid Edit Lab backup');
      if(!confirm('Replace your current progress with the imported backup?'))return;
      state=normalizeState(parsed.progress);save();selectedKey=null;playerLoaded=false;render();toast('Progress restored successfully');
    } catch {toast('This does not look like a valid Edit Lab progress backup.');}};
    reader.onerror=()=>toast('Could not read the backup file.');reader.readAsText(file);
  }
  function exportProgress(){
    const content=JSON.stringify({app:'edit-lab',version:1,exportedAt:new Date().toISOString(),progress:state},null,2);
    const url=URL.createObjectURL(new Blob([content],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download=`edit-lab-progress-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Backup downloaded');
  }
  function parseYouTubeId(raw){
    try{
      const u=new URL(raw.trim()); const host=u.hostname.toLowerCase().replace(/^www\./,'').replace(/^m\./,'');
      let id=null;
      if(host==='youtu.be') id=u.pathname.split('/')[1];
      if(['youtube.com','youtube-nocookie.com'].includes(host)){
        if(u.pathname==='/watch')id=u.searchParams.get('v');
        else {const parts=u.pathname.split('/').filter(Boolean);if(['embed','shorts','live'].includes(parts[0]))id=parts[1];}
      }
      return id&&/^[\w-]{11}$/.test(id)?id:null;
    }catch{return null;}
  }
  function createSearch(){
    const dialog=document.createElement('dialog');dialog.id='search-dialog';
    dialog.innerHTML=`<div class="dialog-top"><div><span class="label-overline">FIND A LESSON</span><h2>Search the course</h2></div><button type="button" class="dialog-close" data-action="close-search" aria-label="Close">×</button></div><input id="lesson-search" type="search" placeholder="Try: audio, scopes, tracking…" aria-label="Search all lessons"/><div id="search-results" class="search-results"></div>`;
    document.body.append(dialog);
    const input=$('#lesson-search');
    const renderResults=()=>{
      const q=input.value.trim().toLowerCase(); const found=[];
      WEEKS.forEach(w=>lessons(w).forEach((v,i)=>{if(!q||[v.title,v.channel,v.why,w.title,w.category].join(' ').toLowerCase().includes(q))found.push({w,v,key:lessonKey(w,v,i)});}));
      $('#search-results').innerHTML=found.slice(0,24).map(item=>`<button type="button" data-action="search-lesson" data-week="${item.w.id}" data-key="${html(item.key)}"><small>WEEK ${String(item.w.id).padStart(2,'0')} · ${html(item.w.category)}</small><strong>${html(item.v.title)}</strong></button>`).join('')||'<p class="empty-state">No matching lessons.</p>';
    };
    input.addEventListener('input',renderResults);renderResults();
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  }
  document.addEventListener('click',event=>{
    const btn=event.target.closest('[data-action]');if(!btn)return;
    const action=btn.dataset.action;
    if(action==='week')return goToWeek(Number(btn.dataset.week));
    if(action==='previous')return goToWeek(selectedWeek-1);
    if(action==='next')return goToWeek(selectedWeek+1);
    if(action==='continue'){
      const first=WEEKS.find(w=>lessons(w).some((v,i)=>!isWatched(lessonKey(w,v,i)))||!state.assignments.includes(w.id));
      goToWeek(first?.id||1);
      return;
    }
    if(action==='overview'){
      viewingOverview=!viewingOverview;renderOverview();
      if(viewingOverview)$('#weeks-overview').scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    if(action==='select-video')return setSelected(btn.dataset.key);
    if(action==='toggle-video')return toggleWatched(btn.dataset.key);
    if(action==='mark-video')return toggleWatched(selectedKey);
    if(action==='play'){playerLoaded=true;renderPlayer();return;}
    if(action==='toggle-assignment')return toggleAssignment();
    if(action==='export')return exportProgress();
    if(action==='import')return $('#import-input').click();
    if(action==='add-video'){$('#add-error').textContent='';$('#add-form').reset();$('#add-dialog').showModal();return;}
    if(action==='close-dialog')return $('#add-dialog').close();
    if(action==='search-focus'){$('#search-dialog').showModal();$('#lesson-search').focus();return;}
    if(action==='close-search')return $('#search-dialog').close();
    if(action==='search-lesson'){goToWeek(Number(btn.dataset.week));setSelected(btn.dataset.key);$('#search-dialog').close();return;}
  });
  $('#unwatched-toggle').addEventListener('change',renderLessons);
  $('#assignment-card').addEventListener('change',e=>{
    if(!e.target.matches('[data-step]'))return;
    const k=String(selectedWeek),i=Number(e.target.dataset.step);const steps=state.steps[k]||[];
    state.steps[k]=e.target.checked?[...new Set([...steps,i])]:steps.filter(n=>n!==i);
    save();renderAssignment();
  });
  let noteTimer;
  $('#week-notes').addEventListener('input',e=>{
    state.notes[String(selectedWeek)]=e.target.value.slice(0,6000);
    $('#save-status').textContent='Saving…';clearTimeout(noteTimer);
    noteTimer=setTimeout(()=>{$('#save-status').textContent=save()?'Saved locally':'Export to save';},250);
  });
  $('#add-form').addEventListener('submit',e=>{
    e.preventDefault();const title=$('#custom-title').value.trim(),id=parseYouTubeId($('#custom-url').value);
    if(!title||!id){$('#add-error').textContent='Please enter a title and a valid YouTube watch, share, or Shorts link.';return;}
    const key=String(selectedWeek);
    if(lessons(week()).some(v=>displayId(v)===id)){$('#add-error').textContent='This video is already in the week.';return;}
    const v={id:`custom-${Date.now().toString(36)}`,mediaId:id,title:title.slice(0,120),channel:'Your playlist',why:'Custom lesson you added to this week.'};
    state.custom[key].push(v);save();$('#add-dialog').close();setSelected(lessonKey(week(),v,lessons(week()).length-1));renderNav();renderStats();renderLessons();renderPlayer();toast('Your lesson has been added');
  });
  $('#import-input').addEventListener('change',e=>{handleImport(e.target.files?.[0]);e.target.value='';});
  $('#menu-toggle').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));});
  document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#search-dialog').showModal();$('#lesson-search').focus();}});
  createSearch();goToWeek(selectedWeek,false);
})();
