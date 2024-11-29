const animation = lottie.loadAnimation({
  container: document.getElementById('first-animation-container'),
  path: './assets/firstScene.json',
  renderer: 'svg',
  loop: false,
  autoplay: true,
});
  
const FRAME_RANGES = {
  intro: [0, 170],
  introLoop: [170, 240],
  explanation: [240, 1120],
  questionLoop: [1120, 1170],
  rightAnswer: [1185, 1619],
  wrongAnswer: [1620, 1680],
  wrongAnswerExp: [1232, 1620],
  continue: [1690, 3090],
};
  

animation.addEventListener('DOMLoaded', () => {
  const svgElement = document.querySelector('#first-animation-container svg');
  const clickableLayer = svgElement.querySelector('[id="continue"]');

  animation.playSegments(FRAME_RANGES.intro, true);
  animation.addEventListener('complete', () => animation.playSegments(FRAME_RANGES.introLoop, true));

  if (clickableLayer) {
    clickableLayer.style.cursor = 'pointer';
    clickableLayer.addEventListener('click', () => {
      animation.playSegments(FRAME_RANGES.explanation, true);
      animation.addEventListener('complete', () => {
        animation.playSegments(FRAME_RANGES.questionLoop, true);
        firstQuestion();
      });
    });
  };
});
  
function firstQuestion() {

  const answers = {
    correctAns_B: 'letterB1',
    wrongAns_A: 'letterA1',
    wrongAns_C: 'letterC1',
  };

  const svgElement = document.querySelector('#first-animation-container svg');

  const correctLayer = svgElement.querySelector(`[id="${answers.correctAns_B}"]`);
  if (correctLayer){
    correctLayer.style.cursor = 'pointer';
    correctLayer.addEventListener('click', () =>  handleRightAnswer())
  };

  function handleRightAnswer(){
    animation.playSegments(FRAME_RANGES.rightAnswer, true);

    animation.addEventListener('complete', function playContinueAfterCorrect() {
      animation.removeEventListener('complete', playContinueAfterCorrect);
      animation.playSegments(FRAME_RANGES.continue, true);
    });
      animation.addEventListener('complete', function playSecondAfterContinue() {
        animation.removeEventListener('complete', playSecondAfterContinue);
        playSecondAnimation();
      });  
  };
  

  const wrongLayer = svgElement.querySelector(`[id="${answers.wrongAns_A}"]`);
  if (wrongLayer) {
    wrongLayer.style.cursor = 'pointer';
    wrongLayer.addEventListener('click', () => handleWrongAnswer());
  };

  const wrong2Layer = svgElement.querySelector(`[id="${answers.wrongAns_C}"]`);
  if (wrong2Layer) {
    wrong2Layer.style.cursor = 'pointer';
    wrong2Layer.addEventListener('click', () => handleWrongAnswer());
  };

  // function handleWrongAnswer(){
  //   animation.playSegments(FRAME_RANGES.wrongAnswer, true);

  //   animation.addEventListener('complete', function playExplanation() {
  //     animation.removeEventListener('complete', playExplanation);
  //     animation.playSegments(FRAME_RANGES.wrongAnswerExp, true);
    
  //     animation.addEventListener('complete', function playContinue() {
  //       animation.removeEventListener('complete', playContinue);
  //       animation.playSegments(FRAME_RANGES.continue, true);
      
  //       animation.addEventListener('complete', function playSecondAfterWrong() {
  //         animation.removeEventListener('complete', playSecondAfterWrong);
  //           playSecondAnimation();
  //       });
  //     });
  //   });   
  // };

  function handleWrongAnswer() {
    console.log("Playing wrongAnswer segment");
    animation.playSegments(FRAME_RANGES.wrongAnswer, true);
  
    animation.addEventListener('complete', function playExplanation() {
      animation.removeEventListener('complete', playExplanation);
      console.log("Playing wrongAnswerExp segment");
      animation.playSegments(FRAME_RANGES.wrongAnswerExp, true);
  
      animation.addEventListener('complete', function playContinue() {
        animation.removeEventListener('complete', playContinue);
        console.log("Playing continue segment");
        animation.playSegments(FRAME_RANGES.continue, true);
  
        animation.addEventListener('complete', function playSecondAfterWrong() {
          animation.removeEventListener('complete', playSecondAfterWrong);
          console.log("Transitioning to second animation");
          playSecondAnimation();
        });
      });
    });
  }
  

};
  
const secondAnimation = lottie.loadAnimation({
  container: document.getElementById('second-animation-container'),
  path: './assets/secondScene.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
});

function playSecondAnimation() {
  
  animation.stop();

  document.getElementById('first-animation-container').style.display = 'none';
  document.getElementById('second-animation-container').style.display = 'block';

  secondAnimation.play();
};
