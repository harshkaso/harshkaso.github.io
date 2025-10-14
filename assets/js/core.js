
// (() => {
//   const canvas = document.getElementById('dotMatrix');
//   const ctx = canvas.getContext('2d', { alpha: true });
//   const DPR = Math.max(1, window.devicePixelRatio || 1);

//   const style = getComputedStyle(document.documentElement);
//   const dotColor = style.getPropertyValue('--dot-color').trim() || '#4b4b4b';
//   const gapDefault = parseFloat(style.getPropertyValue('--gap')) || 36;
//   const dotRadius = parseFloat(style.getPropertyValue('--dot-size')) || 2.5;
//   const returnSpeed = parseFloat(style.getPropertyValue('--return-speed')) || 0.08;

//   let width = 0, height = 0;
//   let gap = gapDefault;
//   let dots = [];
//   let tick = 0;

//   let ripples = []; // active ripple waves

//   function setSize() {
//     width = canvas.getBoundingClientRect().width;
//     height = canvas.getBoundingClientRect().height;
//     canvas.width = Math.round(width * DPR);
//     canvas.height = Math.round(height * DPR);
//     canvas.style.width = width + 'px';
//     canvas.style.height = height + 'px';
//     ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
//     buildGrid();
//   }

//   function buildGrid() {
//     dots = [];
//     const cols = Math.floor(width / gap);
//     const rows = Math.floor(height / gap);
//     const offsetX = (width - (cols - 1) * gap) / 2;
//     const offsetY = (height - (rows - 1) * gap) / 2;

//     for (let y = 0; y < rows; y++) {
//       for (let x = 0; x < cols; x++) {
//         const px = Math.round(offsetX + x * gap);
//         const py = Math.round(offsetY + y * gap);
//         dots.push({
//           x: px, y: py,
//           vx: 0, vy: 0,
//           ox: px, oy: py,
//           baseR: dotRadius,
//           phase: Math.random() * Math.PI * 2,
//           speed: 0.02 + Math.random() * 0.02
//         });
//       }
//     }
//   }

//   function animate() {
//     ctx.clearRect(0, 0, width, height);
//     tick++;

//     for (const d of dots) {
//       // spring back to origin
//       const tx = d.ox - d.x;
//       const ty = d.oy - d.y;
//       d.vx += tx * returnSpeed;
//       d.vy += ty * returnSpeed;
//       d.vx *= 0.9;
//       d.vy *= 0.9;
//       d.x += d.vx;
//       d.y += d.vy;

//       // base pulsing
//       let r = d.baseR * (1 + Math.sin(tick * d.speed + d.phase) * 0.3);

//       // apply ripple effects
//       for (let ripple of ripples) {
//         const dx = d.ox - ripple.x;
//         const dy = d.oy - ripple.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         const wave = ripple.radius - dist;

//         if (wave > -15 && wave < 15) {
//           const strength = Math.min((15 - Math.abs(wave)) / 15, 0.15);

//           // 1) position "kick"
//           d.vx += ripple.dx * strength * 0.3;
//           d.vy += ripple.dy * strength * 0.3;
//           d.vx = Math.max(Math.min(d.vx, 2), -2);
//           d.vy = Math.max(Math.min(d.vy, 2), -2);

//           // 2) size pulse (clamped)
//           r += strength * 2.5; 
//         }
//       }

//       // clamp final radius so it doesn’t get too big
//       const maxR = d.baseR * 4; // max ~2.2× original
//       r = Math.min(r, maxR);

//       // draw dot
//       ctx.beginPath();
//       ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
//       ctx.fillStyle = dotColor;
//       ctx.fill();
//     }

//     // expand ripples
//     ripples.forEach(r => r.radius += 6);
//     ripples = ripples.filter(r => r.radius < Math.max(width, height));

//     requestAnimationFrame(animate);
//   }

//   function createRipples(e) {
//     let clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     let clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     clientX -= canvas.getBoundingClientRect().left;
//     clientY -= canvas.getBoundingClientRect().top;

//     // compute direction for positional ripple
//     const dx = (e.movementX || 0) * 0.2;
//     const dy = (e.movementY || 0) * 0.2;

//     ripples.push({ x: clientX, y: clientY, dx, dy, radius: 0 });
//   }

//   function onResize() {
//     if (innerWidth < 520) gap = gapDefault * 0.72;
//     else if (innerWidth > 1600) gap = gapDefault * 1.12;
//     else gap = gapDefault;
//     setSize();
//   }

//   function init() {
//     onResize();
//     window.addEventListener('resize', onResize, { passive: true });
//     window.addEventListener('mousemove', createRipples, { passive: true });
//     window.addEventListener('touchmove', createRipples, { passive: true });
//     window.addEventListener('touchstart', createRipples, { passive: true });
//     requestAnimationFrame(animate);
//   }

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', init);
//   } else init();
// })();


// (() => {
//   const canvas = document.getElementById("dotMatrix");
//   const ctx = canvas.getContext("2d");
//   const DPR = Math.max(1, window.devicePixelRatio || 1);

//   const style = getComputedStyle(document.documentElement);
//   let gap = parseFloat(style.getPropertyValue("--gap")) || 24;
//   const fontSize = parseFloat(style.getPropertyValue("--font-size")) || 14;
//   const rippleSpeed = parseFloat(style.getPropertyValue("--ripple-speed")) || 4;

//   // ASCII gradient characters (light → dense)
//   // let gradientChars = ".~¯—▄▀░▒▓█";
//   // gradientChars = " .:-=+*#%@";
//   gradientChars = "`.-'oO0@#█";

//   let width = 0, height = 0;
//   let points = [];
//   let ripples = [];

//   function setSize() {
//     width = canvas.getBoundingClientRect().width;
//     height = canvas.getBoundingClientRect().height;
//     canvas.width = Math.round(width * DPR);
//     canvas.height = Math.round(height * DPR);
//     canvas.style.width = width + "px";
//     canvas.style.height = height + "px";
//     ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
//     ctx.font = `${fontSize}px monospace`;
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     buildGrid();
//   }

//   function buildGrid() {
//     points = [];
//     const cols = Math.floor(width / gap);
//     const rows = Math.floor(height / gap);
//     const offsetX = (width - (cols - 1) * gap) / 2;
//     const offsetY = (height - (rows - 1) * gap) / 2;

//     for (let y = 0; y < rows; y++) {
//       for (let x = 0; x < cols; x++) {
//         const px = Math.round(offsetX + x * gap);
//         const py = Math.round(offsetY + y * gap);
//         points.push({ x: px, y: py });
//       }
//     }
//   }

//   function animate() {
//     ctx.clearRect(0, 0, width, height);

//     // Expand ripples
//     ripples.forEach(r => r.radius += rippleSpeed);
//     ripples = ripples.filter(r => r.radius < Math.max(width, height));

//     for (const p of points) {
//       let char = "∙"; // default background dot

//       for (let ripple of ripples) {
//         const dx = p.x - ripple.x;
//         const dy = p.y - ripple.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         const wave = ripple.radius - dist;

//         if (Math.abs(wave) < gap * 2) {
//           // Map to gradient
//           const norm = Math.max(0, 1 - Math.abs(wave) / (gap * 2));
//           const idx = Math.floor(norm * (gradientChars.length - 1));
//           char = gradientChars[idx];
//           break; // only the nearest ripple affects it
//         }
//       }

//       ctx.fillStyle = style.getPropertyValue("--color-text");
//       ctx.fillText(char, p.x, p.y);
//     }

//     requestAnimationFrame(animate);
//   }

//   function createRipples(e) {
//     let clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     let clientY = e.touches ? e.touches[0].clientY : e.clientY;
//     clientX -= canvas.getBoundingClientRect().left;
//     clientY -= canvas.getBoundingClientRect().top;
//     ripples.push({ x: clientX, y: clientY, radius: 0 });
//   }

//   function onResize() {
//     if (innerWidth < 520) gap = 18;
//     else if (innerWidth > 1600) gap = 28;
//     else gap = 24;
//     setSize();
//   }

//   function init() {
//     onResize();
//     window.addEventListener("resize", onResize, { passive: true });
//     window.addEventListener("mousemove", createRipples, { passive: true });
//     // window.addEventListener("touchstart", createRipples, { passive: true });
//     requestAnimationFrame(animate);
//   }

//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", init);
//   } else init();
// })();


class RippleMatrix {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    this.dpi = window.devicePixelRatio || 1;
    this.style = getComputedStyle(document.documentElement);

    this.points = []
    this.ripples = []
    this.gap = 15

    this.lastMouse = { x: 0, y: 0, t: 0 } // track last mouse state

    this.wavelength = this.gap
    this.waveSpeed = 4
    this.waveChars = "⠂⠆⠖⠶⠷⠿oO0@⣿░▒▓██".split('')
    this.waveChars = "⠂⠆⠖⠶⠷⠿ノハメラマ木@oO0░▒▓██".split('')
    this.mouseDown = false
  }
  get width() {
    return this.canvas.getBoundingClientRect().width
  }

  get height() {
    return this.canvas.getBoundingClientRect().height
  }

  buildGrid = () => {
    this.points = []
    const cols = Math.floor(this.width / this.gap);
    const rows = Math.floor(this.height / this.gap);
    const offsetX = (this.width - cols * this.gap) / 2;
    const offsetY = (this.height - rows * this.gap) / 2;

    let py = offsetX
    for (let y = 0; y < rows; y++, py += this.gap) {
      let px = offsetY
      for (let x = 0; x < cols; x++, px += this.gap) {
        this.points.push({ 
          x: px, y: py,          
        })
      }
    }

  }

  setupCanvas = () => {
    const parentRect = this.canvas.parentElement.getBoundingClientRect()
    // const dpi = window.devicePixelRatio || 1;
    this.canvas.width = parentRect.width * this.dpi
    this.canvas.height = parentRect.height * this.dpi
    this.canvas.style.width = parentRect.width + 'px'
    this.canvas.style.height = parentRect.height + 'px'
    // this.ctx.setTransform(this.dpi, 0, 0, this.dpi, 0, 0) // reset transform
    this.ctx.setTransform(1, 0, 0, 1, 0, 0) // reset transform
    this.ctx.scale(this.dpi, this.dpi);
    // this.ctx.font = `0.1em monospace`;
    if (this.width < 520) this.gap = 12
    else if (this.width > 1600) this.gap = 18
    else this.gap = 15
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = `bold ${this.gap}px monospace`;
    this.buildGrid();
  }

  animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.points) {
      let char = '⠂';
      char = '.';
      for (let ripple of this.ripples) {
        const dx = p.x - ripple.x;
        const dy = p.y - ripple.y;
        const dist = Math.sqrt(dx * dx + dy * dy); // from ripple center to point
        const wave = Math.abs(ripple.radius - dist); // how far the wave has reached this point
        let norm = 1
        if (wave < this.wavelength) { // within wave range
          // Map to gradient
          norm = (1 - wave / this.wavelength) * norm * Math.min(1,ripple.intensity); // 0 → 1
          const idx = Math.floor(norm * (this.waveChars.length));
          char = this.waveChars[idx];
        }
      }
      this.ctx.fillStyle = this.style.getPropertyValue("--color-text");
      this.ctx.fillText(char, p.x, p.y);
    }
    // expand ripples
    this.ripples.forEach(r => {
      r.radius += this.waveSpeed + r.intensity // faster expansion for high speed
      r.intensity *= r.decay
    });
    this.ripples = this.ripples.filter(r => r.radius < Math.max(this.width, this.height) && r.intensity > 0); // remove ripples beyond grid
    requestAnimationFrame(this.animate);
  }

  createRipples = (e) => {
    if (e.type === 'mousedown') this.mouseDown = true
    else if (e.type === 'mouseup') this.mouseDown = false
    else if (e.type === 'mouseleave') this.mouseDown = false 
    // if (e.type === 'touchmove' && e.touches.length > 1) return // ignore multi-touch
    const rect = this.canvas.getBoundingClientRect();
    let clientX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    let clientY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    const now = performance.now();
    let speed = 0

    if (this.lastMouse.t && !this.mouseDown) {
      const dx = clientX - this.lastMouse.x; 
      const dy = clientY - this.lastMouse.y;
      const dt = now - this.lastMouse.t;
      if (dt > 0) {
        speed = Math.sqrt(dx*dx + dy*dy) / dt; // pixels per ms 
        speed *= 2
      }
    }
    this.lastMouse = { x: clientX, y: clientY, t: now }
    // Normalize and clamp speed → intensity (tune multiplier)
    this.ripples.push({
      x: clientX, 
      y: clientY, 
      radius: 0,
      intensity: this.mouseDown ? 1 : speed,
      decay: 0.98
    })
  }
  init = () => {
    const resizeObserver = new ResizeObserver(() => this.setupCanvas())
    resizeObserver.observe(this.canvas.parentElement)
    this.canvas.addEventListener('mousemove', this.createRipples, {passive: true})
    this.canvas.addEventListener('touchmove', this.createRipples, {passive: true})
    this.canvas.addEventListener('mousedown', this.createRipples, {passive: true})
    this.canvas.addEventListener('mouseup', this.createRipples, {passive: true})
    this.canvas.addEventListener('mouseleave', this.createRipples, {passive: true})
    // this.canvas.addEventListener('touchstart', this.createRipples, {passive: true})
    this.ripples.push({x: this.width*this.dpi, y: 0, radius: 0})
    requestAnimationFrame(this.animate);
  }

}


class ScrambleDecodeText {
  constructor(el) {
    this.el = el;
    this.texts = JSON.parse(el.dataset.texts);
    this.maxDecodeFrame = el.dataset.maxFrame || 50;
    this.scrambleProbability = 0.1;

    this.chars = "☺ΣΨΩΛΞΘσ×Π#-_¯—→↓↑←!@#$%^&*:<>?~▄█▀▌▐░▒▓";
    this.frameID = null;
    this.resolve = null;
  }

  get nextText() {
    const text = this.texts.shift();
    this.texts.push(text);
    return text;
  }

  get randomLetter() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  get scrambleDelay() {
    
    return Math.random() * 6000 + 4000; // 4-10 seconds
  }

  generatedecodeQueue(oldText, newText) {
    const length = Math.max(oldText.length, newText.length);
    const queue = [];
    const persistentChildren = Array.from(this.el.getElementsByClassName('no-scramble'))
    console.log('before:', persistentChildren)
    this.el.innerHTML = ''; // clear existing
    console.log('after:', persistentChildren)
    const span = document.createElement('span');

    for (let i = 0; i < length; i++) {
      const span = document.createElement('span');
      span.textContent = oldText[i] || '';
      this.el.appendChild(span);

      const startFrame = ~~(Math.random() * this.maxDecodeFrame);
      const endFrame = startFrame + ~~(Math.random() * this.maxDecodeFrame);

      queue.push({
        span,
        oldLetter: oldText[i] || '',
        targetLetter: newText[i] || '',
        startFrame,
        endFrame,
        currentLetter: null
      });
    }
    for (let child of persistentChildren) {
      this.el.appendChild(child)
    }
    return queue;
  }

  setText(newText) {
    const oldText = this.el.innerText;
    this.decodeQueue = this.generatedecodeQueue(oldText, newText);

    cancelAnimationFrame(this.frameID);
    this.frameCount = 0;

    return new Promise((resolve) => {
      this.resolve = resolve;
      this.frameID = requestAnimationFrame(()=>this.animateFrame());
    });
  }

  animateFrame() {
    let completedDecodes = 0;

    for (let i = 0; i < this.decodeQueue.length; i++) {
      let { span, oldLetter, targetLetter, startFrame, endFrame, currentLetter } = this.decodeQueue[i];
      span.className = ''; // remove dud style

      if (this.frameCount >= endFrame) {
        completedDecodes++;
        span.textContent = targetLetter;
      } else if (this.frameCount >= startFrame) {
        if (!currentLetter || Math.random() < this.scrambleProbability) {
          currentLetter = this.randomLetter;
          this.decodeQueue[i].currentLetter = currentLetter;
        }
        span.className = 'text-muted'; // apply dud style
        span.textContent = currentLetter;
      } else {
        span.textContent = oldLetter;
      }
    }

    if (completedDecodes === this.decodeQueue.length) {
      this.resolve();
    } else {
      this.frameID = requestAnimationFrame(()=>this.animateFrame());
      this.frameCount++;
    }
  }

  cycleTexts = () => {
    this.setText(this.nextText).then(() => {
      setTimeout(this.cycleTexts, this.scrambleDelay);
    });
  };
}


class ImageToAscii {
  constructor(img, canvas) {
    this.img = img
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    this.dpi = window.devicePixelRatio || 1;
    this.style = getComputedStyle(document.documentElement);
  }
}


window.addEventListener('load', () => {
  let elements = document.getElementsByClassName('ripple-matrix')
  for (el of elements) {
    const fx = new RippleMatrix(el)
    fx.init()
  }
  elements = document.getElementsByClassName('text-scramble')
  for (el of elements) {
    const fx = new ScrambleDecodeText(el)
    fx.cycleTexts()
  }
})