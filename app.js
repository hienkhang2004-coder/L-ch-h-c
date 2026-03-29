// APP.JS - Lich Hoc 2022KTT (Desktop) - Extracted from index.html

/* DATA */
const subjects=[
  {id:1,ac:'a1',hex:'#983514',name:'Lịch sử Đảng CSVN',full:'Lịch sử Đảng cộng sản Việt Nam',tc:2,cls:'CT4002_2022KTT 1',teacher:'Phạm Thị Kim Ngân',sch:[
    {from:'13/04/2026',to:'24/05/2026',thu:6,tiet:'1-3',room:'H-H 3.03'},
    {from:'13/04/2026',to:'31/05/2026',thu:3,tiet:'1-3',room:'H-H 2.03'},
  ]},
  {id:2,ac:'a2',hex:'#7a6547',name:'Thực hành & Quản lý',full:'Thực hành và Quản lý',tc:3,cls:'PAM_2022KTT 1',teacher:'Nguyễn Minh Nhất',sch:[
    {from:'19/01/2026',to:'08/02/2026',thu:3,tiet:'4-6',room:'M-M7.02'},
    {from:'19/01/2026',to:'08/02/2026',thu:6,tiet:'4-6',room:'M-M7.03'},
    {from:'23/02/2026',to:'22/03/2026',thu:6,tiet:'4-6',room:'M-M11.03'},
    {from:'23/02/2026',to:'29/03/2026',thu:3,tiet:'4-6',room:'M-M12.03_X+'},
  ]},
  {id:3,ac:'a3',hex:'#4a7c6b',name:'Lịch sử KT & ĐT 2',full:'Lịch sử kiến trúc và đô thị 2',tc:3,cls:'LSKT02_2022KTT 1',teacher:'Lê Chiến Thắng',sch:[
    {from:'13/04/2026',to:'31/05/2026',thu:6,tiet:'4-6',room:'M-M 601'},
    {from:'13/04/2026',to:'07/06/2026',thu:3,tiet:'4-6',room:'M-M 601'},
  ]},
  {id:4,ac:'a4',hex:'#5a5a8a',name:'ĐA Thiết kế CT6',full:'Đồ án thiết kế công trình 6',tc:5,cls:'DACT06_2022KTT 1',teacher:'Lê Chiến Thắng',sch:[
    {from:'19/01/2026',to:'08/02/2026',thu:2,tiet:'2-6',room:'C-XKTT1'},
    {from:'19/01/2026',to:'08/02/2026',thu:5,tiet:'2-6',room:'M-M 604.XQT4'},
    {from:'23/02/2026',to:'29/03/2026',thu:2,tiet:'2-6',room:'M-M 604.XQT4'},
    {from:'23/02/2026',to:'29/03/2026',thu:5,tiet:'2-6',room:'M-M 604.XQT4'},
    {from:'13/04/2026',to:'31/05/2026',thu:2,tiet:'2-6',room:'M-M 604.XQT4'},
    {from:'13/04/2026',to:'31/05/2026',thu:5,tiet:'2-6',room:'M-M 604.XQT4'},
  ]},
  {id:5,ac:'a5',hex:'#8a6020',name:'NL Thiết kế CT cao tầng',full:'Nguyên lý thiết kế công trình cao tầng',tc:2,cls:'LTTCT_2022KTT 1',teacher:'Hà Duy Anh',sch:[
    {from:'19/01/2026',to:'08/02/2026',thu:4,tiet:'10-12',room:'H-H 5.05'},
    {from:'23/02/2026',to:'29/03/2026',thu:4,tiet:'10-12',room:'H-H 5.05'},
    {from:'16/03/2026',to:'29/03/2026',thu:7,tiet:'10-12',room:'H-H 5.05'},
  ]},
  {id:6,ac:'a6',hex:'#7a4060',name:'Xã hội học đô thị',full:'Xã hội học đô thị',tc:2,cls:'XHHDT.1_2022KTT 1',teacher:'Nguyễn Vũ Bảo Minh',sch:[
    {from:'13/04/2026',to:'07/06/2026',thu:4,tiet:'4-6',room:'M-M 601'},
    {from:'25/05/2026',to:'07/06/2026',thu:7,tiet:'4-6',room:'M-M 601'},
  ]},
  {id:7,ac:'a7',hex:'#2a6a7a',name:'Thực tập công nhân',full:'Thực tập công nhân',tc:1,cls:'TTCN_2022KTT 1',teacher:'—',sch:[
    {from:'15/06/2026',to:'21/06/2026',thu:2,tiet:'2-6',room:''},
    {from:'15/06/2026',to:'21/06/2026',thu:3,tiet:'2-6',room:''},
    {from:'15/06/2026',to:'21/06/2026',thu:4,tiet:'2-6',room:''},
    {from:'15/06/2026',to:'21/06/2026',thu:5,tiet:'2-6',room:''},
    {from:'15/06/2026',to:'21/06/2026',thu:6,tiet:'2-6',room:''},
    {from:'15/06/2026',to:'21/06/2026',thu:7,tiet:'2-6',room:''},
  ]},
];

const PG=['1-3','2-6','4-6','10-12'];
const PT={'1-3':'07:00–09:25','2-6':'07:30–11:55','4-6':'09:35–11:55','10-12':'15:05–17:25'};
const PL={'1-3':'Tiết 1–3','2-6':'Tiết 2–6','4-6':'Tiết 4–6','10-12':'Tiết 10–12'};
const DAYS=['CN','T.2','T.3','T.4','T.5','T.6','T.7'];

function pd(s){const[d,m,y]=s.split('/').map(Number);return new Date(y,m-1,d);}
function fl(d){return d.toLocaleDateString('vi-VN',{weekday:'long',day:'2-digit',month:'2-digit',year:'numeric'});}
function fs(d){return d.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'});}
function ad(d,n){const r=new Date(d);r.setDate(r.getDate()+n);return r;}
function gws(d){const day=d.getDay();const diff=day===0?-6:1-day;const m=new Date(d);m.setDate(d.getDate()+diff);m.setHours(0,0,0,0);return m;}
function vtj(t){return t===1?0:t-1;}
function inR(date,f,t){const df=pd(f),dt=pd(t);dt.setHours(23,59,59,999);return date>=df&&date<=dt;}
function getCls(date){const j=date.getDay();const r=[];for(const s of subjects)for(const sc of s.sch)if(vtj(sc.thu)===j&&inR(date,sc.from,sc.to))r.push({s,sc});return r;}

/* CLOCK */
function tickClock(){
  const n=new Date();
  const h=String(n.getHours()).padStart(2,'0');
  const m=String(n.getMinutes()).padStart(2,'0');
  const s=String(n.getSeconds()).padStart(2,'0');
  document.getElementById('main-clock').innerHTML=`${h}<span class="col">:</span>${m}<span class="col">:</span>${s}`;
  document.getElementById('nav-time').textContent=`${h}:${m}:${s}`;
  const ds=`${DAYS[n.getDay()]} — ${fs(n)}`;
  document.getElementById('main-weekday').textContent=ds;
  document.getElementById('nav-date').textContent=fs(n);
}
setInterval(tickClock,1000); tickClock();

/* STATE */
const today=new Date();today.setHours(0,0,0,0);
let ws=gws(today);

/* TODAY STRIP */
function renderStrip(){
  document.getElementById('ts-date').textContent=fl(today);
  document.getElementById('ft-date').textContent=fl(today);
  const cs=getCls(today);
  document.getElementById('ts-classes').textContent=cs.length===0
    ?'Hôm nay không có lịch học.'
    :`${cs.length} môn: `+cs.map(c=>c.s.name).join(', ');
  let nd=null,ns=null;
  for(let i=0;i<=90;i++){const d=ad(today,i);const csd=getCls(d);if(csd.length>0){nd=d;ns=csd[0].s;break;}}
  if(ns){
    const diff=Math.ceil((nd-today)/86400000);
    document.getElementById('ts-next').textContent=ns.name;
    document.getElementById('ts-next-sub').textContent=(diff===0?'Hôm nay':diff===1?'Ngày mai':`${diff} ngày nữa`)+` · ${fs(nd)}`;
  }
}

/* TIMETABLE */
let mobileDay=today.getDay()===0?6:today.getDay()-1; /* 0=Mon..6=Sun */

function renderTT(){
  const we=ad(ws,6);
  const isCur=ws<=today&&today<=we;
  document.getElementById('week-range').innerHTML=`${fs(ws)} &ndash; ${fs(we)}<em id="week-tag">${isCur?' &middot; Tuần hiện tại':''}</em>`;
  const todayDay=today.getDay();
  document.querySelectorAll('.dh').forEach(th=>{
    th.classList.remove('today-h');
    const d=parseInt(th.dataset.day);
    const j=d===1?0:d-1;
    if(j===todayDay&&isCur)th.classList.add('today-h');
  });
  /* Desktop table */
  const tbody=document.getElementById('tt-body');
  tbody.innerHTML='';
  for(const pg of PG){
    const tr=document.createElement('tr');
    const tdl=document.createElement('td');
    tdl.className='period-td';
    tdl.innerHTML=`<div class="pt-label">${PL[pg]}</div><div class="pt-time">${PT[pg]}</div>`;
    tr.appendChild(tdl);
    for(let col=0;col<7;col++){
      const date=ad(ws,col);
      const jsDay=date.getDay();
      const td=document.createElement('td');
      if(date.getTime()===today.getTime())td.classList.add('today-d');
      for(const subj of subjects){
        for(const sc of subj.sch){
          if(vtj(sc.thu)===jsDay&&sc.tiet===pg&&inR(date,sc.from,sc.to)){
            const div=document.createElement('div');
            div.className=`cb ${subj.ac}`;
            div.innerHTML=`<div class="cb-name">${subj.name}</div><div class="cb-room">${sc.room||'—'}</div><div class="cb-t">${PT[pg]}</div>`;
            div.onclick=()=>openModal(subj,sc,date);
            td.appendChild(div);
          }
        }
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  /* Mobile list */
  renderMobileTT();
}
function changeWeek(d){ws=ad(ws,d*7);renderTT();}
function goToday(){ws=gws(today);mobileDay=today.getDay()===0?6:today.getDay()-1;renderTT();}

/* VIEW MODE TOGGLE */
let currentView='week';
let currentMonth=today.getMonth();
let currentYear=today.getFullYear();
const VMONTHS=['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
const VDAYS_H=['T2','T3','T4','T5','T6','T7','CN'];

function setView(mode){
  currentView=mode;
  document.getElementById('vtWeek').classList.toggle('active',mode==='week');
  document.getElementById('vtMonth').classList.toggle('active',mode==='month');
  document.getElementById('week-view').style.display=mode==='week'?'':'none';
  document.getElementById('month-view').classList.toggle('show',mode==='month');
  document.getElementById('sec-kicker-view').textContent=mode==='week'?'Xem theo tuần':'Xem theo tháng';
  if(mode==='month')renderMonth();
}

function changeMonth(d){
  currentMonth+=d;
  if(currentMonth>11){currentMonth=0;currentYear++;}
  if(currentMonth<0){currentMonth=11;currentYear--;}
  renderMonth();
}

function renderMonth(){
  const titleEl=document.getElementById('month-title');
  titleEl.innerHTML=`<em>${VMONTHS[currentMonth]}</em> ${currentYear}`;
  const grid=document.getElementById('cal-grid');
  grid.innerHTML='';
  /* Day headers */
  for(const dh of VDAYS_H){
    const h=document.createElement('div');
    h.className='cal-head';h.textContent=dh;
    grid.appendChild(h);
  }
  /* First day of month */
  const first=new Date(currentYear,currentMonth,1);
  let startDay=first.getDay(); /* 0=Sun */
  startDay=startDay===0?6:startDay-1; /* Convert to Mon=0 */
  const daysInMonth=new Date(currentYear,currentMonth+1,0).getDate();
  const daysInPrev=new Date(currentYear,currentMonth,0).getDate();
  /* Previous month padding */
  for(let i=startDay-1;i>=0;i--){
    const d=new Date(currentYear,currentMonth-1,daysInPrev-i);
    createCalDay(grid,d,true);
  }
  /* Current month */
  for(let i=1;i<=daysInMonth;i++){
    const d=new Date(currentYear,currentMonth,i);
    createCalDay(grid,d,false);
  }
  /* Next month padding to fill grid */
  const total=startDay+daysInMonth;
  const remaining=total%7===0?0:7-(total%7);
  for(let i=1;i<=remaining;i++){
    const d=new Date(currentYear,currentMonth+1,i);
    createCalDay(grid,d,true);
  }
}

function createCalDay(grid,date,isOther){
  const cell=document.createElement('div');
  cell.className='cal-day';
  if(isOther)cell.classList.add('other-month');
  const d=new Date(date);d.setHours(0,0,0,0);
  if(d.getTime()===today.getTime())cell.classList.add('is-today');
  const num=document.createElement('div');
  num.className='cd-num';num.textContent=date.getDate();
  cell.appendChild(num);
  /* Get classes for this day */
  const classes=getCls(d);
  if(classes.length>0){
    const dots=document.createElement('div');
    dots.className='cd-dots';
    const seen=new Set();
    for(const c of classes){
      if(!seen.has(c.s.id)){
        seen.add(c.s.id);
        const dot=document.createElement('div');
        dot.className='cd-dot';
        dot.style.background=c.s.hex;
        dot.title=c.s.name;
        dots.appendChild(dot);
        /* Show name on desktop */
        const label=document.createElement('div');
        label.className='cd-class';
        label.textContent=c.s.name;
        label.style.color=c.s.hex;
        cell.appendChild(label);
      }
    }
    cell.insertBefore(dots,cell.children[1]);
  }
  /* Click to go to that day in week view */
  cell.onclick=()=>{
    ws=gws(d);
    mobileDay=d.getDay()===0?6:d.getDay()-1;
    setView('week');
    renderTT();
  };
  grid.appendChild(cell);
}

/* MOBILE TIMETABLE */
const MDAYS=['T.2','T.3','T.4','T.5','T.6','T.7','CN'];
function renderMobileTT(){
  const container=document.getElementById('mobile-tt');
  if(!container)return;
  container.innerHTML='';
  /* Day tabs */
  const tabs=document.createElement('div');
  tabs.className='day-tabs';
  const we=ad(ws,6);
  const isCur=ws<=today&&today<=we;
  for(let i=0;i<7;i++){
    const date=ad(ws,i);
    const btn=document.createElement('button');
    btn.className='day-tab';
    if(i===mobileDay)btn.classList.add('active');
    if(date.getTime()===today.getTime()&&isCur)btn.classList.add('is-today');
    btn.innerHTML=`${MDAYS[i]}<span class="dt-num">${date.getDate()}</span>`;
    btn.onclick=()=>{mobileDay=i;renderMobileTT();};
    tabs.appendChild(btn);
  }
  container.appendChild(tabs);
  /* Scroll active tab into view */
  setTimeout(()=>{
    const activeTab=tabs.querySelector('.active');
    if(activeTab)activeTab.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  },50);
  /* Day classes */
  const date=ad(ws,mobileDay);
  const classes=getCls(date);
  const list=document.createElement('div');
  list.className='day-classes';
  if(classes.length===0){
    list.innerHTML=`<div class="dc-empty"><span class="dc-empty-icon">📚</span>Không có lịch học ngày này</div>`;
  } else {
    /* Sort by period */
    const order={'1-3':0,'2-6':1,'4-6':2,'10-12':3};
    classes.sort((a,b)=>(order[a.sc.tiet]||0)-(order[b.sc.tiet]||0));
    for(const c of classes){
      const card=document.createElement('div');
      card.className=`dc-card ${c.s.ac}`;
      card.innerHTML=`
        <div class="dc-header">
          <div class="dc-name">${c.s.name}</div>
          <div class="dc-period">${PL[c.sc.tiet]}</div>
        </div>
        <div class="dc-meta">
          <div class="dc-meta-item">
            <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            <span>${PT[c.sc.tiet]}</span>
          </div>
          <div class="dc-meta-item">
            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span>${c.sc.room||'—'}</span>
          </div>
        </div>`;
      card.onclick=()=>openModal(c.s,c.sc,date);
      list.appendChild(card);
    }
  }
  container.appendChild(list);
}

/* SUBJECTS */
function renderSubjects(){
  const grid=document.getElementById('subjects-grid');
  subjects.forEach((s,i)=>{
    const af=s.sch.map(sc=>pd(sc.from)).sort((a,b)=>a-b);
    const at=s.sch.map(sc=>pd(sc.to)).sort((a,b)=>b-a);
    const card=document.createElement('div');
    card.className='sc';
    card.innerHTML=`
      <div class="sc-no"><span class="sc-bar" style="background:${s.hex}"></span>${String(i+1).padStart(2,'0')}</div>
      <div class="sc-name">${s.full}</div>
      <div class="sc-tc">${s.tc} tín chỉ</div>
      <div class="sc-rows">
        <div class="sc-row"><span class="rl">Lớp TC</span><span class="rv">${s.cls}</span></div>
        <div class="sc-row"><span class="rl">Giảng viên</span><span class="rv">${s.teacher}</span></div>
        <div class="sc-row"><span class="rl">Từ ngày</span><span class="rv">${fs(af[0])}</span></div>
        <div class="sc-row"><span class="rl">Đến ngày</span><span class="rv">${fs(at[0])}</span></div>
      </div>`;
    grid.appendChild(card);
  });
}

/* REMINDERS */
function renderReminders(){
  const list=document.getElementById('rem-list');
  const ev=[];
  const tc=getCls(today);
  if(tc.length>0)ev.push({t:`Hôm nay có ${tc.length} môn học`,s:tc.map(c=>c.s.name).join(', '),d:0,type:'urgent'});
  const tom=ad(today,1);const tc2=getCls(tom);
  if(tc2.length>0)ev.push({t:`Ngày mai có ${tc2.length} môn học`,s:tc2.map(c=>c.s.name).join(', '),d:1,type:'soon'});
  for(const subj of subjects){
    const af=subj.sch.map(sc=>pd(sc.from)).sort((a,b)=>a-b);
    const at=subj.sch.map(sc=>pd(sc.to)).sort((a,b)=>b-a);
    const df=Math.ceil((af[0]-today)/86400000);
    const dt=Math.ceil((at[0]-today)/86400000);
    if(dt<0)continue;
    if(df>0)ev.push({t:`Bắt đầu: ${subj.full}`,s:`${fs(af[0])} · ${subj.teacher}`,d:df,type:df<=3?'urgent':df<=7?'soon':'normal'});
    if(dt>=0&&dt<=14)ev.push({t:`Kết thúc: ${subj.full}`,s:`${fs(at[0])} · ${subj.cls}`,d:dt,type:dt<=3?'urgent':dt<=7?'soon':'normal'});
  }
  ev.sort((a,b)=>a.d-b.d);
  if(ev.length===0){
    list.innerHTML=`<div class="rem-item"><span class="ri-no">—</span><div class="ri-body"><div class="ri-title" style="color:var(--muted)">Không có nhắc nhở sắp tới.</div></div></div>`;
    return;
  }
  ev.slice(0,12).forEach((e,i)=>{
    const item=document.createElement('div');
    item.className='rem-item';
    item.style.animationDelay=`${i*0.05}s`;
    const ds=e.d===0?'Hôm nay':e.d===1?'Ngày mai':`${e.d} ngày nữa`;
    item.innerHTML=`<span class="ri-no">${String(i+1).padStart(2,'0')}</span><div class="ri-body"><div class="ri-title">${e.t}</div><div class="ri-sub">${e.s}</div></div><span class="ri-tag ${e.type}">${ds}</span>`;
    list.appendChild(item);
  });
}

/* MODAL */
function openModal(subj,sc,date){
  document.getElementById('m-title').textContent=subj.full;
  const rows=[
    ['Lớp tín chỉ',subj.cls],['Giảng viên',subj.teacher],['Số tín chỉ',subj.tc],
    ['Ngày học',fl(date)],[`Tiết học`,`${PL[sc.tiet]} · ${PT[sc.tiet]}`],
    ['Phòng học',sc.room||'—'],['Giai đoạn',`${sc.from} → ${sc.to}`],
  ];
  const body=document.getElementById('m-body');
  body.innerHTML=rows.map(([l,v])=>`<div class="m-row"><span class="ml">${l}</span><span class="mv">${v}</span></div>`).join('');
  /* Attendance */
  const dateStr=fs(date);
  const att=getAttendance();
  const key=`${subj.id}_${dateStr}`;
  const curAtt=att[key]||'';
  const stats=getAttStats(subj.id);
  body.innerHTML+=`
    <div class="att-row">
      <button class="att-btn att-present ${curAtt==='present'?'selected':''}" onclick="markAttendance(${subj.id},'${dateStr}','present');openModal(subjects.find(s=>s.id===${subj.id}),${JSON.stringify(sc).replace(/"/g,'&quot;')},new Date('${date.toISOString()}'))">
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Có mặt
      </button>
      <button class="att-btn att-absent ${curAtt==='absent'?'selected':''}" onclick="markAttendance(${subj.id},'${dateStr}','absent');openModal(subjects.find(s=>s.id===${subj.id}),${JSON.stringify(sc).replace(/"/g,'&quot;')},new Date('${date.toISOString()}'))">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> Vắng
      </button>
      <span class="att-stats">${stats.present}✓ ${stats.absent}✗ / ${stats.total}</span>
    </div>`;
  /* Shared Notes from Google Sheets */
  const sNotes = getSharedNotesForSubject(subj.id);
  if (sNotes.length > 0) {
    let sharedHtml = '';
    for (const sn of sNotes) {
      sharedHtml += `
        <div class="shared-note">
          <div class="shared-note-label">
            <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
            Lớp trưởng · ${sn.author}
          </div>
          <div class="shared-note-text">${sn.note}</div>
          ${sn.date ? `<div class="shared-note-time">${sn.date}</div>` : ''}
        </div>`;
    }
    body.innerHTML += `<div class="note-section"><div class="note-label">Ghi chú từ Lớp trưởng</div>${sharedHtml}</div>`;
  }
  /* Personal Notes */
  const notes=getNotes();
  body.innerHTML+=`
    <div class="note-section">
      <div class="note-label">Ghi chú cá nhân</div>
      <textarea class="note-textarea" placeholder="Thêm ghi chú cá nhân cho môn này..." oninput="saveNote(${subj.id},this.value);this.nextElementSibling.classList.add('show');setTimeout(()=>this.nextElementSibling.classList.remove('show'),1500)">${notes[subj.id]||''}</textarea>
      <div class="note-saved">✓ Đã lưu</div>
    </div>`;
  document.getElementById('modal').classList.add('open');
}
function closeModalBg(e){if(e.target===document.getElementById('modal'))document.getElementById('modal').classList.remove('open');}

/* BOTTOM NAV */
function scrollToSection(e,target){
  e.preventDefault();
  document.querySelectorAll('.bn-tab').forEach(t=>t.classList.remove('active'));
  e.currentTarget.classList.add('active');
  if(target==='today'){
    window.scrollTo({top:0,behavior:'smooth'});
  } else {
    const el=document.getElementById(target);
    if(el){
      const y=el.getBoundingClientRect().top+window.pageYOffset-56;
      window.scrollTo({top:y,behavior:'smooth'});
    }
  }
}
/* Auto-highlight bottom nav on scroll */
const bnSections=['thoikhoa','hocphan','nhacnho'];
function updateBottomNav(){
  const scrollY=window.pageYOffset+100;
  let active='today';
  for(const id of bnSections){
    const el=document.getElementById(id);
    if(el&&el.offsetTop<=scrollY)active=id;
  }
  document.querySelectorAll('.bn-tab').forEach(t=>{
    t.classList.toggle('active',t.dataset.target===active);
  });
}
window.addEventListener('scroll',updateBottomNav,{passive:true});

/* ── DARK MODE ─────────────────────────────────────────────────────────── */
function toggleTheme(){
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  localStorage.setItem('theme',isDark?'light':'dark');
  const icon=document.getElementById('themeIcon');
  icon.innerHTML=isDark
    ?'<path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>'
    :'<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
  updateThemeColor();
}
function updateThemeColor(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  document.querySelector('meta[name="theme-color"]').content=isDark?'#1a1816':'#983514';
}
(function initTheme(){
  const saved=localStorage.getItem('theme');
  if(saved==='dark'){
    document.documentElement.setAttribute('data-theme','dark');
    const icon=document.getElementById('themeIcon');
    if(icon)icon.innerHTML='<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
    updateThemeColor();
  }
})();

/* ── CURRENTLY IN CLASS ───────────────────────────────────────────────── */
const PT_MINS={'1-3':[420,565],'2-6':[450,715],'4-6':[575,715],'10-12':[905,1045]};
function checkCurrentClass(){
  const now=new Date();
  const mins=now.getHours()*60+now.getMinutes();
  const jsDay=now.getDay();
  const el=document.getElementById('in-class-indicator');
  let found=null;
  for(const s of subjects){
    for(const sc of s.sch){
      if(vtj(sc.thu)===jsDay&&inR(today,sc.from,sc.to)){
        const[start,end]=PT_MINS[sc.tiet]||[0,0];
        if(mins>=start&&mins<=end){found={s,sc};break;}
      }
    }
    if(found)break;
  }
  if(found){
    el.innerHTML=`<div class="in-class-badge" style="margin-top:0.6rem"><span class="pulse-dot"></span>Đang học: ${found.s.name} · ${found.sc.room||'—'}</div>`;
  } else { el.innerHTML=''; }
  /* Highlight active blocks */
  document.querySelectorAll('.cb,.dc-card').forEach(b=>b.classList.remove('now-active'));
  if(found){
    document.querySelectorAll('.cb').forEach(b=>{
      if(b.querySelector('.cb-name')?.textContent===found.s.name)b.classList.add('now-active');
    });
    document.querySelectorAll('.dc-card').forEach(b=>{
      if(b.querySelector('.dc-name')?.textContent===found.s.name)b.classList.add('now-active');
    });
  }
}
setInterval(checkCurrentClass,30000);checkCurrentClass();

/* ── SEMESTER PROGRESS ────────────────────────────────────────────────── */
function renderProgress(){
  const allFrom=subjects.flatMap(s=>s.sch.map(sc=>pd(sc.from)));
  const allTo=subjects.flatMap(s=>s.sch.map(sc=>pd(sc.to)));
  const semStart=new Date(Math.min(...allFrom));
  const semEnd=new Date(Math.max(...allTo));
  const total=semEnd-semStart;
  const elapsed=Math.max(0,Math.min(today-semStart,total));
  const pct=total>0?Math.round((elapsed/total)*100):0;
  const el=document.getElementById('semester-progress');
  el.innerHTML=`
    <div class="progress-label">
      <span class="pl-text">Tiến trình học kỳ</span>
      <span class="pl-pct">${pct}%</span>
    </div>
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="progress-dates"><span>${fs(semStart)}</span><span>${fs(semEnd)}</span></div>`;
}

/* ── ATTENDANCE ────────────────────────────────────────────────────────── */
function getAttendance(){return JSON.parse(localStorage.getItem('attendance')||'{}');}
function setAttendance(data){localStorage.setItem('attendance',JSON.stringify(data));}
function markAttendance(subjId,dateStr,status){
  const att=getAttendance();
  const key=`${subjId}_${dateStr}`;
  if(att[key]===status){delete att[key];} else {att[key]=status;}
  setAttendance(att);
}
function getAttStats(subjId){
  const att=getAttendance();
  let p=0,a=0;
  for(const[k,v] of Object.entries(att)){
    if(k.startsWith(subjId+'_')){if(v==='present')p++;else if(v==='absent')a++;}
  }
  return{present:p,absent:a,total:p+a};
}

/* ── NOTES ─────────────────────────────────────────────────────────────── */
function getNotes(){return JSON.parse(localStorage.getItem('subjectNotes')||'{}');}
function saveNote(subjId,text){
  const notes=getNotes();
  notes[subjId]=text;
  localStorage.setItem('subjectNotes',JSON.stringify(notes));
}

/* ── GOOGLE SHEETS SHARED NOTES ─────────────────────────────────────────── */
/*
 * Hướng dẫn:
 * 1. Tạo Google Sheet với các cột: Mã môn | Ghi chú | Người gửi | Ngày
 * 2. Chia sẻ sheet: "Anyone with link can view"
 * 3. Lấy Sheet ID từ URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
 * 4. Dán ID vào biến SHEET_ID bên dưới
 */
const SHEET_ID = ''; /* ← DÁN GOOGLE SHEET ID VÀO ĐÂY */
const SHEET_TAB = 'Sheet1';
const SHEET_CACHE_KEY = 'sharedNotes';
const SHEET_CACHE_TTL = 5 * 60 * 1000; /* 5 phút */

let sharedNotes = [];

async function fetchSharedNotes() {
  if (!SHEET_ID) return;
  /* Check cache */
  const cached = localStorage.getItem(SHEET_CACHE_KEY);
  const cacheTime = parseInt(localStorage.getItem(SHEET_CACHE_KEY + '_t') || '0');
  if (cached && Date.now() - cacheTime < SHEET_CACHE_TTL) {
    sharedNotes = JSON.parse(cached);
    renderSharedPanel();
    return;
  }
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_TAB)}`;
    const res = await fetch(url);
    const text = await res.text();
    /* Google returns JSONP-like: google.visualization.Query.setResponse({...}) */
    const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\)/s)[1]);
    const rows = json.table.rows;
    sharedNotes = rows.map(r => {
      const cells = r.c || [];
      return {
        subjectCode: (cells[0] && cells[0].v) || '',
        note: (cells[1] && cells[1].v) || '',
        author: (cells[2] && cells[2].v) || 'Lớp trưởng',
        date: (cells[3] && cells[3].v) || ''
      };
    }).filter(n => n.note);
    localStorage.setItem(SHEET_CACHE_KEY, JSON.stringify(sharedNotes));
    localStorage.setItem(SHEET_CACHE_KEY + '_t', String(Date.now()));
    renderSharedPanel();
  } catch (e) { console.warn('Không thể tải ghi chú từ Google Sheets:', e); }
}

function getSharedNotesForSubject(subjId) {
  const subj = subjects.find(s => s.id === subjId);
  if (!subj) return [];
  return sharedNotes.filter(n => {
    const code = n.subjectCode.trim().toLowerCase();
    return code === String(subjId)
      || subj.name.toLowerCase().includes(code)
      || subj.full.toLowerCase().includes(code)
      || subj.cls.toLowerCase().includes(code)
      || code.includes(subj.name.toLowerCase());
  });
}

function renderSharedPanel() {
  const panel = document.getElementById('shared-panel');
  if (!panel) return;
  if (sharedNotes.length === 0) { panel.innerHTML = ''; return; }
  let html = `<div class="shared-panel-title"><svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>Thông báo Lớp trưởng</div>`;
  for (const n of sharedNotes.slice(0, 10)) {
    const matchSubj = subjects.find(s => {
      const code = n.subjectCode.trim().toLowerCase();
      return code === String(s.id) || s.name.toLowerCase().includes(code)
        || s.full.toLowerCase().includes(code) || code.includes(s.name.toLowerCase());
    });
    html += `<div class="shared-item">
      <div class="shared-item-subj">${matchSubj ? matchSubj.name : n.subjectCode}</div>
      <div class="shared-item-text">${n.note}</div>
    </div>`;
  }
  panel.innerHTML = html;
}

fetchSharedNotes();

/* ── EXPORT ICS ────────────────────────────────────────────────────────── */
function exportICS(){
  let cal='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//LichHoc2022KTT//VI\r\nCALSCALE:GREGORIAN\r\n';
  for(const s of subjects){
    for(const sc of s.sch){
      const from=pd(sc.from),to=pd(sc.to);
      const[startMin,endMin]=PT_MINS[sc.tiet]||[420,565];
      let d=new Date(from);
      while(d<=to){
        if(vtj(sc.thu)===d.getDay()){
          const ds=new Date(d);ds.setHours(0,startMin,0,0);
          const de=new Date(d);de.setHours(0,endMin,0,0);
          const fmt=dt=>`${dt.getFullYear()}${String(dt.getMonth()+1).padStart(2,'0')}${String(dt.getDate()).padStart(2,'0')}T${String(Math.floor(dt.getMinutes()/60+dt.getHours())).padStart(2,'0')}${String(dt.getMinutes()%60).padStart(2,'0')}00`;
          cal+=`BEGIN:VEVENT\r\nDTSTART:${fmt(ds)}\r\nDTEND:${fmt(de)}\r\nSUMMARY:${s.full}\r\nLOCATION:${sc.room||''}\r\nDESCRIPTION:${s.teacher} · ${s.cls}\r\nEND:VEVENT\r\n`;
        }
        d=ad(d,1);
      }
    }
  }
  cal+='END:VCALENDAR\r\n';
  const blob=new Blob([cal],{type:'text/calendar;charset=utf-8'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='LichHoc_2022KTT_KyII.ics';
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ── NOTIFICATIONS ─────────────────────────────────────────────────────── */
let notifEnabled=localStorage.getItem('notif-enabled')==='1';
let notifTimer=null;
function updateNotifBtn(){
  const label=document.getElementById('notifLabel');
  if(label)label.textContent=notifEnabled?'Tắt thông báo':'Bật thông báo';
}
function toggleNotifications(){
  if(!notifEnabled){
    if(!('Notification' in window)){alert('Trình duyệt không hỗ trợ thông báo.');return;}
    Notification.requestPermission().then(p=>{
      if(p==='granted'){
        notifEnabled=true;
        localStorage.setItem('notif-enabled','1');
        updateNotifBtn();
        scheduleNotification();
        alert('Đã bật thông báo! Bạn sẽ được nhắc 15 phút trước giờ học.');
      }
    });
  } else {
    notifEnabled=false;
    localStorage.setItem('notif-enabled','0');
    if(notifTimer)clearTimeout(notifTimer);
    updateNotifBtn();
  }
}
function scheduleNotification(){
  if(!notifEnabled)return;
  const now=new Date();
  const mins=now.getHours()*60+now.getMinutes();
  const jsDay=now.getDay();
  let nextClass=null,nextMin=9999;
  for(const s of subjects){
    for(const sc of s.sch){
      if(vtj(sc.thu)===jsDay&&inR(today,sc.from,sc.to)){
        const[start]=PT_MINS[sc.tiet]||[0];
        const warn=start-15;
        if(warn>mins&&warn<nextMin){nextMin=warn;nextClass={s,sc,start};}
      }
    }
  }
  if(nextClass){
    const delay=(nextMin-mins)*60000;
    notifTimer=setTimeout(()=>{
      new Notification(`📚 ${nextClass.s.name}`,{
        body:`Bắt đầu lúc ${PT[nextClass.sc.tiet].split('–')[0]} · Phòng ${nextClass.sc.room||'—'}`,
        icon:'./icon.svg'
      });
      scheduleNotification();
    },delay);
  }
}
if(notifEnabled)scheduleNotification();
updateNotifBtn();

/* ── SWIPE GESTURE (mobile) ───────────────────────────────────────────── */
let touchStartX=0,touchEndX=0;
function initSwipe(){
  const el=document.getElementById('mobile-tt');
  if(!el)return;
  el.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX;},{passive:true});
  el.addEventListener('touchend',e=>{
    touchEndX=e.changedTouches[0].screenX;
    const diff=touchStartX-touchEndX;
    if(Math.abs(diff)>60){
      if(diff>0){mobileDay=Math.min(6,mobileDay+1);}
      else{mobileDay=Math.max(0,mobileDay-1);}
      renderMobileTT();
    }
  },{passive:true});
}

/* (enhanced modal is now merged into the original openModal above) */

/* INIT */
renderStrip();renderTT();renderSubjects();renderReminders();renderProgress();checkCurrentClass();initSwipe();

/* PWA INSTALL */
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();
  deferredPrompt=e;
  document.getElementById('installBtn').classList.add('show');
  // Show banner after 3 seconds if not dismissed before
  if(!localStorage.getItem('pwa-banner-dismissed')){
    setTimeout(()=>{
      document.getElementById('installBanner').classList.add('show');
    },3000);
  }
});

window.addEventListener('appinstalled',()=>{
  deferredPrompt=null;
  document.getElementById('installBtn').classList.remove('show');
  document.getElementById('installBanner').classList.remove('show');
});

function installApp(){
  if(!deferredPrompt){
    // Fallback: show instructions for manual install
    alert('Để cài đặt ứng dụng:\n\n📱 iPhone/iPad:\nMở bằng Safari → Nhấn nút Chia sẻ (⬆) → Chọn "Thêm vào MH chính"\n\n📱 Android:\nMở bằng Chrome → Nhấn ⋮ (menu) → Chọn "Thêm vào MH chính"\n\n💻 PC:\nMở bằng Chrome/Edge → Nhấn biểu tượng cài đặt trên thanh địa chỉ');
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(r=>{
    if(r.outcome==='accepted'){
      document.getElementById('installBtn').classList.remove('show');
      document.getElementById('installBanner').classList.remove('show');
    }
    deferredPrompt=null;
  });
}

function dismissBanner(){
  document.getElementById('installBanner').classList.remove('show');
  localStorage.setItem('pwa-banner-dismissed','1');
}

/* SERVICE WORKER */
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
}