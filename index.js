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
    questions.forEach(result => {
        renderQuestion(result)
    })
}



function renderQuestion(data) {
    const answers = document.querySelectorAll('.radio');
    const div = document.createElement('div');
    const questDiv = document.querySelector('.questions')
    const question = data.question;
    const correctAnswer = data.correct_answer;
    const incorrectAnswers = data.incorrect_answers;
    incorrectAnswers.push(correctAnswer);
    console.log(incorrectAnswers, correctAnswer)
    shuffle(incorrectAnswers);
    div.setAttribute('class', 'card');
    const numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    div.innerHTML = `
            <div class="content is-large">
                <div class="tile is-child notification is-info">
                    <p>${question}</p>
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="answer">
                            ${incorrectAnswers[0]}
                        </label>
                        <label class="radio">
                            <input type="radio" name="answer">
                            ${incorrectAnswers[1]}
                        </label>
                        <label class="radio">
                            <input type="radio" name="answer">
                            ${incorrectAnswers[2]}
                        </label>
                        <label class="radio">
                            <input type="radio" name="answer">
                            ${incorrectAnswers[3]}
                        </label>
                    </div>
                </div>
            </div>
        `
    questDiv.appendChild(div)
    answers.forEach(element => {
        element.addEventListener('click', (e) => {
            console.log(e)
        })
    })
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
        fetchQuestions()
    })
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

