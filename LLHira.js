const question = document.getElementById('question');
const answer = document.getElementById('answer');
const next = document.querySelector('.next');
const button = document.getElementById('displayBtn');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const h1 = document.querySelector('h1');
const links = document.getElementById('links');
const startBtn = document.getElementById('startBtn');
const h3 = document.querySelector('h3');
const par = document.querySelector('p');
const midMenu = document.getElementById('mid-menu');
const modal = document.getElementById('myModal');
const items = document.querySelectorAll('a');
const nextBtn = document.getElementById('nxtBtn');
const showBtn = document.getElementById('showBtn');
const replayBtn = document.getElementById('replayBtn');
const resetBtn = document.getElementById('resetBtn');
let i = 0;
let array = [];
const card = document.getElementsByClassName('card');
const numOfQuestions = document.querySelector("#num-questions");
const category = document.getElementById("category");
let time = 30;
let timer;
const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");
const timePerQuestion = document.querySelector("#timer");
const startScreen = document.querySelector(".start-screen");
const quizScreen = document.querySelector(".quiz");
let timeValue = timePerQuestion.value;
const topBar = document.querySelector('#topBar');
let num;
const totalQuestions = document.querySelector(".questionTotal");
let countQuestion = 0;
let questionIndex = 1;
const error = document.querySelector(".errorMsg");



//get input from selection
function getValue() {
  let numValue = numOfQuestions.value;
  let catValue = category.value;

// get number of questions
// get which array to add
// shuffle array
// fill array with only the number wanted

  switch(numValue) {
    case "10":
    num = 10;
    break
    case "25":
    num = 25;
    break
    case "50":
    num = 50;
    break
    case "100":
    num = 100;
    break
    case "all":
    num = array.length;
    break
  }

  switch(catValue) {
    case "hiragana":
      if (num != array.length) {
      addItems(hiragana,num);
    } else {
      array.push(...hiragana);
    }
    break
    case "katakana":
    if (num != array.length) {
      addItems(katakana,num);
    } else {
      array.push(...katakana);
    }
    break
    case "coreStarter":
    if (num != array.length) {
      addItems(coreStarter,num);
    } else {
      array.push(...coreStarter);
    }
  }
} //end of get value function

function startQuiz(){
  getValue();
  getRandomElement(array);
  console.log(array);
  question.textContent = array[i].question;
  answer.textContent = array[i].answer;
  question.style.visibility = "visible";
  startScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  startBtn.classList.add("hide");
  showBtn.classList.remove("hide");
  resetBtn.classList.remove("hide");
  trackQuestions(questionIndex);
  startTimer();
}

//progress bar
function progress(value) {
 const percentage = (value / time) * 100;
progressBar.style.width = `${percentage}%`;
progressText.innerHTML = `${value}`;
}

function setTimer(time){
  timer = setInterval(() => {
    if(timer >= 0) {
    progress(time);
    time--;
  }
  if (time <= -1){clearInterval(timer);}
  } ,500);
}

function addItems(arr, num){
  let showError = error.classList.remove("hide");
  if( arr.length < num) {
    showError;
  } else {
    array.push(...arr)
    array.length = num;
  }
}

function startTimer() {
  setTimeout(() => {
    time = timePerQuestion.value;
    setTimer(time);
    if (time == "none") {
      topBar.classList.add("hide")
    }
  },1000);
}

function stopTimer(){
  clearInterval(timer);
}

function reset() {
  i=0;
  countQuestion = 0;
  questionIndex = 1;
  array = [];
  nextBtn.classList.add("hide");
  showBtn.classList.add("hide");
  startBtn.classList.remove("hide");
  startScreen.classList.remove("hide");
  quizScreen.classList.add("hide");
  question.textContent = '';
  answer.textContent = '';
  answer.style.visibility = "hidden";
  resetBtn.classList.add("hide");
  replayBtn.classList.add("hide");
  error.classList.add("hide");
}

function replay(){
  getRandomElement(array);
  console.log(array);
  i=0;
  countQuestion = 0;
  questionIndex = 1;
  showBtn.classList.remove("hide");
  nextBtn.classList.add("hide");
  replayBtn.classList.add("hide");
  question.textContent = array[i].question;
  answer.textContent = array[i].answer;
  question.style.visibility = "visible";
  totalQuestions.classList.remove("hide");
  trackQuestions(questionIndex);
}

function play() {
  stopTimer();
  showAnswer();
  i++;
  showBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
}

function showAnswer() {
  answer.style.visibility = "visible";
  showBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
}

function nextItem() {
  if (i == array.length - 1 ) {
    nextBtn.classList.add("hide");
    showBtn.classList.add("hide");
    replayBtn.classList.remove("hide");
    question.style.visibility = "hidden";
    answer.style.visibility = "hidden";
    totalQuestions.classList.add("hide");
  } else {
    i++;
    answer.style.visibility = "hidden";
    nextBtn.classList.add("hide");
    showBtn.classList.remove("hide");
    question.textContent = array[i].question;
    answer.textContent = array[i].answer;
    runTracker();
    startTimer();
  }
}

function test() {
  getRandomElement(array);
  console.log(array);
  span.textContent = array[i];
  array.shift()
  // i++;
}

function getRandomElement(list){
  return list.sort(() => Math.random() - .5);
}

function trackQuestions(index) {
  totalQuestions.textContent = `${questionIndex} of ${array.length}`;
}

function showNextNumber() {
  if(countQuestion < array.length - 1) {
    countQuestion++;
    questionIndex++;
  }
}

function runTracker() {
  showNextNumber();
  trackQuestions(countQuestion);
}

document.addEventListener("keypress", (e)=> {
  if (e.code == "Space"){
    e.preventDefault();
   showBtn.click();
 } else if (answer.style.visibility = "visible"){
e.preventDefault();
   nextBtn.click();
 }
});

startBtn.addEventListener("click", startQuiz);
showBtn.addEventListener("click", showAnswer);
nextBtn.addEventListener("click", nextItem);
replayBtn.addEventListener("click", replay);
resetBtn.addEventListener('click', reset);


const hiragana = [
  {question: "あ", answer: "a"},
  {question: "い", answer: "i"},
  {question: "う", answer: "u"},
  {question: "え", answer: "e"},
  {question: "お", answer: "o"},
  {question: "か", answer: "ka"},
  {question: "き", answer: "ki"},
  {question: "く", answer: "ku"},
  {question: "け", answer: "ke"},
  {question: "こ", answer: "ko"},
  {question: "さ", answer: "sa"},
  {question: "し", answer: "shi"},
  {question: "す", answer: "su"},
  {question: "せ", answer: "se"},
  {question: "そ", answer: "so"},
  {question: "た", answer: "ta"},
  {question: "ち", answer: "chi"},
  {question: "つ", answer: "tsu"},
  {question: "て", answer: "te"},
  {question: "と", answer: "to"},
  {question: "な", answer: "na"},
  {question: "に", answer: "ni"},
  {question: "ぬ", answer: "nu"},
  {question: "ね", answer: "ne"},
  {question: "の", answer: "no"},
  {question: "は", answer: "ha"},
  {question: "ひ", answer: "hi"},
  {question: "ふ", answer: "fu"},
  {question: "へ", answer: "he"},
  {question: "ほ", answer: "ho"},
  {question: "ま", answer: "ma"},
  {question: "み", answer: "mi"},
  {question: "む", answer: "mu"},
  {question: "め", answer: "me"},
  {question: "も", answer: "mo"},
  {question: "や", answer: "ya"},
  {question: "ゆ", answer: "yu"},
  {question: "よ", answer: "yo"},
  {question: "ら", answer: "ra"},
  {question: "り", answer: "ri"},
  {question: "る", answer: "ru"},
  {question: "れ", answer: "re"},
  {question: "ろ", answer: "ro"},
  {question: "わ", answer: "wa"},
  {question: "を", answer: "wo"},
  {question: "ん", answer: "n"}
];
const katakana = [
  {question: "ア", answer: "a"},
  {question: "イ", answer: "i"},
  {question: "ウ", answer: "u"},
  {question: "エ", answer: "e"},
  {question: "オ", answer: "o"},
  {question: "カ", answer: "ka"},
  {question: "キ", answer: "ki"},
  {question: "ク", answer: "ku"},
  {question: "ケ", answer: "ke"},
  {question: "コ", answer: "ko"},
  {question: "サ", answer: "sa"},
  {question: "シ", answer: "shi"},
  {question: "ス", answer: "su"},
  {question: "セ", answer: "se"},
  {question: "ソ", answer: "so"},
  {question: "タ", answer: "ta"},
  {question: "チ", answer: "chi"},
  {question: "ツ", answer: "tsu"},
  {question: "テ", answer: "te"},
  {question: "ト", answer: "to"},
  {question: "ナ", answer: "na"},
  {question: "ニ", answer: "ni"},
  {question: "ヌ", answer: "nu"},
  {question: "ネ", answer: "ne"},
  {question: "ノ", answer: "no"},
  {question: "ハ", answer: "ha"},
  {question: "ヒ", answer: "hi"},
  {question: "フ", answer: "fu"},
  {question: "ヘ", answer: "he"},
  {question: "ホ", answer: "ho"},
  {question: "マ", answer: "ma"},
  {question: "ミ", answer: "mi"},
  {question: "ム", answer: "mu"},
  {question: "メ", answer: "me"},
  {question: "モ", answer: "mo"},
  {question: "ヤ", answer: "ya"},
  {question: "ユ", answer: "yu"},
  {question: "ヨ", answer: "yo"},
  {question: "ラ", answer: "ra"},
  {question: "リ", answer: "ri"},
  {question: "ル", answer: "ru"},
  {question: "レ", answer: "re"},
  {question: "ロ", answer: "ro"},
  {question: "ワ", answer: "wa"},
  {question: "ヲ", answer: "wo"},
  {question: "ン ", answer: "n"}
];
const coreStarter = [
  {question: "こわい", answer: "kowai (scary)"},
  {question: "だいじょうぶ", answer: "daijoubu (it's okay)"},
  {question: "でも", answer: "demo (but)"},
  {question: "いく", answer: "iku (go)"},
  {question: "いくぞ", answer: "ikuzo (let's go)"},
  {question: "まって", answer: "matte (wait)"},
  {question: "だめ", answer: "dame (no)"},
  {question: "うれしい", answer: "ureshii (happy)"},
  {question: "かなしい", answer: "kanashii (sad)"},
  {question: "ありがとう", answer: "arigatou (thank you)"},
  {question: "くる", answer: "kuru (to come)"},
  {question: "みる", answer: "miru (to see)"},
  {question: "きく", answer: "kiku (to hear/ask)"},
  {question: "いう", answer: "iu (to say)"},
  {question: "たつ", answer: "tatsu (to stand)"},
  {question: "すわる", answer: "suwaru (to sit)"},
  {question: "ある", answer: "aru (there is:thing) "},
  {question: "いる", answer: "iru (there is: person)"},
  {question: "かえる", answer: "kaeru (to return)"},
  {question: "いたい", answer: "itai (hurts)"},
  {question: "つよい", answer: "tsuyoi (strong)"},
  {question: "よわい", answer: "yowai (weak)"},
  {question: "ねむい", answer: "nemui (sleepy)"},
  {question: "ひどい", answer: "hidoi (terrible)"},
  {question: "たいへん", answer: "taihen (serious)"},
  {question: "しずか", answer: "shizuka (quiet)"},
  {question: "だいじ", answer: "daiji (important)"},
  {question: "へいき", answer: "heiki (fine/okay)"},
  {question: "ひと", answer: "hito (person)"},
  {question: "こども", answer: "kodomo (child)"},
  {question: "みんな", answer: "minna (everyone)"},
  {question: "だれ", answer: "dare (who)"},
  {question: "どこ", answer: "doko (where)"},
  {question: "ここ", answer: "koko (here)"},
  {question: "そこ", answer: "soko (there)"},
  {question: "いえ", answer: "ie (house)"},
  {question: "やま", answer: "yama (mountain)"},
  {question: "みち", answer: "michi (road)"}
];
