// class ScrambleDecodeText {
//   constructor(el) {
//     this.el = el;
//     this.texts = JSON.parse(el.dataset.texts);
//     this.maxDecodeFrame = el.dataset.maxFrame || 50;
//     this.scrambleProbability = 0.1;

//     this.chars = "☺ΣΨΩΛΞΘσ×Π#-_¯—→↓↑←!@#$%^&*:<>?~▄█▀▌▐░▒▓";
//     this.frameID = null;
//     this.resolve = null;
//   }

//   get nextText() {
//     const text = this.texts.shift();
//     this.texts.push(text);
//     return text;
//   }

//   get randomLetter() {
//     return this.chars[Math.floor(Math.random() * this.chars.length)];
//   }

//   get scrambleDelay() {
    
//     return Math.random() * 6000 + 4000; // 4-10 seconds
//   }

//   generatedecodeQueue(oldText, newText) {
//     const length = Math.max(oldText.length, newText.length);
//     const queue = [];
//     this.el.innerHTML = ''; // clear existing
//     for (let i = 0; i < length; i++) {
//       const span = document.createElement('span');
//       span.textContent = oldText[i] || '';
//       this.el.appendChild(span);

//       const startFrame = ~~(Math.random() * this.maxDecodeFrame);
//       const endFrame = startFrame + ~~(Math.random() * this.maxDecodeFrame);

//       queue.push({
//         span,
//         oldLetter: oldText[i] || '',
//         targetLetter: newText[i] || '',
//         startFrame,
//         endFrame,
//         currentLetter: null
//       });
//     }
//     return queue;
//   }

//   setText(newText) {
//     const oldText = this.el.innerText;
//     this.decodeQueue = this.generatedecodeQueue(oldText, newText);

//     cancelAnimationFrame(this.frameID);
//     this.frameCount = 0;

//     return new Promise((resolve) => {
//       this.resolve = resolve;
//       this.frameID = requestAnimationFrame(()=>this.animateFrame());
//     });
//   }

//   animateFrame() {
//     let completedDecodes = 0;

//     for (let i = 0; i < this.decodeQueue.length; i++) {
//       let { span, oldLetter, targetLetter, startFrame, endFrame, currentLetter } = this.decodeQueue[i];
//       span.className = ''; // remove dud style

//       if (this.frameCount >= endFrame) {
//         completedDecodes++;
//         span.textContent = targetLetter;
//       } else if (this.frameCount >= startFrame) {
//         if (!currentLetter || Math.random() < this.scrambleProbability) {
//           currentLetter = this.randomLetter;
//           this.decodeQueue[i].currentLetter = currentLetter;
//         }
//         span.className = 'text-muted'; // apply dud style
//         span.textContent = currentLetter;
//       } else {
//         span.textContent = oldLetter;
//       }
//     }

//     if (completedDecodes === this.decodeQueue.length) {
//       this.resolve();
//     } else {
//       this.frameID = requestAnimationFrame(()=>this.animateFrame());
//       this.frameCount++;
//     }
//   }

//   cycleTexts = () => {
//     this.setText(this.nextText).then(() => {
//       setTimeout(this.cycleTexts, this.scrambleDelay);
//     });
//   };
// }



// window.addEventListener('load', () => {
//   const elements = document.getElementsByClassName('text-scramble')
//   for (el of elements) {
//     const fx = new ScrambleDecodeText(el)
//     fx.cycleTexts()
//   }
// })