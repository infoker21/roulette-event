'use strict';

let wheel_spinning = false;
let roulette = new Winwheel({
  //휠 객체 생성
  numSegments: 8,
  outerRadius: 200, // 캔버스 영억 반지름
  textFontSize: 18,
  responsive: true,
  lineWidth: 0,
  drawMode: 'code',
  segments: [
    {
      fillStyle: '#1c3381',
      text: '100만원',
      textFillStyle: '#fff',
      strokeStyle: 'transparent'
    },
    {
      fillStyle: '#1b88e7',
      text: '10만원',
      textFillStyle: '#fff',
      strokeStyle: 'transparent'
    },
    {
      fillStyle: '#1c3381',
      text: '100만원',
      textFillStyle: '#fff',
      strokeStyle: 'transparent'
    },
    {
      fillStyle: '#1b88e7',
      text: '10만원',
      textFillStyle: '#fff',
      strokeStyle: 'transparent'
    },
    {
      fillStyle: '#1c3381',
      text: '100만원',
      textFillStyle: '#fff',
      strokeStyle: 'transparent'
    },
    {
      fillStyle: '#1b88e7',
      text: '10만원',
      textFillStyle: '#fff',
      strokeStyle: 'transparent'
    },
    {
      fillStyle: '#1c3381',
      text: '100만원',
      textFillStyle: '#fff',
      strokeStyle: 'transparent'
    },
    {
      fillStyle: '#666',
      text: '꽝',
      textFillStyle: '#fff',
      strokeStyle: 'transparent'
    },
  ],
  animation: {
    type: 'spinToStop',
    duration: 1,
    spins: 4,
    easing: 'Power0.easeOut',
    stopAngle: null,
    direction: 'clockwise',
    repeat: -1,
    yoyo: false,
    callbackFinished: alertPrize,
  },
});

let btn = document.querySelector('.roulette-btn button');
btn.addEventListener('click', (e) => {
  // 버튼 클릭 이벤트
  const TARGET = e.currentTarget;

  if (!TARGET.classList.contains('start')) {
    // Roulette 시작
    roulette.startAnimation();
    TARGET.innerText = 'STOP!';
    TARGET.classList.add('start');

  } else {
    
    // Roulette 멈춤
    if (wheel_spinning === true) {
      return false;
    }

    TARGET.classList.add('stop');

    
    wheel_spinning = true;

    roulette.animation.repeat = 0;
    roulette.animation.easing = 'Power3.easeOut';
    roulette.animation.duration = 3;
    roulette.animation.spins = 8;

    calculatePrize();
    roulette.startAnimation();

    TARGET.innerText = 'WAIT..';
  }
});

function calculatePrize() {
  // 회전하기 전에 stopAngle을 미리 정하는 함수 (조작)

  const RANDOM_NUMBER = Math.floor(Math.random() * 10000) + 1; // 1부터 100 사이의 랜덤한 수를 출력

  console.log(RANDOM_NUMBER);
  
  let stop_angle = 0;
  let segment_angle = 360 / parseInt(roulette.numSegments);

  if (RANDOM_NUMBER === 1) {
    stop_angle = Math.floor(Math.random() * (segment_angle - 10));
  } else if (RANDOM_NUMBER === 2) {
    stop_angle = segment_angle + 5 + Math.floor(Math.random() * (segment_angle - 10));
  } else if (RANDOM_NUMBER === 3) {
    stop_angle = segment_angle * 2 + 5 + Math.floor(Math.random() * (segment_angle - 10));
  } else if (RANDOM_NUMBER === 4) {
    stop_angle = segment_angle * 3 + 5 + Math.floor(Math.random() * (segment_angle - 10));
  } else if (RANDOM_NUMBER === 5) {
    stop_angle = segment_angle * 4 + 5 + Math.floor(Math.random() * (segment_angle - 10));
  } else if (RANDOM_NUMBER === 6) {
    stop_angle = segment_angle * 5 + 5 + Math.floor(Math.random() * (segment_angle - 10));
  } else if (RANDOM_NUMBER === 7) {
    stop_angle = segment_angle * 6 + 5 + Math.floor(Math.random() * (segment_angle - 10));
  } else {
    stop_angle = segment_angle * 7 + 5 + Math.floor(Math.random() * (segment_angle - 10));
  }

  roulette.animation.stopAngle = stop_angle; // 애니메이션이 회전 되기 전에 stopAngle 값을 지정
  roulette.startAnimation();
}

function resetWheel() {
  // Roulette reset

  roulette.stopAnimation(false); // 콜백 기능이 작동하지 않도록 매개 변수처럼 false인 애니메이션을 중지

  roulette.rotationAngle = 0;
  roulette.draw();
  roulette.animation.repeat = -1;
  roulette.animation.easing = 'Power0.easeOut';
  roulette.animation.duration = 1;
  roulette.animation.spins = 4;

  btn.innerText = 'START!';
  btn.classList.remove('start', 'stop');

  wheel_spinning = false; // wheel_spinning initial
}

// -----------------------------------------------
// 애니메이션 종료 후 호출되는 함수
// -----------------------------------------------
function alertPrize(indicatedSegment) {
  if (indicatedSegment.text === '꽝') {
    alert(`${indicatedSegment.text} 다음기회에!`);
  } else {
    alert(`축하합니다 ${indicatedSegment.text} 당첨되었습니다!`);
  }

  resetWheel();
}
