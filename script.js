/* ===== Mobile menu ===== */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => { burger.classList.remove('open'); mobileMenu.classList.remove('open'); });
});

/* ===== Typing effect ===== */
function startTyping(){
  const target = document.getElementById('typeTarget');
  const lines = [
    '> Status: Mahasiswa Ilmu Komputer...',
    '> Target: Cyber Security Engineer...',
    '> System: Universitas Negeri Medan_'
  ];
  let lineIndex = 0, charIndex = 0, buffer = '';

  function tick(){
    if(lineIndex >= lines.length){
      target.innerHTML = buffer + '<span class="cursor">&nbsp;</span>';
      return;
    }
    const currentLine = lines[lineIndex];
    if(charIndex <= currentLine.length){
      target.innerHTML = buffer + currentLine.slice(0, charIndex) + '<span class="cursor">&nbsp;</span>';
      charIndex++;
      setTimeout(tick, 32);
    } else {
      buffer += currentLine + '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(tick, 280);
    }
  }
  tick();
}
startTyping();

/* ===== Binary rain canvas ===== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let w, h, columns, drops;

function initCanvas(){
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
  const fontSize = 16;
  columns = Math.floor(w / fontSize);
  drops = new Array(columns).fill(1);
}
initCanvas();
window.addEventListener('resize', initCanvas);

function drawRain(){
  ctx.fillStyle = 'rgba(10,10,15,0.08)';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(0,255,65,0.55)';
  ctx.font = '16px JetBrains Mono, monospace';
  for(let i = 0; i < drops.length; i++){
    const char = Math.random() > 0.5 ? '1' : '0';
    const x = i * 16;
    const y = drops[i] * 16;
    ctx.fillText(char, x, y);
    if(y > h && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(drawRain);
}
drawRain();

/* ===== Intersection Observer reveal ===== */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ===== 3D tilt on hobby cards ===== */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* ===== Contact form validation ===== */
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function setError(fieldId, message){
  const field = document.getElementById(fieldId);
  field.classList.toggle('error', !!message);
  field.querySelector('.err-msg').textContent = message || '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let valid = true;

  if(!name){ setError('fieldName', 'Nama tidak boleh kosong.'); valid = false; }
  else setError('fieldName', '');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email){ setError('fieldEmail', 'Email tidak boleh kosong.'); valid = false; }
  else if(!emailPattern.test(email)){ setError('fieldEmail', 'Format email tidak valid.'); valid = false; }
  else setError('fieldEmail', '');

  if(!message){ setError('fieldMessage', 'Pesan tidak boleh kosong.'); valid = false; }
  else setError('fieldMessage', '');

  if(!valid) return;

  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 3200);
});