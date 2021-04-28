////// API url //////
let apiUrl = `https://opentdb.com/api.php?amount=10&category=21&difficulty=${difficulty}&type=${qType}`
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
    difficultyButton.addEventListener("change", () => {
        console.log("clicked")
    })
}
