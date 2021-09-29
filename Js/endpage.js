const latestScore = document.getElementById("final-score")
const saveBtn = document.getElementById("submit-btn")
const username = document.getElementById("username")
const recentScore =  localStorage.getItem("latestScore")
const highScore = JSON.parse(localStorage.getItem('highScore')) || []

latestScore.textContent = recentScore


const MAX_HIGH_SCORES = 5;

username.addEventListener("keyup", () =>{
    saveBtn.disabled = !username.value
})

saveBtn.addEventListener("click", e => {
    e.preventDefault()
    

    const score = {
        score : recentScore,
        name : username.value
    }
    highScore.push(score)
    highScore.sort((a,b) => b.score - a.score)
    highScore.splice(5)


    localStorage.setItem("highScore", JSON.stringify(highScore))
    window.location.assign('../Html/index.html')
    console.log(highScore)
})