const highScoreList = document.getElementById("high-score-list")
const output = ""
const highScores = JSON.parse(localStorage.getItem("highScore"))

console.log(highScores)

highScoreList.innerHTML = highScores
    .map(score => {
        return  `<li class="highScore">${score.name} - - ${score.score}</li>`
    })
    .join("")