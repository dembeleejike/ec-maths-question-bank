console.log('Hello World!');
let score = {
 correct: 0,
 incorrect: 0
};



/*  {
    question: 'What is my name?',
    options: ['Dembele', 'Desmond', 'Emmanuel', 'Eugene'],
    answer: 'Dembele',
    answered: false
  },
  {
    question: 'What level am I?',
    options: ['100L', '200L', '300L', '400L'],
    answer: '100L',
    answered: false
  },
  {
   question: 'Which State am I from?',
    options: ['Anambra','Imo', 'Abia', 'Enugu'],
    answer: 'Anambra',
    answered: false
  }
  */
  let List = [
  {question: 'Simplify (1/(2 - 3i)) * (1/(1 + i))',
  options: [
    '(5i + 1)/26',
    '(5 + i)/26',
    '(5 - i)/26',
    '(5i - 1)/26'
  ],
  answer: '(5 + i)/26',
  answered: false
}

];


let currentQuestion = 0;
let general = document.querySelector('.overallContent');

const questionParagraph = document.querySelector('.Js-question');
const questionInput = document.querySelector('.Js-inputs');


function loadQuestion() {
  questionInput.innerHTML = '';

  const current = List[currentQuestion];
  questionParagraph.textContent = current.question;

  current.options.forEach(option => {
    const label = document.createElement('label');
    label.classList.add('inputLabel');

    const input = document.createElement('input');
    input.classList.add('setup');
    input.type = 'radio';
    input.name = 'answer';
    input.value = option;
    input.classList.add('radioInputs');

    label.append(input, option);
    questionInput.append(label, document.createElement('br'));
  });

  const mainDiv = document.createElement('div');
  mainDiv.classList.add('container');

  const checkBtn = document.createElement('button');
  checkBtn.classList.add('leftButton')
  checkBtn.textContent = 'Check';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('rightButton')
  nextBtn.textContent = 'Next';
  nextBtn.disabled = true;

checkBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  nextBtn.disabled = false;

  if (!selected) {
    alert('Select an option first');
    return;
  }

  // 🔒 STOP double scoring
  if (List[currentQuestion].answered) {
    return;
  }

  if (selected.value === List[currentQuestion].answer) { 
    
    alert('Bravo👏🏿');
    signal(currentQuestion);
    
    
    score.correct++;
    saveProgress();
    console.log(score);
    console.log(selected);
  } else {
    
    alert('Wrong ❌ ')
    signal(currentQuestion);
saveProgress();

/*
if (selected.value === List[currentQuestion].answer) {
  score.correct++;
  alert('Bravo👏🏿');
  
} else {
  score.incorrect++;
  alert('Wrong ❌');
}*/

    score.incorrect++;
    console.log(score);
  }

  // mark as answered
  List[currentQuestion].answered = true;

  // optional UX improvement
  document.querySelectorAll('input[name="answer"]').forEach(input => {
    input.disabled = true;
  });
});
  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < List.length) {
      loadQuestion();
      saveProgress();
    } else {
      questionParagraph.textContent = 'Quiz completed 🎉';
      result();
      localStorage.removeItem('quizProgress');
      
      questionInput.innerHTML = '';
    }
  });

  mainDiv.append(checkBtn, nextBtn);
  questionInput.append(mainDiv);
  
}

function saveProgress() {
  
  const progress = {
    currentQuestion,
    score,
    List
  };

  localStorage.setItem('quizProgress', JSON.stringify(progress));
}
const savedProgress = localStorage.getItem('quizProgress');

  


if (savedProgress) {
  const progress = JSON.parse(savedProgress);

  currentQuestion = progress.currentQuestion;
  score = progress.score;
  List = progress.List;
  alert('Welcome back 👋 Continue your quiz');
}





loadQuestion();

const toggleBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const theme = document.body.classList.contains("light")
    ? "light"
    : "dark";

  localStorage.setItem("theme", theme);
  toggleBtn.textContent = theme === "light" ? "☀️" : "🌙";
});
/*function signal() {
  const selected = document.querySelector('input[name="answer"]:checked');

  // highlight correct answer
  const correctInput = Array.from(document.querySelectorAll('input[name="answer"]'))
    .find(input => input.value === List[currentQuestion].answer);

  if (correctInput) {
   
    
    correctInput.parentElement.style.backgroundColor = 'green';
  }

  // highlight wrong selection if user picked incorrectly
  if (selected && selected.value !== List[currentQuestion].answer) {
    selected.parentElement.style.backgroundColor = 'red';
  }

  console.log(selected);
}
*/
function signal(questionIndex) {
  const selected = document.querySelector('input[name="answer"]:checked');

  const correctInput = Array.from(
    document.querySelectorAll('input[name="answer"]')
  ).find(input =>
    input.value === List[questionIndex].answer
  );

  if (correctInput) {
    correctInput.parentElement.style.backgroundColor = 'green';
  }

  if (selected && selected.value !== List[questionIndex].answer) {
    selected.parentElement.style.backgroundColor = 'red';
  }
}
function result(){
  let winScore = document.querySelector('.js-score');
  let looseScore = document.querySelector('.js-loss');
  
  winScore.innerHTML = `correct: ${score.correct}`;
  looseScore.innerHTML = `Incorrect: ${score.incorrect}`;
}

List.push(
{
  question: 'Find the set solution to the inequality 2x + 4 < x + 3 < 4x - 5',
  options: [
    '{x: x < -1 U x > 2/3}',
    '{x: x > -1 U x < 2/3}',
    '{x: -1 < x < 2/3}',
    '{x: -1 > x > 2/3}'
  ],
  answer: '{x: x < -1 U x > 2/3}',
  answered: false
},
{
  question: 'Find the solution set of the inequality 3x - 2 < x + 1 ≤ 2x + 3',
  options: [
    '2 ≤ x < -3/2',
    '-2 < x ≤ -3/2',
    '2 < x ≤ -3/2',
    '-2 ≤ x < -3/2'
  ],
  answer: '-2 < x ≤ -3/2',
  answered: false
},
{
  question: 'Solve the inequality x² + x - 6 > 0',
  options: [
    '{x: -3 < x < 2}',
    '{x: x < -3} U {x: x > 2}',
    '{x: -2 < x < 3}',
    '{x: x < -3} U {x: x > 2}'
  ],
  answer: '{x: x < -3} U {x: x > 2}',
  answered: false
},
{
  question: 'Solve the inequality x² + 3x - 4 ≤ 0',
  options: [
    '{x: -3 ≤ x ≤ 1}',
    '{x: -4 ≤ x ≤ 1}',
    '{x: 4 ≤ x ≤ 1}',
    '{x: -4 ≤ x ≤ -1}'
  ],
  answer: '{x: -4 ≤ x ≤ 1}',
  answered: false
},
{
  question: 'Find the range of values of x for which 2x² + 7x - 15 > 0',
  options: [
    '{x: x < -5 or x > 3/2}',
    '{x: x < 5 or x > -3/2}',
    '{x: x < -5 or x > 3/2}',
    '{x: x < -5 or x > 3/2}'
  ],
  answer: '{x: x < -5 or x > 3/2}',
  answered: false
},
{
  question: 'Solve x² - 2x - 8 > 0',
  options: [
    '{x: x < 2 or x > 4}',
    '{x: x < -2 or x > -4}',
    '{x: x < -2 or x > 4}',
    '{x: x < 2 or x > -4}'
  ],
  answer: '{x: x < -2 or x > 4}',
  answered: false
},
{
  question: 'Solve x² - 4 ≥ 0',
  options: [
    '{x: x < 0 or x > 2}',
    '{x: x < -2 or x > 2}',
    '{x: 0 < x < 2}',
    '{x: -2 < x < 2}'
  ],
  answer: '{x: x < -2 or x > 2}',
  answered: false
},
{
  question: 'Solve the inequality 3x² + 10x - 8 < 0',
  options: [
    '{x: -4 < x < 2/3}',
    '{x: -2 < x < 2/3}',
    '{x: -2 < x < 4/3}',
    '{x: -4 < x < 2/3}'
  ],
  answer: '{x: -4 < x < 2/3}',
  answered: false
},
{
  question: 'Find the range of values for which 1/(x-3) > 1',
  options: [
    '{x: -3 < x < -4}',
    '{x: 3 < x < 4}',
    '{x: 3 < x < -4}',
    '{x: -3 < x < 4}'
  ],
  answer: '{x: 3 < x < 4}',
  answered: false
},
{
  question: 'Solve the inequality x² - x - 10 < 2',
  options: [
    '{x: -3 < x < 4}',
    '{x: -3 < x < -4}',
    '{x: -3 < x < -4}',
    '{x: 3 < x < 4}'
  ],
  answer: '{x: -3 < x < 4}',
  answered: false
},
{
  question: 'If Z = cosθ + i sinθ, find the value of (Z + 1/Z)²',
  options: [
    '2 cosθ',
    '2 i sinθ',
    '4 cos²θ',
    '-4 sin²θ'
  ],
  answer: '4 cos²θ',
  answered: false
},
{
  question: 'Find the real part of (2 + 3i) / (3 + 2i)',
  options: [
    '12/13',
    '-5/13',
    '5/13',
    '-12/13'
  ],
  answer: '12/13',
  answered: false
},
{
  question: 'Evaluate (i + 3) – (2 – 3i) + (1 + 2i) – (2i + 1)',
  options: [
    '1 + 4i',
    '1 – 4i',
    '4 – i',
    '4 + i'
  ],
  answer: '1 + 4i',
  answered: false
},
{
  question: 'Simplify (3i - 2) / (1 + 2i)',
  options: [
    '(4 + 7i)/5',
    '(4 - 7i)/25',
    '(4 - 7i)/5',
    '(4 + 7i)/25'
  ],
  answer: '(4 - 7i)/5',
  answered: false
},
{
  question: 'Find the modulus of 1 - i√3',
  options: [
    '√10',
    '4',
    '√5',
    '2'
  ],
  answer: '2',
  answered: false
},
{
  question: 'Find the modulus and argument of i - 1',
  options: [
    '√2, -45°',
    '√2, 45°',
    '√2, 135°',
    '2, -45°'
  ],
  answer: '√2, -45°',
  answered: false
},
{
  question: 'Simplify (-1 + 3i) / (2 - i)',
  options: [
    '5 - 5i',
    '5i - 5',
    '1 - i',
    'i - 1'
  ],
  answer: '1 - i',
  answered: false
},
{
  question: 'Polar complex number 4∠π is equal to',
  options: [
    '-4i',
    '4i',
    '-4',
    '4'
  ],
  answer: '-4',
  answered: false
},
{
  question: 'Solve the quadratic equation x² - 4x = 8',
  options: [
    '4i',
    '2i',
    '2 + 2i',
    '2i - 2'
  ],
  answer: '2 + 2i',
  answered: false
},

{
  question: 'Determine the modulus and argument of 2 + 4i.',
  options: [
    '2√5, 63.43°',
    '2√10, 63.43°',
    '2√5, 26.57°',
    '2√10, 26.57°'
  ],
  answer: '2√20, 63.43°', // Actually √(2²+4²)=√20=2√5, argument=63.43°
  answered: false
},
{
  question: 'Simplify i⁹ + 2i¹¹ + i¹³.',
  options: [
    '-4',
    '-1',
    '1',
    '0'
  ],
  answer: '-4',
  answered: false
},
{
  question: 'Evaluate (1-j)/(1+j).',
  options: [
    '-j',
    'j',
    '1',
    '-1'
  ],
  answer: '-j',
  answered: false
},
{
  question: 'Find arg(Z) if Z = i - 1.',
  options: [
    'π/2',
    '3π/4',
    '4π/3',
    '-3π/4'
  ],
  answer: '-3π/4',
  answered: false
},
{
  question: 'Given (1 + 2i)(-2 - 3i) = a + bi. Find a + b.',
  options: [
    '-3',
    '3',
    '-4',
    '4'
  ],
  answer: '-3',
  answered: false
},
{
  question: 'Simplify (i - 1)⁴.',
  options: [
    '-4i',
    '-4',
    '4i',
    '4'
  ],
  answer: '-4',
  answered: false
},
{
  question: 'The product of a complex number and its conjugate results in a ______ number.',
  options: [
    'Real',
    'Imaginary',
    'Complex',
    'Natural'
  ],
  answer: 'Real',
  answered: false
},
{
  question: 'If Z₁ = 1 + 2i and Z₂ = 4 - 3i, what is |Z₂ - Z₁|?',
  options: [
    '√34',
    '√16',
    '2√5',
    '4'
  ],
  answer: '√34',
  answered: false
},
{
  question: 'Evaluate -4 / i⁹.',
  options: [
    '-4',
    '4',
    '-4i',
    '4i'
  ],
  answer: '4i',
  answered: false
},
{
  question: 'Evaluate -1 / i⁷.',
  options: [
    '-i',
    'i',
    '1',
    '-1'
  ],
  answer: '-i',
  answered: false
},
{
  question: 'Evaluate 2 / (1 + i)⁴.',
  options: [
    '-2',
    '2',
    '-1/2',
    '1/2'
  ],
  answer: '-1/2',
  answered: false
},
{
  question: '______ numbers range from -∞ to +∞.',
  options: [
    'Real',
    'Integer',
    'Complex',
    'Natural'
  ],
  answer: 'Real',
  answered: false
},
{
  question: 'Find the solution of x² + 2x = -5.',
  options: [
    '-1 ± 2i',
    '1 ± 2i',
    '-2 ± i',
    '2 ± i'
  ],
  answer: '-1 ± 2i',
  answered: false
},
{
  question: 'Simplify i³(1 + i) + i⁵(3 - i) + i⁷(2 + i).',
  options: [
    '0',
    '2',
    '3',
    '4'
  ],
  answer: '0',
  answered: false
}

);