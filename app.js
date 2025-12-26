(function(){
const h=React.createElement,{useState:U,useEffect:E,useRef:R,useMemo:M}=React,{max:MX}=Math,{CONFIG:Cf,CATEGORIES:CT,LEVELS:LV,GAMES:GM,ALL_GAMES:AG,GAME_PRICES:GP}=window.PuzzleBase;
const SZ=g=>MX(...g.map(r=>r.filter(x=>!'#?'.includes(x)).length)),H=g=>g.length-2;
const Board=({g,T})=>{
 const r=R();E(()=>{
  if(!r.current)return;const c=r.current,x=c.getContext('2d'),S=Cf.TILE_SIZE,W=g[0].length*S,H=g.length*S;
  c.width=W;c.height=H;
  if(T.bgDraw)T.bgDraw(x,W,H,S);else{x.clearRect(0,0,W,H);if(T.bgC){x.fillStyle=T.bgC;x.fillRect(0,0,W,H)}}
  g.forEach((rw,i)=>rw.forEach((v,j)=>{
   const X=j*S,Y=i*S;if('.*'.includes(v))return T.drawVoid?.(x,X,Y,S);
   T.draw({x,c:v,X,Y,S,nb:{t:g[i-1]?.[j]==v,b:g[i+1]?.[j]==v,l:rw[j-1]==v,r:rw[j+1]==v,tl:g[i-1]?.[j-1]==v,tr:g[i-1]?.[j+1]==v,bl:g[i+1]?.[j-1]==v,br:g[i+1]?.[j+1]==v}});
  }));
 },[g,T]);return h('canvas',{ref:r,className:T.cvCls,style:{maxWidth:'100%',height:'auto'}});
};
const App=()=>{
 const T=window.THEME,[v,sV]=U('variacao'),[k,sK]=U('klotski'),[z,sZ]=U(1);
 const LST=M(()=>{
  if(v==='variacao')return GM[k]||[];if(v==='preco')return AG.filter(p=>GP[p.name]==k);
  if(v==='grid'){const[w,h]=k.split('×').map(Number);return AG.filter(p=>SZ(p.grid)==w&&H(p.grid)==h)}
  const df={'Trivial':1,'Fácil':2,'Médio':3,'Difícil':4,'Muito Difícil':5,'Complexo':6,'Extremo':7,'Sobre-humano':8,'Impossível':9},t=LV.find(x=>x[0]==k);
  return AG.filter(p=>t&&(t[1]==df[p.difficulty]||t[2]==df[p.difficulty]));
 },[v,k]),GR=M(()=>[...new Set(AG.map(p=>`${SZ(p.grid)}×${H(p.grid)}`))].sort(),[]),PL=M(()=>[...new Set(Object.values(GP))].sort((a,b)=>a-b),[]);
 const Btn=({id,l,a,fn,S,x=''})=>h('button',{key:id,onClick:()=>fn(id),className:`${S.b} ${a?S.a:S.i} ${x}`},l,S.desc&&T.btnDesc&&h('div',{className:T.btnDesc},S.desc));
 return h('div',{className:T.appWrap},
  h('button',{onClick:()=>sZ(!z),className:T.btnSz},z?T.txtSz[0]:T.txtSz[1]),
  h('div',{className:"container mx-auto px-4 py-8"},
   h('header',{className:T.headCls},h('h1',{className:T.tiCls},T.title),T.sub&&h('p',{className:T.subCls},T.sub),T.headEx&&h('div',{className:T.headEx},"PZNNNLE")),
   h('div',{className:T.menuWrap},[['variacao',T.lbls?.[0]||'Variedade','klotski'],['preco',T.lbls?.[1]||'Preços',PL[0]],['grid',T.lbls?.[2]||'Tamanhos',GR[0]],['nivel',T.lbls?.[3]||'Níveis','novato']].map(([i,l,d])=>Btn({id:i,l,a:v===i,fn:x=>{sV(x);sK(d)},S:T.mBtn}))),
   h('div',{className:T.subWrap},(v==='variacao'?CT:v==='preco'?PL:v==='grid'?GR:LV.map(x=>x[0])).map(i=>{const id=i.id||i,lbl=i.label||(v==='preco'?`R$ ${i}`:i);return Btn({id,l:lbl,a:k===id,fn:sK,S:{...T.sBtn,desc:i.d||null},x:v==='nivel'?'capitalize':''})})),
   h('div',{className:"max-w-7xl mx-auto"},
    h('h2',{className:T.sepCls},v==='preco'?(T.sepP?`Jogos por R$ ${k}`:`Jogos de R$ ${k}`):v==='variacao'?CT.find(x=>x.id==k)?.label:k.toString().toUpperCase()),
    h('div',{className:T.gridCont},LST.map((p,i)=>{
     const w=SZ(p.grid),wc=w>=9?(z?"w-full xl:w-1/3":"w-full xl:w-1/4"):(z?"w-full xl:w-1/4":"w-full xl:w-1/5");
     return h('div',{key:i,className:`px-3 mb-8 ${wc}`},
      h('div',{className:T.card},T.cardDeco&&h('div',{className:T.cardDeco}),
       h('div',{className:T.cardHd},h('h3',{className:T.cardTi||"text-xl font-bold truncate pr-2"},p.name),
        h('div',{className:T.cardMeta||"text-right"},h('span',{className:`${T.bgdBase} ${T.dif[p.difficulty]}`},p.difficulty),h('span',{className:T.metaSz||"text-xs font-bold"},`${w}×${H(p.grid)}`))),
       h('div',{className:`${T.boardBg}`},h(Board,{g:p.grid,T})),h('button',{className:T.buyBtn},`R$ ${GP[p.name]},00`)))
    }))
   )
  )
 );
};ReactDOM.createRoot(document.getElementById('root')).render(h(App));})();