//////////////////////////////////
/////////global variables/////////
//////////////////////////////////
const startButton = document.getElementById("start-button");
const counter = document.getElementById('counters')
const resetDiv = document.getElementById("reset-div");
const questDiv = document.querySelector('.questions')
const correctCounter = document.getElementById('correct-counter');
const incorrectCounter = document.getElementById('incorrect-counter');
const diffDrop = document.getElementById('diff-dropdown');
const numOfQuestDrop = document.getElementById('qType-dropdown');
let difficulty;
let numOfQuestions;



//////////////////////////////////
//////when page first loaded//////
//////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners()
    resetEvent()
})


//////////////////////////////////
//////////fetch questions/////////
//////////////////////////////////
function fetchQuestions() {
    if (!numOfQuestions || !difficulty) {
        return
    }
    startButton.classList.add('is-loading');
    counter.classList.remove('is-hidden');
    resetDiv.classList.remove('is-hidden');
    resetQuestions()
    const url = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=21&difficulty=${difficulty}&type=multiple`
    fetch(url)
        .then(resp => resp.json())
        .then(data => renderQuestions(data.results))
        .catch(error => console.error(error))
}


//////////////////////////////////
////create & display questions////
//////////////////////////////////
function renderQuestions(questions) {
    questions.forEach(result => renderQuestion(result))
    startButton.classList.remove('is-loading');
}



function renderQuestion(data) {
    const div = document.createElement('div');
    const question = data.question;
    const correctAnswer = data.correct_answer;
    const incorrectAnswers = data.incorrect_answers;
    const allAnswers = shuffle([...incorrectAnswers, correctAnswer]);
    console.log(allAnswers, correctAnswer)
    div.setAttribute('class', 'block');
    div.innerHTML = `
        <div class='block'>
            <div class="content is-large">
                <div class="tile is-child notification is-info">
                    <p>${question}</p>
                    <ul>
                    ${renderAnswers(allAnswers)}
                    </ul>
                </div>
            </div>
        </div>
                    `;

    questDiv.appendChild(div)
    div.addEventListener('click', (e) => checkAnswer(e, div, correctAnswer))
}



//////////////////////////////////
////correct & incorrect answers///
//////////////////////////////////
function checkAnswer(e, div, correctAnswer) {
    if (e.target.className === 'answer' && div.className !== 'selected block') {
        div.className = 'selected block'
        if (e.target.innerText === correctAnswer) {
            e.target.style.color = 'green';
            correctCounter.innerText++
        } else {
            e.target.style.color = 'red';
            incorrectCounter.innerText++
        }
    }
}




//////////////////////////////////
/////create a list of answers/////
//////////////////////////////////
function renderAnswers(answers) {
    return answers.map(answer => `<div class='block'><li class='answer'><i class="fab fa-diaspora"></i>${answer}</li></div>`).join('');
}




//////////////////////////////////
////////dropdown section//////////
//////////////////////////////////
function attachEventListeners() {
    
    diffDrop.addEventListener('change', (e) => {
        difficulty = e.target.value
    })
    numOfQuestDrop.addEventListener('change', (e) => {
        numOfQuestions = e.target.value
    })
    startButton.addEventListener('click', () => {
        fetchQuestions()
    })
}






//////////////////////////////
/////////reset button/////////
//////////////////////////////
function resetEvent() {
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => reset())
}



function reset() {
    counter.classList.add('is-hidden');
    resetDiv.classList.add('is-hidden');
    diffDrop.selectedIndex = 0;
    numOfQuestDrop.selectedIndex = 0;
    difficulty, numOfQuestions = undefined
    resetQuestions()
}




///////////////////////////////////////
///reset the questions and counters////
///////////////////////////////////////
function resetQuestions() {
    questDiv.innerHTML = '';
    correctCounter.innerHTML = 0;
    incorrectCounter.innerHTML = 0;
}


//////////////////////////////////
//////////shuffle answers/////////
//////////////////////////////////
function shuffle(incorrectAnswers) {
    let currentIndex = incorrectAnswers.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = incorrectAnswers[currentIndex];
        incorrectAnswers[currentIndex] = incorrectAnswers[randomIndex];
        incorrectAnswers[randomIndex] = temporaryValue;
    }

    return incorrectAnswers;
}
/////*credit to Fisher-Yates from stackOverflow









