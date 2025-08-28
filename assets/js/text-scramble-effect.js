// Created by harshkaso
let textScrambleEffect = (element, 
                    animationDelta = 50, 
                    maxDecodeFrames=20,
                    glitch = true,
                    glitchDeltaMax = 5000,
                    maxGlitchRatio = 0.6) => {
  var tse = this;
  tse.init = () => {
    tse.targetText = element.getAttribute('data-text') || element.innerText;
    tse.chars = "☺Σ×Π#-_¯—→↓↑←!@#$%^&*:;<>?~0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxyz";
    tse.animateScramble();
  };
  
  // Helper functions
  
  tse.getRandomLetter = () => {
    return tse.chars.charAt(~~(Math.random()*tse.chars.length));
  };

  tse.generateRandomString = (length) => {
    var randomText = '';
    currentLength = 0
    while (currentLength < length) {
      randomText += tse.getRandomLetter()
      currentLength += 1;
    }
    return randomText
  }

  tse.generateDecodeBuffer = (text, glitchRatio) => {
    // Decide number of cycles each letter should shuffle 
    // before it is set to target letter.
    glitchedCharCount = glitchRatio ? ~~(~~(tse.targetText.length * glitchRatio) * Math.random()) + 1 : tse.targetText.length 
    glitchedIndices = [...Array(glitchedCharCount)].map(e=>~~(Math.random()*tse.targetText.length))
    buffer = []
    for (i = 0; i < text.length; i++) {
        c = (~~(Math.random()*maxDecodeFrames))+1
        t = tse.targetText.charAt(i)
      buffer.push({
        cycles: glitchedIndices.includes(i) & t !== ' ' ? c : 0 ,
        target: t
      })
    }
    return buffer
  }

  // animates a growing random string till the target length
  tse.animateScramble = (currentLength = 0) => {
    // once a string of correct length is generated start decoding random chars
    if (currentLength >= tse.targetText.length) { 
      decodeBuffer = tse.generateDecodeBuffer(tse.targetText);
      setTimeout(tse.animateDecode.bind(null, decodeBuffer), animationDelta);
      return;
    }

    var message = tse.generateRandomString(currentLength+1);
    element.innerHTML = message;
    setTimeout(tse.animateScramble.bind(null, currentLength+1), animationDelta);
  } 

  // sets random letters to correct ones over couple of frames
  tse.animateDecode = (decodeBuffer) => {
    needDecode = false;
    decodedText = '';
    for (letter of decodeBuffer) {
      tempLetter = letter.target;
      if (letter.cycles) {
        needDecode = true;
        letter.cycles--;
        tempLetter = tse.getRandomLetter();
      }
      decodedText += tempLetter;
    }
    element.innerHTML = decodedText;
    if (needDecode){
      setTimeout(tse.animateDecode.bind(null, decodeBuffer), animationDelta);
    }
    else if (glitch) {
      decodeBuffer = tse.generateDecodeBuffer(element.innerHTML, maxGlitchRatio);
      setTimeout(tse.animateDecode.bind(null, decodeBuffer), Math.random()*glitchDeltaMax);
    }
  }
  tse.init(); // Start the effect
};


window.addEventListener('load', () => { 
    console.log("Loaded text-scramble-effect.js");
  elements = document.getElementsByClassName('text-scramble');
  for (element of elements) {
    textScrambleEffect(element);
  }
});

