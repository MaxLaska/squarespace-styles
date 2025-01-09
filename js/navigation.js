document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const lines = document.querySelectorAll(".line");
    const clickableLines = document.querySelectorAll(".line.clickable");
  
    let lastHighlightedIndex = 0;
    let pulseIntervals = [];
    let isManualScrolling = false;  // <--- Neu
  
    // Generate gradient colors for the lines
    const gradientColors = generateGradientColors("#40e0d0", "#ff69b4", lines.length);
  
    // Initial Highlight
    updateHighlight(0);
  
    // Klick auf Navigations-Linien
    clickableLines.forEach((line, index) => {
      line.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(line.dataset.target);
  
        // Während Smooth-Scroll = manuelles Scrollen
        isManualScrolling = true;
  
        // Smooth Scroll zur entsprechenden Sektion
        targetSection.scrollIntoView({ behavior: "smooth" });
        
        // Setze Highlight sofort auf Ziel (falls gewünscht)
        updateHighlight(index * 4);
        startWavePulse(index * 4);
  
        // Nach ca. 800ms dürfte der Smooth-Scroll in der Regel beendet sein
        setTimeout(() => {
          isManualScrolling = false;
        }, 800);
      });
    });
  
    // IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // Wenn gerade manuell gescrollt wird: Ignorieren
        if (isManualScrolling) return;  
  
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = [...sections].indexOf(entry.target);
            updateHighlight(idx * 4);
            startWavePulse(idx * 4);
          }
        });
      },
      { threshold: 0.6 }
    );
  
    sections.forEach((section) => observer.observe(section));
  
    // ---------------------------------------------------------
    // Deine bestehenden Funktionen, unverändert oder leicht angepasst:
    // ---------------------------------------------------------
  
    // Update highlight
    function updateHighlight(activeIndex) {
      lines.forEach((line, index) => {
        const isSection = line.classList.contains("clickable");
        if (index <= activeIndex) {
          line.classList.add("highlighted");
          line.style.backgroundColor = gradientColors[index];
          if (isSection) line.style.width = "60px";
        } else {
          line.classList.remove("highlighted");
          line.style.backgroundColor = "#333";
          line.style.width = isSection ? "60px" : "20px";
        }
      });
      lastHighlightedIndex = activeIndex;
    }
  
    // Start wave pulsating animation
    function startWavePulse(activeIndex) {
      clearWavePulse(); // Stop any previous intervals
      lines.forEach((line, index) => {
        const isSection = line.classList.contains("clickable");
        if (index < activeIndex && !isSection) {
          // Pulsierende Zwischenstriche
          const baseWidth = 20;
          const maxWidth = 38;
          const duration = 1000;
  
          let phase = index;
  
          const interval = setInterval(() => {
            const time = Date.now() % duration;
            const wave = Math.sin((time / duration) * 2 * Math.PI + phase);
            const newWidth = baseWidth + (maxWidth - baseWidth) * ((wave + 1) / 2);
            line.style.width = `${newWidth}px`;
          }, 50);
  
          pulseIntervals.push(interval);
        }
      });
    }
  
    function clearWavePulse() {
      pulseIntervals.forEach((interval) => clearInterval(interval));
      pulseIntervals = [];
    }
  
    // Gradient-Funktion
    function generateGradientColors(startColor, endColor, steps) {
      const start = hexToRgb(startColor);
      const end = hexToRgb(endColor);
      const colors = [];
      for (let i = 0; i < steps; i++) {
        const ratio = i / (steps - 1);
        const r = Math.round(start.r + ratio * (end.r - start.r));
        const g = Math.round(start.g + ratio * (end.g - start.g));
        const b = Math.round(start.b + ratio * (end.b - start.b));
        colors.push(`rgb(${r}, ${g}, ${b})`);
      }
      return colors;
    }
  
    function hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    }
  });
  