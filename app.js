(()=>{const n=Number(document.body.dataset.day)||1;const item=window.ADVENT_DATA[n-1];document.title=`${item.title} | 성탄절을 기다리는 25가지 이야기`;const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const formatBold=s=>s.split('**').map((p,i)=>i%2?`<strong>${esc(p)}</strong>`:esc(p)).join('');
let raw=item.text.trim();
// 날짜별 답변의 끝과 본문 첫 문장을 정확히 구분한다.
const openings=[
'크리스마스 장식에서','크리스마스가 되면 가족','성탄절이 가까워지면','예수님은 정말','우리가 아는 산타클로스는','약 1,700년 전','어두운 방에','우리나라에서는','크리스마스가 되면 벽난로에','크리스마스를 영어로','크리스마스가 되면 빨간 꽃처럼','크리스마스(Christmas)라는','크리스마스가 되면 가족과 친구들에게','크리스마스트리 꼭대기에는','추운 북쪽 지방에서는','동방박사들은 아기 예수님께','성탄절이 되면 거리와 집 안에','성경에는 특별한 별을','성탄절이 되면 거리의 장식과','크리스마스트리에는 빨간색과','성탄 구유를 보면','크리스마스 장식에는 황금 나팔을','크리스마스가 다가오면 거리와','성탄절은 12월 25일인데','드디어 성탄절이에요'];
let answer='';
if(raw.startsWith('→')){
 const marker=openings[n-1],at=raw.indexOf(marker);
 if(at>0){answer=raw.slice(1,at).trim();raw=raw.slice(at).trim()}
 else {const m=raw.match(/^→\s*(.*?[.!?。])\s+(.+)$/);if(m){answer=m[1];raw=m[2]}}
}
// ✦ 뒤의 질문은 한 줄짜리 굵은 제목으로 별도 출력한다.
let aside='';const pos=raw.indexOf('✦');if(pos>=0){aside=raw.slice(pos).trim();raw=raw.slice(0,pos).trim()}
const sentenceSplit=s=>s.replace(/([.!?。])\s+(?=[가-힣“‘「])/g,'$1\n').split('\n').map(x=>x.trim()).filter(Boolean);
const paras=sentenceSplit(raw);let content=answer?`<p class="arrow"><strong>${esc('→ '+answer.replace(/\*\*/g,''))}</strong></p>`:'';
for(let i=0;i<paras.length;i+=2)content+=`<p>${formatBold(paras.slice(i,i+2).join(' '))}</p>`;
if(aside){
 aside=aside.replace(/^✦\s*/, '').trim();
 let heading='',body='';
 const strongHeading=aside.match(/^\*\*(.*?)\*\*\s*([\s\S]*)$/);
 if(strongHeading){heading=strongHeading[1];body=strongHeading[2]}
 else {const m=aside.match(/^(.+?[?？])\s*([\s\S]*)$/);if(m){heading=m[1];body=m[2]}else{heading=aside}}
 content+=`<div class="aside"><p class="aside-title"><strong>${esc('✦ '+heading)}</strong></p>${sentenceSplit(body).reduce((s,v,i,a)=>i%2===0?s+`<p>${formatBold(a.slice(i,i+2).join(' '))}</p>`:s,'')}</div>`;
}
const stars=Array.from({length:23},(_,i)=>{const x=(i*47+9)%96,y=(i*29+7)%94;return `<span class="spark" style="left:${x}%;top:${y}%;--s:${10+(i%4)*5}px;--t:${2.2+(i%5)*.6}s;--delay:-${i%6}s">${i%3?'✧':'✦'}</span>`}).join('');
const village=`<svg class="village" viewBox="0 0 450 102" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#a17e51" stroke-width="2" stroke-linejoin="round"><path fill="#d6aa72" d="M16 54L52 29 89 54V91H16Z"/><path fill="#f4e1b5" d="M23 55H82V90H23Z"/><path fill="#b66d53" d="M38 91V66H57V91"/><path fill="#ffe5a0" d="M65 62H77V76H65Z"/><path fill="#c08a5e" d="M115 44L147 17 180 44V92H115Z"/><path fill="#f0d7a5" d="M121 44H174V92H121Z"/><path fill="#c86e57" d="M136 92V67H154V92"/><path fill="#ffefb6" d="M160 53H170V64H160Z"/><path fill="#bd8863" d="M202 59L238 34 276 59V91H202Z"/><path fill="#f8e6be" d="M209 59H269V91H209Z"/><path fill="#c27c57" d="M232 91V69H248V91"/><path fill="#ffdf95" d="M215 68H225V78H215Z"/><path fill="#c18d62" d="M301 48L334 23 367 48V92H301Z"/><path fill="#f3dfb2" d="M307 48H361V92H307Z"/><path fill="#ba7359" d="M327 92V67H345V92"/><path fill="#ffe3a0" d="M312 57H322V69H312Z"/><path fill="#c89b6d" d="M385 65L411 44 437 65V91H385Z"/><path fill="#f3d9a6" d="M390 65H432V91H390Z"/></g><path d="M0 93Q90 86 180 94T360 94T450 93" stroke="#9d9368" stroke-width="3" fill="none"/><g fill="#69794f"><path d="M94 83L104 54 114 83Z"/><path d="M279 86L291 48 304 86Z"/><path d="M369 87L378 61 387 87Z"/></g><g fill="#fff6c5"><circle cx="102" cy="44" r="3"/><circle cx="294" cy="37" r="3"/><circle cx="377" cy="52" r="2"/></g></svg>`;
document.body.insertAdjacentHTML("afterbegin",`<div class="sky-decor" aria-hidden="true">${stars}</div>`);document.getElementById('app').innerHTML=`<div class="brand">성탄절을 기다리는 25가지 이야기</div><article class="paper"><div class="date">DECEMBER ${String(n).padStart(2,'0')} · ADVENT STORY</div><h1 class="title">${esc(item.title)}</h1><div class="flourish">❧ ✦ ❧</div><img class="art" src="images/${String(n).padStart(2,'0')}.webp" alt="${esc(item.title)} 일러스트"><p class="question">${esc(item.question)}</p><div class="story">${content}</div><div class="listen">이야기를 들어보세요</div><audio id="narration" controls autoplay preload="auto" src="audio/${String(n).padStart(2,'0')}.mp3">오디오를 지원하지 않는 브라우저입니다.</audio><button class="play-button" id="play-btn" type="button">▶ 이야기를 재생하기</button><p class="autoplay-note">휴대전화 설정에 따라 자동 재생이 제한될 수 있어요.</p></article><nav>${n>1?`<a href="${String(n-1).padStart(2,'0')}.html">← 이전 이야기</a>`:'<span class="disabled"></span>'}${n<25?`<a href="${String(n+1).padStart(2,'0')}.html">다음 이야기 →</a>`:'<span class="disabled"></span>'}</nav><div class="foot">✦ 기다림 속에서 만나는 성탄의 기쁨 ✦</div>${village}`;const audio=document.getElementById('narration'),btn=document.getElementById('play-btn');
const tryPlay=()=>{const p=audio.play();if(p&&p.catch)p.catch(()=>btn.classList.add('visible'))};
btn.addEventListener('click',()=>{audio.play().then(()=>btn.classList.remove('visible')).catch(()=>{})});
window.addEventListener('load',tryPlay,{once:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!audio.currentTime)tryPlay()});
})();