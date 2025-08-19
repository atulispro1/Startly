(function(){
  // ========== LOGIN PAGE TOGGLE ========== //
  const auth = document.getElementById('auth');
  const wrap = document.querySelector('.wrap');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnSignIn  = document.getElementById('btnSignIn');

  if (btnSignUp && btnSignIn && wrap) {
    btnSignUp.addEventListener('click', () => wrap.classList.add('right-active'));
    btnSignIn.addEventListener('click', () => wrap.classList.remove('right-active'));
  }
  // Mobile toggle buttons logic
  const mobileSignInBtn = document.getElementById('mobileSignInBtn');
  const mobileSignUpBtn = document.getElementById('mobileSignUpBtn');
  const signInPanel = document.querySelector('.sign-in');
  const signUpPanel = document.querySelector('.sign-up');

  if (mobileSignInBtn && mobileSignUpBtn && signInPanel && signUpPanel) {
    // Default active state
    signInPanel.classList.add('active');
    mobileSignInBtn.classList.add('active');

    mobileSignInBtn.addEventListener('click', () => {
      mobileSignInBtn.classList.add('active');
      mobileSignUpBtn.classList.remove('active');
      signInPanel.classList.add('active');
      signUpPanel.classList.remove('active');
    });

    mobileSignUpBtn.addEventListener('click', () => {
      mobileSignUpBtn.classList.add('active');
      mobileSignInBtn.classList.remove('active');
      signUpPanel.classList.add('active');
      signInPanel.classList.remove('active');
    });
  }


  // Overlay click toggle between sign-in and sign-up
  const overlay = document.getElementById('overlay');
  if (overlay && wrap) {
    overlay.addEventListener('click', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if(x > rect.width/2) wrap.classList.add('right-active');
      else wrap.classList.remove('right-active');
    });
  }
  


  // ========== LOGIN PAGE PARALLAX SQUARES ON MOUSE MOVE ========== //
  // This is preserved exactly as requested
  const bg = document.getElementById('bg');
  if (bg) {
    const squares = Array.from(bg.querySelectorAll('.sq'));
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1..1
      const dy = (e.clientY - cy) / cy;
      squares.forEach((sq, i) => {
        const speed = (i + 1) * 6; // different speeds
        const tx = dx * speed;
        const ty = dy * speed;
        sq.style.transform = `translate(${tx}px, ${ty}px) rotate(${i * 20}deg)`;
      });
    });
  }


  // ========== GENTLE PULSING CONTAINER GLOW (LOGIN PAGE) ========== //
  let pulse = 0;
  setInterval(() => {
    pulse = (pulse + 1) % 360;
    // Note: You can apply this subtle hue rotation to box shadows or glowing elements
    const hue = 180 + Math.sin(pulse * Math.PI / 180) * 50;
    // Example: If you want to update box shadow color dynamically, you can do it here
    // document.querySelector('.auth').style.boxShadow = `0 0 30px hsl(${hue}, 100%, 75%)`;
  }, 1000);


  // ========== NEON ANIMATED BACKGROUND PARTICLES ========== //
  (function(){
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const COLORS = ['#00f5ff','#ff4df0','#7a5cff','#00ffa8','#ffb347'];
    for(let i = 0; i < 40; i++){
      const r = 1 + Math.random() * 3;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: r,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        alpha: 0.6 + Math.random() * 0.2
      });
    }

    function animate(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(const p of particles){
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 12;
        ctx.fillStyle = p.c;
        ctx.fill();
        ctx.restore();

        p.x += p.dx;
        p.y += p.dy;

        if(p.x < -20) p.x = canvas.width + 20;
        else if(p.x > canvas.width + 20) p.x = -20;

        if(p.y < -20) p.y = canvas.height + 20;
        else if(p.y > canvas.height + 20) p.y = -20;
      }
      requestAnimationFrame(animate);
    }
    animate();
  })();


  // ========== NEON RIPPLE EFFECT ON CLICK (GLOBAL) ========== //
  document.body.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.className = "click-ripple";
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 900);
  });


  // ========== SCROLL REVEAL ANIMATIONS (ALL PAGES) ========== //
  // Elements with .reveal class will fade/slide in on scroll
  const revealElements = () => {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
      if(elementTop < windowHeight - revealPoint){
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealElements);
  window.addEventListener("load", revealElements);


  // ========== OPTIONAL: CURSOR FOLLOWER FOR NON-LOGIN PAGES (if exists) ========== //
  const cursorFollower = document.getElementById("cursor-follower");
  if (cursorFollower) {
    document.addEventListener("mousemove", e => {
      cursorFollower.style.transform = `translate(${e.clientX - cursorFollower.offsetWidth/2}px, ${e.clientY - cursorFollower.offsetHeight/2}px)`;
    });
  }


  // ========== SUBTLE PARALLAX TILT EFFECT FOR MAIN CONTAINERS (NON-LOGIN PAGES) ========== //
  // Example: For elements with class .parallax-tilt, which you can add on homepage heroes or cards
  const parallaxElements = document.querySelectorAll('.parallax-tilt');
  if(parallaxElements.length > 0){
    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // Range -1 to 1
      const dy = (e.clientY - cy) / cy;

      parallaxElements.forEach(el => {
        // Modulate tilt intensity as needed
        const maxTilt = 10; // degrees
        const tiltX = dy * maxTilt;
        const tiltY = dx * maxTilt;
        el.style.transform = `perspective(600px) rotateX(${ -tiltX }deg) rotateY(${ tiltY }deg)`;
      });
    });
  }


// JavaScript to make the carousel infinite and smooth
(function(){
  const track = document.querySelector('.carousel-track');
  if(!track) return;

  const speed = 0.5; // pixels per frame, adjust for speed
  let posX = 0;

  // Clone all items and append to end for seamless loop
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  function animate() {
    posX -= speed;
    // When scrolled past half width, reset position to 0 (start)
    if(Math.abs(posX) >= track.scrollWidth / 2){
      posX = 0;
    }
    track.style.transform = `translateX(${posX}px)`;
    requestAnimationFrame(animate);
  }

  // Start animation
  animate();
})();


})();
