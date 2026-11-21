const M={
"Entradas":[["Provoleta a la brasa","Queso provolone fundido con orégano y tomate asado.",24000],["Papas rústicas","Papas artesanales con sal de hierbas y alioli.",16000],["Chorizo criollo","Chorizo artesanal con arepa y chimichurri.",22000]],
"Brasas":[["Lomo Brasa","Lomo fino de 300 g con mantequilla de hierbas.",68000],["Costillas BBQ","Costilla de cerdo glaseada, cocción lenta.",58000],["Tabla de la Casa","Selección de carnes para dos personas.",89000]],
"Hamburguesas":[["Hamburguesa Mesa","Doble carne, cheddar y cebolla caramelizada.",38000],["Hamburguesa Humo","Tocineta ahumada, queso azul y salsa BBQ.",42000]],
"Ensaladas":[["Ensalada del huerto","Hojas verdes, aguacate, nueces y vinagreta cítrica.",26000]],
"Postres":[["Brownie con helado","Brownie tibio, helado de vainilla y salsa de café.",19000],["Flan de cuajada","Cuajada, panela y mora.",17000]],
"Bebidas":[["Limonada de coco","Natural, cremosa y fría.",12000],["Cóctel Brasa","Whisky, miel ahumada y naranja.",32000]]};
const $=s=>document.querySelector(s),fmt=n=>'$'+n.toLocaleString('es-CO');
let cat='Brasas',cart={},disc=0;
function tabs(){$('#tabs').innerHTML=Object.keys(M).map(k=>`<button aria-pressed="${k==cat}" data-k="${k}">${k}</button>`).join('');
$('#menuList').innerHTML=M[cat].map((p,i)=>`<div class="item"><div><h3>${p[0]}</h3><p>${p[1]}</p></div><div class="r"><span class="price">${fmt(p[2])}</span><button class="add" data-i="${i}">Agregar</button></div></div>`).join('')}
function put(n,p){cart[n]=cart[n]||{p,q:0};cart[n].q++;draw()}
$('#tabs').onclick=e=>{if(e.target.dataset.k){cat=e.target.dataset.k;tabs()}};
$('#menuList').onclick=e=>{const i=e.target.dataset.i;if(i!==undefined){const p=M[cat][i];put(p[0],p[2]);e.target.textContent='Agregado ✓';setTimeout(()=>e.target.textContent='Agregar',900)}};
document.querySelectorAll('.plus').forEach(b=>b.onclick=()=>put(b.dataset.n,+b.dataset.p));
function draw(){const ks=Object.keys(cart);let sub=0,n=0;
$('#lines').innerHTML=ks.length?ks.map(k=>{const c=cart[k];sub+=c.p*c.q;n+=c.q;return `<div class="line"><span>${k}<br><small>${fmt(c.p)}</small></span><span class="qty"><button data-m="${k}" aria-label="Quitar uno">−</button> ${c.q} <button data-a="${k}" aria-label="Agregar uno">+</button></span></div>`}).join(''):'<p style="color:var(--mut)">Tu pedido está vacío. Agrega platos desde el menú.</p>';
$('#cnt').textContent=n;$('#sum').hidden=!ks.length;
const d=Math.round(sub*disc),s=sub>=80000||!sub?0:7000;
$('#sub').textContent=fmt(sub);$('#disc').textContent=d?'−'+fmt(d):'$0';$('#ship').textContent=s?fmt(s):'Gratis';$('#total').textContent=fmt(sub-d+s)}
$('#lines').onclick=e=>{const m=e.target.dataset.m,a=e.target.dataset.a;if(m&&--cart[m].q<1)delete cart[m];if(a)cart[a].q++;draw()};
$('#code').oninput=e=>{disc=e.target.value.trim().toUpperCase()=='BRASA10'?.1:0;draw()};
const dr=$('#drawer'),op=e=>{e&&e.preventDefault();dr.classList.add('open');$('#ordOk').hidden=true};
$('#open').onclick=op;$('#open2').onclick=op;$('#close').onclick=()=>dr.classList.remove('open');
document.addEventListener('keydown',e=>{if(e.key=='Escape')dr.classList.remove('open')});
$('#ordForm').onsubmit=e=>{e.preventDefault();const t=$('#total').textContent;cart={};disc=0;$('#code').value='';draw();e.target.reset();$('#ordOk').hidden=false;$('#ordOk').textContent='Pedido confirmado por '+t+'. Llegará en 35 a 50 minutos.'};
const f=$('#resForm');f.f.min=new Date().toISOString().slice(0,10);
f.onsubmit=e=>{e.preventDefault();const o=$('#resOk');o.hidden=false;o.textContent='Reserva confirmada, '+f.n.value+'. Te esperamos el '+f.f.value+' a las '+f.h.value+' para '+f.p.value+' persona(s).';f.reset()};
tabs();draw();
