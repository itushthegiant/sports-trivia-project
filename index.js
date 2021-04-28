////// global //////
//let apiUrl = `https://opentdb.com/api.php?amount=10&category=21&difficulty=${difficulty}&type=${qType}`
const difficultyButton = document.getElementById("diff-button");
const qTypeButton = document.getElementById("qType-button")

document.addEventListener("DOMContentLoaded" , () => {
    choose()
})


function fetchQuestions() {
    fetch(apiUrl)
    .then(resp => resp.json)
    .then(data => console.log(data))
    .catch(error => console.error(error))
}





function choose() {
    difficultyButton.addEventListener("click", () => {
        const diffDrop = document.getElementById("diff-dropdown");
        if (diffDrop.className === "dropdown") {
            diffDrop.className = "dropdown is-active"
        } else {
            diffDrop.className = "dropdown"
        }
 
    })
    qTypeButton.addEventListener('click', () => {
        const typeDrop = document.getElementById("type-dropdown");
        if (typeDrop.className === "dropdown") {
            typeDrop.className = "dropdown is-active"
        } else {
            typeDrop.className = "dropdown"
        }
    })
}
