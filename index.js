//////////////////////////////////
//////when page first loaded//////
//////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    attachEventListeners()
})


//////////////////////////////////
//////////fetch questions/////////
//////////////////////////////////
let difficulty;
let numOfQuestions;
function fetchQuestions() {
    fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=21&difficulty=${difficulty}&type=multiple`)
        .then(resp => resp.json())
        .then(data => renderQuestions(data.results))
        .catch(error => console.error(error))
}


//////////////////////////////////
////create & display questions////
//////////////////////////////////
function renderQuestions(questions) {
    questions.forEach(result => renderQuestion(result))
}



function renderQuestion(data) {
    const div = document.createElement('div');
    const questDiv = document.querySelector('.questions')
    const question = data.question;
    const correctAnswer = data.correct_answer;
    const incorrectAnswers = data.incorrect_answers;
    const allAnswers = shuffle([...incorrectAnswers, correctAnswer]);
    console.log(allAnswers, correctAnswer)
    div.setAttribute('class', 'card');
    div.innerHTML = `
            <div class="content is-large">
                <div class="tile is-child notification is-info">
                    <p>${question}</p>
                    <ul>
                    ${renderAnswers(allAnswers)}
                    </ul>
                </div>
            </div>
        `
    questDiv.appendChild(div)
    div.addEventListener('click', (e) => checkAnswer(e, div, correctAnswer))
}



//////////////////////////////////
////correct & incorrect answers///
//////////////////////////////////
function checkAnswer(e, div, correctAnswer) {
    if (e.target.className === 'answer' && div.className !== "selected") {
       div.className = 'selected'
       if (e.target.innerText === correctAnswer) {
           e.target.style.color = 'green';
       } else {
            e.target.style.color = 'red';
       }
    }
}




//////////////////////////////////
/////create a list of answers/////
//////////////////////////////////
function renderAnswers(answers) {
    return answers.map(answer => `<li class='answer'><i class="fab fa-diaspora"></i>${answer}</li>`).join('');
}




//////////////////////////////////
////////dropdown section//////////
//////////////////////////////////
function attachEventListeners() {
    const startButton = document.getElementById("start-button");
    const diffDrop = document.getElementById("diff-dropdown");
    const numOfQuestDrop = document.getElementById("qType-dropdown");
    diffDrop.addEventListener('change', (e) => {
        difficulty = e.target.value
    })
    numOfQuestDrop.addEventListener('change', (e) => {
        numOfQuestions = e.target.value
    })
    startButton.addEventListener('click', () => {
        const counter = document.getElementById('counters')
        fetchQuestions()
        counter.removeAttribute('hidden');
    })
}



//////////////////////////////////
////////////counters//////////////
//////////////////////////////////
function counting() {
    
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









