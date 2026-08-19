/**
 * ============================================================================
 * PORTFOLIO IBRAHIM SORY DIALLO
 * 1. ANIMATION DE FOND : CODE & SYMBOLES COLORÉS (<>, {}, keywords)
 * 2. MOTEUR 3D ZOOM ENTRANT ULTRA-PRÉCIS (1 SCROLL = 1 SECTION)
 * 3. EFFETS INTERACTIFS (RESET SURVEILLÉ, TYPEWRITER, COPIE EMAIL)
 * ============================================================================
 */

// ─── Forcer le retour immédiat à la section 1 (Hero) à chaque réactualisation ───
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

/* ─────────────────────────────────────────────────────────────
   1. CANVAS D'ARRIÈRE-PLAN : CODE & SYMBOLES COLORÉS
───────────────────────────────────────────────────────────── */
(function initCodeCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Liste de tokens de code syntaxés et colorés
  const CODE_SNIPPETS = [
    { text: "</>",                  color: "#00d4ff" },
    { text: "<div />",              color: "#38bdf8" },
    { text: "<App />",              color: "#60a5fa" },
    { text: "{ ... }",              color: "#a78bfa" },
    { text: "() => {}",             color: "#c084fc" },
    { text: "const dev",            color: "#f472b6" },
    { text: "async await",          color: "#f43f5e" },
    { text: "function()",           color: "#facc15" },
    { text: "class Software",       color: "#fbbf24" },
    { text: "import { Spring }",    color: "#4ade80" },
    { text: "new Angular()",        color: "#34d399" },
    { text: "Flutter.create()",     color: "#38bdf8" },
    { text: "Docker.build()",       color: "#2dd4bf" },
    { text: "git push origin",      color: "#fb923c" },
    { text: "SELECT * FROM dev",    color: "#a78bfa" },
    { text: "while(true) build()",  color: "#f472b6" },
    { text: "[ 0, 1, 0, 1 ]",       color: "#64748b" },
    { text: "true && !false",       color: "#4ade80" },
    { text: "=== 'scalability'",    color: "#38bdf8" },
    { text: "return architecture;", color: "#f43f5e" },
  ];

  class CodeParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 30;
      this.z = Math.random() * 0.8 + 0.2; // 0.2 loin (petit/flou), 1.0 près (grand/net)
      this.vx = (Math.random() - 0.5) * 0.35 * this.z;
      this.vy = -(Math.random() * 0.55 + 0.25) * this.z; // Flotte doucement vers le haut
      
      const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      this.text = snippet.text;
      this.baseColor = snippet.color;
      this.fontSize = Math.floor((11 + this.z * 6));
      this.alpha = (Math.random() * 0.35 + 0.25) * this.z;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.02;

      if (this.y < -40 || this.x < -100 || this.x > width + 100) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      const dynamicAlpha = Math.max(0.08, this.alpha + Math.sin(this.pulse) * 0.1);
      ctx.font = `${this.fontSize}px 'Fira Code', monospace`;
      ctx.fillStyle = this.baseColor;
      ctx.globalAlpha = dynamicAlpha;
      ctx.shadowColor = this.baseColor;
      ctx.shadowBlur = this.z > 0.6 ? 8 : 0;
      ctx.fillText(this.text, this.x, this.y);
      ctx.restore();
    }
  }

  // Petits nœuds connectés
  class DotNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.size = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? "#7b5cfa" : "#00d4ff";
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
      ctx.globalAlpha = 0.2;
      ctx.fill();
    }
  }

  const codeCount = Math.min(40, Math.floor(window.innerWidth / 38));
  const codeParticles = Array.from({ length: codeCount }, () => new CodeParticle());
  const dotNodes = Array.from({ length: 35 }, () => new DotNode());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Lignes de connexion légères
    for (let i = 0; i < dotNodes.length; i++) {
      dotNodes[i].update();
      dotNodes[i].draw();

      for (let j = i + 1; j < dotNodes.length; j++) {
        const dx = dotNodes[i].x - dotNodes[j].x;
        const dy = dotNodes[i].y - dotNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(123, 92, 250, 0.08)";
          ctx.lineWidth = 0.5;
          ctx.moveTo(dotNodes[i].x, dotNodes[i].y);
          ctx.lineTo(dotNodes[j].x, dotNodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Particules de code
    for (let i = 0; i < codeParticles.length; i++) {
      codeParticles[i].update();
      codeParticles[i].draw();
    }

    requestAnimationFrame(animate);
  }
  animate();
})();


/* ─────────────────────────────────────────────────────────────
   2. MOTEUR DE DÉFILEMENT 3D PRÉCIS (1 SCROLL = 1 SECTION)
───────────────────────────────────────────────────────────── */
(function initPrecise3DScroll() {
  const sections = Array.from(document.querySelectorAll(".section"));
  const navDots = Array.from(document.querySelectorAll(".nav-dot"));
  const stepElem = document.getElementById("current-step");
  const TOTAL_SECTIONS = sections.length; // 4 sections

  let currentIndex = 0;
  let isScrollLocked = false;
  const SCROLL_COOLDOWN_MS = 650; // Délai de verrouillage pour une transition ultra-précise

  /**
   * Change la section active avec animation 3D zoom entrant
   * @param {number} targetIndex - Index de la section ciblée (0, 1, 2, 3)
   */
  function setSection(targetIndex) {
    if (targetIndex < 0 || targetIndex >= TOTAL_SECTIONS) return;
    
    currentIndex = targetIndex;

    // Appliquer les classes 3D exactes à chaque section
    sections.forEach((sec, idx) => {
      sec.classList.remove("is-active", "is-in-background", "is-exiting-forward");

      if (idx < currentIndex) {
        // Sections passées : zoomées vers l'avant et estompées
        sec.classList.add("is-exiting-forward");
      } else if (idx === currentIndex) {
        // Section actuelle : centrée, nette, 100% visible
        sec.classList.add("is-active");
      } else {
        // Sections futures : en attente dans le fond 3D
        sec.classList.add("is-in-background");
      }
    });

    // Mettre à jour les dots indicateurs
    navDots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });

    // Mettre à jour le compteur d'étape (Ex: 01, 02, 03, 04)
    if (stepElem) {
      stepElem.textContent = `0${currentIndex + 1}`;
    }
  }

  // Fonctions globales exposées
  window.goToSection = function(index) {
    setSection(index);
  };

  window.nextSection = function() {
    if (currentIndex < TOTAL_SECTIONS - 1) {
      setSection(currentIndex + 1);
    }
  };

  window.prevSection = function() {
    if (currentIndex > 0) {
      setSection(currentIndex - 1);
    }
  };

  // ─── Écouteur Molette / Trackpad (Précis, sans scroll dans scroll) ───
  window.addEventListener("wheel", (e) => {
    e.preventDefault(); // Empêche tout scroll parasitaire
    
    if (isScrollLocked) return;
    if (Math.abs(e.deltaY) < 15) return; // Ignore les petits bruits de trackpad

    if (e.deltaY > 0) {
      window.nextSection();
    } else {
      window.prevSection();
    }

    // Verrouille pour éviter les sauts multiples intempestifs
    isScrollLocked = true;
    setTimeout(() => {
      isScrollLocked = false;
    }, SCROLL_COOLDOWN_MS);
  }, { passive: false });

  // ─── Écouteur Tactile (Mobile / Tablette Swipe) ───
  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchend", (e) => {
    if (isScrollLocked) return;
    const deltaY = touchStartY - e.changedTouches[0].clientY;

    if (Math.abs(deltaY) > 40) {
      if (deltaY > 0) {
        window.nextSection();
      } else {
        window.prevSection();
      }
      isScrollLocked = true;
      setTimeout(() => {
        isScrollLocked = false;
      }, SCROLL_COOLDOWN_MS);
    }
  }, { passive: true });

  // ─── Écouteur Clavier (Flèches, Espace, PageUp/Down, Touches 1-4) ───
  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      window.nextSection();
    } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
      e.preventDefault();
      window.prevSection();
    } else if (e.key >= "1" && e.key <= "4") {
      window.goToSection(parseInt(e.key, 10) - 1);
    }
  });

  // ─── Initialisation : Toujours démarrer sur la section 0 (Hero) ───
  setSection(0);
})();


/* ─────────────────────────────────────────────────────────────
   3. EFFETS D'ÉCRITURE TYPEWRITER & INTERACTION CONTACT
───────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // Animation de frappe du nom
  const typeNameElem = document.getElementById("type-name");
  if (typeNameElem) {
    const fullName = "Ibrahim Sory Diallo";
    typeNameElem.textContent = "";
    let charIdx = 0;

    function typeWriterName() {
      if (charIdx < fullName.length) {
        typeNameElem.textContent += fullName.charAt(charIdx++);
        setTimeout(typeWriterName, 80);
      }
    }
    setTimeout(typeWriterName, 300);
  }

  // Animation de frappe du sous-titre
  const typeSubElem = document.getElementById("type-welcome");
  if (typeSubElem) {
    const subText = "Concepteur de solutions logicielles complètes, robustes et immersives.";
    typeSubElem.textContent = "";
    let subIdx = 0;

    function typeWriterSub() {
      if (subIdx < subText.length) {
        typeSubElem.textContent += subText.charAt(subIdx++);
        setTimeout(typeWriterSub, 35);
      }
    }
    setTimeout(typeWriterSub, 1500);
  }
});

// Copie d'email en 1 clic
window.copyEmail = function() {
  const email = "colonel.diallo19@gmail.com";
  const btn = document.getElementById("copy-btn");
  const textElem = document.getElementById("copy-text");

  navigator.clipboard.writeText(email).then(() => {
    if (btn && textElem) {
      const originalText = textElem.textContent;
      btn.classList.add("copied");
      textElem.textContent = "Email copié ! ✓";

      setTimeout(() => {
        btn.classList.remove("copied");
        textElem.textContent = originalText;
      }, 2500);
    }
  }).catch(() => {
    window.location.href = `mailto:${email}`;
  });
};