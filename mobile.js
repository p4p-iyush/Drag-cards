let highestZ = 1;

function initPaper(paper) {
  let holdingPaper = false;
  let rotating = false;
  let touchStartX = 0, touchStartY = 0;
  let prevTouchX = 0, prevTouchY = 0;
  let currentPaperX = 0, currentPaperY = 0;
  let velX = 0, velY = 0;
  let rotation = Math.random() * 30 - 15;

  paper.addEventListener('touchstart', (e) => {
    if (holdingPaper) return;
    holdingPaper = true;
    paper.style.zIndex = highestZ++;

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    prevTouchX = touchStartX;
    prevTouchY = touchStartY;
  });

  paper.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;

    if (!rotating) {
      velX = touchMoveX - prevTouchX;
      velY = touchMoveY - prevTouchY;

      currentPaperX += velX;
      currentPaperY += velY;

      paper.style.transform = `translateX(${currentPaperX}px) translateY(${currentPaperY}px) rotateZ(${rotation}deg)`;

      prevTouchX = touchMoveX;
      prevTouchY = touchMoveY;
    }
  });

  paper.addEventListener('touchend', () => {
    holdingPaper = false;
    rotating = false;
  });

  paper.addEventListener('gesturestart', (e) => {
    e.preventDefault();
    rotating = true;
  });

  paper.addEventListener('gestureend', () => {
    rotating = false;
  });
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(initPaper);
