document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const countdownBox = document.getElementById("countdown-box");
  const countdownNumber = document.getElementById("countdown-number");
  const celebrationMessage = document.getElementById("celebration-message");
  const countdownOverlay = document.getElementById("countdown-overlay");
  const enterSiteBtn = document.getElementById("enter-site-btn");
  const loveBtn = document.getElementById("love-btn");
  const bgMusic = document.getElementById("bg-music");
  const animationLayer = document.getElementById("animation-layer");

  // Frases de amor personalizadas
  const lovePhrases = [
    "Te quiero, Judith Lisbeth", 
    "me gustas muuucho", 
    "Felices 2 meses", 
    "muaaa muaaaa", 
    "hermosa", 
    "mi bebé Judith Lisbeth ❤️", 
    "Mi chica ideal 💕"
  ];

  // Inicio de la cuenta regresiva al pulsar el botón
  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    countdownBox.classList.remove("hidden");

    let count = 10;
    countdownNumber.textContent = count;

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        countdownNumber.textContent = count;
      } else if (count === 0) {
        countdownNumber.textContent = "0";
      } else {
        clearInterval(timer);
        showCelebration();
      }
    }, 1000);
  });

  // Mostrar mensaje de aniversario + Fuegos Artificiales + Canción Axel
  function showCelebration() {
    countdownBox.classList.add("hidden");
    celebrationMessage.classList.remove("hidden");

    // Iniciar canción de Axel
    bgMusic.play().catch(err => console.log("Audio autoplay diferido:", err));

    // Lluvia de fuegos artificiales y animación
    triggerFireworks();
    startSurpriseAnimation();
  }

  // Ocultar pantalla superpuesta para ver la tarjeta principal
  enterSiteBtn.addEventListener("click", () => {
    countdownOverlay.classList.add("fade-out");
  });

  loveBtn.addEventListener("click", () => {
    triggerFireworks();
    startSurpriseAnimation();
  });

  // Efecto de Fuegos Artificiales con sonido sintético
  function triggerFireworks() {
    for (let f = 0; f < 6; f++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6);
        createFireworkExplosion(x, y);
        playExplosionSound();
      }, f * 500);
    }
  }

  function createFireworkExplosion(x, y) {
    const colors = ["#ff0054", "#ffbd00", "#ff5400", "#9e0059", "#70e000", "#00b4d8"];
    const numSparks = 30;

    for (let i = 0; i < numSparks; i++) {
      const spark = document.createElement("div");
      spark.classList.add("firework-spark");
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      const angle = (Math.PI * 2 * i) / numSparks;
      const distance = Math.random() * 120 + 40;
      const dx = `${Math.cos(angle) * distance}px`;
      const dy = `${Math.sin(angle) * distance}px`;

      spark.style.setProperty("--dx", dx);
      spark.style.setProperty("--dy", dy);

      animationLayer.appendChild(spark);

      setTimeout(() => spark.remove(), 1200);
    }
  }

  // Generador de sonido de explosión
  function playExplosionSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log("AudioContext no activo o no disponible");
    }
  }

  // Lluvia de frases y corazones burbuja
  function startSurpriseAnimation() {
    for (let i = 0; i < 30; i++) {
      setTimeout(createHeartBubble, i * 180);
    }
    for (let j = 0; j < 35; j++) {
      setTimeout(createRainText, j * 140);
    }
  }

  function createHeartBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("heart-bubble");
    const bubbleSize = Math.random() * 35 + 35;
    bubble.style.width = `${bubbleSize}px`;
    bubble.style.height = `${bubbleSize}px`;
    bubble.style.left = `${Math.random() * 90 + 5}%`;
    bubble.style.setProperty("--heart-size", `${bubbleSize * 0.45}px`);

    const duration = Math.random() * 3 + 4;
    bubble.style.animationDuration = `${duration}s`;

    animationLayer.appendChild(bubble);
    setTimeout(() => bubble.remove(), duration * 1000);
  }

  function createRainText() {
    const text = document.createElement("div");
    text.classList.add("rain-text");
    text.textContent = lovePhrases[Math.floor(Math.random() * lovePhrases.length)];
    text.style.left = `${Math.random() * 85 + 5}%`;

    const fontSize = Math.random() * 8 + 14;
    text.style.setProperty("--text-size", `${fontSize}px`);

    const duration = Math.random() * 2.5 + 3;
    text.style.animationDuration = `${duration}s`;

    animationLayer.appendChild(text);
    setTimeout(() => text.remove(), duration * 1000);
  }
});