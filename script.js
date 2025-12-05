// --- Typing animation ---
      const welcome = "Bienvenue dans mon univers";
      const name = "</ Diallo Ibrahim Sory >";
      const welcomeElem = document.getElementById("welcome-text");
      const nameElem = document.getElementById("name-text");
      let i = 0,
        j = 0;

      function typeWelcome() {
        if (i < welcome.length) {
          welcomeElem.innerHTML += welcome.charAt(i);
          i++;
          setTimeout(typeWelcome, 80);
        } else {
          typeName();
        }
      }
      function typeName() {
        if (j < name.length) {
          nameElem.innerHTML += name.charAt(j);
          j++;
          setTimeout(typeName, 120);
        }
      }
      typeWelcome();

      // --- PARTICULES (inchangé) ---
      const canvas = document.getElementById("bg-canvas");
      const ctx = canvas.getContext("2d");
      let width,
        height,
        particles = [];
      function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      window.addEventListener("resize", resize);
      resize();
      class Particle {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
          this.size = Math.random() * 2 + 1;
          this.color = `rgba(58,134,255,${Math.random() * 0.5})`;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
      for (let i = 0; i < 150; i++) particles.push(new Particle());
      function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x,
              dy = particles[i].y - particles[j].y,
              d = Math.sqrt(dx * dx + dy * dy);
            if (d < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255,255,255,${0.1 - d / 1000})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(animateCanvas);
      }
      animateCanvas();

      // --- SLIDES ---
      const slides = document.querySelectorAll(".slide");
      const dots = document.querySelectorAll(".dot");
      const totalSlides = slides.length;
      window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = scrollPos / docHeight;
        let exactIndex = progress * (totalSlides - 0.5);
        let currentIndex = Math.floor(exactIndex);
        if (currentIndex >= totalSlides) currentIndex = totalSlides - 1;
        if (currentIndex < 0) currentIndex = 0;
        dots.forEach((d) => d.classList.remove("active"));
        if (dots[currentIndex]) dots[currentIndex].classList.add("active");
        slides.forEach((slide, index) => {
          let relativePos = exactIndex - index;
          if (relativePos >= -1 && relativePos <= 1) {
            slide.style.visibility = "visible";
            if (relativePos > 0) {
              slide.style.transform = `scale(${1 + relativePos * 0.5})`;
              slide.style.opacity = Math.max(1 - relativePos * 1.5, 0);
              slide.style.filter = `blur(${relativePos * 10}px)`;
            } else {
              slide.style.transform = `scale(${1 + relativePos * 0.2})`;
              slide.style.opacity = 1 + relativePos;
              slide.style.filter = "blur(0px)";
            }
          } else {
            slide.style.visibility = "hidden";
            slide.style.opacity = 0;
          }
        });
      });
      function scrollToSlide(index) {
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const targetScroll = (index / (totalSlides - 0.5)) * docHeight;
        window.scrollTo({ top: targetScroll + 50, behavior: "smooth" });
      }
      window.scrollTo(0, 0);

      // Bounce
      const styleSheet = document.createElement("style");
      styleSheet.innerText = `@keyframes bounce{0%,20%,50%,80%,100%{transform:translateY(0);}40%{transform:translateY(-10px);}60%{transform:translateY(-5px);}}`;
      document.head.appendChild(styleSheet);